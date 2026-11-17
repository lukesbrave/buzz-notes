import {test} from 'node:test';
import assert from 'node:assert/strict';
import {registerAgentTools} from '../src/agent-tools.mjs';
import {KEY,createStore,restorePages} from '../src/store.mjs';

function fixture(raw=null){
  let stored=raw;
  const disk={getItem:()=>stored,setItem:(key,value)=>{stored=value;}};
  const store=createStore(disk),tools=new Map(),instructions=[];
  const client={key:'local-agent',owner:'notebook-owner',pubkey:'agent-public-key'};
  let connected=true;
  registerAgentTools({addInstructions:item=>instructions.push(item),addTool:tool=>tools.set(tool.name,tool),relay:key=>key===client.key&&connected?{snapshot:()=>({status:'ready',session:{viewer:'notebook-owner'}})}:undefined},store);
  const call=async(name,args={},as=client)=>JSON.parse(await tools.get('brave_notes_'+name).call(as,{},args));
  const create=(overrides={})=>call('create',{requestId:crypto.randomUUID(),title:'Content ideas',blocks:[{type:'heading',text:'Next video'},{type:'bullet',text:'Opening hook'},{type:'todo',text:'Record intro',checked:false}],...overrides});
  return {store,disk,tools,instructions,client,call,create,disconnect:()=>{connected=false;}};
}

test('agent creates formatted content, edits specific blocks and persists to the same notebook',async()=>{
  const f=fixture();let updates=0;const stop=f.store.subscribe(()=>updates++);
  const first=await f.create();
  const edited=await f.call('edit',{pageId:first.pageId,expectedRevision:first.revision,title:'Ready to film',edits:[{blockId:first.blocks[0].id,text:'Tutorial',type:'subheading'},{blockId:first.blocks[2].id,checked:true}],removeBlockIds:[first.blocks[1].id],append:[{type:'quote',text:'Keep it useful'}]});
  assert.equal(edited.title,'Ready to film');assert.equal(edited.blocks.length,3);
  assert.equal(edited.blocks[0].type,'subheading');assert.equal(edited.blocks[1].checked,true);
  assert.match(edited.markdown,/- \[x\] Record intro/);assert.notEqual(edited.revision,first.revision);
  assert.equal(updates,2);stop();
  const reopened=createStore(f.disk).get().data.pages.find(p=>p.id===first.pageId);
  assert.deepEqual(reopened.blocks,edited.blocks);assert.equal(reopened.title,edited.title);
  const listed=await f.call('list',{query:'useful',limit:1});assert.equal(listed.pages[0].pageId,first.pageId);
  assert.equal(listed.total,1);assert.equal(listed.nextOffset,null);
});

test('create retries are idempotent, including after reload and later edits',async()=>{
  const f=fixture(),args={requestId:'retry-123',title:'One idea'};
  const first=await f.create(args);
  await f.call('edit',{pageId:first.pageId,expectedRevision:first.revision,title:'Updated by human or agent'});
  const replay=await f.create(args);assert.equal(replay.pageId,first.pageId);assert.equal(replay.replayed,true);assert.equal(replay.title,'Updated by human or agent');
  const reopened=fixture(f.disk.getItem(KEY));assert.equal((await reopened.create(args)).pageId,first.pageId);
  assert.equal(reopened.store.get().data.pages.length,2);
  await assert.rejects(f.create({...args,title:'Different request'}),/already used/);
  assert.ok(restorePages(f.disk.getItem(KEY)).every(p=>!p.agentCreate));
});

test('only a trusted locally bound owner agent can read or edit notes',async()=>{
  const f=fixture();
  for(const client of [{},{...f.client,owner:'different-owner'},{...f.client,owner:undefined},{...f.client,key:'unbound-agent'}]){
    await assert.rejects(f.call('list',{},client),/owned by the signed-in/);
    await assert.rejects(f.call('create',{requestId:'x',title:'Should not save'},client),/owned by the signed-in/);
  }
  const controller=new AbortController();controller.abort();
  await assert.rejects(f.call('list',{}, {...f.client,signal:controller.signal}),/cancelled/);
  f.disconnect();await assert.rejects(f.call('list'),/owned by the signed-in/);
  assert.equal(f.disk.getItem(KEY),null);
});

test('an old revision cannot overwrite a newer human edit',async()=>{
  const f=fixture(),p=await f.create();
  f.store.change(d=>({...d,pages:d.pages.map(item=>item.id===p.pageId?{...item,title:'Human edit'}:item)}));
  await assert.rejects(f.call('edit',{pageId:p.pageId,expectedRevision:p.revision,title:'Stale agent edit'}),/Revision conflict/);
  assert.equal((await f.call('get',{pageId:p.pageId})).title,'Human edit');
});

test('a human edit during the asynchronous revision check also wins',async()=>{
  const f=fixture(),p=await f.create();
  const pending=f.call('edit',{pageId:p.pageId,expectedRevision:p.revision,title:'Agent edit'});
  f.store.change(d=>({...d,pages:d.pages.map(item=>item.id===p.pageId?{...item,title:'Human typed meanwhile'}:item)}));
  await assert.rejects(pending,/Revision conflict/);
  assert.equal((await f.call('get',{pageId:p.pageId})).title,'Human typed meanwhile');
});

