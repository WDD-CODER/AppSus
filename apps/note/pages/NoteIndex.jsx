import { Modal } from "../../../cmps/Modal.jsx";
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js";
import { CreateNote } from "../cmps/CreateNote.jsx";
import { NoteEdit } from "../cmps/NoteEdit.jsx";
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React
const { useSearchParams, useParams, Link } = ReactRouterDOM

export function NoteIndex() {

    const [searchParams, setSearchParams] = useSearchParams()

    const [pinnedNoteList, setPinnedNoteList] = useState()
    const [noteList, setNoteList] = useState()
    const [selectedNote, setSelectedNote] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState()

    const params = useParams()

    useEffect(() => {
        if (searchParams.get('noteId')) {
            noteService.get(searchParams.get('noteId'))
                .then(note => {
                    setIsModalOpen(true)
                    setSelectedNote(note)
                })
                .catch(err => {
                    console.log('err', err)
                    showErrorMsg('Problem opening  modal')
                })

        } else {
            loadNotes()
            setSelectedNote(null)
            setIsModalOpen(false)
        }
    }, [params, searchParams])



    function loadNotes() {
        noteService.query()
            .then(notes => {
                filterPinnedNotes(notes)
                setNoteList(notes)
            })
            .catch(() => showErrorMsg('Failed loading notes'))
    }


    function filterPinnedNotes(notes) {
        const arePinned = notes.filter(note => note.isPinned === true)
        setPinnedNoteList(() => (!arePinned.length) ? '' : arePinned)
    }


    function onDeleteNote(noteId) {
        const curNoteId = (noteId) ? noteId : searchParams.get('noteId')
        if (!curNoteId) return eventBusService.showErrorMsg('No note selected')
        else {
            noteService.remove(curNoteId)
                .then(() => {
                    setIsModalOpen(false)
                    showSuccessMsg('Note removed with Success')
                    setSelectedNote(null)
                    setSearchParams({})
                })
        }
    }
    return (
        <section className="note-index ">
            {/* <Link to="/note/edit"> */}
            <CreateNote
                setSelectedNote={setSelectedNote}
                onDeleteNote={onDeleteNote}
            />
            {/* </Link> */}
            {selectedNote && <Modal isOpen={isModalOpen}>
                <NoteEdit
                    selectedNote={selectedNote}
                    setSelectedNote={setSelectedNote}
                    onDeleteNote={onDeleteNote}
                />
            </Modal>}
            {pinnedNoteList && <NoteList key={'pinned-notes'} type={'pinned'} notes={pinnedNoteList} />}
            {!selectedNote && noteList && <NoteList key={'other-notes'} type={'other'} notes={noteList} />}
            {/* <button onClick={() => onDeleteNote()} data-toolbar={'Delete'} className="delete">Delete</button> */}

        </section>
    )
}