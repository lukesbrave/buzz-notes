# Notes for Buzz

Read README.md and STATE.md, then run git status -sb before changes.
Use a named branch in .worktrees/<task>. Stage only explicit paths.
Run npm test and npm run build. Commit the built dist files alongside source.
Distribution is main / dist. Keep the manifest ID and storage key stable.
Do not imply native Buzz tests from browser harness results.
No user notes, credentials or private machine context belong in this repository.

For Notes content versus plugin design changes, read AGENT-GUIDE.md. Agent tools
use the shared store; keep ownership, cancellation and revision checks intact.
Do not add arbitrary code execution or bypass Buzz plugin update review.
