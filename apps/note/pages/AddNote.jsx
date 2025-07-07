import { noteService } from "../services/note.service.js"
import { ToolBar } from "../cmps/Toolbar.jsx"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect, useRef } = React
const { useNavigate, useSearchParams } = ReactRouterDOM

export function AddNote({ setSelectedNote, onSetToExpand, onDeleteNote }) {
    const [savedNote, setSavedNote] = useState(noteService.getEmptyNote())
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()



    useEffect(() => {

        if (!savedNote.id) {
            noteService.save(savedNote)
                .then(note => {
                    setSavedNote(note)
                    searchParams.set('EditNoteId', note.id)
                    noteService.onSetNoteParams(note, searchParams, setSearchParams)
                    showSuccessMsg('saved to storage, ready for edit :)')

                })
        }

        if (searchParams.get('background-color')) {
            console.log("searchParams.get('background-color')")
            savedNote.style.backgroundColor = searchParams.get('background-color')
            setSavedNote(prevNote => ({ ...prevNote, savedNote }))
        }

        if (searchParams.get('background-image')) {
            savedNote.style.backgroundImage = searchParams.get('background-image')
            setSavedNote(savedNote)
        }

    }, [searchParams])



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

    function onRemoveNote() {
        onDeleteNote(savedNote.id)
        onSetToExpand(false)
    }

    const title = savedNote && savedNote.title ? savedNote.title : ''
    const info = (savedNote && savedNote.info && savedNote.info.txt) ? savedNote.info.txt : ''
    const coverImg = (!savedNote.style.backgroundImage) ? { backgroundColor: savedNote.style.backgroundColor } : { backgroundImage: savedNote.style.backgroundImage }

    return (
        <section style={coverImg} key={(savedNote) ? savedNote.id : ''} className="add-note box">
            <form className="edit-note-form" onSubmit={onSaveNote}>
                <button className="pin-note"><span className=" icon-keep icon">keep</span></button>
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
                <button className="delete" data={'Delete'} onClick={ev => { ev.preventDefault(), onRemoveNote() }}>Delete</button>
                <button className="close btn" onClick={onSaveNote}>Close</button>
            </section>
        </section>
    )
}

