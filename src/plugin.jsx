import css from './notes.css';
import {registerAgentTools} from './agent-tools.mjs';
import {mountEditor} from './editor.mjs';
import {createStore, page, block, id, restorePages, markdown, TYPES} from './store.mjs';
export const inject = ['react', 'pages', 'panels', 'agents'];
export function apply(ctx) {
  const React = ctx.react;
  const store = createStore({getItem:key=>localStorage.getItem(key), setItem:(key,value)=>localStorage.setItem(key,value)});
  registerAgentTools(ctx.agents,store);
  const labels = {text:'Text', heading:'Heading', subheading:'Subheading', bullet:'Bulleted list', todo:'To-do', quote:'Quote'};
  function Icon({name='page'}) {
    const paths = {page:'M6 3h9l3 3v15H6z M9 8h6 M9 12h6 M9 16h4', plus:'M12 5v14 M5 12h14', search:'M21 21l-5-5 M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0', trash:'M4 6h16 M9 6V3h6v3 M6 6l1 15h10l1-15 M10 10v7 M14 10v7', menu:'M4 6h16 M4 12h16 M4 18h16', check:'M5 12l4 4L19 6', ideas:'M9 18h6 M10 21h4 M8 14c-5-5-2-11 4-11s9 6 4 11l-1 2H9z', more:'M5 12h.01 M12 12h.01 M19 12h.01', backup:'M12 16V3 M7 8l5-5 5 5 M4 15v6h16v-6'};
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={paths[name] || paths.page}/></svg>;
  }
  function Writing({page,readOnly,controller,onChange,onSelection,focusOnMount}) {
    const mount=React.useRef(null), callbacks=React.useRef({onChange,onSelection});
    callbacks.current={onChange,onSelection};
    React.useLayoutEffect(()=>{
      const editor=mountEditor(mount.current,page,{readOnly,onChange:writing=>callbacks.current.onChange(writing),onSelection:state=>callbacks.current.onSelection(state)});
      controller.current=editor;if(focusOnMount)editor.focusTitle();
      return()=>{if(controller.current===editor)controller.current=null;editor.destroy();};
    },[page.id]);
    React.useLayoutEffect(()=>{controller.current?.sync(page,readOnly);},[page,readOnly]);
    return <div ref={mount}/>;
  }
  function Notes() {
    const snap=React.useSyncExternalStore(store.subscribe,store.get,store.get);
    const [selected,setSelected]=React.useState(()=>snap.data.pages.find(p=>!p.trashed)?.id);
    const [query,setQuery]=React.useState('');
    const [trash,setTrash]=React.useState(false);
    const [menu,setMenu]=React.useState(false);
    const [sidebar,setSidebar]=React.useState(()=>{try{const value=localStorage.getItem('bravebrand.simple-notes.sidebar');return value===null?null:value==='open';}catch{return null;}});
    const [narrow,setNarrow]=React.useState(false);
    const sidebarVisible=sidebar??!narrow;
    const editor=React.useRef(null);
    const [editorState,setEditorState]=React.useState({type:'text',undo:false,redo:false,slash:false});
    const [focusNew,setFocusNew]=React.useState(null);
    const [modal,setModal]=React.useState(null);
    const [importText,setImportText]=React.useState('');
    const [importError,setImportError]=React.useState('');
    const root=React.useRef(null), dialog=React.useRef(null), returnFocus=React.useRef(null);
    const pages=snap.data.pages.filter(p=>p.trashed===trash);
    const current=pages.find(p=>p.id===selected) || pages[0];
    React.useLayoutEffect(()=>{
      const measure=()=>setNarrow(root.current.clientWidth<=500);
      measure();const observer=new ResizeObserver(measure);observer.observe(root.current);return()=>observer.disconnect();
    },[]);
    function toggleSidebar(){const next=!sidebarVisible;setSidebar(next);try{localStorage.setItem('bravebrand.simple-notes.sidebar',next?'open':'closed');}catch{/* The control still works if preferences cannot be saved. */}}
    React.useEffect(()=>{
      if(!modal)return;
      returnFocus.current=document.activeElement;
      dialog.current?.querySelector('textarea,button')?.focus();
      return()=>returnFocus.current?.focus();
    },[modal]);
    const edit=fn=>{if(current&&!trash)store.change(d=>({...d,pages:d.pages.map(p=>p.id===current.id?{...fn(p),updated:Date.now()}:p)}));};
    function addPage() {const p=page();store.change(d=>({...d,pages:[...d.pages,p]}));setTrash(false);setQuery('');setSelected(p.id);if(narrow)setSidebar(false);setFocusNew(p.id);}
    function choose(p) {setSelected(p.id);setMenu(false);if(narrow)setSidebar(false);}
    const backupText=modal==='export'?JSON.stringify(snap.data,null,2):modal==='original'?(store.original()||'No saved data could be read.'):modal==='markdown'&&current?markdown(current):'';
    function showBackup(){setMenu(false);setModal(snap.blocked?'original':'export');}
    const filtered=pages.filter(p=>(p.title+' '+p.blocks.map(b=>b.text).join(' ')).toLowerCase().includes(query.toLowerCase()));
    const blank=current&&!current.title&&current.blocks.length===1&&!current.blocks[0].text;
    function template(type){const blocks=type==='idea'?[block('subheading','The idea'),block(),block('subheading','Why it matters'),block(),block('subheading','Notes & links'),block()]:[block('todo'),block('todo'),block('todo')];edit(p=>({...p,title:type==='idea'?'Content idea':'To-do list',blocks}));}
    return <div style={{containerType:'inline-size',containerName:'notes',height:'100%',minHeight:0}}><section className="bn" ref={root} data-sidebar={sidebarVisible} aria-label="Notes" onKeyDown={e=>{if(e.key==='Escape'){if(modal)setModal(null);else{setMenu(false);if(narrow)setSidebar(false);}}}}>
      <style>{css}</style>
      <aside className="bn-sidebar" aria-label="Your pages">
        <div className="bn-brand"><Icon/>Notes</div>
        <label className="bn-search"><Icon name="search"/><input placeholder="Search notes" aria-label="Search notes" value={query} onChange={e=>setQuery(e.target.value)}/></label>
        <button className="bn-new" onClick={addPage} disabled={snap.blocked}><Icon name="plus"/>New page</button>
        <div className="bn-label">{trash?'Trash':'Your pages'} <span style={{float:'right'}}>{pages.length}</span></div>
        <nav className="bn-pages" aria-label="Pages">{filtered.map(p=><button key={p.id} aria-current={current?.id===p.id?'page':undefined} onClick={()=>choose(p)}><Icon/><span className="bn-ellipsis">{p.title||'Untitled page'}</span></button>)}{!filtered.length&&<div className="bn-empty-list">{query?'No matching notes.':trash?'Nothing in the trash.':'Your next idea starts here.'}</div>}</nav>
        <div className="bn-side-footer"><button onClick={()=>{setTrash(!trash);setQuery('');setMenu(false);}}><Icon name={trash?'page':'trash'}/>{trash?'All pages':'Trash'}</button><button onClick={showBackup}><Icon name="backup"/>Backup</button></div>
      </aside>
      <main className="bn-main">
        <header className="bn-topbar"><button className="bn-sidebar-toggle" aria-label={sidebarVisible?"Collapse sidebar":"Expand sidebar"} title={sidebarVisible?"Collapse sidebar":"Expand sidebar"} aria-expanded={sidebarVisible} onClick={toggleSidebar}><Icon name="menu"/></button><div className="bn-breadcrumb"><Icon/><span className="bn-ellipsis">{current?.title|| (current?'Untitled page':'Notes')}</span></div><span className="bn-saved" role="status">{snap.error?'Not saved':snap.saved?'Saved on this Mac':'On this Mac'}</span>{current&&<button aria-label="Page options" aria-expanded={menu} onClick={()=>setMenu(!menu)}><Icon name="more"/></button>}</header>
        {snap.error&&<div role="alert" className="bn-alert">{snap.error} <button onClick={showBackup}>Backup</button></div>}
        {trash&&current&&<div className="bn-alert">This page is in Trash. <button onClick={()=>{store.change(d=>({...d,pages:d.pages.map(p=>p.id===current.id?{...p,trashed:false}:p)}));setTrash(false);setSelected(current.id);}}>Restore page</button></div>}
        {menu&&current&&<div className="bn-menu"><button onClick={()=>{setModal('markdown');setMenu(false);}}>Copy as Markdown</button>{!trash&&<><button onClick={()=>{const {agentCreate,...original}=current;const p={...original,id:id(),title:(current.title||'Untitled page')+' (copy)',blocks:current.blocks.map(b=>({...b,id:id()})),updated:Date.now()};store.change(d=>({...d,pages:[...d.pages,p]}));choose(p);}}>Duplicate page</button><button onClick={()=>{store.change(d=>({...d,pages:d.pages.map(p=>p.id===current.id?{...p,trashed:true}:p)}));setMenu(false);setSelected(null);}}>Move to Trash</button></>}<button onClick={()=>setMenu(false)}>Close menu</button></div>}
        <div className="bn-scroll">{current?<article className="bn-document" key={current.id}>
          <div className="bn-page-icon"><Icon/></div>
          {!trash&&<div className="bn-toolbar">
            <select aria-label="Block type" value={editorState.type} onChange={e=>editor.current?.setType(e.target.value)}>{TYPES.map(t=><option key={t} value={t}>{labels[t]}</option>)}</select>
            <button onMouseDown={e=>e.preventDefault()} onClick={()=>editor.current?.addBlock()}><Icon name="plus"/>Add block</button>
            <button onMouseDown={e=>e.preventDefault()} onClick={()=>editor.current?.selectAll()}>Select all</button>
            <button onMouseDown={e=>e.preventDefault()} onClick={()=>editor.current?.undo()} disabled={!editorState.undo}>Undo</button>
            <button onMouseDown={e=>e.preventDefault()} onClick={()=>editor.current?.redo()} disabled={!editorState.redo}>Redo</button>
          </div>}
          <Writing page={current} readOnly={trash} controller={editor} focusOnMount={focusNew===current.id} onChange={writing=>edit(p=>({...p,...writing}))} onSelection={setEditorState}/>
          {editorState.slash&&!trash&&<div className="bn-menu bn-slash" aria-label="Choose block type">{TYPES.map(t=><button key={t} onMouseDown={e=>e.preventDefault()} onClick={()=>editor.current?.setType(t)}>{labels[t]}</button>)}</div>}
          {blank&&!trash&&<div className="bn-templates"><button onClick={()=>template('idea')}><Icon name="ideas"/>Content idea</button><button onClick={()=>template('todo')}><Icon name="check"/>To-do list</button></div>}
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
  // Retain the original page address for existing bookmarks, without a dock entry.
  ctx.pages.register({id:'main',title:'Notes',layout:'workspace',component:Notes});
  const target = 'bravebrand-notes:personal';
  function Launcher({toggle, pressed, available}) {
    return <button type="button" className="ui-button" data-size="sm" data-variant="ghost"
      data-channel-panel-toggle="" aria-label="Toggle Notes" title="Notes"
      aria-expanded={pressed} style={{display:'inline-flex',alignItems:'center',gap:6,padding:'6px 8px',borderRadius:6,color:'var(--text-secondary)',background:pressed?'var(--bg-chrome-selected)':'transparent',border:0,cursor:'pointer'}}
      onClick={event=>{event.currentTarget.focus();if(available())toggle(target);}}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 3h9l3 3v15H6z M9 8h6 M9 12h6 M9 16h4"/></svg>
      <span>Notes</span>
    </button>;
  }
  ctx.panels.register({
    id:'notebook',title:'Notes',matches:value=>value===target,
    channelLauncher:Launcher,channelPlacement:'tab',keepOpen:true,
    component:Notes,
  });
}
