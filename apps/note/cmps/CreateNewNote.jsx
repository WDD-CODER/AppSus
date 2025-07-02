

import { NoteEdit } from "../pages/NoteEdit.jsx"
const { useState } = React
export function CreateNewNote({ setNoteList }) {

    const [expand, setExpand] = useState()


    return (
        <div className="create-note-container box container">
            {!expand && <React.Fragment>
                    <input type="text" onClick={setExpand} className="expand-note" placeholder="Take a note..." />
                    <button className="icon-square-check hover-show" data-toolbar="New list"></button>
                    <button className="icon-paintbrush hover-show" data-toolbar="New note with draying"></button>
                    <button className="icon-image hover-show" data-toolbar="New note with image"></button>
                </React.Fragment>}
            {expand && <NoteEdit onSaveNote={setNoteList} onSetExpand={setExpand} />}
        </div>
    )

}
