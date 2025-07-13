import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { SetBackground } from './SetBackground.jsx'
const { useState, useEffect } = React
export function ToolBar({ children, onSetSelectedNote, selectedNote, onUpdateNote }) {

    const [isActive, setIsActive] = useState()
    const [curNote, setCurNote] = useState(selectedNote)


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

    function onSetBackground({ target }) {
        const style = { backgroundColor: '', backgroundImage: '' }
        if (target.style['background-color']) {
            style.backgroundColor = target.style['background-color']
        }
        else if (target.style['background-image']) {
            style.backgroundImage = target.style['background-image']
        }

        onUpdateNote({ style:{...curNote.style,...style }  }, 'changed background')
        setCurNote(prevSelectedNote => ({...prevSelectedNote, style: ({...prevSelectedNote.style, ...style})}))
    }


    function onSetToArchive() {
        if (curNote.archive) {
            showErrorMsg('note is already archived ')
            return
        }
        onUpdateNote({archive:true}, 'Note archived')
        setCurNote(prevCurNote => ({...prevCurNote,  archive:true, isPinned:false  }))
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
