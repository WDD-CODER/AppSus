import { CreateNewNote } from "./CreateNewNote.jsx";
import { NoteList } from "../cmps/NoteList.jsx"
export function NoteIndex() {
    const list = ''


    return (
        <section className="note-index grid container">
            <CreateNewNote />
            {list && <pinedNotes />}
            {list && <NoteList />}
        </section>
    )
}
