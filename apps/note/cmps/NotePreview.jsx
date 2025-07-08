import { noteService } from "../services/note.service.js";
import { ToolBar } from "./Toolbar.jsx";

const { useSearchParams } = ReactRouterDOM

export function NotePreview({ note }) {
    const labels = ''

    const { title, info, createdAt, id, isPinned, style, type } = note
    const [searchParams, setSearchParams] = useSearchParams()

    function onSetParams() {
        searchParams.set('noteId', note.id)
        noteService.onSetNoteParams(note, searchParams, setSearchParams)
    }

// const img = (!note.style.backgroundImage)? '' : note.style.backgroundImage

    return (
        <section style={{...note.style}} onClick={() => onSetParams()} className="note-preview box container">
            <h1>{title}</h1>
            <p>{info.txt}</p>
            {info.img && <figure>{info.img}</figure>}
            {labels && <Labels />}
            <ToolBar />
        </section >
    )
}