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
    // const [isSidebarLong, setIsSidebarLong] = useState(false)

    const [pinnedNoteList, setPinnedNoteList] = useState()
    // const [addNoteBarOpen, setAddNoteBarOpen] = useState()


    const [noteList, setNoteList] = useState()
    const [note, setNote] = useState()
    const [isModalOpen, setIsModalOpen] = useState()
    const loadingRef = useRef()
    const { noteId } = useParams()


    useEffect(() => {
        loadNotes()
        if (!noteId) {
            setNote(null)
            // setAddNoteBarOpen(false)
            return
        }

        // only fetch and show AddNoteBar once note is ready
        noteService.get(noteId)
            .then(note => {
                setNote(note)
                setIsModalOpen(true)
                // setAddNoteBarOpen(true)
                showSuccessMsg('got note! ready for edit')
            })
            .catch(() => showErrorMsg('Problem getting note from url '))
    }, [noteId])




    useEffect(() => {
        
        if (noteId && searchParams.get('time-createdAt')) {
            console.log('noteId && searchParams.get(time-createdAt)')
            
            noteService.get(noteId)
                .then(note => {
                    // setNote(note)
                    // setAddNoteBarOpen(true)
                    setIsModalOpen(true)
                    showSuccessMsg('')
                })
                .catch(err => {
                    console.log('err', err);
                    showErrorMsg('')
                })

        }

        return () => setIsModalOpen(false)
    }, [searchParams.get('time-createdAt')])

    // useEffect(() => {
    //     setFilterBy(noteService.getFilterBySearchParams(searchParams))
    // }, [searchParams.get('filterBy')])

    // useEffect(() => {
    //     loadNotes()
    // }, [filterBy])



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

    // function toggleSidebar() {
    //     setIsSidebarLong(prevIsSidebarLong => !prevIsSidebarLong)
    // }

    function onDeleteNote(noteId) {
        const curNoteId = (noteId) ? noteId : searchParams.get('noteId')
        if (!curNoteId) return eventBusService.showErrorMsg('No note selected')
        else {
            noteService.remove(curNoteId)
                .then(() => {
                    // setIsModalOpen(false)
                    setNote(null)
                    setSearchParams({})
                    showSuccessMsg('Note removed with Success')
                })
        }
    }

    function onCloseModal(note) {
        noteService.save(note)
            .then(() => {
                // setIsModalOpen(false)
                setNote(null)
                setSearchParams({})
                showSuccessMsg(' Close model and saved note')
            })
    }
    if (!noteList) return (<div ref={loadingRef} className="loading"> Loading...</div>)
      const isNoteInTheMaking =  (searchParams.get('add')) ? true : false
    // const isEdit = (searchParams.get('time-createdAt')) ? true : false
                    console.log("🚀 ~ NoteIndex ~ searchParams.get('add'):", !searchParams.get('add'))
    return (

        <div className="note-index note-layout">
            <NoteHeader />
            <NoteSideBar defaultFilter={filterBy} onSetFilterBy={setFilterBy} />
            <section className="lists-container">
                <div className="add-note-container">
                    {!isNoteInTheMaking && <Link to="/note/edit"> <AddNoteBar /> </Link>}

                    {isNoteInTheMaking && <Outlet
                        isModalOpen={isModalOpen}
                        onCloseModal={onCloseModal}
                        selectedNote={note}
                        onDeleteNote={onDeleteNote}
                    />}
                    {/* } */}
                </div>
                {noteId && note && <Modal onCloseModal={onCloseModal} >
                    <NoteEdit
                        isModalOpen={isModalOpen}
                        onCloseModal={onCloseModal}
                        selectedNote={note}
                        onDeleteNote={onDeleteNote}
                    />
                </Modal>}
                {pinnedNoteList && <NoteList key={'pinned-notes'} type={'pinned'} notes={pinnedNoteList} />}
                {noteList && <NoteList key={'other-notes'} type={'other'} notes={noteList} />}
            </section>
        </div>
    )
}