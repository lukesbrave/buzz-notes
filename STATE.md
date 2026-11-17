# Notes — release state

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
