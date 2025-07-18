import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js";
import { noteService } from "../services/note.service.js";
import { ToolBar } from "./Toolbar.jsx";

const { useSearchParams, useNavigate , Link} = ReactRouterDOM

export function NotePreview({ note }) {
    const labels = ''

    const { title, info, createdAt, id, isPinned, style, type } = note
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    function onSetParams() {
        console.log('variable')

    }


    return (
        <Link to={`/note/edit/${note.id}`} className="note-preview box container">
            <section style={{ ...note.style }} onClick={() => onSetParams()} >
                <h1>{title}</h1>
                <p>{info.txt}</p>
                {info.img && <figure>{info.img}</figure>}
                <ToolBar selectedNote={note} />
            </section >
        </Link>
    )
}