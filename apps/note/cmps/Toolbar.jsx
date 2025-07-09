import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { noteService } from '../services/note.service.js'
import { SetBackground } from './SetBackground.jsx'
const { useState, useEffect } = React
const { useSearchParams, useNavigate } = ReactRouterDOM
export function ToolBar({ onSetNote }) {

    const [searchParams, setSearchParams] = useSearchParams()
    const [isActive, setIsActive] = useState()
    const [note, setNote] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        if (searchParams.get('noteId')) getCurNote()

    }, [searchParams.get('noteId')])


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

    function getCurNote() {
        if (searchParams.get('noteId')) {
            noteService.get(searchParams.get('noteId'))
                .then(note => setNote(note))
                .catch(() => showErrorMsg(" Couldn't get Note from storage."))
        }
        else if (searchParams.get('EditNoteId')) {
            noteService.get(searchParams.get('EditNoteId'))
                .then(setNote)
                .catch(() => showErrorMsg(" Couldn't get EditNote from storage."))
        }
    }

    function onSetBgColor(clr) {
        note.style.backgroundColor = clr
        searchParams.set('background-color', clr)
        setSearchParams(searchParams)
        noteService.save(note)
            .then(setNote)
    }

    function onSetBgImg(imgSrc) {
        note.style.backgroundImage = imgSrc
        searchParams.set('background-image', imgSrc)
        setSearchParams(searchParams)
        noteService.save(note)
            .then(setNote)
    }


    function onSetBackground({ target }) {
        console.log("🚀 ~ onSetBackground ~ target:", target)

        const style = { backgroundColor: '', backgroundImage: '' }
        if (target.style['background-color']) {
            style.backgroundColor = target.style['background-color']
        }
        else if (target.style['background-image']) {
            style.backgroundImage = target.style['background-image']
        }

        note.style = { ...style }
        noteService.save(note)
            .then(note => {
                onSetNote(note)
                showSuccessMsg(' Color changed ')
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg(' Color was not updated correct ')
            })
    }



    const tool = (!isActive) ? '' : isActive.classList

    return (
        <section className="tool-bar flex">

            <button data-type={'Formatting option'} className="formatting hover-show">
                <span className='icon-format_color_text  icon '>format_color_text</span>
            </button>

            <button data-type={'Archive'} className="archive hover-show">
                <span className='icon-archive icon '>archive</span>
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
            <button data-type={'More'} className="more hover-show">
                <span className="icon-more_vert icon">more_vert</span>
            </button>
        </section>
    )
}
