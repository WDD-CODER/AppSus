import { eventBusService, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { animateCSS } from "../../../services/util.service.js"
import { noteService, } from "../services/note.service.js"
import { ToolBar } from "../cmps/Toolbar.jsx"

const { useState, useEffect, useRef } = React
const { useNavigate, useSearchParams } = ReactRouterDOM

export function NoteEdit({ selectedNote, onDeleteNote, onSetToExpand }) {

    const [searchParams, setSearchParams] = useSearchParams()
    const [note, setNote] = useState(selectedNote)
    const loadingRef = useRef()
    const navigate = useNavigate()
    const addOrEdit = (searchParams.get('time-createdAt')) ? 'edit' : 'add'
    console.log("🚀 ~ NoteEdit ~ addOrEdit:", addOrEdit)

    useEffect(() => {
        if (!note) animateCSS(loadingRef.current, 'heartBeat', false)

        if (!note) {

            const note = noteService.getEmptyNote()
            noteService.save(note)
                .then(note => {
                    setNote(note)
                    searchParams.set('noteId', note.id)
                    setSearchParams(searchParams)
                    showSuccessMsg('saved to storage, ready for edit :)')
                })
        }

    }, [searchParams.get('time-createdAt')])


    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        if (field === 'info') setNote(prev => ({ ...prev, info: { ...prev.info, txt: value } }))
        else setNote(prev => ({ ...prev, [field]: value }))
    }

    function onRemoveNote() {
        if (addOrEdit === 'add') onSetToExpand(false)
        onDeleteNote(note.id)
    }

    function onSave() {
        if (addOrEdit === 'add') onSetToExpand(false)
        noteService.save(note)
            // .then(() => setSelectedNote(null))
            .then(() => navigate('/note'))
            .catch(() => showErrorMsg('problem saving note'))
    }

    // const coverImg = (!note.style) ? {} : { ...note.style }
    if (!note) return (<div ref={loadingRef} className="loading"> Loading...</div>)

    return (
        <React.Fragment>
            <form
                //  style={coverImg}
                className="NoteEdit box"
                onSubmit={ev => {
                    ev.preventDefault()
                    onSave()
                }}>

                <div className="text-info">
                    <h1 className="title">
                        <input onChange={handleChange}
                            value={note.title || ''}
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
