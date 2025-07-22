import { ToolBar } from "./Toolbar.jsx";

const { useSearchParams, Link } = ReactRouterDOM

export function NotePreview({ note, setNote, setNotes, notes }) {
    const { title, info, createdAt, id, isPinned, style, type } = note
    const [searchParams, setSearchParams] = useSearchParams()


    return (
        <Link to={`/note/edit/${note.id}?${searchParams}`} className="note-preview box container">
            <section style={{ ...note.style }} >
                <h1>{title}</h1>
                <p>{info.txt}</p>
                {info.img && <figure>{info.img}</figure>}
                <ToolBar notes={notes} setNotes={setNotes} setNote={setNote} note={note} />
            </section >
        </Link>
    )
}