// import { noteService } from "../services/note.service.js"
// import { ToolBar } from "../cmps/Toolbar.jsx"
// import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

// const { useState, useEffect, useRef } = React
// const { useNavigate, useSearchParams } = ReactRouterDOM

// export function AddNote({ setSelectedNote, onSetToExpand, onDeleteNote }) {
//     const [note, setNote] = useState(noteService.getEmptyNote())
//     const [searchParams, setSearchParams] = useSearchParams()
//     const navigate = useNavigate()



//     useEffect(() => {
// console.log('add note')

//         if (!note.id) {
//             noteService.save(note)
//                 .then(note => {
//                     console.log("🚀 ~ useEffect ~ note:", note)
//                     setNote(note)
//                     searchParams.set('EditNoteId', note.id)
//                     noteService.onSetNoteParams(note, searchParams, setSearchParams)
//                     showSuccessMsg('saved to storage, ready for edit :)')
//                 })
//         }

//         if (searchParams.get('background-color')) {
//             note.style.backgroundColor = searchParams.get('background-color')
//             setNote(prevNote => ({ ...prevNote, note: note }))
//         }

//         if (searchParams.get('background-image')) {
//             note.style.backgroundImage = searchParams.get('background-image')
//             setNote(note)
//         }

//     }, [searchParams])



//     function handleChange({ target }) {
//         const field = target.name
//         let value = target.value

//         if (field === 'info') {
//             setNote(prev => ({ ...prev, info: { ...prev.info, txt: value } }))
//         }
//         else setNote(prevNote => ({ ...prevNote, [field]: value }))
//     }

//     function onSaveNote(ev) {
//         ev.preventDefault()
//         setSelectedNote(null)
//         noteService.save(note)
//             .then(() => {
//                 onSetToExpand(false)
//                 navigate('/note')
//             })

//             .catch(err => {
//                 console.log('err', err)
//                 showErrorMsg('Problem saving note')
//             })
//     }

//     function onRemoveNote() {
//         onDeleteNote(note.id)
//         onSetToExpand(false)
//     }

//     const title = note && note.title ? note.title : ''
//     const info = (note && note.info && note.info.txt) ? note.info.txt : ''
//     const coverImg = (!note.style.backgroundImage) ? { backgroundColor: note.style.backgroundColor } : { backgroundImage: note.style.backgroundImage }

//     return (
//         <section style={coverImg} key={(note) ? note.id : ''} className="add-note box">
//             <form className="edit-note-form" onSubmit={onSaveNote}>
//                 <button className="pin-note"><span className=" icon-keep icon">keep</span></button>
//                 <div className="text-info">
//                     <h1 className="title">
//                         <input onChange={handleChange}
//                             name="title"
//                             value={title}
//                             type="text" placeholder="title..." />
//                     </h1>
//                     <p className="info">
//                         <input onChange={handleChange}
//                             name="info"
//                             value={info}
//                             type="text"
//                             placeholder="Take a note..." />
//                     </p>
//                 </div>

//                 <div className="labels-container">{/* { Note.label && <LabelPicker/>} */}</div>
//             </form>
//             <section className="tool-bar flex"><ToolBar />
//                 <button className="delete" data={'Delete'} onClick={ev => { ev.preventDefault(), onRemoveNote() }}>Delete</button>
//                 <button className="close btn" onClick={onSaveNote}>Close</button>
//             </section>
//         </section>
//     )
// }

