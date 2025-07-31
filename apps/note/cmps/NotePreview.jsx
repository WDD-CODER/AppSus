import { ToolBar } from "./Toolbar.jsx";

const { useSearchParams, Link } = ReactRouterDOM

export function NotePreview({ note,  onDeleteNote ,onUpdateNote}) {
    const [searchParams, setSearchParams] = useSearchParams()


    return (
        <Link to={`/note/edit/${note.id}?${searchParams}`} className="note-preview box container">
            <section style={{ ...note.style }} >
                <h1>{note.title}</h1>
                <p>{note.info.txt}</p>
                {note.info.img && <figure>{info.img}</figure>}
                <ToolBar onDeleteNote={onDeleteNote} onUpdateNote={onUpdateNote} note={note} />
            </section >
        </Link>
    )
}