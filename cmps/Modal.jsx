
const { useSearchParams } = ReactRouterDOM
export function Modal({ children, isOpen, onSetIsModalOpen }) {

  const [searchParams, setSearchParams] = useSearchParams()

  function closeModal() {
    onSetIsModalOpen(false)
    setSearchParams({})
  }

  if (!isOpen) return null

  return (
    <React.Fragment>
      <section onClick={() => closeModal()} className='modal modal-backdrop'></section>
      <section className='modal-content box '>
        {children}
        <button className='close-btn' onClick={() => closeModal()}></button>
      </section>
    </React.Fragment>
  )
}

