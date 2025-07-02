import { ToolBar } from "./Toolbar.jsx";
const { Link } = ReactRouterDOM

export function NotePreview({ note }) {
    const { title, info, createdAt, id, isPinned, style, type } = note
    const labels = ''
    return (
        <Link to={`/note/edit/${id}`}>
            <section className="note-preview box container">
                <h1>{title}</h1>
                <p>{info.tex}</p>
                {info.img && <figure>{info.img}</figure>}
                {labels && <Labels />}
                <ToolBar />
            </section>
        </Link>
    )
}