test('two simultaneous agent edits cannot both replace the same revision',async()=>{
  const f=fixture(),p=await f.create();
  const results=await Promise.allSettled(['First','Second'].map(title=>f.call('edit',{pageId:p.pageId,expectedRevision:p.revision,title})));
  assert.equal(results.filter(r=>r.status==='fulfilled').length,1);
  assert.match(results.find(r=>r.status==='rejected').reason.message,/Revision conflict/);
});

test('cancelled calls and disconnected identity cannot commit after a revision wait',async()=>{
  for(const cancel of [true,false]){
    const f=fixture(),p=await f.create(),controller=new AbortController(),before=f.disk.getItem(KEY);
    const pending=f.call('edit',{pageId:p.pageId,expectedRevision:p.revision,title:'Never write'}, {...f.client,signal:controller.signal});
    if(cancel)controller.abort();else f.disconnect();
    await assert.rejects(pending,/cancelled|owned by the signed-in/);assert.equal(f.disk.getItem(KEY),before);
  }
});

test('failed persistence does not alter the notebook or claim a successful agent edit',async()=>{
  const f=fixture(),p=await f.create(),before=f.disk.getItem(KEY),snapshot=f.store.get();
  f.disk.setItem=()=>{throw Error('Storage quota exceeded');};
  await assert.rejects(f.call('edit',{pageId:p.pageId,expectedRevision:p.revision,title:'Will not fit'}),/quota/);
  await assert.rejects(f.create(),/quota/);
  assert.equal(f.store.get(),snapshot);assert.equal(f.disk.getItem(KEY),before);
});

test('agent refuses to replace external-window saves, corrupt data or an unsaved human draft',async()=>{
  const f=fixture(),p=await f.create();const other=createStore(f.disk);
  other.change(d=>({...d,pages:d.pages.map(item=>item.id===p.pageId?{...item,title:'Other window'}:item)}));
  const saved=f.disk.getItem(KEY);
  await assert.rejects(f.call('edit',{pageId:p.pageId,expectedRevision:p.revision,title:'Old window'}),/another window/);
  assert.equal(f.disk.getItem(KEY),saved);
  const broken=fixture('broken');await assert.rejects(broken.create(),/storage error/);assert.equal(broken.disk.getItem(KEY),'broken');
  const unsaved=fixture();unsaved.disk.setItem=()=>{throw Error('quota');};unsaved.store.change(d=>({...d}));
  await assert.rejects(unsaved.create(),/unsaved draft/);
});

test('trash is recoverable, excluded from default search and read-only until restored',async()=>{
  const f=fixture(),p=await f.create();
  const trashed=await f.call('set_trash',{pageId:p.pageId,expectedRevision:p.revision,trashed:true});
  assert.equal((await f.call('list',{query:'Content ideas'})).total,0);
  assert.equal((await f.call('list',{query:'Content ideas',includeTrash:true})).total,1);
  await assert.rejects(f.call('edit',{pageId:p.pageId,expectedRevision:trashed.revision,title:'No'}),/Restore/);
  const restored=await f.call('set_trash',{pageId:p.pageId,expectedRevision:trashed.revision,trashed:false});
  assert.equal(restored.trashed,false);assert.deepEqual(restored.blocks,p.blocks);
  assert.equal(f.tools.has('brave_notes_delete'),false);
});

test('invalid or conflicting block edits are rejected without a partial write',async()=>{
  const f=fixture(),p=await f.create(),before=f.disk.getItem(KEY),base={pageId:p.pageId,expectedRevision:p.revision};
  const cases=[{}, {edits:[{blockId:'missing',text:'No'}]}, {edits:[{blockId:p.blocks[0].id}]}, {edits:[{blockId:p.blocks[0].id,type:'script'}]}, {edits:[{blockId:p.blocks[0].id,checked:'yes'}]}, {removeBlockIds:[p.blocks[0].id,p.blocks[0].id]}, {edits:[{blockId:p.blocks[0].id,text:'No'}],removeBlockIds:[p.blocks[0].id]}, {append:[{type:'text',text:'No',html:'<script>'}]}, {title:'No',owner:'forged'}];
  for(const extra of cases)await assert.rejects(f.call('edit',{...base,...extra}));
  assert.equal(f.disk.getItem(KEY),before);
  const cleared=await f.call('edit',{...base,title:'',removeBlockIds:p.blocks.map(b=>b.id)});
  assert.equal(cleared.title,'');assert.equal(cleared.blocks.length,1);assert.equal(cleared.blocks[0].type,'text');assert.equal(cleared.blocks[0].text,'');
});

test('developer guide exposes source and supported update route without notebook content',async()=>{
  const f=fixture();await f.create({title:'Private idea'});
  const guide=await f.call('developer_info',{},{});
  assert.equal(guide.repository,'https://github.com/lukesbrave/buzz-notes');
  assert.match(JSON.stringify(guide),/plugin_request/);assert.match(JSON.stringify(guide),/does not grant shell access/);
  assert.doesNotMatch(JSON.stringify(guide),/Private idea/);
  assert.equal(f.instructions.length,1);assert.match(f.instructions[0].text,/brave_notes_developer_info/);
  assert.ok(new TextEncoder().encode(f.instructions[0].text).length<4096);
});
