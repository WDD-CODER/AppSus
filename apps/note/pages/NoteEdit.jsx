import { eventBusService, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { animateCSS, debounce } from "../../../services/util.service.js"
import { noteService, } from "../services/note.service.js"
import { ToolBar } from "../cmps/Toolbar.jsx"

const { useState, useEffect, useRef } = React
const { useNavigate, useSearchParams, useParams, useOutletContext } = ReactRouterDOM
export function NoteEdit(props) {

    const context = useOutletContext() || {}
    const setAddNoteOpen = props.setAddNoteOpen || context.setAddNoteOpen;
    const onUpdateNote = props.onUpdateNote || context.onUpdateNote;
    const onDeleteNote = props.onDeleteNote || context.onDeleteNote;


    const [searchParams, setSearchParams] = useSearchParams()
    const loadingRef = useRef()
    const textRef = useRef()
    const navigate = useNavigate()
    const { noteId } = useParams()
    const [note, setNote] = useState(props.note || context.note)

    useEffect(() => {
        requestAnimationFrame(() => { if (textRef.current) autoGrow(textRef.current), 5000 })

        if (note) {
            return console.log('note from selected', note)
        }

        if (!noteId) {
            const note = noteService.getEmptyNote()
            setNote(note)
        }

        if (noteId) noteService.get(noteId)
            .then(note => {
                setNote(note)
                showSuccessMsg('got note from url opening modal')
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg('failed to get note')
            })

        return () => setAddNoteOpen(false)

    }, [noteId])

    // function handleUpdateNote(changes, successMsg) {
    //     const updatedNote = { ...note, ...changes }
    //     onUpdateNote(updatedNote)
    //     // noteService.save(updatedNote)
    //     //     .then(savedNote => {
    //     //         setNote(savedNote)
    //     //         if (successMsg) showSuccessMsg(successMsg)
    //     //     })
    //     //     .catch(() => showErrorMsg('Update failed'))
    // }

    function seIsPinned() {
        if (note.archive) return showErrorMsg('note is archived, cannot be pinned')
        const pinnedStatus = !note.isPinned
        setNote(prevNote => ({ ...prevNote, isPinned: pinnedStatus }))
        noteService.save(note)
            .then(() => showSuccessMsg(pinnedStatus ? 'Note pinned with success.' : 'Removed the pinned from note.'))
    }


    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        if (field === 'info') setNote(prev => ({ ...prev, info: { ...prev.info, txt: value } }))
        else setNote(prev => ({ ...prev, [field]: value }))
    }

    function onRemoveNote() {
        onDeleteNote(note.id)
    }

    function autoGrow(el) {
        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
    }

    function onSave() {
        if (!note.title && !note.info.txt && !note.style) {
            showErrorMsg(' Note has no content. It was not saved')
            setNote(false)

            return navigate('/note')
        }
        noteService.save(note)
            .then(() => {
                showSuccessMsg('note saved!')
                setNote(false)
                navigate('/note')
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg('problem saving note')
                navigate('/note')
            })
    }

    const transparentDrop = (!noteId) ? true : false
    const style = (note) ? (typeof note.style === 'object' ? note.style : {}) : {}

    return (
        <React.Fragment>
            {transparentDrop && <div className="transparent-drop" onClick={() => onSave()}></div>}
            <form className="note-edit-container box"
                style={style}
                onSubmit={ev => {
                    ev.preventDefault()
                    onSave()
                }}>

                <div className="text-info-container">
                    <input className="title" onChange={handleChange}
                        value={note && note.title || ''}
                        name="title" type="text"
                        placeholder="Title..." />


                    <label className="info" htmlFor="info">
                        <textarea ref={textRef} onChange={ev => {
                            autoGrow(ev.target)
                            handleChange(ev)
                        }}
                            id="info"
                            value={note && note.info.txt || ''}
                            name="info"
                            type="text"
                            placeholder="Take a note..." />
                    </label>

                </div>
                <section className="tool-bar">
                    <ToolBar note={note} onUpdateNote={onUpdateNote}>
                        <button className="delete btn "
                            data-type={'Delete'}
                            onClick={ev => {
                                ev.preventDefault()
                                onRemoveNote()
                            }}> <span className="icon-delete icon">delete</span>
                        </button>
                        <button
                            onClick={ev => {
                                ev.preventDefault()
                                onSave()
                            }} className="close">close</button>
                    </ToolBar>
                    <button className="pin-note" onClick={ev => {
                        ev.preventDefault()
                        seIsPinned(note)
                    }}>
                        <span className=" icon-keep icon">keep</span>
                    </button>

                </section>
            </form>
        </React.Fragment>
    )
}
