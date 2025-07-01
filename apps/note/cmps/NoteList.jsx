import { CreateNewNote } from "./CreateNewNote.jsx";

const { useState } = React

export function NoteList() {

    const [noteList, setNoteList] = useState()

    return <div className=" note-list container"><CreateNewNote/></div>
}
