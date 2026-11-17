# Notes — release state

## 0.1.0 · 17 November 2026

Initial GitHub-installable release for standard Buzz 1.0.1.

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
