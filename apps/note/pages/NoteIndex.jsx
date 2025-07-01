import { NoteList } from "../cmps/NoteList.jsx"
import {noteService} from "../services/note.service.js"

export function NoteIndex() {


    return (
        <section className="note-index grid container">
            <NoteList/>
        </section>
    )
}
