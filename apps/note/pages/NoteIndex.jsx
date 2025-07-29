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
    const [filterBy, setFilterBy] = useState(noteService.getFilterFromSearchParams(searchParams))// to get filter from url...
    const [pinnedNoteList, setPinnedNoteList] = useState()
    const [notes, setNotes] = useState()
    const [note, setNote] = useState()


    const [addNoteOpen, setAddNoteOpen] = useState()
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
        loadNotes()
    }, [filterBy])

    useEffect(() => {
        setFilterBy(noteService.getFilterFromSearchParams(searchParams))

    }, [searchParams])



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
            setNotes(notPinned)
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

    if (!notes) return (<div ref={loadingRef} className="loading"> Loading...</div>)
    return (
        <div className="note-index note-layout">
            <NoteHeader />
            <NoteSideBar defaultFilter={filterBy} onSetFilterBy={setFilterBy} />
            <section className="lists-container">
                <div className="add-note-container">
                    {!addNoteOpen && <Link to="/note/edit" onClick={() => setAddNoteOpen(true)}> <AddNoteBar />  </Link>
                    }
                    {addNoteOpen &&
                        <Outlet context={{ setAddNoteOpen, setNote, note, onDeleteNote ,setNotes}}
                        />}
                </div>
                {noteId && note &&
                    <Modal >
                        <NoteEdit
                            setNotes={setNotes}
                            setAddNoteOpen={setAddNoteOpen}
                            setNote={setNote}
                            note={note}
                            onDeleteNote={onDeleteNote}
                        />
                    </Modal>}
                {pinnedNoteList && <NoteList key={'pinned-notes'} type={'pinned'} notes={pinnedNoteList} setNotes={setNotes} setNote={setNote} filterBy={filterBy} />}
                {notes && <NoteList key={'other-notes'} type={'other'} notes={notes} setNotes={setNotes} setNote={setNote} filterBy={filterBy} />}
            </section>
        </div>
    )
}