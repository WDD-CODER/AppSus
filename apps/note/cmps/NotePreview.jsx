import { getTruthyValues } from "../../../services/util.service.js";
import { ToolBar } from "./Toolbar.jsx";

const { Link, useSearchParams } = ReactRouterDOM
const { useEffect } = React

export function NotePreview({ note, onSetNote }) {
    const { title, info, createdAt, id, isPinned, style, type } = note
    const [searchParams, setSearchParams] = useSearchParams()

    function onSetNoteList(obj) {
        setSearchParams(obj)
    }

    const labels = ''
    return (
        // <Link to={`/note/edit/${id}`}>
        <section onClick={() => onSetNoteList({ noteId: note.id })} className="note-preview box container">
            <h1>{title}</h1>
            <p>{info.tex}</p>
            {info.img && <figure>{info.img}</figure>}
            {labels && <Labels />}
            <ToolBar />
        </section>
        // </Link>
    )
}