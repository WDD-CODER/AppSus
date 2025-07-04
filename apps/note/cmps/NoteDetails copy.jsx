// import { eventBusService, showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"
// import { noteService, } from "../services/note.service.js"
// import { ToolBar } from "./Toolbar.jsx"

// const { useState, useEffect, useRef } = React
// const { useParams, useNavigate, useSearchParams } = ReactRouterDOM
// export function NoteDetails() {

//     const [searchParams, setSearchParams] = useSearchParams()
//     const [note, setNote] = useState()
//     console.log("🚀 ~ NoteDetails ~ note:", note)
//     const navigate = useNavigate()


//     useEffect(() => {
//         loadNote()
//             .catch(err => {
//                 console.log('err', err)
//                 showErrorMsg('Problem loading note to details...')
//             })
//     }, [])

//     function loadNote() {
//         const noteId = searchParams.get('noteId')
//         return noteService.get(noteId)
//             .then(note => setNote(note))
//             .catch(err => {
//                 console.log('err', err)
//                 showErrorMsg('Problem loading note')
//             })
//     }

//     function onSetSearchParams() {
//         searchParams.delete('noteId')
//         setSearchParams(searchParams)
//     }

//     return (
//         <React.Fragment>
//             <form className="note-details box" onSubmit={() => onSetSearchParams()}>
//                 <button className="pin-note icon-bell "></button>
//                 <div className="text-info">
//                     <h1 className="title"><input name="title" type="text" placeholder="title..." /></h1>
//                     <p className="text-info"><input name="info" type="text" placeholder="Take a note..." /></p>
//                 </div>
//                 {/* <div className="labels-container">{ Note.label && <LabelPicker/>}</div> */}
//                 <section className="tool-bar"><ToolBar />
//                     <button className="close btn">Close</button>
//                 </section>
//             </form>
//         </React.Fragment>
//     )
// }
