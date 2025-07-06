import { noteService } from "../services/note.service.js"
import { ToolBar } from "../cmps/Toolbar.jsx"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect, useRef } = React
const { useNavigate } = ReactRouterDOM

export function AddNote({ setSelectedNote, onSetToExpand, onDeleteNote }) {
    const [savedNote, setSavedNote] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()
    const noteRef = useRef()
    var intervalID



    useEffect(() => {
        if (!savedNote.id) {
            noteService.save(savedNote).then(note => {
                setSavedNote(note)
                showSuccessMsg('saved to storage, ready for edit :)')
            })
        }
    }, [])



    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        if (field === 'info') {
            setSavedNote(prev => ({ ...prev, info: { ...prev.info, txt: value } }))
        }
        else setSavedNote(prevNote => ({ ...prevNote, [field]: value }))
    }

    function onSaveNote(ev) {
        ev.preventDefault()
            setSelectedNote(null)
        noteService.save(savedNote)
            .then(() => {
             onSetToExpand(false)
                navigate('/note')
            })

            .catch(err => {
                console.log('err', err)
                showErrorMsg('Problem saving note')
            })
    }


    function updateNote() {
        noteService.save(savedNote).then(note => {
            noteRef.current = note
            showSuccessMsg('updated!')
        })
    }

    function onRemoveNote() {
        onDeleteNote(savedNote.id)
        onSetToExpand(false)
    }

    const title = savedNote && savedNote.title ? savedNote.title : ''
    const info = (savedNote && savedNote.info && savedNote.info.txt) ? savedNote.info.txt : ''

    return (
        <section key={(savedNote) ? savedNote.id : ''} className="add-note">
            <form className="edit-note-form" onSubmit={onSaveNote}>
                <button className="pin-note icon-bell icon"></button>
                <div className="text-info">
                    <h1 className="title">
                        <input onChange={handleChange}
                            name="title"
                            value={title}
                            type="text" placeholder="title..." />
                    </h1>
                    <p className="info">
                        <input onChange={handleChange}
                            name="info"
                            value={info}
                            type="text"
                            placeholder="Take a note..." />
                    </p>
                </div>
                <div className="labels-container">{/* { Note.label && <LabelPicker/>} */}</div>
            </form>
            <section className="tool-bar flex"><ToolBar />
                <button className="delete" data-toolbar={'Delete'} onClick={ev => { ev.preventDefault(), onRemoveNote() }}>Delete</button>
                <button className="close btn" onClick={onSaveNote}>Close</button>
            </section>
        </section>
    )
}

