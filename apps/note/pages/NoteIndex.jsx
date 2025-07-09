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

        if (!noteList) {
            animateCSS(loadingRef.current, 'heartBeat', false)
        }

        if (searchParams.get('noteId')) {
            noteService.get(searchParams.get('noteId'))
                .then(note => {
                    if (searchParams.get('time-createdAt')) {
                        setIsModalOpen(true)
                        setSelectedNote(note)
                    }
                    else setSelectedNote(note)
                })
                .catch(() => showErrorMsg('Problem opening  modal'))
        }

        if (!searchParams.get('noteId')) {
            loadNotes()
            setAddNote(false)
}
    }, [searchParams.get('noteId')])



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

    function onCreatENote() {
        setExpand(true)
    }


    function onClose() {
        setIsModalOpen(false)
        setSelectedNote(null)
        setSearchParams({})
    }


    if (!noteList) return (<div ref={loadingRef} className="loading"> Loading...</div>)

    return (

        <div className="note-index note-layout">
            <NoteSideBar />
            <NoteHeader />
            <section className="lists-container">
                <div onClick={() => setAddNote(true)}>
                    {!addNote && <AddNoteBar onAddNote={setAddNote} />}
                    {addNote && <NoteEdit
                        onClose={onClose}
                        selectedNote={selectedNote}
                        onDeleteNote={onDeleteNote}
                    />}
                </div>
                {isModalOpen && <Modal onClose={onClose} isOpen={isModalOpen}>
                    <NoteEdit
                        onClose={onClose}
                        selectedNote={selectedNote}
                        onDeleteNote={onDeleteNote}
                    />
                </Modal>}
                {pinnedNoteList && <NoteList key={'pinned-notes'} type={'pinned'} notes={pinnedNoteList} />}
                {!isModalOpen && noteList && <NoteList key={'other-notes'} type={'other'} notes={noteList} />}
                {/* <button onClick={() => onDeleteNote()}data={'Delete'} className="delete">Delete</button> */}
            </section>
        </div>
    )
}