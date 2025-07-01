import { utilService } from "../../../services/util.service.js"
import { noteService } from "../services/note.service.js"
import { NotePreview } from "./NotePreview.jsx"
import { ToolBar } from "./Toolbar.jsx"

const { useState } = React
export function NoteEdit({ onSetExpand }) {
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
        <NotePreview onSaveNote={onSaveNote} onUpdateNote={onUpdateNote} />
    )
}


