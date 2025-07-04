import { getTruthyValues} from "../../../services/util.service.js"
import { noteService } from "../services/note.service.js"
import { ToolBar } from "../cmps/Toolbar.jsx"
import { showErrorMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate, useSearchParams } = ReactRouterDOM

export function NoteEdit({ setSelectedNote, onSetToExpand }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [savedNote, setSavedNote] = useState(null)
    const navigate = useNavigate()


    useEffect(() => {
        setSearchParams(getTruthyValues(searchParams))
        loadNote()
    }, [])

    function loadNote() {
        if (!searchParams.get('noteId')) {
            setSavedNote(noteService.getEmptyNote())
        }
        else noteService.get(searchParams.get('noteId'))
            .then(res => {
                console.log('res')
                setSavedNote(res)
                setSelectedNote(null)
            })
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

        setSavedNote(prevNote => ({ ...prevNote, [field]: value }))
    }

    function setNoteParams(note) {
        if (!note.id) {
            showErrorMsg('seems like there is no not...')
        }
        searchParams.set('txt', (note.info && note.info.txt) || '')
        searchParams.set('type', note.type || '')
        searchParams.set('isPinned', note.isPinned || '')
        searchParams.set('background-Color', note.style.backgroundColor || '')
        searchParams.set('date-createdAt', (note.createdAt && note.createdAt.date) || '')
        searchParams.set('time-createdAt', (note.createdAt && note.createdAt.time) || '')
        setSearchParams(searchParams)
    }



    function onSaveNote(ev) {
        // setSavedNote()
        ev.preventDefault()
        noteService.save(savedNote)
            .then(() => {
                onSetToExpand(false)
                setSelectedNote(null)
                navigate('/note')
            })
    }

    // const title = (!savedNote) ? '' : savedNote.title
    // const info = (!savedNote) ? '' : {savedNote.info}

    return (
        <section key={(savedNote) ? savedNote.id : ''} className="note-edit">
            <form className="edit-note-form" onSubmit={onSaveNote}>
                <button className="pin-note icon-bell "></button>
                <div className="text-info">
                    <h1 className="title">
                        <input onChange={handleChange}
                            // value={savedNote.title}
                            name="title"
                            type="text" placeholder="title..." />
                    </h1>
                    <p className="info">
                        <input onChange={handleChange}
                            // value={savedNote.info.txt}
                            name="info"
                            type="text"
                            placeholder="Take a note..." />
                    </p>
                </div>
                <div className="labels-container">{/* { Note.label && <LabelPicker/>} */}</div>
            </form>
            <section className="tool-bar flex"><ToolBar />
                <button className="close btn" onClick={onSaveNote}>Close</button>
            </section>
        </section>
    )
}

