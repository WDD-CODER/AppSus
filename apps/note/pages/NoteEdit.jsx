import { utilService } from "../../../services/util.service.js"
import { noteService } from "../services/note.service.js"
import { NotePreview } from "../cmps/NotePreview.jsx"
import { ToolBar } from "./Toolbar.jsx"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

export function NoteEdit({ onSetExpand, onSaveNote }) {


    const [savedNote, setSavedNote] = useState()
    const { noteId } = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        loadNote()
    }, [])

    function loadNote() {
        if (!noteId) return setSavedNote(noteService.getEmptyNote())
        else noteService.get(noteId)
            .then(note => {
                setSavedNote(note)
            })
            .catch(() => showErrorMsg('Problem loading note'))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

            case 'datetime-local':
                value = target.value.split('T')[0]
                break
        }

        setSavedNote(prevReview => ({ ...prevReview, [field]: value }))
    }

    function onUpdateNote(ev) {
        utilService.debounce(handleChange(ev), 500)
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(savedNote)
            .then(onSetExpand(false))
            .then(() => onSaveNote())
    }

function goBack(){
    onSetExpand('')
}

    return (
        <section className="note-edit">
            <form className="edit-note-form" onSubmit={onSaveNote}>
                <button className="pin-note icon-bell "></button>
                <div className="text-info">
                    <h1 className="title"><input onChange={onUpdateNote} name="title" type="text" placeholder="Titel..." /></h1>
                    <p className="text-info"><input onChange={onUpdateNote} name="info" type="text" placeholder="Take a note..." /></p>
                </div>
                <div className="labels-container">{/* { Note.label && <LabelPicker/>} */}</div>
            </form>
            <section className="tool-bar flex"><ToolBar />
                <button className="close btn" onClick={goBack}>Close</button>
            </section>
        </section>
    )
}


