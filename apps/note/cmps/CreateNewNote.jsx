

import { NoteEdit } from "./NoteEdit.jsx"
const { useState } = React

export function CreateNewNote() {

    const [expand, setExpand] = useState(true)

    return (
        <div className="create-note-container box-shadow box container">
            {!expand && 
            <React.Fragment>
                <button onClick={setExpand} className="expand-note" > Take a note... </button>
                <button className="icon-square-check hover-show" data-toolbar="New list"></button>
                <button className="icon-paintbrush hover-show" data-toolbar="New note with draying"></button>
                <button className="icon-image hover-show" data-toolbar="New note with image"></button>
                </React.Fragment> 
                }
                {expand && <NoteEdit onSetExpand={setExpand} />}
            </div>
    )

}