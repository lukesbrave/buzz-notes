# Notes for Buzz

A simple, Notion-style notebook for content ideas and everyday notes, directly
inside standard [Buzz](https://buzz.xyz).

Pages, search, headings, bullets, checkboxes, quotes, and a clean writing area.
Notes save automatically in your Buzz app on this Mac. No Notion account,
network access, AI subscription, or external service is required.

## Install from GitHub

1. In desktop Buzz, open **Settings → Plugins → Manage plugins → Add**.
2. Choose the Git/repository option and enter:
   **https://github.com/lukesbrave/buzz-notes**
3. Leave the branch field blank (the default is **main**).
4. Select **dist — Notes**, review the plugin, and install it with Notes enabled.
5. Open an agent conversation and click **Notes** in its top toolbar.
   Notes opens as a tab beside the conversation, so you can keep chatting.
   The previous app-dock shortcut is removed; the original page address still
   works through search/bookmarks.

Buzz installs the ready-built files in `dist`; you do not need Node or npm.

## Updates

Open Notes in **Settings → Plugins → Manage plugins**, choose **Check for
updates**, then **Update** when available and review the change. Automatic
update checks are enabled by default; checks notify you, they do not silently
install new code. Buzz remembers the GitHub source, branch, and plugin folder.

The plugin ID and storage key remain stable, so updates continue using the same
saved notebook. Use **Backup** before an update to keep a separate copy.

If you previously installed Notes from a local folder, back up your notes first.
Buzz requires removing that plugin installation and adding the GitHub source to
change its update source. Keep the backup until the GitHub installation opens
with your notes, or restore the backup if needed.

## Writing

- **New page** creates a blank note; its title names the sidebar entry.
- **⌘A** (Mac) or **Ctrl+A** (Windows/Linux), while writing in the title or a
  block, highlights all writing on the current page. **Backspace/Delete** clears
  the title and all blocks together, leaving the page itself in place. The
  **Select all** button does the same selection; **Esc** cancels it.
- **Undo clear** or **⌘Z/Ctrl+Z** restores that clear before further editing or
  closing the editor. This is a single clear/replacement undo, not full history.
- Use the top-left **Collapse sidebar / Expand sidebar** button to hide or show
  your page list. The choice is remembered in this Buzz app. Search and backup
  fields keep their normal, field-only select-all behavior.
- **Enter** creates a block; **Shift+Enter** adds a line inside a block.
- Type **/** in an empty block or use the type menu for text, headings, bullets,
  checkboxes, and quotes.
- `# `, `## `, `- `, `[] `, `[ ] `, and `> ` at the start also format a block.
- **Search** finds page titles and text.
- Page options offers Markdown copy, duplication, and **Move to Trash**.
- **Trash → Restore page** brings a removed page back.
- **Backup** lets you copy all notes as JSON into a safe file. Restore adds new
  copies without replacing existing pages. Markdown copy exports one page as text.

This first version intentionally omits inline bold/italic, images, tables,
block dragging, general document-wide undo, collaboration, and cross-device syncing.

## Where notes are saved

Notes live in localStorage in this Buzz app profile on this Mac, across that
profile's communities. They are **not uploaded to GitHub or Notion**, and are
not exposed through agent tools. They are not encrypted by this plugin.
Clearing the app's webview/storage data can remove them. Keep a backup.

If a save fails, the editor keeps your draft in memory and shows **Not saved**.
Copy a backup before closing. Concurrent-window edits cannot silently overwrite
a newer save: back up the unsaved draft and restart Buzz to load saved notes.
Malformed saved data is preserved rather than silently reset.

## Compatibility and verification

Targets standard Buzz **1.0.1**, checked against that version's manifest, page
registration, and theme contracts. The browser harness passed editing,
checkboxes, reopen persistence, search, Trash/restore, and additive backup
restore. Eight automated storage/panel tests pass. A browser layout harness also verified
opening/closing Notes alongside an unchanged chat draft and remount persistence. Native Buzz installation and native
appearance/lifecycle testing are still pending; native placement is still unverified.

## Development

Requires Node 22+ and npm. Buzz supplies React at runtime; the install package
has no external runtime imports.

```sh
npm ci
npm run build
npm test
```

For the browser harness, run `node build.mjs --preview` and serve `tests/` over
localhost. This renders the actual bundled plugin, but is not native Buzz QA.

Before publishing an update, test, rebuild and commit **both** files in `dist`
to `main`. Never change `bravebrand.simple-notes` (manifest ID) or
`bravebrand.simple-notes.v1` (storage key) without a migration.

See [STATE.md](STATE.md) for release and verification status.
