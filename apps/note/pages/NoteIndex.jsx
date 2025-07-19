import { Modal } from "../../../cmps/Modal.jsx";
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js";
import { animateCSS } from "../../../services/util.service.js";
import { AddNoteBar } from "../cmps/AddNoteBar.jsx";
import { NoteEdit } from "../pages/NoteEdit.jsx";
import { NoteHeader } from "../cmps/NoteHeader.jsx";
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteSideBar } from "../cmps/NoteSideBar.jsx";
import { noteService } from "../services/note.service.js"

const { useState, useEffect, useRef, } = React
const { useSearchParams, useParams, Link, Outlet } = ReactRouterDOM

export function NoteIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(noteService.getFilterBySearchParams(searchParams))// to get filter from url...
    const [pinnedNoteList, setPinnedNoteList] = useState()
    const [noteList, setNoteList] = useState()
    const [note, setNote] = useState()


    const [newNoteClose, setNewNoteClose] = useState()
    const loadingRef = useRef()
    const { noteId } = useParams()


    useEffect(() => {
        loadNotes()
        if (!noteId) {
            setNote(null)
            return
        }

        noteService.get(noteId)
            .then(note => {
                setNote(note)
                showSuccessMsg('got note! ready for edit')
            })
            .catch(() => showErrorMsg('Problem getting note from url '))
    }, [noteId])

    useEffect(() => {
        console.log('change to note')
        loadNotes()
    }, [!note])


    function loadNotes() {
        noteService.query(filterBy)
            .then(notes => {
                filterPinnedNotes(notes)
            })
            .catch(() => showErrorMsg('Failed loading notes'))
    }

    function filterPinnedNotes(notes) {
        const pinned = notes.filter(note => { if (note.isPinned === true) return note })
        if (pinned) {
            setPinnedNoteList(pinned)
        }
        const notPinned = notes.filter(note => { if (note.isPinned !== true) return note })
        if (notPinned) {
            setNoteList(notPinned)
        }
    }


    function onDeleteNote(noteId) {
        const curNoteId = (noteId) ? noteId : searchParams.get('noteId')
        if (!curNoteId) return eventBusService.showErrorMsg('No note selected')
        else {
            noteService.remove(curNoteId)
                .then(() => {
                    setNote(null)
                    setSearchParams({})
                    showSuccessMsg('Note removed with Success')
                })
        }
    }

    if (!noteList) return (<div ref={loadingRef} className="loading"> Loading...</div>)
    return (
        <div className="note-index note-layout">
            <NoteHeader />
            <NoteSideBar defaultFilter={filterBy} onSetFilterBy={setFilterBy} />
            <section className="lists-container">
                <div className="add-note-container">
                    {!newNoteClose && <Link to="/note/edit" onClick={() => setNewNoteClose(true)}> <AddNoteBar /> </Link>}
                    {newNoteClose &&
                        <Outlet context={{ setNewNoteClose, setNote, note, onDeleteNote }}
                            onSetNewNoteClose={setNewNoteClose}
                            onSetSelectedNote={setNote}
                            selectedNote={note}
                            onDeleteNote={onDeleteNote}
                        />}
                </div>
                {noteId && note &&
                    <Modal >
                        <NoteEdit
                            setNewNoteClose={setNewNoteClose}
                            setNote={setNote}
                            note={note}
                            onDeleteNote={onDeleteNote}
                        />
                    </Modal>}
                {pinnedNoteList && <NoteList key={'pinned-notes'} type={'pinned'} notes={pinnedNoteList} />}
                {noteList && <NoteList key={'other-notes'} type={'other'} notes={noteList} />}
            </section>
        </div>
    )
}