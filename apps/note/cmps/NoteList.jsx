import { NotePreview } from "./NotePreview.jsx"
const {useState,useEffect} = React

export function NoteList({ notes, type, onDeleteNote , onSaveNote}) {

    return (
        <div className="note-list-container ">
            <h4>{type}</h4>
            <section className="note-list ">
                {notes.map(curNote => {
                    return <NotePreview key={curNote.id} onDeleteNote={onDeleteNote} onSaveNote={onSaveNote} note={curNote} />
                })}
            </section>
        </div>
    )
}
