

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
                <button className=" hover-show"data="New list"><span className="icon-check_box icon">check_box</span></button>
                <button className=" hover-show "data="New note with draying"><span className="icon-brush icon">brush</span></button>
                <button className=" hover-show "data="New note with image"><span className="icon-image icon">image</span></button>
            </React.Fragment>}
            {expand && <AddNote
                setSelectedNote={setSelectedNote}
                onSetToExpand={setExpand}
                onDeleteNote={onDeleteNote}
            />}
        </div>
    )

}
