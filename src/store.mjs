export const KEY = 'bravebrand.simple-notes.v1';
export const TYPES = ['text', 'heading', 'subheading', 'bullet', 'todo', 'quote'];
export const id = () => crypto.randomUUID();
export const block = (type = 'text', text = '') => ({id: id(), type, text, checked: false});
export const page = (title = '') => ({id: id(), title, blocks: [block()], updated: Date.now(), trashed: false});
export const initial = () => ({version: 1, pages: [page()]});
export function validate(value) {
  if (!value || value.version !== 1 || !Array.isArray(value.pages) || value.pages.length > 5000) throw Error('This is not a supported Notes backup.');
  const ids = new Set();
  for (const p of value.pages) {
    if (!p || typeof p.id !== 'string' || ids.has(p.id) || typeof p.title !== 'string' || !Number.isFinite(p.updated) || typeof p.trashed !== 'boolean' || !Array.isArray(p.blocks) || !p.blocks.length || p.blocks.length > 10000) throw Error('A page in this backup is invalid.');
    ids.add(p.id);
    const blocks = new Set();
    for (const b of p.blocks) {
      if (!b || typeof b.id !== 'string' || blocks.has(b.id) || !TYPES.includes(b.type) || typeof b.text !== 'string' || typeof b.checked !== 'boolean') throw Error('A text block in this backup is invalid.');
      blocks.add(b.id);
    }
  }
  return value;
}
export function restorePages(json) {
  if (json.length > 5_000_000) throw Error('This backup is too large (maximum 5 MB).');
  return validate(JSON.parse(json)).pages.map(p => ({...p, id: id(), blocks: p.blocks.map(b => ({...b, id: id()}))}));
}
export function markdown(p) {
  return '# ' + (p.title || 'Untitled page') + '\n\n' + p.blocks.map(b => ({heading:'# ', subheading:'## ', bullet:'- ', todo:b.checked ? '- [x] ' : '- [ ] ', quote:'> ', text:''}[b.type]) + b.text).join('\n\n') + '\n';
}
// One shared store per plugin activation. Synchronous writes survive page unmounts.
// A failed write keeps the draft in memory and explicitly reports it as unsaved.
export function createStore(storage) {
  let raw = null, data, error = '', blocked = false;
  try { raw = storage.getItem(KEY); data = raw === null ? initial() : validate(JSON.parse(raw)); }
  catch { data = {version:1, pages:[]}; blocked = true; error = 'Saved notes could not be opened. They have not been overwritten. Use Backup to recover the original data.'; }
  let snapshot = {data, error, blocked, saved: !!raw && !blocked};
  const listeners = new Set();
  const emit = () => { snapshot = {data, error, blocked, saved: !error && !!raw}; listeners.forEach(f => f()); };
  return {
    get: () => snapshot,
    subscribe: f => { listeners.add(f); return () => listeners.delete(f); },
    original: () => raw,
    change(fn) {
      if (blocked) return;
      data = fn(data);
      try {
        validate(data);
        if (storage.getItem(KEY) !== raw) throw Error('Notes changed in another window. Copy your draft from Backup, then restart Buzz before editing again.');
        const next = JSON.stringify(data);
        storage.setItem(KEY, next);
        raw = next; error = '';
      } catch (e) { error = e.message.startsWith('Notes changed') ? e.message : 'Not saved — storage is unavailable or full. Keep this page open and copy a backup of your draft.'; }
      emit();
    },
  };
}
