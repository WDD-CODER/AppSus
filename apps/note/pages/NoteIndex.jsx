import { Modal } from "../../../cmps/Modal.jsx";
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js";
import { AddNote } from "../cmps/AddNote.jsx";
import { NoteDetails } from "../cmps/NoteDetails.jsx";
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
import { NoteEdit } from "./NoteEdit.jsx";

const { useState, useEffect } = React
const { useSearchParams, useNavigate } = ReactRouterDOM

export function NoteIndex() {

    const [searchParams, setSearchParams] = useSearchParams()

    const [pinnedNoteList, setPinnedNoteList] = useState()
    const [noteList, setNoteList] = useState()
    const [selectedNote, setSelectedNote] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState()
    const navigate = useNavigate()
    const [filterBy, setFilterBy] = useState(noteService.getFilterFromSearchParams(searchParams))

    useEffect(() => {
        console.log("🚀 ~ useEffect ~ useEffect:")
        if (searchParams.get('noteId')) {
            const res = searchParams.get('noteId')
            noteService.get(res)
                .then(setSelectedNote)
                .then(() => setIsModalOpen(true))
                .catch(err => {
                    console.log('err', err)
                    showErrorMsg('Problem opening  modal')
                })
        }

        setFilterBy(noteService.getFilterFromSearchParams(searchParams))
        loadNotes()

    }, [searchParams])


    function loadNotes() {
        console.log('loadNotes')
        noteService.query(filterBy)
            .then(notes => {
                console.log("🚀 ~ loadNotes ~ notes:", notes)
                // setIsModalOpen(true)
                filterPinnedNotes(notes)
                setNoteList(notes)
            })
            .catch(() => showErrorMsg('Failed loading notes'))
    }


    function filterPinnedNotes(notes) {
        const arePinned = notes.filter(note => note.isPinned === true)
        setPinnedNoteList(() => (!arePinned.length) ? '' : arePinned)
    }


    function onDeleteNote(ev) {
        console.log("🚀 ~ onDeleteNote ~ ev:", ev)
        ev.preventDefault()
        console.log("🚀 ~ onDeleteNote ~ searchParams.get('noteId'):", searchParams.get('noteId'))
        if (!searchParams.get('noteId')) return eventBusService.showErrorMsg('No note selected')
        else {
            const noteToRemove = searchParams.get('noteId')
            noteService.remove(noteToRemove)
                .then(() => {
                    showSuccessMsg('Note removed with Success')
                    setIsModalOpen(false)
                    setSelectedNote(null)
                    navigate('/note')
                })
        }
    }


    return (
        <section className="note-index ">
            <AddNote
                setSelectedNote={setSelectedNote}
                onSetToExpand={setIsModalOpen}
            />
            {selectedNote && <Modal isOpen={isModalOpen}>
                <NoteDetails
                    selectedNote={selectedNote}
                    setSelectedNote={setSelectedNote}
                    setIsModalOpen={setIsModalOpen}
                    onDeleteNote={onDeleteNote}
                />
            </Modal>}
            {pinnedNoteList && <NoteList key={'pinned-notes'} type={'pinned'} notes={pinnedNoteList} />}
            {!selectedNote && noteList && <NoteList key={'other-notes'} type={'other'} notes={noteList} />}
            {/* <button onClick={() => onDeleteNote()} data-toolbar={'Delete'} className="delete">Delete</button> */}

        </section>
    )
}