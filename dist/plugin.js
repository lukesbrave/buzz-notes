// src/notes.css
var notes_default = ".bn { --notes-bg:var(--bg-panel,#191919); --notes-side:var(--bg-app,#202020); --notes-text:var(--text-primary,#e7e6e3); --notes-muted:var(--text-secondary,#9c9b98); --notes-line:var(--border-primary,#303030); --notes-hover:var(--bg-chrome-selected,#303030); display:flex; height:100%; min-height:0; width:100%; color:var(--notes-text); background:var(--notes-bg); font:14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; position:relative; overflow:hidden; color-scheme:light dark; }\n.bn * {box-sizing:border-box} .bn button,.bn input,.bn textarea,.bn select {font:inherit;color:inherit} .bn button {border:0; background:transparent;cursor:pointer;border-radius:6px;padding:7px 9px;display:inline-flex;align-items:center;gap:8px;text-align:left} .bn button:hover {background:var(--notes-hover)} .bn button:disabled {opacity:.45;cursor:default} .bn :focus-visible {outline:2px solid var(--notes-muted);outline-offset:2px} .bn svg {width:17px;height:17px;flex-shrink:0;stroke:currentColor;stroke-width:1.6;fill:none;stroke-linecap:round;stroke-linejoin:round} .bn-sidebar {width:232px;flex-shrink:0;background:var(--notes-side);border-right:1px solid var(--notes-line);padding:19px 12px 12px;display:flex;flex-direction:column;gap:12px} .bn-brand {font-size:16px;font-weight:650;padding:0 8px 8px;display:flex;gap:9px;align-items:center} .bn-search {display:flex;align-items:center;gap:8px;border:1px solid var(--notes-line);border-radius:7px;padding:6px 8px;color:var(--notes-muted)} .bn-search input {background:none;border:0;width:100%;min-width:0;outline:none;font-size:13px} .bn-new {width:100%} .bn-label {color:var(--notes-muted);font-size:11px;letter-spacing:.09em;text-transform:uppercase;padding:8px 9px 3px} .bn-pages {flex:1;overflow:auto;min-height:100px} .bn-pages button {width:100%;margin-bottom:2px;color:var(--notes-muted)} .bn-pages button[aria-current=page] {background:var(--notes-hover);color:var(--notes-text)} .bn-ellipsis {overflow:hidden;white-space:nowrap;text-overflow:ellipsis} .bn-empty-list {padding:10px;color:var(--notes-muted);font-size:13px} .bn-side-footer {border-top:1px solid var(--notes-line);padding-top:8px;display:flex;justify-content:space-between} .bn-side-footer button {font-size:12px;color:var(--notes-muted)} .bn-main {flex:1;min-width:0;display:flex;flex-direction:column} .bn-topbar {min-height:57px;display:flex;gap:12px;align-items:center;padding:10px 20px;border-bottom:1px solid transparent} .bn-breadcrumb {display:flex;align-items:center;gap:9px;min-width:0;flex:1;font-size:13px;color:var(--notes-muted)} .bn-saved {font-size:11px;color:var(--notes-muted);white-space:nowrap} .bn-scroll {overflow:auto;flex:1;min-height:0} .bn-document {max-width:820px;margin:0 auto;padding:64px 60px 100px} .bn-page-icon {margin-bottom:22px;color:var(--notes-muted)} .bn-page-icon svg {width:34px;height:34px;stroke-width:1.2} .bn-title {font-size:40px!important;font-weight:700!important;line-height:1.2!important;letter-spacing:-1.1px;width:100%;padding:0!important;margin:0 0 20px!important;resize:none;overflow:hidden;background:transparent;border:0;border-radius:0;display:block} .bn textarea::placeholder {color:var(--notes-muted);opacity:.65} .bn-title:focus {outline:none} .bn-toolbar {display:flex;align-items:center;gap:5px;margin-bottom:25px;color:var(--notes-muted);font-size:12px} .bn-toolbar select {background:var(--notes-bg);border:1px solid var(--notes-line);border-radius:6px;padding:5px 8px;max-width:145px} .bn-toolbar button {font-size:12px;padding:5px 7px} .bn-block {position:relative;display:flex;align-items:flex-start;gap:9px;min-height:32px;margin:3px 0} .bn-block textarea {display:block;width:100%;padding:3px 0;border:0;background:transparent;resize:none;overflow:hidden;line-height:1.65;font-size:16px;border-radius:0} .bn-block textarea:focus {outline:none} .bn-block:focus-within {box-shadow:-2px 0 var(--notes-line)} .bn-block[data-type=heading] textarea {font-size:28px;font-weight:650;line-height:1.3;padding-top:17px} .bn-block[data-type=subheading] textarea {font-size:21px;font-weight:600;line-height:1.4;padding-top:12px} .bn-block[data-type=quote] {border-left:3px solid var(--notes-muted);padding-left:15px;margin:12px 0} .bn-block .bn-check {margin:10px 0 0;accent-color:var(--notes-muted);width:15px;height:15px;flex-shrink:0} .bn-block[data-checked=true] textarea {text-decoration:line-through;color:var(--notes-muted)} .bn-bullet {padding-top:5px;font-size:19px} .bn-add-block {position:absolute;right:100%;top:2px;opacity:0;padding:3px!important;margin-right:7px;color:var(--notes-muted)} .bn-block:hover .bn-add-block,.bn-add-block:focus-visible {opacity:1} .bn-hint {font-size:12px;color:var(--notes-muted);margin-top:32px;opacity:.75} .bn-templates {display:flex;gap:8px;flex-wrap:wrap;margin:4px 0 25px} .bn-templates button {border:1px solid var(--notes-line);border-radius:20px;color:var(--notes-muted);font-size:13px;padding:8px 13px} .bn-menu {position:absolute;right:16px;top:52px;z-index:4;background:var(--notes-side);border:1px solid var(--notes-line);border-radius:9px;padding:6px;box-shadow:0 10px 35px #0003;min-width:170px} .bn-menu button {width:100%;display:flex} .bn-slash {position:relative;right:auto;top:auto;max-width:250px;margin:5px 0 14px} .bn-alert {margin:0 20px 12px;border:1px solid var(--notes-line);padding:10px 14px;border-radius:8px;font-size:13px} .bn-empty {padding:90px 30px;text-align:center;color:var(--notes-muted)} .bn-empty h2 {font-size:24px;color:var(--notes-text)} .bn-modal-shade {position:absolute;inset:0;background:#0007;z-index:10;display:flex;align-items:center;justify-content:center;padding:20px} .bn-modal {width:600px;max-width:100%;max-height:95%;overflow:auto;background:var(--notes-bg);border:1px solid var(--notes-line);padding:25px;border-radius:12px} .bn-modal h2 {margin:0 0 8px;font-size:21px} .bn-modal p {color:var(--notes-muted);font-size:13px} .bn-modal textarea {width:100%;min-height:180px;resize:vertical;background:var(--notes-side);border:1px solid var(--notes-line);border-radius:6px;padding:12px;font:12px/1.5 monospace} .bn-modal-actions {display:flex;gap:8px;justify-content:flex-end;margin-top:12px} .bn-modal button {border:1px solid var(--notes-line)} .bn-sidebar-toggle {display:inline-flex!important} .bn[data-sidebar=false] .bn-sidebar {display:none} .bn-toolbar {flex-wrap:wrap}\n@media(prefers-color-scheme:light){.bn {--notes-bg:var(--bg-panel,#fff);--notes-side:var(--bg-app,#f7f7f5);--notes-text:var(--text-primary,#37352f);--notes-muted:var(--text-secondary,#787774);--notes-line:var(--border-primary,#e9e9e7);--notes-hover:var(--bg-chrome-selected,#eaeae7)}}\n@container notes (max-width:680px){.bn-sidebar {width:190px}.bn-document {padding:40px 30px 80px}.bn-title {font-size:32px!important}.bn-saved {display:none}}\n@container notes (max-width:500px){.bn-sidebar {display:none;position:absolute;inset:54px auto 0 0;z-index:6;width:230px;box-shadow:10px 10px 30px #0003}.bn[data-sidebar=true] .bn-sidebar {display:flex}.bn-topbar {padding:8px 12px}.bn-document {padding:30px 32px 70px}.bn-toolbar {flex-wrap:wrap}}\n\n.bn-document[data-all-selected=true] .bn-title,.bn-document[data-all-selected=true] .bn-block {background:Highlight;color:HighlightText;border-radius:3px} .bn-document[data-all-selected=true] .bn-block textarea {color:HighlightText} .bn-selection-hint {font-size:12px;color:var(--notes-muted);margin:0 0 16px}\n";

