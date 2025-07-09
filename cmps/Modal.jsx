
const { useSearchParams } = ReactRouterDOM
export function Modal({ children, isOpen, onSetIsModalOpen, onClose }) {
console.log("🚀 ~ Modal ~ children:", children)

  const [searchParams, setSearchParams] = useSearchParams()

  function closeModal() {
    onClose()
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

