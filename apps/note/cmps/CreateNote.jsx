

import { AddNote } from "../pages/AddNote.jsx"
const { useState, useEffect } = React
const { Link, useNavigate, useSearchParams } = ReactRouterDOM

export function CreateNote({ setSelectedNote, onDeleteNote, }) {

    const [searchParams, setSearchParams] = useSearchParams()

    const navigate = useNavigate()
    const [expand, setExpand] = useState()


    useEffect(() => {
        if (expand) {
            (searchParams.get('noteId')) ? setExpand(false) : setExpand(expand)
        }
    }, [searchParams.get('noteId')])


    function onCreatENote() {
        setExpand(true)
        navigate('/note/edit')
    }

    return (

        <div className="create-note box container">
            {!expand && <React.Fragment>
                <input type="text" onClick={() => onCreatENote()} className="expand-note" placeholder="Take a note..." />
                <button className="icon-square-check hover-show" data-toolbar="New list"></button>
                <button className="icon-paintbrush hover-show" data-toolbar="New note with draying"></button>
                <button className="icon-image hover-show" data-toolbar="New note with image"></button>
            </React.Fragment>}
            {expand && <AddNote
                setSelectedNote={setSelectedNote}
                onSetToExpand={setExpand}
                onDeleteNote={onDeleteNote}
            />}
        </div>
    )

}
