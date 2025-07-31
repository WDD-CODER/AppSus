import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { noteService } from '../services/note.service.js'
import { SetBackground } from './SetBackground.jsx'

const { useNavigate } = ReactRouterDOM

const { useState, useEffect } = React
export function ToolBar({ children, onUpdateNote, note }) {
    const [isActive, setIsActive] = useState()
    const navigate = useNavigate()

    function onSetActive({ currentTarget }) {
        if (isActive === currentTarget) {
            currentTarget.classList.remove('active')
            setIsActive(null)
        } else {
            if (isActive) isActive.classList.remove('active')
            currentTarget.classList.add('active')
            setIsActive(currentTarget)
        }
    }

    // function handleUpdateNote(changes, successMsg) {
    //     const updatedNote = { ...note, ...changes }
    //     setNote(updatedNote)
    //     noteService.save(updatedNote)
    //         .then(savedNote => {
    //             setNote(savedNote)
    //             if (successMsg) showSuccessMsg(successMsg)
    //             return savedNote
    //         })
    //         .catch(() => showErrorMsg('Update failed'))
    //         // .then(savedNote => {
    //         //     setNotes(prevNotes =>
    //         //         prevNotes.map(n => n.id === savedNote.id ? savedNote : n)
    //         //     )
    //         // })
    //     }


    function onSetBackground({ target }) {
        const style = { backgroundColor: '', backgroundImage: '' }
        if (target.style['background-color']) {
            style.backgroundColor = target.style['background-color']
        }
        else if (target.style['background-image']) {
            style.backgroundImage = target.style['background-image']
        }
        console.log('note', note)
        const updatedNote = { ...note, style: { ...note.style, ...style } }

        // handleUpdateNote({ style: { ...note.style, ...style } }, 'changed background')
        onUpdateNote(updatedNote)
    }


    function onSetToArchive() {
        if (note.archive) {
            showErrorMsg('note is already archived ')
            navigate('/note')
            return
        }
        handleUpdateNote({ archive: true }, 'Note archived')
        setNote(prevCurNote => ({ ...prevCurNote, archive: true, isPinned: false }))
        navigate('/note')
    }

    const tool = (!isActive) ? '' : isActive.classList

    return (
        <section className="tool-bar flex">

            <button data-type={'Formatting option'} className="formatting hover-show">
                <span className='icon-format_color_text  icon '>format_color_text</span>
            </button>

            <button data-type={'Archive'} className="archive hover-show">
                <span onClick={ev => {
                    ev.preventDefault()
                    onSetToArchive()
                }} className='icon-archive icon '>archive</span>
            </button>

            <button data-type={'Background'} className="hover-show palette"
                onClick={ev => {
                    ev.preventDefault()
                    onSetActive(ev)
                }}>
                <span className="icon-palette icon">palette</span>
                {isActive && isActive.classList.contains('palette')
                    && <SetBackground onSetBackground={onSetBackground} />}
            </button>

            <button data-type={'Add-alert'} className="alert hover-show">
                <span className="icon-add_alert icon">add_alert</span>
            </button>

            <button data-type={'Collaborator'} className="collaborator hover-show">
                <span className="icon-person_add icon">person_add</span>
            </button>

            <button data-type={'Add-image'} className="image hover-show">
                <span className="icon-image icon">image</span>
            </button>
            {children}
        </section>
    )
}
