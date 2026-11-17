import {Schema} from 'prosemirror-model';
import {EditorState, Plugin, TextSelection} from 'prosemirror-state';
import {EditorView} from 'prosemirror-view';
import {baseKeymap, chainCommands, setBlockType, splitBlockAs, selectAll} from 'prosemirror-commands';
import {keymap} from 'prosemirror-keymap';
import {history, undo, redo, undoDepth, redoDepth} from 'prosemirror-history';
import {inputRules, textblockTypeInputRule} from 'prosemirror-inputrules';
import {id} from './store.mjs';
const names={text:'paragraph',heading:'heading',subheading:'subheading',bullet:'bullet',todo:'todo',quote:'quote'};
const types=Object.fromEntries(Object.entries(names).map(([key,value])=>[value,key]));
function textBlock(name,tag,parseDOM=[]){return {
  group:'block',content:'text*',marks:'',attrs:{id:{default:null},checked:{default:false}},
  parseDOM:[{tag:`${tag}[data-note-type="${name}"]`,priority:100,getAttrs:dom=>({checked:dom.getAttribute('data-checked')==='true'})},...parseDOM],
  toDOM:node=>[tag,{'data-note-type':name,'data-checked':node.attrs.checked?'true':'false'},0],
};}
export const schema=new Schema({nodes:{
  doc:{content:'pageTitle block+'},
  pageTitle:{content:'text*',marks:'',parseDOM:[{tag:'h1[data-note-title]'}],toDOM:()=>['h1',{'data-note-title':'','data-placeholder':'Untitled page'},0]},
  paragraph:textBlock('text','p',[{tag:'p'}]),
  heading:textBlock('heading','h2',[{tag:'h1'},{tag:'h2'}]),
  subheading:textBlock('subheading','h3',[{tag:'h3'},{tag:'h4'}]),
  bullet:textBlock('bullet','p',[{tag:'li'}]),
  todo:textBlock('todo','div'),
  quote:textBlock('quote','blockquote',[{tag:'blockquote'}]),
  text:{group:'inline'},
},marks:{}});
export function pageToDoc(page){
  const text=value=>value?schema.text(value):undefined;
  return schema.node('doc',null,[schema.node('pageTitle',null,text(page.title)),...page.blocks.map(b=>schema.node(names[b.type],{id:b.id,checked:b.checked},text(b.text)))]);
}
export function docToWriting(doc){
  const blocks=[];doc.forEach((node,offset,index)=>{if(index)blocks.push({id:node.attrs.id||id(),type:types[node.type.name],text:node.textContent,checked:!!node.attrs.checked});});
  return {title:doc.firstChild.textContent,blocks};
}
const identities=new Plugin({appendTransaction(transactions,oldState,state){
  if(!transactions.some(tr=>tr.docChanged))return null;
  const seen=new Set(),tr=state.tr;
  state.doc.forEach((node,pos,index)=>{if(!index)return;let key=node.attrs.id;if(!key||seen.has(key)){key=id();tr.setNodeMarkup(pos,undefined,{...node.attrs,id:key});}seen.add(key);});
  return tr.docChanged?tr:null;
}});
// Full writing selections reset formatting as well as text. Partial selections
// use the editor's ordinary deletion, preserving unselected text and blocks.
export function clearFullSelection(state,dispatch){
  const {from,to,empty}=state.selection;
  let lastTextEnd=1;
  state.doc.forEach((node,pos)=>{if(node.content.size)lastTextEnd=pos+1+node.content.size;});
  // Dragging to the last visible character must also clear trailing empty
  // list items and template blocks, which have no text to highlight.
  if(empty||to<lastTextEnd)return false;
  const titleEnd=state.doc.firstChild.nodeSize;
  if(from>titleEnd+1)return false;
  const whole=from<=1;
  if(dispatch){
    const paragraph=schema.node('paragraph',{id:id()});
    const content=whole?[schema.node('pageTitle'),paragraph]:[paragraph];
    const tr=state.tr.replaceWith(whole?0:titleEnd,state.doc.content.size,content);
    tr.setSelection(TextSelection.create(tr.doc,tr.doc.firstChild.nodeSize+1));
    dispatch(tr.scrollIntoView());
  }
  return true;
}
function emptyFormattedToText(state,dispatch){
  const parent=state.selection.$from.parent;
  if(!state.selection.empty||parent.content.size||['pageTitle','paragraph'].includes(parent.type.name))return false;
  return setBlockType(schema.nodes.paragraph)(state,dispatch);
}
const enter=chainCommands(emptyFormattedToText,splitBlockAs((node,atEnd)=>{
  const type=node.type.name;
  if(type==='pageTitle'||atEnd&&!['bullet','todo'].includes(type))return {type:schema.nodes.paragraph};
  if(['bullet','todo'].includes(type))return {type:node.type,attrs:{id:null,checked:false}};
  return null;
}));
export function createEditorState(page){
  return EditorState.create({schema,doc:pageToDoc(page),plugins:[
    identities,history(),
    keymap({'Mod-z':undo,'Mod-Shift-z':redo,'Mod-y':redo,'Mod-a':selectAll,
      Backspace:chainCommands(clearFullSelection,emptyFormattedToText,baseKeymap.Backspace),
      Delete:chainCommands(clearFullSelection,baseKeymap.Delete),
      Enter:enter,
      'Shift-Enter':(state,dispatch)=>{if(dispatch)dispatch(state.tr.insertText('\n').scrollIntoView());return true;},
    }),
    inputRules({rules:[
      textblockTypeInputRule(/^# $/,schema.nodes.heading),textblockTypeInputRule(/^## $/,schema.nodes.subheading),
      textblockTypeInputRule(/^[-*] $/,schema.nodes.bullet),textblockTypeInputRule(/^\[ ?\] $/,schema.nodes.todo),textblockTypeInputRule(/^> $/,schema.nodes.quote),
    ]}),keymap(baseKeymap),
  ]});
}
export function mountEditor(element,page,{onChange,onSelection,readOnly=false}){
  let editable=!readOnly;
  function notify(view){
    const node=view.state.selection.$from.parent;
    onSelection({type:types[node.type.name]||'text',undo:undoDepth(view.state)>0,redo:redoDepth(view.state)>0,slash:node.type.name==='paragraph'&&node.textContent==='/'});
  }
  const view=new EditorView(element,{
    state:createEditorState(page),editable:()=>editable,
    attributes:{class:'bn-rich','aria-label':'Page writing',role:'textbox','aria-multiline':'true',spellcheck:'true'},
    dispatchTransaction(tr){
      const previous=view.state.doc;
      const result=view.state.applyTransaction(tr);view.updateState(result.state);
      if(!view.state.doc.eq(previous))onChange(docToWriting(view.state.doc));
      notify(view);
    },
    nodeViews:{todo(node,view,getPos){
      const dom=document.createElement('div');dom.dataset.noteType='todo';
      const label=document.createElement('span');label.contentEditable='false';label.className='bn-task-control';
      const input=document.createElement('input');input.type='checkbox';input.setAttribute('aria-label','Complete to-do');input.tabIndex=-1;input.disabled=!editable;
      label.appendChild(input);const contentDOM=document.createElement('div');dom.append(label,contentDOM);
      function update(next){if(next.type!==node.type)return false;node=next;input.checked=!!node.attrs.checked;input.disabled=!editable;dom.dataset.checked=String(input.checked);return true;}
      update(node);
      input.addEventListener('change',()=>{const pos=getPos();if(editable&&typeof pos==='number')view.dispatch(view.state.tr.setNodeMarkup(pos,undefined,{...node.attrs,checked:input.checked}));});
      return {dom,contentDOM,update,stopEvent:event=>label.contains(event.target),ignoreMutation:mutation=>mutation.type!=='selection'&&label.contains(mutation.target)};
    }},
  });
  notify(view);
  return {
    view,
    sync(next,locked){
      editable=!locked;view.setProps({editable:()=>editable});
      const doc=pageToDoc(next);
      if(!view.state.doc.eq(doc)){
        // A template or another open view replaced this page. Retire local undo
        // rather than allowing it to overwrite a newer external edit.
        view.updateState(createEditorState(next));
        notify(view);
      }
      view.dom.querySelectorAll('input[type=checkbox]').forEach(input=>{input.disabled=!editable;});
    },
    focusTitle(){view.focus();view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc,1)));},
    selectAll(){view.focus();selectAll(view.state,view.dispatch);},
    undo(){if(editable){undo(view.state,view.dispatch);view.focus();}},
    redo(){if(editable){redo(view.state,view.dispatch);view.focus();}},
    addBlock(){if(!editable)return;const {$to}=view.state.selection;const pos=$to.depth?$to.after(1):view.state.doc.content.size;const tr=view.state.tr.insert(pos,schema.node('paragraph',{id:id()}));view.dispatch(tr.setSelection(TextSelection.create(tr.doc,pos+1)).scrollIntoView());view.focus();},
    setType(type){
      if(!editable)return;
      let {state}=view;
      if(state.selection.$from.parent.type===schema.nodes.pageTitle&&state.selection.$to.parent.type===schema.nodes.pageTitle){view.dispatch(state.tr.setSelection(TextSelection.create(state.doc,state.doc.firstChild.nodeSize+1)));state=view.state;}
      const parent=state.selection.$from.parent;
      if(parent.textContent==='/'){view.dispatch(state.tr.delete(state.selection.$from.start(),state.selection.$from.end()));state=view.state;}
      setBlockType(schema.nodes[names[type]],{id:null,checked:false})(state,view.dispatch);view.focus();
    },
    destroy(){view.destroy();},
  };
}
