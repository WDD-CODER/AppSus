import { noteService } from "./apps/note/services/note.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

const { useSearchParams } = ReactRouterDOM
export function Modal({ children, isOpen, onCloseModal }) {
  const [searchParams, setSearchParams] = useSearchParams()

  function closeModal() {
    console.log('closeModal')

    noteService.get(searchParams.get('noteId'))
      .then(note => onCloseModal(note))
      .catch(() => showErrorMsg(' Problem closing model '))
  }

  if (!isOpen) return null

  return (
    <React.Fragment>
      {/* <section className='modal-content  '> */}
      <section className="modal">
        <div onClick={() => closeModal()} className='modal-backdrop'></div>
       <div className="edit-modal-container">
        {children}
        </div> 
        <button className='close-btn' onClick={() => closeModal()}></button>
      </section>
    </React.Fragment>
  )
}

