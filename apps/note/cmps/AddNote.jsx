

import { NoteEdit } from "../pages/NoteEdit.jsx"
const { useState, } = React
export function AddNote({setSelectedNote}) {
    const [expand, setExpand] = useState()
    return (
        <div className="add-note box container">
            {!expand && <React.Fragment>
                <input type="text" onClick={() =>setExpand(true)} className="expand-note" placeholder="Take a note..." />
                <button className="icon-square-check hover-show" data-toolbar="New list"></button>
                <button className="icon-paintbrush hover-show" data-toolbar="New note with draying"></button>
                <button className="icon-image hover-show" data-toolbar="New note with image"></button>
            </React.Fragment>}
            {expand && <NoteEdit 
            setSelectedNote={setSelectedNote}
             onSetToExpand={setExpand} 
             />}
        </div>
    )

}
 