import { eventBusService, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { animateCSS, debounce } from "../../../services/util.service.js"
import { noteService, } from "../services/note.service.js"
import { ToolBar } from "../cmps/Toolbar.jsx"

const { useState, useEffect, useRef } = React
const { useNavigate, useSearchParams } = ReactRouterDOM
export function NoteEdit({ onCloseModal, selectedNote, onDeleteNote }) {

    const [searchParams, setSearchParams] = useSearchParams()
    const [note, setNote] = useState(selectedNote)
    const loadingRef = useRef()
    const textRef = useRef()
    const navigate = useNavigate()


    useEffect(() => {
        
        requestAnimationFrame(() => { if (textRef.current) debounce(autoGrow(textRef.current),5000 )})

        if (!note) {
            animateCSS(loadingRef.current, 'heartBeat', false)
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


    useEffect(() => {
        if (note) noteService.save(note)
    }, [note])



    function seIsPinned() {

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
        console.log('onSave')

        noteService.save(note)
            .then(note => {
                onCloseModal(note)
                // setNote(note)
                navigate('/note')
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg('problem saving note')
            })
    }

    // const coverImg = (!note.style) ? {} : { ...note.style }
    if (!note) return (<div ref={loadingRef} className="loading"> Loading...</div>)
    const transparentDrop = (searchParams.get('time-createdAt')) ? false : true
    return (
        <React.Fragment>
            {transparentDrop && <div className="transparent-drop" onClick={() => onSave()}></div>}
            <form className="note-edit-container box"
                onClick={(ev) => ev.stopPropagation()}
                style={{ ...note.style }}
                onSubmit={ev => {
                    ev.preventDefault()
                    onSave()
                }}>

                <div className="text-info-container">
                    {/* <h1 ></h1> */}
                    <input className="title" onChange={handleChange}
                        value={note.title || ''}
                        name="title" type="text"
                        placeholder="Title..." />


                    <label className="info" htmlFor="info">
                        <textarea ref={textRef} onChange={ev => {
                            autoGrow(ev.target)
                            handleChange(ev)
                        }}
                            id="info"
                            value={note.info.txt}
                            name="info"
                            type="text"
                            placeholder="Take a note..." />
                    </label>

                </div>
                {/* <div className="labels-container">{ Note.label && <LabelPicker/>}</div> */}
                <section className="tool-bar"><ToolBar onSetNote={setNote}>
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
                    <button className="pin-note" onClick={() => seIsPinned()}>
                        <span className=" icon-keep icon ">keep</span>
                    </button>

                </section>
            </form>
        </React.Fragment>
    )
}
