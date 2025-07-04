import { showErrorMsg } from "../../../services/event-bus.service.js"
import { noteService, } from "../services/note.service.js"
import { ToolBar } from "./Toolbar.jsx"

const { useState, } = React
const { useNavigate, useSearchParams } = ReactRouterDOM
export function NoteDetails({ selectedNote, setSelectedNote, onDeleteNote }) {

    const [searchParams, setSearchParams] = useSearchParams()
    const [note, setNote] = useState(selectedNote)
    console.log("🚀 ~ NoteDetails ~ note:", note)
    const navigate = useNavigate()

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

        searchParams.set(field, value)
        setSearchParams(searchParams)
        setNote(prevNote => ({ ...prevNote, [field]: value }))
    }

function onRemoveNote(){
    ev.preventDefault()
    onDeleteNote()
}

    function onSave(ev) {
        ev.preventDefault()
        noteService.save(note)
            .then(() => {
                setSelectedNote(null)
                navigate('/note')
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg('problem saving note')
            })
    }

    return (
        <React.Fragment>
            <form className="note-details box" onSubmit={onSave}>
                <button className="pin-note icon-bell "></button>
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
                    <button onClick={onDeleteNote} data-toolbar={'Delete'} className="delete">Delete</button>
                    <button className="close btn">Close</button>

                </section>
            </form>
        </React.Fragment>
    )
}
