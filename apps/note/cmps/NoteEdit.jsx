import { utilService } from "../../../services/util.service.js"
import { noteService } from "../services/note.service.js"

const { useState } = React
export function NoteEdit({onSetExpand}) {
    const [savedNote, setSavedNote] = useState(noteService.getEmptyNote())

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

    function onSaveNote() {
        noteService.save(savedNote)
        .then(onSetExpand(false))
    }

    return (
        <section>
            <form onSubmit={onSaveNote}>
                <h1 className="title"><input onBlur={onUpdateNote} name="title" type="text" placeholder="Titel..." /></h1>
                <p className="text-info"><input onBlur={onUpdateNote} name="info" type="text" placeholder="Take a note..." /></p>
                <div className="labels-container">{/* { Note.label && <LabelPicker/>} */}</div>
            </form>
            <section className="tool-bar">{/* <Toolbar/> */} <button className="close btn" onClick={onSaveNote}>Close</button></section>
        </section>
    )
}
