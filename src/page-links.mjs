import {page,block} from './store.mjs';

// A link refers to a stable page ID, so renaming either page never breaks it.
export function linkBlock(data, sourceId, blockId, targetId) {
  const source=data.pages.find(p=>p.id===sourceId);
  if(!source||source.trashed)throw Error('Open an active page before linking an idea.');
  if(!source.blocks.some(b=>b.id===blockId))throw Error('That idea changed. Select it again.');
  if(targetId!==null){
    if(targetId===sourceId)throw Error('Choose a different page.');
    if(!data.pages.some(p=>p.id===targetId&&!p.trashed))throw Error('Choose a page that is not in Trash.');
  }
  return {...data,pages:data.pages.map(p=>p.id!==sourceId?p:{...p,updated:Date.now(),blocks:p.blocks.map(b=>{
    if(b.id!==blockId)return b;
    const {linkedPageId,...rest}=b;
    return targetId===null?rest:{...rest,linkedPageId:targetId};
  })})};
}
export function createLinkedPage(data,sourceId,blockId,title){
  const source=data.pages.find(p=>p.id===sourceId),idea=source?.blocks.find(b=>b.id===blockId);
  if(!idea||source.trashed)throw Error('That idea changed. Select it again.');
  const created={...page(title.trim()||idea.text.trim().slice(0,160)||'Untitled page'),blocks:[
    block('subheading','Brief'),block('text',idea.text),
    block('subheading','Script'),block(),
    block('subheading','Related content'),block(),
    block('subheading','References & links'),block(),
  ]};
  return {created,data:linkBlock({...data,pages:[...data.pages,created]},sourceId,blockId,created.id)};
}
