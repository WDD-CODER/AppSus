Things we should do general. lead together:
- Find all the needed Exact elements like. :
-fonts : whats the main font size? when bold whats the size? is there difference between some places in the appfonts?
-icons: get all the icons needed across the howl app!
-colors: (font colors, background, imgesm,,)



✅ 1. Header Component — Checklist (17)
🔍 Search Bar Functionality (10)
Build responsive search bar (flexible width ≤ 800 px; collapses to icon beyond that).

Expand bar when icon clicked; collapse when “X” collapse-icon clicked.

Provide placeholder text “search”, background styling, and second “X” icon to clear input (all viewports).

Position with absolute/fixed as needed.

On focus: activate Note List component.

On input: display live-filtered notes, matching create-note-container styling.

Support filtering by note types.

(Bonus) Add RegEx-driven sorting of results.

(Bonus) Provide four “sorting-things” icons (cutlery, headphones, tag, airplane).

Auto-hide keyboard focus outline where appropriate for accessibility.

☰ Header UI Interactions (3)
Hamburger icon toggles sidebar.

“Keep” logo text updates to current section on sidebar/icon change.

User-circle icon opens modal with username + brief info.

🧩 Required Icons (4)
Refresh icon.

Circle icon with user initials.

Alternative Keep logo.

Toggle-view icons (Flex & Grid).



✅ 2. Sidebar Component — Checklist (7)
Show icons only by default; pseudo-element text labels appear on hover or hamburger toggle.

Sidebar widens when labels visible; pressed icon adopts “active” bold color.

Pressed icon updates header logo text.

Display open-source link only when sidebar is wide.

Icon click filters notes in Note Index component by category.

Trigger same filter in Note List component.

Provide keyboard accessibility for icon navigation & activation.



✅ 3. Create New Note Component — Checklist (22)
📝 Structure & Behavior (6)
Collapsed “quick-add” bar styled like Search Bar.

Icons select note type (text, image, video, todos…).

Clicking icon instantly opens expanded note editor of chosen type.

For text notes: provide title + body placeholders.

Control-bar with action icons (listed below).

Push-pin icon at top-right to pin note.

🎨 Styling (3)
Match Search-Bar look: border-radius, box-shadow.

Responsive width & height; auto-grows with content.

Draft editor closes via bottom-right “Close” button.

🛠️ Core Note Functionality (9)
Font formatting (bold / italic / underline).

Background-color picker.

Image insertion by URL. (Bonus) File-upload image support.

Auto-save every few seconds (draft/history).

Archive note button.

Undo/Redo (history). (Bonus)

Reminders (date-picker). (Bonus)

Collaborator add/remove. (Bonus)

“More” icon opens Note Toolbar menu (reuse).

🧩 Required Icons (4 groups = 4 tasks)
Formatting (Letter A underline).

Color palette.

Reminder (bell + plus), Collaborator (person + plus), Image, Archive, Three-dots, Undo, Redo.

Push-pin icon.



✅ 4. Label Picker Component — Checklist (8)
Dynamic, reusable component using spread props ({...props}).

Accepts parent context & current labels.

Opens modal with label list; allows single or multiple selection.

Returns selected label set to parent.

Renders selected labels visually in parent (tag chips).

Respects pre-selected labels (edit flows).

Keyboard-navigable list & close on Esc.

Integrates with create-note-container & Edit-Label Modal.




✅ 5. Edit Label Modal Component — Checklist (12)
Structure & Logic (6)
Opens from “Add label” icon.

Grid layout: 3 rows × 2 cols with bottom separator line.

List existing labels with pencil-edit icon.

Pencil click transforms row into editable input.

“V” (Done) button bottom-right saves edits/new label.

Create-new-label inline input.

Styling & Hover States (6 consolidated)
Label row hover: icon morphs to trash-can; grey → bold with background; toolbar “Delete label”.

Pencil hover: toolbar “Edit label”; bold + background.

Cancel button hover: toolbar “Cancel”; bold + background.

Create-label button hover: toolbar “Create label”; bold + background.

All icons/buttons (except Done) share the same hover bold + background style.

Done button remains bold with grey rectangle; no hover change.




✅ 6. Note Preview Component — Checklist (10)
Variable-height card (≈ 40 px min-width) with border & light-color header.

Body text inline; labels row at bottom.

Hover: select-circle with ✔ mark appears.

Hover: border thickens via box-shadow.

Hover: pin icon top-right.

Hover: Note Toolbar appears at bottom.

Supports checklist-type notes with inline checkboxes.

Matches overall theme.

Accessible focus ring for keyboard navigation.

Emits click/select events to Note List.




✅ 7. Note Toolbar Component — Checklist (7)
Lives inside Note Preview & expanded Note modal.

Three-dots icon toggles dropdown menu.

Dropdown options:
  • Delete note  • Add label (opens Label Picker)  • Make copy
  • Add drawing  • Show checkboxes  • Copy to Google Docs  • Version history

Each option triggers respective action.

Dropdown keyboard-navigable.

Auto-closes on outside click / Esc.

Shares icon + hover style guidelines from design system.




✅ 8. Note List Component — Checklist (12)
📋 List Behavior (8)
Render Note Previews in responsive grid.

Use grid-auto-flow: dense to fill gaps.

Toggle between Grid and single-column Flex List view.

Selecting note highlights border; pin icon shown.

Multi-select enabled (shift/ctrl + click).

Pinned notes section at top with header; visually separated.

No borders around pinned/regular containers.

Scroll performance optimized (virtualization if needed).

📝 Modal Editor Behavior (4)
Click Note Preview → open centered modal slightly above vertical center.

Modal: fixed square size until viewport too small, then expands vertically (no horizontal edges).

Modal greys out background; outside click / Close saves & exits.

Focus trap & Esc key to close modal.