// src/store.mjs
var KEY = "bravebrand.simple-notes.v1";
var TYPES = ["text", "heading", "subheading", "bullet", "todo", "quote"];
var id = () => crypto.randomUUID();
var block = (type = "text", text = "") => ({ id: id(), type, text, checked: false });
var page = (title = "") => ({ id: id(), title, blocks: [block()], updated: Date.now(), trashed: false });
var initial = () => ({ version: 1, pages: [page()] });
function validate(value) {
  if (!value || value.version !== 1 || !Array.isArray(value.pages) || value.pages.length > 5e3) throw Error("This is not a supported Notes backup.");
  const ids = /* @__PURE__ */ new Set();
  for (const p of value.pages) {
    if (!p || typeof p.id !== "string" || ids.has(p.id) || typeof p.title !== "string" || !Number.isFinite(p.updated) || typeof p.trashed !== "boolean" || !Array.isArray(p.blocks) || !p.blocks.length || p.blocks.length > 1e4) throw Error("A page in this backup is invalid.");
    ids.add(p.id);
    const blocks = /* @__PURE__ */ new Set();
    for (const b of p.blocks) {
      if (!b || typeof b.id !== "string" || blocks.has(b.id) || !TYPES.includes(b.type) || typeof b.text !== "string" || typeof b.checked !== "boolean") throw Error("A text block in this backup is invalid.");
      blocks.add(b.id);
    }
  }
  return value;
}
function restorePages(json) {
  if (json.length > 5e6) throw Error("This backup is too large (maximum 5 MB).");
  return validate(JSON.parse(json)).pages.map((p) => ({ ...p, id: id(), blocks: p.blocks.map((b) => ({ ...b, id: id() })) }));
}
function markdown(p) {
  return "# " + (p.title || "Untitled page") + "\n\n" + p.blocks.map((b) => ({ heading: "# ", subheading: "## ", bullet: "- ", todo: b.checked ? "- [x] " : "- [ ] ", quote: "> ", text: "" })[b.type] + b.text).join("\n\n") + "\n";
}
function createStore(storage) {
  let raw = null, data, error = "", blocked = false;
  try {
    raw = storage.getItem(KEY);
    data = raw === null ? initial() : validate(JSON.parse(raw));
  } catch {
    data = { version: 1, pages: [] };
    blocked = true;
    error = "Saved notes could not be opened. They have not been overwritten. Use Backup to recover the original data.";
  }
  let snapshot = { data, error, blocked, saved: !!raw && !blocked };
  const listeners = /* @__PURE__ */ new Set();
  const emit = () => {
    snapshot = { data, error, blocked, saved: !error && !!raw };
    listeners.forEach((f) => f());
  };
  return {
    get: () => snapshot,
    subscribe: (f) => {
      listeners.add(f);
      return () => listeners.delete(f);
    },
    original: () => raw,
    change(fn) {
      if (blocked) return;
      data = fn(data);
      try {
        validate(data);
        if (storage.getItem(KEY) !== raw) throw Error("Notes changed in another window. Copy your draft from Backup, then restart Buzz before editing again.");
        const next = JSON.stringify(data);
        storage.setItem(KEY, next);
        raw = next;
        error = "";
      } catch (e) {
        error = e.message.startsWith("Notes changed") ? e.message : "Not saved \u2014 storage is unavailable or full. Keep this page open and copy a backup of your draft.";
      }
      emit();
    }
  };
}

