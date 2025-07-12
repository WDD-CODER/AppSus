// import { Modal } from "../../../cmps/Modal.jsx";
// import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js";
// import { animateCSS } from "../../../services/util.service.js";
// import { AddNoteBar } from "../cmps/AddNoteBar.jsx";
// import { NoteEdit } from "../pages/NoteEdit.jsx";
// import { NoteHeader } from "../cmps/NoteHeader.jsx";
// import { NoteList } from "../cmps/NoteList.jsx"
// import { NoteSideBar } from "../cmps/NoteSideBar.jsx";
// import { noteService } from "../services/note.service.js"

// const { useState, useEffect, useRef } = React
// const { useSearchParams, useParams } = ReactRouterDOM

// export function NoteArchive() {

//     const [searchParams, setSearchParams] = useSearchParams()
//     const [filterBy, setFilterBy] = useState(noteService.getFilterBySearchParams(searchParams))// to get filter from url...
//     console.log("🚀 ~ NoteArchive ~ filterBy:", filterBy)
//     // const onSetFilterBy = useRef(utilService.debounce(setFilterBy, 500)).current

//     // const [pinnedNoteList, setPinnedNoteList] = useState()
//     // const [addNoteBarOpen, setAddNoteBarOpen] = useState()
//     const [noteList, setNoteList] = useState()
//     const [selectedNote, setSelectedNote] = useState(null)
//     const [isModalOpen, setIsModalOpen] = useState()
//     const loadingRef = useRef()
    
//     useEffect(() => {
//         console.log("🚀 ~ NoteArchive ~ noteList:", noteList)
//        if (!noteList) loadNotes()
    
//     }, [noteList])
    
//     // useEffect(() => {
//     //     const noteId = searchParams.get('noteId')
//     //     const noteTimeCreated = searchParams.get('time-createdAt')

//     //     if (!noteId && !noteTimeCreated) {
//     //         setSelectedNote(null)
//     //         // setAddNoteBarOpen(false)
//     //     }

//     //     if (!noteList) {
//     //         animateCSS(loadingRef.current, 'heartBeat', false)
//     //     }

//     //     if (noteId) {
//     //         noteService.get(noteId)
//     //             .then(note => {
//     //                 if (noteTimeCreated) {
//     //                     console.log('variable')
//     //                     setIsModalOpen(true)
//     //                     setSelectedNote(note)
//     //                 }
//     //                 else {
//     //                     setIsModalOpen(false)
//     //                     setSelectedNote(note)
//     //                     // setAddNoteBarOpen(true)
//     //                 }
//     //             })
//     //             .catch(() => showErrorMsg('Problem opening  modal'))
//     //     }

//     //     if (!noteId) {
//     //         // setSearchParams(utilService.getTruthyValues(filterBy))// for setting url ...
//     //         loadNotes()
//     //     }

//     //     // if (!noteId && !noteTimeCreated) setAddNoteBarOpen(false)

//     // }, [searchParams.get('noteId'), searchParams.get('time-createdAt')])

//     // useEffect(() => {
//     //     if (isModalOpen) document.body.classList.add('no-scroll')
//     //     else document.body.classList.remove('no-scroll')

//     // }, [isModalOpen])

//     function loadNotes() {
//         noteService.query({archive:true})
//             .then(notes => {
//                 console.log("🚀 ~ loadNotes ~ notes:", notes)
//                 setNoteList(notes)
//                 // filterPinnedNotes(notes)
//             })
//             .catch(() => showErrorMsg('Failed loading notes'))
//     }

//     // function filterPinnedNotes(notes) {
//     //     const pinned = notes.filter(note => { if (note.isPinned === true) return note })
//     //     if (pinned) setPinnedNoteList(pinned)
//     //     const notPinned = notes.filter(note => { if (note.isPinned !== true) return note })
//     //     if (notPinned) setNoteList(notPinned)
//     // }

//     function onDeleteNote(noteId) {
//         const curNoteId = (noteId) ? noteId : searchParams.get('noteId')
//         if (!curNoteId) return eventBusService.showErrorMsg('No note selected')
//         else {
//             noteService.remove(curNoteId)
//                 .then(() => {
//                     setIsModalOpen(false)
//                     setSelectedNote(null)
//                     setSearchParams({})
//                     showSuccessMsg('Note removed with Success')
//                 })
//         }
//     }

//     function onCloseModal(note) {
//         noteService.save(note)
//             .then(() => {
//                 setIsModalOpen(false)
//                 setSelectedNote(null)
//                 setSearchParams({})
//                 showSuccessMsg(' Close model and saved note')
//             })
//     }

//     console.log("🚀 ~ NoteArchive ~ noteList:", noteList)
//     if (!noteList) return (<div ref={loadingRef} className="loading"> Loading...</div>)

//     return (

//         <div className="note-archive note-layout">
//             <NoteHeader />
//             <NoteSideBar />
//             <section className="lists-container">
//                 {/* {isModalOpen && <Modal onCloseModal={onCloseModal} isOpen={isModalOpen}>
//                     <NoteEdit
//                         onCloseModal={onCloseModal}
//                         selectedNote={selectedNote}
//                         onDeleteNote={onDeleteNote}
//                     />
//                 </Modal>} */}

//                 <NoteList key={'Archive notes'} type={'archive'} notes={noteList} />
//             </section>
//         </div>
//     )
// }