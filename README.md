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
- **Drag to select** across the title, paragraphs, headings, bullets and
  checkboxes. **Backspace/Delete** removes the selected writing. Selecting all
  writing also clears the formatting, leaving a blank page.
- **⌘A/Ctrl+A** or **Select all** remains available as an alternative.
- **Copy, cut and paste** work on the selection. **⌘Z/Ctrl+Z** or **Undo** restores
  edits; **⌘Shift+Z/Ctrl+Y** or **Redo** reapplies them. History lasts while that
  page's editor stays open; reopening it or replacing it from another view starts
  a fresh history.
- Use the top-left **Collapse sidebar / Expand sidebar** button to hide or show
  your page list. The choice is remembered in this Buzz app. Search and backup
  fields retain their own selection behavior.
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
reordering blocks by dragging, collaboration, and cross-device syncing.

## Link an idea to its own page

Keep your existing list, with one block or checklist item per idea:

1. Click in the idea's text and choose **Link page** in the writing toolbar.
2. Choose **Create linked page**, or pick an existing page.
3. Use the small **↗ Open linked page** button beside the idea to open it.
4. Use **← Back** above the page to return to the list.

New detail pages start with **Brief**, **Script**, **Related content**, and
**References & links** sections. Edit them like any other page. Links use page
IDs, so renaming a page keeps its links working. The original list text and
checkbox state are preserved. You can link further notes from a detail page too.

Click into a linked block and choose **Change link** to change or remove its
link. Removing a link does not delete either page. Linked pages remain in the
sidebar. If a destination is in Trash, opening the link shows its restore view.
The sidebar **View Trash** control only changes folders; **Back to pages**
returns to your active notes.

JSON backups retain links, and restoring a whole notebook reconnects links to
its restored copies. Markdown copy exports the writing, not interactive page
links. Old notebooks open without conversion. Avoid editing linked notes in an
older plugin version, which does not know how to retain their links.

## Use an agent with Notes

Update and enable Notes, then ask your agent to create or edit a page. For example:

> Find the Notes plugin tools and add three video ideas to my Content ideas page.

The plugin gives agents a short discovery instruction and tools to find, read,
create and edit pages, including headings, bullets and checkboxes. Changes save
in the same notebook and update the open editor. Edits require the latest page
revision, so a stale agent response cannot replace a newer saved human edit.
Removing a page sends it to recoverable Trash.

For appearance or feature changes, ask:

> Use the Notes developer guide to update the plugin's design in its GitHub repository.

This requires an agent with coding/file tools and GitHub access. Notes provides
the source and build/update workflow through `brave_notes_developer_info`; it
cannot give an agent capabilities or credentials it does not already have.
The agent publishes the approved update, then requests the usual Buzz update
review. See [AGENT-GUIDE.md](AGENT-GUIDE.md) for the exact workflow and tool names.

These tools are for your agents running through this Buzz app. A separately
hosted agent does not automatically receive Mac-local plugin tools. If tools
remain missing after updating, start a new conversation with a local agent and
ask it to search for `brave_notes`.

## Where notes are saved

Notes live in localStorage in this Buzz app profile on this Mac, across that
profile's communities. The plugin does **not upload notes to GitHub or Notion**.
Your owned agents running through this app can read/edit notes using the tools;
requested note content then enters that agent's conversation/model context.
Notes are not encrypted by this plugin.
Clearing the app's webview/storage data can remove them. Keep a backup.

If a save fails, the editor keeps your draft in memory and shows **Not saved**.
Copy a backup before closing. Concurrent-window edits cannot silently overwrite
a newer save: back up the unsaved draft and restart Buzz to load saved notes.
Malformed saved data is preserved rather than silently reset.

## Compatibility and verification

Targets standard Buzz **1.0.1**, checked against that version's manifest, page
registration, theme and agent-tool contracts. The browser harness passed editing,
checkboxes, reopen persistence, search, Trash/restore, and additive backup
restore. Thirty-four automated editor/storage/panel/agent tests pass. Real browser mouse-drag
selection across a title, paragraph, bullet, checkbox and quote was deleted with
Backspace and restored with Undo; saved checkbox state and sidebar toggling were
also verified. A browser layout harness also verified
opening/closing Notes alongside an unchanged chat draft and remount persistence.
Simulated calls to the actual registered tools created/edited a page, updated the
open editor and survived reload, without browser errors. Native Buzz installation,
agent discovery/calls and appearance/lifecycle testing are still pending; native
placement is still unverified.

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

The continuous editor uses bundled ProseMirror modules. No editor code is
fetched at runtime. See [THIRD-PARTY-NOTICES.txt](THIRD-PARTY-NOTICES.txt); the
same license notices are included in the installable bundle.
