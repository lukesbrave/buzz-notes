import React from 'react';
import {createRoot} from 'react-dom/client';
import {apply} from '../dist/plugin.js';
let panel;const tools=new Map();
const fakeClient={key:'preview-agent',owner:'preview-owner',pubkey:'preview-agent'};
apply({react:React,agents:{addTool:t=>tools.set(t.name,t),addInstructions(){},relay:()=>({snapshot:()=>({status:'ready',session:{viewer:fakeClient.owner}})})},pages:{register(){}},panels:{register:p=>{panel=p;}}});
async function call(name,args){return JSON.parse(await tools.get('brave_notes_'+name).call(fakeClient,{},args));}
function Preview(){
  const [open,setOpen]=React.useState(false);
  const [testPage,setTestPage]=React.useState(null),[result,setResult]=React.useState('');
  async function simulate(edit){try{
    if(!edit){const p=await call('create',{requestId:crypto.randomUUID(),title:'Agent test idea',blocks:[{type:'text',text:'Created through the registered tool.'},{type:'todo',text:'Record a short tutorial'}]});setTestPage(p.pageId);setResult('Created and saved. Open Agent test idea in Notes.');}
    else{const p=await call('get',{pageId:testPage});await call('edit',{pageId:p.pageId,expectedRevision:p.revision,title:'Agent edited idea',edits:[{blockId:p.blocks[1].id,checked:true}],append:[{type:'bullet',text:'Added through the registered tool.'}]});setResult('Edited and saved. The open page should update immediately.');}
  }catch(e){setResult(e.message);}}
  return <div style={{height:'100%',display:'flex',flexDirection:'column',fontFamily:'system-ui',color:'#e7e6e3'}}>
    <header style={{height:52,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 18px',borderBottom:'1px solid #333',background:'#202020'}}>
      <span>Agent chat · layout test</span><panel.channelLauncher pressed={open} available={()=>true} toggle={()=>setOpen(v=>!v)}/>
    </header>
    <div style={{flex:1,minHeight:0,display:'flex'}}>
      <section aria-label="Agent conversation" style={{flex:1,minWidth:240,padding:24,display:'flex',flexDirection:'column'}}>
        <p>This is a layout test, not a connected agent conversation.</p>
        <p>Notes opens beside this chat area.</p>
        <p>Simulated agent calls for testing the real plugin tools:</p>
        <button onClick={()=>simulate(false)}>Simulate agent create</button>
        <button disabled={!testPage} onClick={()=>simulate(true)}>Simulate agent edit</button>
        <p role="status">{result}</p>
        <textarea aria-label="Chat draft" placeholder="Draft a message…" style={{marginTop:'auto',background:'#262626',color:'inherit',padding:12,border:'1px solid #444',borderRadius:8}}/>
      </section>
      {open&&<section aria-label="Notes panel" style={{width:'55%',minWidth:320,minHeight:0,borderLeft:'1px solid #333',display:'flex',flexDirection:'column'}}>
        <div style={{height:40,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 14px',borderBottom:'1px solid #333'}}>Notes <button onClick={()=>setOpen(false)} aria-label="Close Notes">×</button></div>
        <div style={{flex:1,minHeight:0}}><panel.component target="bravebrand-notes:personal" close={()=>setOpen(false)}/></div>
      </section>}
    </div>
  </div>;
}
createRoot(document.getElementById('root')).render(<Preview/>);
