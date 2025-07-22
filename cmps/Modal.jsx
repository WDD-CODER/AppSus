import { noteService } from "../apps/note/services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useEffect, useState } = React
const { useSearchParams, useParams, useNavigate } = ReactRouterDOM
export function Modal({ children, onCloseModal }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [curNote, setCurNote] = useState()

  const navigate = useNavigate()
  const { noteId } = useParams()
  useEffect(() => {
    if (noteId) {
      document.body.classList.add('no-scroll')
    }
    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [])


  function closeModal() {
    const { props } = children
    noteService.save(props.note)
      .then(() => {
        navigate(-1)
        showSuccessMsg('note saved!')})
      .catch(err => {
        console.log('err', err)
        showErrorMsg('note saved!')
        navigate(-1)
      })
  }
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

