
const {useEffect} = React
const {useSearchParams} = ReactRouterDOM
export function Modal({ children, isOpen, onClose = () => { isOpen = '' } }) {

const [searchParams, setSearchParams] =useSearchParams()
    
useEffect(() => {

  
  return () => {
    onClose()
    searchParams.delete('noteId')
    setSearchParams(searchParams)
  }
}, [])

    if (!isOpen) return null



    return (
        <React.Fragment>
            <section onClick={onClose} className='modal modal-backdrop'></section>
            <section className='modal-content box '>
                {children}
                <button className='close-btn' onClick={onClose}>X</button>
            </section>
        </React.Fragment>
    )
}

