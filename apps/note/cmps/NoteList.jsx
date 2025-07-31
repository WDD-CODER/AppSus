import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, type, onDeleteNote , onUpdateNote}) {

    return (
        <div className="note-list-container ">
            <h4>{type}</h4>
            <section className="note-list ">
                {notes.map(curNote => {
                    return <NotePreview key={curNote.id} onDeleteNote={onDeleteNote} onUpdateNote={onUpdateNote} note={curNote} />
                })}
            </section>
        </div>
    )
}
