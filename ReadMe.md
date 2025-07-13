# AppSus - Notes Application

AppSus is a modern, feature-rich note-taking application built with React. It allows users to create, edit, organize, and manage notes with a clean and interactive interface.

---

## Features

- **Create, Edit, and Delete Notes:**  
  Easily add new notes, edit existing ones, or remove notes you no longer need.

- **Pin & Archive Notes:**  
  Pin important notes to keep them at the top, or archive notes to declutter your workspace.

- **Rich Toolbar:**  
  Use the toolbar to format text, change background colors, add alerts, collaborators, and images.

- **Modal Editing:**  
  Edit notes in a modal window for a focused experience. All changes are auto-saved.

- **URL Search Params Integration:**  
  The app uses URL search parameters to manage note selection and editing state, enabling deep linking and browser navigation support.

- **Responsive Design:**  
  The UI is designed to work well on both desktop and mobile devices.

- **Animated Feedback:**  
  Enjoy smooth animations and instant feedback for actions like saving, archiving, and pinning notes.

---

## Project Structure

```
apps/
  note/
    cmps/           # Note-related React components (NotePreview, Toolbar, etc.)
    pages/          # Note-related pages (NoteIndex, NoteEdit, etc.)
    services/       # Note service logic (CRUD, filtering, etc.)
cmps/               # Shared components (Modal, etc.)
services/           # Shared services (event bus, utilities)
```

---

## Key Components

- **NoteIndex:**  
  Main page for listing and filtering notes.

- **NotePreview:**  
  Displays a single note in the list.

- **NoteEdit:**  
  Modal-based editor for creating and updating notes.

- **Toolbar:**  
  Provides formatting and note management actions.

- **Modal:**  
  Generic modal component for dialogs and editing.

---

## How It Works

- **State Management:**  
  Uses React hooks (`useState`, `useEffect`, `useRef`) for local state and effects.
- **Routing:**  
  Uses React Router DOM for navigation and URL management.
- **Persistence:**  
  Notes are saved in local storage via the `noteService`.
- **Feedback:**  
  Uses an event bus for showing success and error messages.

---

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd AppSus
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the app:**
   ```bash
   npm start
   ```

4. **Open in your browser:**  
   Visit [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal).

---

## Customization

- **Add More Features:**  
  You can extend the app with more note types, integrations, or UI improvements.
- **Styling:**  
  All styles are in the `assets` or component folders. Customize as you like!

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

This project is for educational purposes and is not licensed for commercial use.

---

## Authors

- [Your Name]
- Coding Academy Sprint 3 Team

---

Enjoy using **AppSus**!