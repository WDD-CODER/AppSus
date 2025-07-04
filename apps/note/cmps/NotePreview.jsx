import { ToolBar } from "./Toolbar.jsx";

const { useSearchParams } = ReactRouterDOM

export function NotePreview({ note }) {
    const { title, info, createdAt, id, isPinned, style, type } = note
    const [searchParams, setSearchParams] = useSearchParams()

    const labels = ''
    return (
        <section onClick={() => setSearchParams({ noteId: note.id })} className="note-preview box container">
            <h1>{title}</h1>
            <p>{info.tex}</p>
            {info.img && <figure>{info.img}</figure>}
            {labels && <Labels />}
            <ToolBar />
        </section>
    )
}