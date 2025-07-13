# AppSus - Notes Application 📝✨

Welcome to **AppSus**, a modern, feature-rich note-taking app built with React!  
Take notes, organize your thoughts, and stay productive with a beautiful, interactive UI.

---

## 🚀 Live Demo

👉 [View the working app here!](https://your-deployment-url.com)

---

## 🛠️ Tech Stack

- **React** ⚛️ – UI library for building interactive interfaces
- **React Router DOM** 🔗 – Client-side routing and URL management
- **Local Storage** 💾 – Persistent note storage in the browser
- **Custom Event Bus** 📢 – For global success/error messaging
- **CSS Flexbox & Custom Styles** 🎨 – Responsive and modern design
- **JavaScript (ES6+)** 🟨 – Modern language features and async/await

---

## ✨ Features

- 📝 **Create, Edit, and Delete Notes**  
  Add new notes, update them, or remove what you don’t need.

- 📌 **Pin & Archive Notes**  
  Pin important notes or archive them to keep your workspace tidy.

- 🎨 **Rich Toolbar**  
  Format text, change background colors, add alerts, collaborators, and images.

- 🗂️ **Modal Editing**  
  Edit notes in a focused modal window with auto-save.

- 🔗 **URL Search Params Integration**  
  Deep-link to specific notes and preserve state in the browser URL.

- 📱 **Responsive Design**  
  Works great on desktop and mobile devices.

- ⚡ **Animated Feedback**  
  Enjoy smooth animations and instant feedback for your actions.

---

## 📁 Project Structure

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

## 🧩 Key Components

- **NoteIndex** – Main page for listing and filtering notes
- **NotePreview** – Displays a single note in the list
- **NoteEdit** – Modal-based editor for creating and updating notes
- **Toolbar** – Formatting and note management actions
- **Modal** – Generic modal component for dialogs and editing

---

## 🏁 Getting Started

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
   Visit [http://localhost:3000](http://localhost:3000)

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 👤 Authors

- [Your Name]
- Coding Academy Sprint 3 Team

---

## 📄 License

This project is for educational purposes and is not licensed for commercial use.

---

Enjoy using **AppSus**! 🚀📝