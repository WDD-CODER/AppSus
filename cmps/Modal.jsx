
const { useSearchParams } = ReactRouterDOM
export function Modal({ children, isOpen, onClose = () => { isOpen = '' } }) {

  const [searchParams, setSearchParams] = useSearchParams()

  function closeModal() {
    onClose()
  }

  if (!isOpen) return null

  return (
    <React.Fragment>
      <section onClick={closeModal} className='modal modal-backdrop'></section>
      <section className='modal-content box '>
        {children}
        <button className='close-btn' onClick={closeModal}>X</button>
      </section>
    </React.Fragment>
  )
}

