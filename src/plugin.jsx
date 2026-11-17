import css from './notes.css';
import {createStore, page, block, id, restorePages, markdown, TYPES} from './store.mjs';
export const inject = ['react', 'pages'];
export function apply(ctx) {
  const React = ctx.react;
  const store = createStore({getItem:key=>localStorage.getItem(key), setItem:(key,value)=>localStorage.setItem(key,value)});
  const labels = {text:'Text', heading:'Heading', subheading:'Subheading', bullet:'Bulleted list', todo:'To-do', quote:'Quote'};
  function Icon({name='page'}) {
    const paths = {page:'M6 3h9l3 3v15H6z M9 8h6 M9 12h6 M9 16h4', plus:'M12 5v14 M5 12h14', search:'M21 21l-5-5 M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0', trash:'M4 6h16 M9 6V3h6v3 M6 6l1 15h10l1-15 M10 10v7 M14 10v7', menu:'M4 6h16 M4 12h16 M4 18h16', check:'M5 12l4 4L19 6', ideas:'M9 18h6 M10 21h4 M8 14c-5-5-2-11 4-11s9 6 4 11l-1 2H9z', more:'M5 12h.01 M12 12h.01 M19 12h.01', backup:'M12 16V3 M7 8l5-5 5 5 M4 15v6h16v-6'};
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={paths[name] || paths.page}/></svg>;
  }
  function Area({value, ...props}) {
    const ref = React.useRef(null);
    React.useLayoutEffect(() => {
      const el=ref.current; const resize=()=>{el.style.height='0px';el.style.height=el.scrollHeight+'px';};
      resize(); const observer=new ResizeObserver(resize); observer.observe(el); return ()=>observer.disconnect();
    }, [value]);
    return <textarea {...props} ref={ref} value={value} rows={1}/>;
  }
  function Notes() {
    const snap=React.useSyncExternalStore(store.subscribe,store.get,store.get);
    const [selected,setSelected]=React.useState(()=>snap.data.pages.find(p=>!p.trashed)?.id);
    const [query,setQuery]=React.useState('');
    const [trash,setTrash]=React.useState(false);
    const [active,setActive]=React.useState(null);
    const [menu,setMenu]=React.useState(false);
    const [sidebar,setSidebar]=React.useState(false);
    const [modal,setModal]=React.useState(null);
    const [importText,setImportText]=React.useState('');
    const [importError,setImportError]=React.useState('');
    const [slash,setSlash]=React.useState(null);
    const root=React.useRef(null), pendingFocus=React.useRef(null), dialog=React.useRef(null), returnFocus=React.useRef(null);
    const pages=snap.data.pages.filter(p=>p.trashed===trash);
    const current=pages.find(p=>p.id===selected) || pages[0];
    const currentBlock=current?.blocks.find(b=>b.id===active) || current?.blocks[0];
    const [,refreshFocus]=React.useReducer(n=>n+1,0);
    const focus=(target,position=0)=>{pendingFocus.current={target,position};refreshFocus();};
    React.useLayoutEffect(()=>{
      if(!pendingFocus.current)return;
      const {target,position}=pendingFocus.current; pendingFocus.current=null;
      const el=Array.from(root.current.querySelectorAll('textarea')).find(e=>e.dataset.block===target || (target==='title'&&e.classList.contains('bn-title')));
      if(el){el.focus();el.setSelectionRange(position,position);}
    });
    React.useEffect(()=>{
      if(!modal)return;
      returnFocus.current=document.activeElement;
      dialog.current?.querySelector('textarea,button')?.focus();
      return()=>returnFocus.current?.focus();
    },[modal]);
    const edit=fn=>{if(current&&!trash)store.change(d=>({...d,pages:d.pages.map(p=>p.id===current.id?{...fn(p),updated:Date.now()}:p)}));};
    const editBlock=(bid,patch)=>edit(p=>({...p,blocks:p.blocks.map(b=>b.id===bid?{...b,...patch}:b)}));
    function addPage() {const p=page();store.change(d=>({...d,pages:[...d.pages,p]}));setTrash(false);setQuery('');setSelected(p.id);setSidebar(false);setActive(p.blocks[0].id);focus('title');}
    function choose(p) {setSelected(p.id);setMenu(false);setSlash(null);setSidebar(false);setActive(p.blocks[0].id);}
    function changeType(type,bid=currentBlock?.id) {if(!bid)return;edit(p=>({...p,blocks:p.blocks.map(b=>b.id===bid?{...b,type,text:b.text==='/'?'':b.text}:b)}));setSlash(null);focus(bid);}
    function insertAfter(bid) {const b=block();edit(p=>{const blocks=[...p.blocks];blocks.splice(blocks.findIndex(x=>x.id===bid)+1,0,b);return {...p,blocks};});setActive(b.id);focus(b.id);}
    function keydown(e,b,index) {
      if(e.nativeEvent.isComposing)return;
      if(e.key==='Escape'){setSlash(null);return;}
      if(e.key==='Enter'&&!e.shiftKey){
        e.preventDefault();setSlash(null);
        if(!b.text && b.type!=='text'){changeType('text',b.id);return;}
        const start=e.currentTarget.selectionStart,end=e.currentTarget.selectionEnd;
        const next=block(['todo','bullet'].includes(b.type)?b.type:'text',b.text.slice(end));
        edit(p=>{const blocks=[...p.blocks];blocks.splice(index,1,{...b,text:b.text.slice(0,start)},next);return {...p,blocks};});
        setActive(next.id);focus(next.id);return;
      }
      if(e.key==='Backspace'&&e.currentTarget.selectionStart===0&&e.currentTarget.selectionEnd===0){
        if(b.type!=='text'){e.preventDefault();changeType('text',b.id);return;}
        if(index>0){e.preventDefault();const prev=current.blocks[index-1];edit(p=>({...p,blocks:p.blocks.flatMap(x=>x.id===prev.id?[{...x,text:x.text+b.text}]:x.id===b.id?[]:[x])}));setActive(prev.id);focus(prev.id,prev.text.length);}
      }
      if(e.key==='ArrowUp'&&e.currentTarget.selectionStart===0&&index>0){e.preventDefault();const prev=current.blocks[index-1];setActive(prev.id);focus(prev.id,prev.text.length);setSlash(null);}
      if(e.key==='ArrowDown'&&e.currentTarget.selectionStart===b.text.length&&index<current.blocks.length-1){e.preventDefault();const next=current.blocks[index+1];setActive(next.id);focus(next.id);setSlash(null);}
    }
    const backupText=modal==='export'?JSON.stringify(snap.data,null,2):modal==='original'?(store.original()||'No saved data could be read.'):modal==='markdown'&&current?markdown(current):'';
    function showBackup(){setMenu(false);setModal(snap.blocked?'original':'export');}
    const filtered=pages.filter(p=>(p.title+' '+p.blocks.map(b=>b.text).join(' ')).toLowerCase().includes(query.toLowerCase()));
    const blank=current&&!current.title&&current.blocks.length===1&&!current.blocks[0].text;
    function template(type){const blocks=type==='idea'?[block('subheading','The idea'),block(),block('subheading','Why it matters'),block(),block('subheading','Notes & links'),block()]:[block('todo'),block('todo'),block('todo')];edit(p=>({...p,title:type==='idea'?'Content idea':'To-do list',blocks}));setActive(blocks[type==='idea'?1:0].id);focus(blocks[type==='idea'?1:0].id);}
    return <div style={{containerType:'inline-size',containerName:'notes',height:'100%',minHeight:520}}><section className="bn" ref={root} data-sidebar={sidebar} aria-label="Notes" onKeyDown={e=>{if(e.key==='Escape'){if(modal)setModal(null);else{setMenu(false);setSlash(null);setSidebar(false);}}}}>
      <style>{css}</style>
      <aside className="bn-sidebar" aria-label="Your pages">
        <div className="bn-brand"><Icon/>Notes</div>
        <label className="bn-search"><Icon name="search"/><input placeholder="Search notes" aria-label="Search notes" value={query} onChange={e=>setQuery(e.target.value)}/></label>
        <button className="bn-new" onClick={addPage} disabled={snap.blocked}><Icon name="plus"/>New page</button>
        <div className="bn-label">{trash?'Trash':'Your pages'} <span style={{float:'right'}}>{pages.length}</span></div>
        <nav className="bn-pages" aria-label="Pages">{filtered.map(p=><button key={p.id} aria-current={current?.id===p.id?'page':undefined} onClick={()=>choose(p)}><Icon/><span className="bn-ellipsis">{p.title||'Untitled page'}</span></button>)}{!filtered.length&&<div className="bn-empty-list">{query?'No matching notes.':trash?'Nothing in the trash.':'Your next idea starts here.'}</div>}</nav>
        <div className="bn-side-footer"><button onClick={()=>{setTrash(!trash);setQuery('');setMenu(false);setSlash(null);}}><Icon name={trash?'page':'trash'}/>{trash?'All pages':'Trash'}</button><button onClick={showBackup}><Icon name="backup"/>Backup</button></div>
      </aside>
      <main className="bn-main">
        <header className="bn-topbar"><button className="bn-mobile-toggle" aria-label="Toggle page list" aria-expanded={sidebar} onClick={()=>setSidebar(!sidebar)}><Icon name="menu"/></button><div className="bn-breadcrumb"><Icon/><span className="bn-ellipsis">{current?.title|| (current?'Untitled page':'Notes')}</span></div><span className="bn-saved" role="status">{snap.error?'Not saved':snap.saved?'Saved on this Mac':'On this Mac'}</span>{current&&<button aria-label="Page options" aria-expanded={menu} onClick={()=>setMenu(!menu)}><Icon name="more"/></button>}</header>
        {snap.error&&<div role="alert" className="bn-alert">{snap.error} <button onClick={showBackup}>Backup</button></div>}
        {trash&&current&&<div className="bn-alert">This page is in Trash. <button onClick={()=>{store.change(d=>({...d,pages:d.pages.map(p=>p.id===current.id?{...p,trashed:false}:p)}));setTrash(false);setSelected(current.id);}}>Restore page</button></div>}
        {menu&&current&&<div className="bn-menu"><button onClick={()=>{setModal('markdown');setMenu(false);}}>Copy as Markdown</button>{!trash&&<><button onClick={()=>{const p={...current,id:id(),title:(current.title||'Untitled page')+' (copy)',blocks:current.blocks.map(b=>({...b,id:id()})),updated:Date.now()};store.change(d=>({...d,pages:[...d.pages,p]}));choose(p);}}>Duplicate page</button><button onClick={()=>{store.change(d=>({...d,pages:d.pages.map(p=>p.id===current.id?{...p,trashed:true}:p)}));setMenu(false);setSelected(null);}}>Move to Trash</button></>}<button onClick={()=>setMenu(false)}>Close menu</button></div>}
        <div className="bn-scroll">{current?<article className="bn-document" key={current.id}>
          <div className="bn-page-icon"><Icon/></div>
          <Area className="bn-title" aria-label="Page title" placeholder="Untitled page" value={current.title} readOnly={trash} onChange={e=>edit(p=>({...p,title:e.target.value.replace(/\n/g,' ')}))} onKeyDown={e=>{if(e.key==='Enter'&&!e.nativeEvent.isComposing){e.preventDefault();setActive(current.blocks[0].id);focus(current.blocks[0].id);}}}/>
          {!trash&&<div className="bn-toolbar"><select aria-label="Block type" value={currentBlock?.type||'text'} onChange={e=>changeType(e.target.value)}>{TYPES.map(t=><option key={t} value={t}>{labels[t]}</option>)}</select><button onClick={()=>insertAfter(currentBlock?.id)}><Icon name="plus"/>Add block</button></div>}
          {blank&&!trash&&<div className="bn-templates"><button onClick={()=>template('idea')}><Icon name="ideas"/>Content idea</button><button onClick={()=>template('todo')}><Icon name="check"/>To-do list</button></div>}
          {current.blocks.map((b,index)=><React.Fragment key={b.id}><div className="bn-block" data-type={b.type} data-checked={b.type==='todo'&&b.checked}>
            {!trash&&<button className="bn-add-block" aria-label={`Insert block after block ${index+1}`} onClick={()=>insertAfter(b.id)}><Icon name="plus"/></button>}
            {b.type==='todo'&&<input className="bn-check" type="checkbox" aria-label={`Complete to-do ${index+1}`} checked={b.checked} disabled={trash} onChange={e=>editBlock(b.id,{checked:e.target.checked})}/>}
            {b.type==='bullet'&&<span className="bn-bullet" aria-hidden="true">•</span>}
            <Area data-block={b.id} aria-label={`${labels[b.type]} block ${index+1}`} placeholder={index===0?'Write something, or type / for a block…':b.type==='todo'?'To-do':b.type==='heading'?'Heading':b.type==='subheading'?'Subheading':'Write something…'} value={b.text} readOnly={trash} onFocus={()=>setActive(b.id)} onKeyDown={e=>!trash&&keydown(e,b,index)} onChange={e=>{const text=e.target.value;const shortcut={'# ':'heading','## ':'subheading','- ':'bullet','[] ':'todo','[ ] ':'todo','> ':'quote'}[text];editBlock(b.id,shortcut?{type:shortcut,text:''}:{text});setSlash(text==='/'?b.id:null);}}/>
          </div>{slash===b.id&&!trash&&<div className="bn-menu bn-slash" aria-label="Choose block type">{TYPES.map(t=><button key={t} onClick={()=>changeType(t,b.id)}>{labels[t]}</button>)}</div>}</React.Fragment>)}
          <div className="bn-hint">{current.blocks.map(b=>b.text).join(' ').trim().split(/\s+/).filter(Boolean).length} words · {trash?'Restore this page to edit it.':'Enter for a new block · Shift + Enter for a new line'}</div>
        </article>:<div className="bn-empty"><Icon/><h2>{trash?'Nothing in the trash':'A little space for your thoughts'}</h2><p>{trash?'Removed pages will stay here until you restore them.':'Capture an idea. Keep a note. Make it yours.'}</p>{!trash&&!snap.blocked&&<button onClick={addPage}><Icon name="plus"/>Create a page</button>}</div>}</div>
      </main>
      {modal&&<div className="bn-modal-shade"><div className="bn-modal" role="dialog" aria-modal="true" aria-labelledby="bn-dialog-title" ref={dialog} onKeyDown={e=>{if(e.key!=='Tab')return;const els=[...dialog.current.querySelectorAll('button:not(:disabled),textarea')];const first=els[0],last=els.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}}>
        <h2 id="bn-dialog-title">{modal==='import'?'Restore a backup':modal==='markdown'?'Copy this page':modal==='original'?'Recover saved data':'Back up your notes'}</h2>
        <p>{modal==='import'?'Paste a Notes backup below. Its pages will be added as new copies; existing notes stay unchanged.':modal==='markdown'?'Copy the text below to use this page anywhere that supports Markdown.':'Notes are stored in this Buzz app on this Mac. Copy the text below into a file somewhere safe. It includes pages in Trash. Clearing app data can remove your notes.'}</p>
        <textarea aria-label={modal==='import'?'Backup to restore':'Backup content'} value={modal==='import'?importText:backupText} readOnly={modal!=='import'} onChange={e=>setImportText(e.target.value)} onFocus={e=>modal!=='import'&&e.target.select()}/>
        {importError&&<p role="alert">{importError}</p>}
        <div className="bn-modal-actions">{modal==='export'&&<button onClick={()=>{setImportError('');setModal('import');}}>Restore backup</button>}{modal==='import'?<button onClick={()=>{try{const incoming=restorePages(importText);store.change(d=>({...d,pages:[...d.pages,...incoming]}));setModal(null);setImportText('');setTrash(false);setSelected(incoming.find(p=>!p.trashed)?.id);}catch(e){setImportError(e.message);}}} disabled={!importText.trim()}>Add restored pages</button>:<button onClick={()=>{const area=dialog.current.querySelector('textarea');area.focus();area.select();}}>Select all to copy</button>}<button onClick={()=>{setModal(null);setImportError('');}}>Done</button></div>
      </div></div>}
    </section></div>;
  }
  ctx.pages.register({id:'main',title:'Notes',primary:true,placement:'dock',layout:'workspace',component:Notes});
}
