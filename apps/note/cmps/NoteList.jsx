import { CreateNewNote } from "./CreateNewNote.jsx";

export function NoteList() {
    const list = []


    return <section className=" note-list container">
        <ul>
            {list.map(note => { <li key={note.id}><NotePreview /></li> })}
        </ul>
    </section>
}
