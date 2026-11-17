import React from 'react';
import {createRoot} from 'react-dom/client';
import {apply} from '../dist/plugin.js';
let panel;
apply({react:React,pages:{register(){}},panels:{register:p=>{panel=p;}}});
function Preview(){
  const [open,setOpen]=React.useState(false);
  return <div style={{height:'100%',display:'flex',flexDirection:'column',fontFamily:'system-ui',color:'#e7e6e3'}}>
    <header style={{height:52,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 18px',borderBottom:'1px solid #333',background:'#202020'}}>
      <span>Agent chat · layout test</span><panel.channelLauncher pressed={open} available={()=>true} toggle={()=>setOpen(v=>!v)}/>
    </header>
    <div style={{flex:1,minHeight:0,display:'flex'}}>
      <section aria-label="Agent conversation" style={{flex:1,minWidth:240,padding:24,display:'flex',flexDirection:'column'}}>
        <p>This is a layout test, not a connected agent conversation.</p>
        <p>Notes opens beside this chat area.</p>
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
