import { Modal } from "../../../cmps/Modal.jsx";
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js";
import { animateCSS } from "../../../services/util.service.js";
import { CreateNote } from "../cmps/CreateNote.jsx";
import { NoteEdit } from "../pages/NoteEdit.jsx";
import { NoteHeader } from "../cmps/NoteHeader.jsx";
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteSideBar } from "../cmps/NoteSideBar.jsx";
import { noteService } from "../services/note.service.js"

const { useState, useEffect, useRef } = React
const { useSearchParams, useParams } = ReactRouterDOM

export function NoteIndex() {

    const [searchParams, setSearchParams] = useSearchParams()

    const [pinnedNoteList, setPinnedNoteList] = useState()
    const [noteList, setNoteList] = useState()
    const [selectedNote, setSelectedNote] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState()
    const loadingRef = useRef()
    const params = useParams()

    useEffect(() => {

        if (!noteList) {
            animateCSS(loadingRef.current, 'heartBeat', false)
            loadNotes()
        }

        if (searchParams.get('time-createdAt')) {
            noteService.get(searchParams.get('noteId'))
                .then(note => {
                    setIsModalOpen(true)
                    setSelectedNote(note)
                })
                .catch(() => showErrorMsg('Problem opening  modal'))
        }



        else {
            setSelectedNote(null)
            setIsModalOpen(false)
        }
    }, [params, searchParams.get('noteId'), !noteList])



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
                    setSelectedNote(null)
                    setSearchParams({})
                    showSuccessMsg('Note removed with Success')
                })
        }
    }

    if (!noteList) return (<div ref={loadingRef} className="loading"> Loading...</div>)

    return (

        <div className="note-index note-layout">
            <NoteSideBar />
            <NoteHeader />
            <section className="lists-container">
                <CreateNote
                    // setSelectedNote={setSelectedNote}
                    onDeleteNote={onDeleteNote}
                />
                {selectedNote && <Modal onSetIsModalOpen={setIsModalOpen} isOpen={isModalOpen}>
                    <NoteEdit
                        selectedNote={selectedNote}
                        // setSelectedNote={setSelectedNote}
                        onDeleteNote={onDeleteNote}
                    />
                </Modal>}
                {pinnedNoteList && <NoteList key={'pinned-notes'} type={'pinned'} notes={pinnedNoteList} />}
                {!selectedNote && noteList && <NoteList key={'other-notes'} type={'other'} notes={noteList} />}
                {/* <button onClick={() => onDeleteNote()}data={'Delete'} className="delete">Delete</button> */}
            </section>
        </div>
    )
}