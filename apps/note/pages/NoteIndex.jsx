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
    const [filterBy, setFilterBy] = useState(noteService.getFilterBySearchParams(searchParams))// to get filter from url...
    const [isSidebarLong, setIsSidebarLong] = useState(false)

    const [pinnedNoteList, setPinnedNoteList] = useState()
    const [addNoteBarOpen, setAddNoteBarOpen] = useState()
    const [noteList, setNoteList] = useState()
    const [selectedNote, setSelectedNote] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState()
    const loadingRef = useRef()

    useEffect(() => {
        const noteId = searchParams.get('noteId')
        const noteTimeCreated = searchParams.get('time-createdAt')


        if (!noteId && !noteTimeCreated) {
            setSelectedNote(null)
            setAddNoteBarOpen(false)
        }

        if (!noteList) {
            animateCSS(loadingRef.current, 'heartBeat', false)
        }

        if (noteId) {
            noteService.get(noteId)
                .then(note => {
                    if (noteTimeCreated) {
                        console.log('from list, opening modal ')
                        setIsModalOpen(true)
                        setSelectedNote(note)
                    }
                    else {
                        console.log('create new, opening NoteBar ')
                        setIsModalOpen(false)
                        setSelectedNote(note)
                        setAddNoteBarOpen(true)
                    }
                })
                .catch(() => showErrorMsg('Problem opening  modal'))
        }

        if (!noteId) {
            setSearchParams(utilService.getTruthyValues(filterBy))// for setting url ...
            loadNotes()
        }

        if (!noteId && !noteTimeCreated) setAddNoteBarOpen(false)

    }, [searchParams.get('noteId'), searchParams.get('time-createdAt'),])



    useEffect(() => {
        setFilterBy(noteService.getFilterBySearchParams(searchParams))
    }, [searchParams.get('filterBy')])
    
    useEffect(() => {
        loadNotes()
    }, [filterBy])


    useEffect(() => {
        if (isModalOpen) document.body.classList.add('no-scroll')
        else document.body.classList.remove('no-scroll')

    }, [isModalOpen])

    function loadNotes() {
        console.log("🚀 ~ loadNotes ~ filterBy:", filterBy)
        noteService.query(filterBy)
            .then(notes => {
                filterPinnedNotes(notes)
            })
            .catch(() => showErrorMsg('Failed loading notes'))
    }

    function filterPinnedNotes(notes) {
        const pinned = notes.filter(note => { if (note.isPinned === true) return note })
        if (pinned) setPinnedNoteList(pinned)
        const notPinned = notes.filter(note => { if (note.isPinned !== true) return note })
        if (notPinned) setNoteList(notPinned)
    }

    function toggleSidebar() {
        console.log('variable')
        
        setIsSidebarLong(prevIsSidebarLong => !prevIsSidebarLong)
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
const shoePinnedList = (pinnedNoteList)
    return (

        <div className="note-index note-layout">
            <NoteHeader onToggleSidebar={toggleSidebar} />
            <NoteSideBar onToggleSidebar={toggleSidebar} isSideBarLong={isSidebarLong} defaultFilter={filterBy} onSetFilterBy={setFilterBy} />
            <section className="lists-container">
                <div className="add-note-container"
                    onClick={() => {
                        setAddNoteBarOpen(true)
                    }}>
                    {!addNoteBarOpen && <AddNoteBar
                    />}
                    {addNoteBarOpen && <NoteEdit
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
                {pinnedNoteList.length > 0 && <NoteList key={'pinned-notes'} type={'pinned'} notes={pinnedNoteList} />}
                {!isModalOpen && noteList && <NoteList key={'other-notes'} type={'other'} notes={noteList} />}
            </section>
        </div>
    )
}