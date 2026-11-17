# Notes — release state

## 0.4.0 · 17 November 2026

Published as `v0.4.0` at `07f7620dac3abe91719e4ef638c31b96f09993ec`.
The existing local preview was rebuilt from canonical dist and reloaded at its
original URL, preserving that preview’s notebook storage.

User requested actual cursor-drag selection, not a select-all-only workaround.
The title and all writing now share one ProseMirror contenteditable document.
Native mouse selection, partial cross-block deletion, clipboard operations,
undo/redo and keyboard selection replace the separate textarea controls.
Selecting all writing and deleting removes formatting too. The required title
and one blank paragraph remain after clearing. Existing sidebar controls and
conversation panel registration are unchanged.

Legacy notebook schema, storage key, plugin identity, backup format and host
grants are unchanged. A lossless adapter retains existing titles, text, block
IDs, types, line breaks and checked states. The editor creates stable IDs for
new/pasted blocks. External page replacements reset local undo history to avoid
undo overwriting a newer change from another open view. Dependencies are pinned,
bundled and accompanied by their license notices; no runtime network imports.

Validation: fifteen tests pass, including old-data round trip, mouse-style
full/body/partial ranges, exact undo/redo and title splitting. A real browser
mouse drag from the final quote back through task, bullet, paragraph and title
selected the visible text; one Backspace left a blank unformatted page and Undo
restored it. Checkbox state survived close/reopen, and sidebar collapse/expand
worked. Copy/paste into a new page retained title, bullet, quote and checked
to-do formatting. A regression test also covers empty trailing template/list
blocks, which are removed when all visible writing is selected. Native Buzz
UI verification remains pending.

## 0.3.0 · 17 November 2026

Published as `v0.3.0` at `89b57f60a58d55044301ab284164be2f97d4dd81`.
Public main/dist readback matched both tested install files byte for byte.

Requested flexibility: whole-page select-all/backspace and collapsible page list.
Title/body ⌘A/Ctrl+A and the Select all button now highlight all page writing;
Backspace/Delete clears it while retaining the same page. One clear/replacement
can be undone before subsequent edits or closing. Selection is scoped to the
current page, leaving search, backups and other pages untouched. Native mouse
selection remains within individual text fields; cross-block selection uses the
shortcut/button. Sidebar collapse/expand is available at all widths and stores
its preference separately from notebook data.

Verification: all eight existing storage/panel tests pass. Browser harness
confirmed a six-block page plus title clears in one Backspace; ⌘Z restores its
content and formatting; the Select all button follows the same path; a cleared
second page stays empty after reload while the first page remains intact;
search's select-all/backspace only clears its query; sidebar collapse persists
after reload and expands again. Browser logs had no errors/warnings. This is
browser evidence, not native Buzz verification. ID, storage format and grants
are unchanged. Source and built artifacts are distributed together on main/dist.

## 0.2.0 · 17 November 2026

Published as `v0.2.0` at `2c3d352b43d8ff63626a9d2c9ba1707be41cf99b`.
Public `main/dist` readback matched both local install files byte for byte.

Requested change: move Notes to the conversation's top controls so agent chat
can stay open. The Notes channel-header launcher now opens a retained tab in
the conversation side pane (`channelPlacement: tab`, `keepOpen: true`). The
old full-page address remains available, but no longer has a primary dock entry.
Both surfaces use the same editor/store. Plugin ID, storage key and data format
are unchanged; no migration, network permissions or access to chats was added.

Verified against official Buzz v1.0.1 `src/features/panels/service.ts`, and the
channel launcher pattern used by bundled Todos/Terminal. All eight automated
checks pass. Browser harness verified open/close/reopen, note retention and an
unchanged unsent chat draft; browser logs had no warnings/errors. This harness
is explicitly a layout test, not native Buzz. Native placement/update testing
remains outstanding. Release is distributed from `main` / `dist`.

## 0.1.0 · 17 November 2026

Published GitHub-installable release for standard Buzz 1.0.1.

Release tag `v0.1.0` points to `2bcc579fe70d1d7f1336266efd72239c52ac366e`.
Public default-branch clone verified on 17 November 2026: both `dist` files
match the tested local artifacts byte for byte; Git update checks are enabled.

- Distribution: `lukesbrave/buzz-notes`, default branch `main`, folder `dist`.
- Stable plugin ID: `bravebrand.simple-notes`.
- Storage key: `bravebrand.simple-notes.v1`; data format version 1.
- Manifest enables automatic Git update checks. Updates still require review.
- Six store tests pass; browser editing, persistence, search and recovery passed.
- Native Buzz installation/activation, dock placement, native light/narrow
  appearance and native update/restart persistence remain pending. No native
  compatibility claim is inferred from the browser harness.
- No saved notebook data, credentials, private workspace documents or local
  machine paths are part of this repository.

## Maintainer workflow

Read this file and check `git status -sb` before edits. Use a named branch in
`.worktrees/<task>`; stage paths explicitly. Run tests, rebuild `dist`, commit,
then merge the tested change to `main` and push. Buzz installs committed files
and never builds sources. Record behavior, evidence and outstanding checks here.
Keep source and installable artifacts together. Preserve plugin and storage
identity. Before replacing an existing public release, compare the remote
artifacts and investigate unexpected differences.
