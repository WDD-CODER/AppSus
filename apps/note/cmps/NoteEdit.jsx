import { eventBusService, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { noteService, } from "../services/note.service.js"
import { ToolBar } from "./Toolbar.jsx"

const { useState, useEffect } = React
const { useNavigate, useSearchParams } = ReactRouterDOM

export function NoteEdit({ selectedNote, setSelectedNote, onDeleteNote }) {

    const [searchParams, setSearchParams] = useSearchParams()
    const [note, setNote] = useState(selectedNote)
    const navigate = useNavigate()

    useEffect(() => {
        note.style.backgroundColor = searchParams.get('background-color')
        note.style.backgroundImage = (!searchParams.get('background-image')) ? '' : searchParams.get('background-image')
        setNote(prevNote => ({ ...prevNote, ...note }))
        noteService.onSetNoteParams(note, searchParams, setSearchParams)
        showSuccessMsg('saved to storage, ready for edit :)')

    }, [searchParams.get('background-image'), searchParams.get('background-color')])



    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        if (field === 'info') setNote(prev => ({ ...prev, info: { ...prev.info, txt: value } }))
        else setNote(prev => ({ ...prev, [field]: value }))
    }

    function onRemoveNote() {
        onDeleteNote()
    }

    function onSave() {
        noteService.save(note)
            .then(() => setSelectedNote(null))
            .then(() => navigate('/note'))
            .catch(() => showErrorMsg('problem saving note'))
    }

    const coverImg = (!note.style) ? {} : { ...note.style }

    return (
        <React.Fragment>
            <form style={coverImg}
                className="NoteEdit box"
                onSubmit={ev => {
                    ev.preventDefault()
                    onSave()
                }}>

                <div className="text-info">
                    <h1 className="title">
                        <input onChange={handleChange}
                            value={note.title}
                            name="title" type="text"
                            placeholder="title..." />
                    </h1>

                    <p className="text-info">
                        <input onChange={handleChange}
                            value={note.info.txt}
                            name="info"
                            type="text"
                            placeholder="Take a note..." />
                    </p>
                    
                </div>
                {/* <div className="labels-container">{ Note.label && <LabelPicker/>}</div> */}
                <section className="tool-bar"><ToolBar />
                    <button className="pin-note">
                        <span className=" icon-keep icon ">keep</span>
                    </button>
                    <button className="delete btn "
                        data={'Delete'}
                        onClick={ev => {
                            ev.preventDefault()
                            onRemoveNote()
                        }}>
                        <span className="icon-delete icon">delete</span>
                    </button>
                    <button className="close btn ">
                        <span className="icon-close icon">close</span>
                    </button>
                </section>
            </form>
        </React.Fragment>
    )
}
