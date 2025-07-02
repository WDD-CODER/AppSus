import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes }) {

    return (
        <div className="note-list-container ">
            <h4>others</h4>
            <section className="note-list ">
                {notes.map(curNote => {
                    return <NotePreview key={curNote.id} note={curNote} />
                })}
            </section>
        </div>
    )
}
