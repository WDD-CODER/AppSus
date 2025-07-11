import { Modal } from "../../../cmps/Modal.jsx";
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js";
import { animateCSS } from "../../../services/util.service.js";
import { AddNoteBar } from "../cmps/AddNoteBar.jsx";
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
    const [addNote, setAddNote] = useState()
    const [noteList, setNoteList] = useState()
    const [selectedNote, setSelectedNote] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState()
    const loadingRef = useRef()

    useEffect(() => {

        const noteId = searchParams.get('noteId')
        const noteTimeCreated = searchParams.get('time-createdAt')

        if (!noteList) {
            animateCSS(loadingRef.current, 'heartBeat', false)
        }

        if (noteId) {
            noteService.get(noteId)
                .then(note => {
                    if (noteTimeCreated) {
                        console.log('variable')
                        setIsModalOpen(true)
                        setSelectedNote(note)
                    }
                    else {
                        setIsModalOpen(false)
                        setSelectedNote(note)
                        setAddNote(true)
                    }
                })
                .catch(() => showErrorMsg('Problem opening  modal'))
        }

        if (!noteId) loadNotes()

        if (!noteId && !noteTimeCreated) setAddNote(false)

    }, [searchParams.get('noteId'), searchParams.get('time-createdAt')])

    useEffect(() => {
        if (isModalOpen) document.body.classList.add('no-scroll')
        else document.body.classList.remove('no-scroll')

    }, [isModalOpen])

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

    function onCloseModal(note) {
        noteService.save(note)
            .then(() => {
                setIsModalOpen(false)
                setSelectedNote(null)
                setSearchParams({})
                showSuccessMsg(' Close model and saved note')
            })
    }

    if (!noteList) return (<div ref={loadingRef} className="loading"> Loading...</div>)

    return (

        <div className="note-index note-layout">
            <NoteHeader />
            <NoteSideBar />
            <section className="lists-container">
                <div className="add-note-container"
                    onClick={() => setAddNote(true)}>
                    {!addNote && <AddNoteBar
                    //  onAddNote={setAddNote} 
                    />}
                    {addNote && <NoteEdit
                        onCloseModal={onCloseModal}
                        selectedNote={selectedNote}
                        onDeleteNote={onDeleteNote}
                    />}
                </div>
                {isModalOpen && <Modal onCloseModal={onCloseModal} isOpen={isModalOpen}>
                    <NoteEdit
                        onCloseModal={onCloseModal}
                        selectedNote={selectedNote}
                        onDeleteNote={onDeleteNote}
                    />
                </Modal>}
                {pinnedNoteList && <NoteList key={'pinned-notes'} type={'pinned'} notes={pinnedNoteList} />}
                {!isModalOpen && noteList && <NoteList key={'other-notes'} type={'other'} notes={noteList} />}
                {/* <button onClick={() => onDeleteNote()}data-type={'Delete'} className="delete">Delete</button> */}
            </section>
        </div>
    )
}