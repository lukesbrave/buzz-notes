import {test} from 'node:test';
import assert from 'node:assert/strict';
import {page,block,validate,restorePages,createStore} from '../src/store.mjs';
import {createLinkedPage,linkBlock} from '../src/page-links.mjs';
import {pageToDoc,docToWriting,createEditorState,clearFullSelection} from '../src/editor.mjs';
import {AllSelection} from 'prosemirror-state';
import {undo} from 'prosemirror-history';

test('creating a linked detail page retains the original idea, formatting, checkbox and other pages',()=>{
 const source={...page('Ideas'),blocks:[{...block('todo','Film tutorial'),checked:true}]},other=page('Other'),data={version:1,pages:[source,other]};
 const result=createLinkedPage(data,source.id,source.blocks[0].id,'Video script');
 assert.equal(result.data.pages.length,3);assert.equal(result.data.pages[1],other);
 assert.deepEqual(result.data.pages[0].blocks[0],{...source.blocks[0],linkedPageId:result.created.id});
 assert.equal(source.blocks[0].linkedPageId,undefined);assert.equal(result.created.title,'Video script');
 assert.equal(result.created.blocks.find(b=>b.type==='text').text,'Film tutorial');
 assert.deepEqual(result.created.blocks.filter(b=>b.type==='subheading').map(b=>b.text),['Brief','Script','Related content','References & links']);
 validate(result.data);
});
test('linking to existing pages survives rename and removing a link never removes either page',()=>{
 const a=page('A'),b=page('B');const data=linkBlock({version:1,pages:[a,b]},a.id,a.blocks[0].id,b.id);
 const renamed={...data,pages:data.pages.map(p=>p.id===b.id?{...p,title:'Renamed'}:p)};
 assert.equal(renamed.pages[0].blocks[0].linkedPageId,b.id);
 const unlinked=linkBlock(renamed,a.id,a.blocks[0].id,null);
 assert.equal(unlinked.pages.length,2);assert.equal(unlinked.pages[0].blocks[0].linkedPageId,undefined);
 assert.equal(unlinked.pages[1].title,'Renamed');
 for(const target of ['missing',a.id])assert.throws(()=>linkBlock(data,a.id,a.blocks[0].id,target));
 assert.throws(()=>linkBlock({...data,pages:[a,{...b,trashed:true}]},a.id,a.blocks[0].id,b.id));
});
test('linked pages and all block kinds round-trip through editor and saved notebook',()=>{
 const a={...page('A'),blocks:['text','heading','subheading','bullet','todo','quote'].map(type=>({...block(type,'Linked idea'),linkedPageId:'target'}))};
 assert.deepEqual(docToWriting(pageToDoc(a)),{title:a.title,blocks:a.blocks});
 let raw=null;const disk={getItem:()=>raw,setItem:(k,v)=>{raw=v;}};createStore(disk).commit(()=>({version:1,pages:[a]}));
 assert.deepEqual(createStore(disk).get().data.pages[0],a);
});
test('backup restore remaps links between restored copies without linking back to originals',()=>{
 const a=page('A'),b=page('B');a.blocks[0].linkedPageId=b.id;b.blocks[0].linkedPageId=a.id;
 const copies=restorePages(JSON.stringify({version:1,pages:[a,b]}));
 assert.notEqual(copies[0].id,a.id);assert.equal(copies[0].blocks[0].linkedPageId,copies[1].id);
 assert.equal(copies[1].blocks[0].linkedPageId,copies[0].id);
});
test('full selection deletion clears page links and undo restores them exactly',()=>{
 const a=page('Ideas');a.blocks=[{...block('todo','Linked idea'),linkedPageId:'target'}];let state=createEditorState(a);
 state=state.apply(state.tr.setSelection(new AllSelection(state.doc)));
 clearFullSelection(state,tr=>{state=state.applyTransaction(tr).state;});
 assert.equal(docToWriting(state.doc).blocks[0].linkedPageId,undefined);
 undo(state,tr=>{state=state.applyTransaction(tr).state;});assert.deepEqual(docToWriting(state.doc),{title:a.title,blocks:a.blocks});
});
