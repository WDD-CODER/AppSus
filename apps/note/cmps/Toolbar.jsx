import { showErrorMsg } from '../../../services/event-bus.service.js'
import { noteService } from '../services/note.service.js'
import { ColorDropDown } from './ColorDropDown.jsx'
const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM
export function ToolBar() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [isActive, setIsActive] = useState()
    const [note, setNote] = useState()
    // const debounceGetCurNote = debounce(getCurNote, 1000)


    useEffect(() => {
        
        if (searchParams.get('noteId') || searchParams.get('EditNoteId')) getCurNote()

    }, [searchParams.get('noteId'), searchParams.get('EditNoteId')])


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

    const tool = (!isActive) ? '' : isActive.classList

    return (
        <section className="tool-bar flex">

            <button data={'Formatting option'} className="formatting hover-show">
                <span className='icon-format_color_text  icon '>format_color_text</span>
            </button>

            <button data={'Archive'} className="archive hover-show">
                <span className='icon-archive icon '>archive</span>
            </button>

            <button data={'Background color'} className="hover-show palette"
                onClick={ev => {
                    ev.preventDefault()
                    onSetActive(ev)
                }}>
                <span className="icon-palette icon">palette</span>
                {tool.length > 0 && tool.contains('palette')
                    && <ColorDropDown onSetBgImg={onSetBgImg} onSetBgColor={onSetBgColor} />}
            </button>

            <button data={'Add alert'} className="alert hover-show">
                <span className="icon-add_alert icon">add_alert</span>
            </button>

            <button data={'Collaborator'} className="collaborator hover-show">
                <span className="icon-person_add icon">person_add</span>
            </button>

            <button data={'Add image'} className="image hover-show">
                <span className="icon-image icon">image</span>
            </button>
            <button data={'More'} className="more hover-show">
                <span className="icon-more_vert icon">more_vert</span>
            </button>
        </section>
    )
}
