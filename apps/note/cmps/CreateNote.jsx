

import { AddNote } from "../pages/AddNote.jsx"
import { NoteEdit } from "../pages/NoteEdit.jsx"
const { useState, useEffect } = React
const { useNavigate, useSearchParams } = ReactRouterDOM

export function CreateNote({ onDeleteNote, }) {

    const [searchParams, setSearchParams] = useSearchParams()

    const navigate = useNavigate()
    const [expand, setExpand] = useState()

    useEffect(() => {
        if (searchParams.get('time-createdAt')) {
            setExpand(false)
        }

    }, [searchParams.get('time-createdAt')])


    function onCreatENote() {
        setExpand(true)
    }

    return (

        <div className="create-note box container">
            {!expand && <React.Fragment>
                <input type="text" onClick={() => onCreatENote()} className="expand-note" placeholder="Take a note..." />
                <button className=" hover-show" data="New list"><span className="icon-check_box icon">check_box</span></button>
                <button className=" hover-show " data="New note with draying"><span className="icon-brush icon">brush</span></button>
                <button className=" hover-show " data="New note with image"><span className="icon-image icon">image</span></button>
            </React.Fragment>}
            {expand && <NoteEdit
                // setSelectedNote={setSelectedNote}
                onSetToExpand={setExpand}
                onDeleteNote={onDeleteNote}
            />}
        </div>
    )

}
