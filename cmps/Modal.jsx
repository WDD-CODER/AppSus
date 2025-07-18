import { NoteEdit } from "../apps/note/pages/NoteEdit.jsx"
import { noteService } from "../apps/note/services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useEffect, useState } = React
const { useSearchParams, useParams } = ReactRouterDOM
export function Modal({ children, onCloseModal}) {
  // const { props } = children
  // console.log("🚀 ~ Modal ~ props:", props)

  const [searchParams, setSearchParams] = useSearchParams()
  const [curNote, setCurNote] = useState()

  const { noteId } = useParams()
  // const { isModalOpen, note, onCloseModal, onDeleteNote } = props
  useEffect(() => {
    if (noteId) {
      console.log('modal has opend!')
      document.body.classList.add('no-scroll')
    }
    // noteService.get(noteId)
    //   .then(note => {
    //     setNote(note)
    //     showSuccessMsg('got note from url with success')
    //   })
    //   .catch(err => {
    //     console.log('err', err);
    //     showErrorMsg('failed getting note from url')
    //   })


    return () => {
      showSuccessMsg('modal unmounted')
      document.body.classList.remove('no-scroll')
    }
  }, [])


  function closeModal() {
    console.log('closeModal')
    // noteService.get(searchParams.get('noteId'))
    //   .then(note => onCloseModal(note))
    //   .catch(() => showErrorMsg(' Problem closing model '))
  }
  // console.log("🚀 ~ Modal ~ children.props.note:", children.props.selectedNote)

  if (!noteId) return <div>Loading...</div>

  return (
    <React.Fragment>
      <section className="modal">
        <div onClick={() => closeModal()} className='modal-backdrop'></div>
        <div className="edit-modal-container">
          {/* <NoteEdit /> */}
          {children}
        </div>
        <button className='close-btn' onClick={() => closeModal()}></button>
      </section>
    </React.Fragment>
  )
}

