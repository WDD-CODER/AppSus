import { eventBusService, showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"
import { noteService, } from "../services/note.service.js"
import { ToolBar } from "./Toolbar.jsx"

const { useState, useEffect, useRef } = React
const { useParams, useNavigate, useSearchParams } = ReactRouterDOM
export function NoteDetails() {

    const [searchParams, setSearchParams] = useSearchParams()
    const detailsRef = useRef()
    const { noteId } = useParams()
    const [note, setNote] = useState()
    const navigate = useNavigate()


    useEffect(() => {
        loadNote()
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Problem loading note to details...')
            })
    }, [])

    function loadNote() {
        return noteService.get(noteId)
            .then(note => {
                setNote(note)
                dialogRef.current.showModal()
            })
            .catch(() => showErrorMsg('Problem loading note'))
    }

    function onSetSearchParams() {
        console.log('searchParams')
        searchParams.delete('noteId')
        setSearchParams(searchParams)
    }

    return (
        <React.Fragment>
            <form ref={detailsRef} className="note-details" onSubmit={() => onSetSearchParams()}>
                <button className="pin-note icon-bell "></button>
                <div className="text-info">
                    <h1 className="title"><input name="title" type="text" placeholder="Titel..." /></h1>
                    <p className="text-info"><input name="info" type="text" placeholder="Take a note..." /></p>
                </div>
                {/* <div className="labels-container">{ Note.label && <LabelPicker/>}</div> */}
                <section className="tool-bar flex"><ToolBar />
                    <button className="close btn">Close</button>
                </section>
            </form>
        </React.Fragment>
    )
}
