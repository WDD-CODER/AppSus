import { ToolBar } from "./Toolbar.jsx";

export function NotePreview({note}) {
console.log("🚀 ~ NotePreview ~ notes:", note)
const{title, info, createdAt,id, isPinned, style, type } = note
const labels = ''
    return (
        <section className="note-preview box container">
            <h1>{title}</h1>
            <p>{info.tex}</p>
            {info.img && <figure>{info.img}</figure>}
            {labels && <Labels/>}
            <ToolBar/>
        </section>
    )
}