// src/plugin.jsx
var inject = ["react", "pages", "panels"];
function apply(ctx) {
  const React = ctx.react;
  const store = createStore({ getItem: (key) => localStorage.getItem(key), setItem: (key, value) => localStorage.setItem(key, value) });
  const labels = { text: "Text", heading: "Heading", subheading: "Subheading", bullet: "Bulleted list", todo: "To-do", quote: "Quote" };
  function Icon({ name = "page" }) {
    const paths = { page: "M6 3h9l3 3v15H6z M9 8h6 M9 12h6 M9 16h4", plus: "M12 5v14 M5 12h14", search: "M21 21l-5-5 M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0", trash: "M4 6h16 M9 6V3h6v3 M6 6l1 15h10l1-15 M10 10v7 M14 10v7", menu: "M4 6h16 M4 12h16 M4 18h16", check: "M5 12l4 4L19 6", ideas: "M9 18h6 M10 21h4 M8 14c-5-5-2-11 4-11s9 6 4 11l-1 2H9z", more: "M5 12h.01 M12 12h.01 M19 12h.01", backup: "M12 16V3 M7 8l5-5 5 5 M4 15v6h16v-6" };
    return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("path", { d: paths[name] || paths.page }));
  }
  function Area({ value, ...props }) {
    const ref = React.useRef(null);
    React.useLayoutEffect(() => {
      const el = ref.current;
      const resize = () => {
        el.style.height = "0px";
        el.style.height = el.scrollHeight + "px";
      };
      resize();
      const observer = new ResizeObserver(resize);
      observer.observe(el);
      return () => observer.disconnect();
    }, [value]);
    return /* @__PURE__ */ React.createElement("textarea", { ...props, ref, value, rows: 1 });
  }
  function Notes() {
    const snap = React.useSyncExternalStore(store.subscribe, store.get, store.get);
    const [selected, setSelected] = React.useState(() => snap.data.pages.find((p) => !p.trashed)?.id);
    const [query, setQuery] = React.useState("");
    const [trash, setTrash] = React.useState(false);
    const [active, setActive] = React.useState(null);
    const [menu, setMenu] = React.useState(false);
    const [sidebar, setSidebar] = React.useState(() => {
      try {
        const value = localStorage.getItem("bravebrand.simple-notes.sidebar");
        return value === null ? null : value === "open";
      } catch {
        return null;
      }
    });
    const [narrow, setNarrow] = React.useState(false);
    const sidebarVisible = sidebar ?? !narrow;
    const [fullSelection, setFullSelection] = React.useState(null);
    const [clearUndo, setClearUndo] = React.useState(null);
    const [modal, setModal] = React.useState(null);
    const [importText, setImportText] = React.useState("");
    const [importError, setImportError] = React.useState("");
    const [slash, setSlash] = React.useState(null);
    const root = React.useRef(null), pendingFocus = React.useRef(null), dialog = React.useRef(null), returnFocus = React.useRef(null);
    const pages = snap.data.pages.filter((p) => p.trashed === trash);
    const current = pages.find((p) => p.id === selected) || pages[0];
    const allSelected = !!current && fullSelection === current.id && !trash;
    const canUndoClear = !!current && clearUndo?.after === current && !trash;
    React.useLayoutEffect(() => {
      const measure = () => setNarrow(root.current.clientWidth <= 500);
      measure();
      const observer = new ResizeObserver(measure);
      observer.observe(root.current);
      return () => observer.disconnect();
    }, []);
    React.useEffect(() => {
      setFullSelection(null);
      setClearUndo(null);
    }, [current?.id, trash, modal]);
    function toggleSidebar() {
      const next = !sidebarVisible;
      setSidebar(next);
      try {
        localStorage.setItem("bravebrand.simple-notes.sidebar", next ? "open" : "closed");
      } catch {
      }
    }
    const currentBlock = current?.blocks.find((b) => b.id === active) || current?.blocks[0];
    const [, refreshFocus] = React.useReducer((n) => n + 1, 0);
    const focus = (target2, position = 0) => {
      pendingFocus.current = { target: target2, position };
      refreshFocus();
    };
    React.useLayoutEffect(() => {
      if (!pendingFocus.current) return;
      const { target: target2, position } = pendingFocus.current;
      pendingFocus.current = null;
      const el = Array.from(root.current.querySelectorAll("textarea")).find((e) => e.dataset.block === target2 || target2 === "title" && e.classList.contains("bn-title"));
      if (el) {
        el.focus();
        el.setSelectionRange(position, position);
      }
    });
    React.useEffect(() => {
      if (!modal) return;
      returnFocus.current = document.activeElement;
      dialog.current?.querySelector("textarea,button")?.focus();
      return () => returnFocus.current?.focus();
    }, [modal]);
    const edit = (fn) => {
      setClearUndo(null);
      if (current && !trash) store.change((d) => ({ ...d, pages: d.pages.map((p) => p.id === current.id ? { ...fn(p), updated: Date.now() } : p) }));
    };
    const editBlock = (bid, patch) => edit((p) => ({ ...p, blocks: p.blocks.map((b) => b.id === bid ? { ...b, ...patch } : b) }));
    function addPage() {
      const p = page();
      store.change((d) => ({ ...d, pages: [...d.pages, p] }));
      setTrash(false);
      setQuery("");
      setSelected(p.id);
      if (narrow) setSidebar(false);
      setActive(p.blocks[0].id);
      focus("title");
    }
    function choose(p) {
      setSelected(p.id);
      setMenu(false);
      setSlash(null);
      if (narrow) setSidebar(false);
      setActive(p.blocks[0].id);
    }
    function changeType(type, bid = currentBlock?.id) {
      if (!bid) return;
      edit((p) => ({ ...p, blocks: p.blocks.map((b) => b.id === bid ? { ...b, type, text: b.text === "/" ? "" : b.text } : b) }));
      setSlash(null);
      focus(bid);
    }
    function insertAfter(bid) {
      const b = block();
      edit((p) => {
        const blocks = [...p.blocks];
        blocks.splice(blocks.findIndex((x) => x.id === bid) + 1, 0, b);
        return { ...p, blocks };
      });
      setActive(b.id);
      focus(b.id);
    }
    function selectWriting() {
      if (!current || trash) return;
      setFullSelection(current.id);
      setSlash(null);
      setMenu(false);
      focus("title");
    }
    function replaceWriting(text = "") {
      if (!current || trash) return;
      const before = current;
      const blocks = text.replace(/\r\n?/g, "\n").split("\n").map((line) => block("text", line));
      edit((p) => ({ ...p, title: "", blocks }));
      setClearUndo({ before, after: store.get().data.pages.find((p) => p.id === before.id) });
      setFullSelection(null);
      setSlash(null);
      setActive(blocks[0].id);
      focus(blocks[0].id, blocks[0].text.length);
    }
    function undoClear() {
      if (!canUndoClear) return;
      const before = clearUndo.before;
      edit(() => before);
      setFullSelection(null);
      focus("title");
    }
    function writingKey(e) {
      if (trash || e.nativeEvent.isComposing) return;
      const inText = e.target.matches("textarea.bn-title, textarea[data-block]");
      if (!inText) return;
      const mod = e.metaKey || e.ctrlKey;
      if (mod && !e.altKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        e.stopPropagation();
        selectWriting();
        return;
      }
      if (mod && !e.shiftKey && e.key.toLowerCase() === "z" && canUndoClear) {
        e.preventDefault();
        e.stopPropagation();
        undoClear();
        return;
      }
      if (!allSelected) return;
      if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
        e.stopPropagation();
        replaceWriting();
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        setFullSelection(null);
        return;
      }
      if (!mod && !e.altKey && (e.key.length === 1 || e.key === "Enter")) {
        e.preventDefault();
        e.stopPropagation();
        replaceWriting(e.key === "Enter" ? "" : e.key);
        return;
      }
      if (!mod) {
        setFullSelection(null);
      }
    }
    function copyWriting(e, cut = false) {
      if (!allSelected) return;
      e.preventDefault();
      e.clipboardData.setData("text/plain", markdown(current));
      if (cut) replaceWriting();
    }
    function keydown(e, b, index) {
      if (e.nativeEvent.isComposing) return;
      if (e.key === "Escape") {
        setSlash(null);
        return;
      }
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        setSlash(null);
        if (!b.text && b.type !== "text") {
          changeType("text", b.id);
          return;
        }
        const start = e.currentTarget.selectionStart, end = e.currentTarget.selectionEnd;
        const next = block(["todo", "bullet"].includes(b.type) ? b.type : "text", b.text.slice(end));
        edit((p) => {
          const blocks = [...p.blocks];
          blocks.splice(index, 1, { ...b, text: b.text.slice(0, start) }, next);
          return { ...p, blocks };
        });
        setActive(next.id);
        focus(next.id);
        return;
      }
      if (e.key === "Backspace" && e.currentTarget.selectionStart === 0 && e.currentTarget.selectionEnd === 0) {
        if (b.type !== "text") {
          e.preventDefault();
          changeType("text", b.id);
          return;
        }
        if (index > 0) {
          e.preventDefault();
          const prev = current.blocks[index - 1];
          edit((p) => ({ ...p, blocks: p.blocks.flatMap((x) => x.id === prev.id ? [{ ...x, text: x.text + b.text }] : x.id === b.id ? [] : [x]) }));
          setActive(prev.id);
          focus(prev.id, prev.text.length);
        }
      }
      if (e.key === "ArrowUp" && e.currentTarget.selectionStart === 0 && index > 0) {
        e.preventDefault();
        const prev = current.blocks[index - 1];
        setActive(prev.id);
        focus(prev.id, prev.text.length);
        setSlash(null);
      }
      if (e.key === "ArrowDown" && e.currentTarget.selectionStart === b.text.length && index < current.blocks.length - 1) {
        e.preventDefault();
        const next = current.blocks[index + 1];
        setActive(next.id);
        focus(next.id);
        setSlash(null);
      }
    }
    const backupText = modal === "export" ? JSON.stringify(snap.data, null, 2) : modal === "original" ? store.original() || "No saved data could be read." : modal === "markdown" && current ? markdown(current) : "";
    function showBackup() {
      setMenu(false);
      setModal(snap.blocked ? "original" : "export");
    }
    const filtered = pages.filter((p) => (p.title + " " + p.blocks.map((b) => b.text).join(" ")).toLowerCase().includes(query.toLowerCase()));
    const blank = current && !current.title && current.blocks.length === 1 && !current.blocks[0].text;
    function template(type) {
      const blocks = type === "idea" ? [block("subheading", "The idea"), block(), block("subheading", "Why it matters"), block(), block("subheading", "Notes & links"), block()] : [block("todo"), block("todo"), block("todo")];
      edit((p) => ({ ...p, title: type === "idea" ? "Content idea" : "To-do list", blocks }));
      setActive(blocks[type === "idea" ? 1 : 0].id);
      focus(blocks[type === "idea" ? 1 : 0].id);
    }
    return /* @__PURE__ */ React.createElement("div", { style: { containerType: "inline-size", containerName: "notes", height: "100%", minHeight: 0 } }, /* @__PURE__ */ React.createElement("section", { className: "bn", ref: root, "data-sidebar": sidebarVisible, "aria-label": "Notes", onPointerDownCapture: () => setFullSelection(null), onKeyDown: (e) => {
      if (e.key === "Escape") {
        if (modal) setModal(null);
        else {
          setMenu(false);
          setSlash(null);
          if (narrow) setSidebar(false);
        }
      }
    } }, /* @__PURE__ */ React.createElement("style", null, notes_default), /* @__PURE__ */ React.createElement("aside", { className: "bn-sidebar", "aria-label": "Your pages" }, /* @__PURE__ */ React.createElement("div", { className: "bn-brand" }, /* @__PURE__ */ React.createElement(Icon, null), "Notes"), /* @__PURE__ */ React.createElement("label", { className: "bn-search" }, /* @__PURE__ */ React.createElement(Icon, { name: "search" }), /* @__PURE__ */ React.createElement("input", { placeholder: "Search notes", "aria-label": "Search notes", value: query, onChange: (e) => setQuery(e.target.value) })), /* @__PURE__ */ React.createElement("button", { className: "bn-new", onClick: addPage, disabled: snap.blocked }, /* @__PURE__ */ React.createElement(Icon, { name: "plus" }), "New page"), /* @__PURE__ */ React.createElement("div", { className: "bn-label" }, trash ? "Trash" : "Your pages", " ", /* @__PURE__ */ React.createElement("span", { style: { float: "right" } }, pages.length)), /* @__PURE__ */ React.createElement("nav", { className: "bn-pages", "aria-label": "Pages" }, filtered.map((p) => /* @__PURE__ */ React.createElement("button", { key: p.id, "aria-current": current?.id === p.id ? "page" : void 0, onClick: () => choose(p) }, /* @__PURE__ */ React.createElement(Icon, null), /* @__PURE__ */ React.createElement("span", { className: "bn-ellipsis" }, p.title || "Untitled page"))), !filtered.length && /* @__PURE__ */ React.createElement("div", { className: "bn-empty-list" }, query ? "No matching notes." : trash ? "Nothing in the trash." : "Your next idea starts here.")), /* @__PURE__ */ React.createElement("div", { className: "bn-side-footer" }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
      setTrash(!trash);
      setQuery("");
      setMenu(false);
      setSlash(null);
    } }, /* @__PURE__ */ React.createElement(Icon, { name: trash ? "page" : "trash" }), trash ? "All pages" : "Trash"), /* @__PURE__ */ React.createElement("button", { onClick: showBackup }, /* @__PURE__ */ React.createElement(Icon, { name: "backup" }), "Backup"))), /* @__PURE__ */ React.createElement("main", { className: "bn-main" }, /* @__PURE__ */ React.createElement("header", { className: "bn-topbar" }, /* @__PURE__ */ React.createElement("button", { className: "bn-sidebar-toggle", "aria-label": sidebarVisible ? "Collapse sidebar" : "Expand sidebar", title: sidebarVisible ? "Collapse sidebar" : "Expand sidebar", "aria-expanded": sidebarVisible, onClick: toggleSidebar }, /* @__PURE__ */ React.createElement(Icon, { name: "menu" })), /* @__PURE__ */ React.createElement("div", { className: "bn-breadcrumb" }, /* @__PURE__ */ React.createElement(Icon, null), /* @__PURE__ */ React.createElement("span", { className: "bn-ellipsis" }, current?.title || (current ? "Untitled page" : "Notes"))), /* @__PURE__ */ React.createElement("span", { className: "bn-saved", role: "status" }, snap.error ? "Not saved" : snap.saved ? "Saved on this Mac" : "On this Mac"), current && /* @__PURE__ */ React.createElement("button", { "aria-label": "Page options", "aria-expanded": menu, onClick: () => setMenu(!menu) }, /* @__PURE__ */ React.createElement(Icon, { name: "more" }))), snap.error && /* @__PURE__ */ React.createElement("div", { role: "alert", className: "bn-alert" }, snap.error, " ", /* @__PURE__ */ React.createElement("button", { onClick: showBackup }, "Backup")), trash && current && /* @__PURE__ */ React.createElement("div", { className: "bn-alert" }, "This page is in Trash. ", /* @__PURE__ */ React.createElement("button", { onClick: () => {
      store.change((d) => ({ ...d, pages: d.pages.map((p) => p.id === current.id ? { ...p, trashed: false } : p) }));
      setTrash(false);
      setSelected(current.id);
    } }, "Restore page")), menu && current && /* @__PURE__ */ React.createElement("div", { className: "bn-menu" }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
      setModal("markdown");
      setMenu(false);
    } }, "Copy as Markdown"), !trash && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", { onClick: () => {
      const p = { ...current, id: id(), title: (current.title || "Untitled page") + " (copy)", blocks: current.blocks.map((b) => ({ ...b, id: id() })), updated: Date.now() };
      store.change((d) => ({ ...d, pages: [...d.pages, p] }));
      choose(p);
    } }, "Duplicate page"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
      store.change((d) => ({ ...d, pages: d.pages.map((p) => p.id === current.id ? { ...p, trashed: true } : p) }));
      setMenu(false);
      setSelected(null);
    } }, "Move to Trash")), /* @__PURE__ */ React.createElement("button", { onClick: () => setMenu(false) }, "Close menu")), /* @__PURE__ */ React.createElement("div", { className: "bn-scroll" }, current ? /* @__PURE__ */ React.createElement("article", { className: "bn-document", key: current.id, "data-all-selected": allSelected, onKeyDownCapture: writingKey, onCopy: (e) => copyWriting(e), onCut: (e) => copyWriting(e, true), onPaste: (e) => {
      if (allSelected) {
        e.preventDefault();
        replaceWriting(e.clipboardData.getData("text/plain"));
      }
    }, onCompositionStart: () => setFullSelection(null) }, /* @__PURE__ */ React.createElement("div", { className: "bn-page-icon" }, /* @__PURE__ */ React.createElement(Icon, null)), /* @__PURE__ */ React.createElement(Area, { className: "bn-title", "aria-label": "Page title", placeholder: "Untitled page", value: current.title, readOnly: trash, onChange: (e) => edit((p) => ({ ...p, title: e.target.value.replace(/\n/g, " ") })), onKeyDown: (e) => {
      if (e.key === "Enter" && !e.nativeEvent.isComposing) {
        e.preventDefault();
        setActive(current.blocks[0].id);
        focus(current.blocks[0].id);
      }
    } }), !trash && /* @__PURE__ */ React.createElement("div", { className: "bn-toolbar" }, /* @__PURE__ */ React.createElement("select", { "aria-label": "Block type", value: currentBlock?.type || "text", onChange: (e) => changeType(e.target.value) }, TYPES.map((t) => /* @__PURE__ */ React.createElement("option", { key: t, value: t }, labels[t]))), /* @__PURE__ */ React.createElement("button", { onClick: () => insertAfter(currentBlock?.id) }, /* @__PURE__ */ React.createElement(Icon, { name: "plus" }), "Add block"), /* @__PURE__ */ React.createElement("button", { onClick: selectWriting, title: "Select all writing (\u2318A / Ctrl+A)" }, "Select all"), canUndoClear && /* @__PURE__ */ React.createElement("button", { onClick: undoClear }, "Undo clear")), allSelected && /* @__PURE__ */ React.createElement("div", { className: "bn-selection-hint", role: "status" }, "All page text selected \xB7 Backspace to clear \xB7 Esc to cancel"), blank && !trash && /* @__PURE__ */ React.createElement("div", { className: "bn-templates" }, /* @__PURE__ */ React.createElement("button", { onClick: () => template("idea") }, /* @__PURE__ */ React.createElement(Icon, { name: "ideas" }), "Content idea"), /* @__PURE__ */ React.createElement("button", { onClick: () => template("todo") }, /* @__PURE__ */ React.createElement(Icon, { name: "check" }), "To-do list")), current.blocks.map((b, index) => /* @__PURE__ */ React.createElement(React.Fragment, { key: b.id }, /* @__PURE__ */ React.createElement("div", { className: "bn-block", "data-type": b.type, "data-checked": b.type === "todo" && b.checked }, !trash && /* @__PURE__ */ React.createElement("button", { className: "bn-add-block", "aria-label": `Insert block after block ${index + 1}`, onClick: () => insertAfter(b.id) }, /* @__PURE__ */ React.createElement(Icon, { name: "plus" })), b.type === "todo" && /* @__PURE__ */ React.createElement("input", { className: "bn-check", type: "checkbox", "aria-label": `Complete to-do ${index + 1}`, checked: b.checked, disabled: trash, onChange: (e) => editBlock(b.id, { checked: e.target.checked }) }), b.type === "bullet" && /* @__PURE__ */ React.createElement("span", { className: "bn-bullet", "aria-hidden": "true" }, "\u2022"), /* @__PURE__ */ React.createElement(Area, { "data-block": b.id, "aria-label": `${labels[b.type]} block ${index + 1}`, placeholder: index === 0 ? "Write something, or type / for a block\u2026" : b.type === "todo" ? "To-do" : b.type === "heading" ? "Heading" : b.type === "subheading" ? "Subheading" : "Write something\u2026", value: b.text, readOnly: trash, onFocus: () => setActive(b.id), onKeyDown: (e) => !trash && keydown(e, b, index), onChange: (e) => {
      const text = e.target.value;
      const shortcut = { "# ": "heading", "## ": "subheading", "- ": "bullet", "[] ": "todo", "[ ] ": "todo", "> ": "quote" }[text];
      editBlock(b.id, shortcut ? { type: shortcut, text: "" } : { text });
      setSlash(text === "/" ? b.id : null);
    } })), slash === b.id && !trash && /* @__PURE__ */ React.createElement("div", { className: "bn-menu bn-slash", "aria-label": "Choose block type" }, TYPES.map((t) => /* @__PURE__ */ React.createElement("button", { key: t, onClick: () => changeType(t, b.id) }, labels[t]))))), /* @__PURE__ */ React.createElement("div", { className: "bn-hint" }, current.blocks.map((b) => b.text).join(" ").trim().split(/\s+/).filter(Boolean).length, " words \xB7 ", trash ? "Restore this page to edit it." : "Enter for a new block \xB7 Shift + Enter for a new line")) : /* @__PURE__ */ React.createElement("div", { className: "bn-empty" }, /* @__PURE__ */ React.createElement(Icon, null), /* @__PURE__ */ React.createElement("h2", null, trash ? "Nothing in the trash" : "A little space for your thoughts"), /* @__PURE__ */ React.createElement("p", null, trash ? "Removed pages will stay here until you restore them." : "Capture an idea. Keep a note. Make it yours."), !trash && !snap.blocked && /* @__PURE__ */ React.createElement("button", { onClick: addPage }, /* @__PURE__ */ React.createElement(Icon, { name: "plus" }), "Create a page")))), modal && /* @__PURE__ */ React.createElement("div", { className: "bn-modal-shade" }, /* @__PURE__ */ React.createElement("div", { className: "bn-modal", role: "dialog", "aria-modal": "true", "aria-labelledby": "bn-dialog-title", ref: dialog, onKeyDown: (e) => {
      if (e.key !== "Tab") return;
      const els = [...dialog.current.querySelectorAll("button:not(:disabled),textarea")];
      const first = els[0], last = els.at(-1);
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    } }, /* @__PURE__ */ React.createElement("h2", { id: "bn-dialog-title" }, modal === "import" ? "Restore a backup" : modal === "markdown" ? "Copy this page" : modal === "original" ? "Recover saved data" : "Back up your notes"), /* @__PURE__ */ React.createElement("p", null, modal === "import" ? "Paste a Notes backup below. Its pages will be added as new copies; existing notes stay unchanged." : modal === "markdown" ? "Copy the text below to use this page anywhere that supports Markdown." : "Notes are stored in this Buzz app on this Mac. Copy the text below into a file somewhere safe. It includes pages in Trash. Clearing app data can remove your notes."), /* @__PURE__ */ React.createElement("textarea", { "aria-label": modal === "import" ? "Backup to restore" : "Backup content", value: modal === "import" ? importText : backupText, readOnly: modal !== "import", onChange: (e) => setImportText(e.target.value), onFocus: (e) => modal !== "import" && e.target.select() }), importError && /* @__PURE__ */ React.createElement("p", { role: "alert" }, importError), /* @__PURE__ */ React.createElement("div", { className: "bn-modal-actions" }, modal === "export" && /* @__PURE__ */ React.createElement("button", { onClick: () => {
      setImportError("");
      setModal("import");
    } }, "Restore backup"), modal === "import" ? /* @__PURE__ */ React.createElement("button", { onClick: () => {
      try {
        const incoming = restorePages(importText);
        store.change((d) => ({ ...d, pages: [...d.pages, ...incoming] }));
        setModal(null);
        setImportText("");
        setTrash(false);
        setSelected(incoming.find((p) => !p.trashed)?.id);
      } catch (e) {
        setImportError(e.message);
      }
    }, disabled: !importText.trim() }, "Add restored pages") : /* @__PURE__ */ React.createElement("button", { onClick: () => {
      const area = dialog.current.querySelector("textarea");
      area.focus();
      area.select();
    } }, "Select all to copy"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
      setModal(null);
      setImportError("");
    } }, "Done"))))));
  }
  ctx.pages.register({ id: "main", title: "Notes", layout: "workspace", component: Notes });
  const target = "bravebrand-notes:personal";
  function Launcher({ toggle, pressed, available }) {
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        className: "ui-button",
        "data-size": "sm",
        "data-variant": "ghost",
        "data-channel-panel-toggle": "",
        "aria-label": "Toggle Notes",
        title: "Notes",
        "aria-expanded": pressed,
        style: { display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 8px", borderRadius: 6, color: "var(--text-secondary)", background: pressed ? "var(--bg-chrome-selected)" : "transparent", border: 0, cursor: "pointer" },
        onClick: (event) => {
          event.currentTarget.focus();
          if (available()) toggle(target);
        }
      },
      /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("path", { d: "M6 3h9l3 3v15H6z M9 8h6 M9 12h6 M9 16h4" })),
      /* @__PURE__ */ React.createElement("span", null, "Notes")
    );
  }
  ctx.panels.register({
    id: "notebook",
    title: "Notes",
    matches: (value) => value === target,
    channelLauncher: Launcher,
    channelPlacement: "tab",
    keepOpen: true,
    component: Notes
  });
}
export {
  apply,
  inject
};
