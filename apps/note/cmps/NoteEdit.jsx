import { showErrorMsg } from "../../../services/event-bus.service.js"
import { noteService, } from "../services/note.service.js"
import { ToolBar } from "./Toolbar.jsx"

const { useState, } = React
const { useNavigate} = ReactRouterDOM

export function NoteEdit({ selectedNote, setSelectedNote, onDeleteNote }) {

    const [note, setNote] = useState(selectedNote)
    const navigate = useNavigate()
    

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        if (field === 'info') {
            setNote(prev => ({ ...prev, info: { ...prev.info, txt: value } }))
        } else {
            setNote(prev => ({ ...prev, [field]: value }))
        }
    }

    function onRemoveNote() {
        onDeleteNote()
    }

    function onSave() {
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
            <form className="NoteEdit box" onSubmit={ev => {
                ev.preventDefault()
                onSave()
            }}>
                <button className="pin-note icon-bell icon "></button>
                <div className="text-info">
                    <h1 className="title">
                        <input onChange={handleChange}
                            value={note.title}
                            name="title" type="text"
                            placeholder="title..." />
                    </h1>
                    <p className="text-info">
                        <input onChange={handleChange}
                            value={note.info.txt }
                            name="info"
                            type="text"
                            placeholder="Take a note..." />
                    </p>
                </div>
                {/* <div className="labels-container">{ Note.label && <LabelPicker/>}</div> */}
                <section className="tool-bar"><ToolBar />
                    <button className="delete"data={'Delete'}
                        onClick={ev => {
                            ev.preventDefault()
                            onRemoveNote()
                        }
                        }>Delete</button>

                    <button className="close btn">Close</button>

                </section>
            </form>
        </React.Fragment>
    )
}
