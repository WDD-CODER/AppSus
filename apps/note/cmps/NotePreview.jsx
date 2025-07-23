import { ToolBar } from "./Toolbar.jsx";

const { useSearchParams, Link } = ReactRouterDOM

export function NotePreview({ note, onSaveNote ,onDeleteNote}) {
    // const { title, info, createdAt, id, isPinned, style, type } = note
    const [searchParams, setSearchParams] = useSearchParams()


    return (
        <Link to={`/note/edit/${note.id}?${searchParams}`} className="note-preview box container">
            <section style={{ ...note.style }} >
                <h1>{note.title}</h1>
                <p>{note.info.txt}</p>
                {note.info.img && <figure>{info.img}</figure>}
                <ToolBar onDeleteNote={onDeleteNote} onSaveNote={onSaveNote} note={note} />
            </section >
        </Link>
    )
}