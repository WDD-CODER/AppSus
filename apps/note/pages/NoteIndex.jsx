import { getTruthyValues } from "../../../services/util.service.js";
import { CreateNewNote } from "../cmps/CreateNewNote.jsx";
import { NoteDetails } from "../cmps/NoteDetails.jsx";
import { NoteList } from "../cmps/NoteList.jsx"
import { NotePreview } from "../cmps/NotePreview.jsx";
import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

export function NoteIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [pinnedNoteList, setPinnedNoteList] = useState()
    const [noteList, setNoteList] = useState()
    const [filterBy, setFilterBy] = useState(noteService.getFilterFromSearchParams(searchParams))

    useEffect(() => {
        setFilterBy(noteService.getFilterFromSearchParams(searchParams))
        loadNotes()
    }, [searchParams])

    function loadNotes() {
        noteService.query(filterBy)
            .then(notes => {
                filterPinnedNotes(notes)
                return setNoteList(notes)
            })
            .catch(() => showErrorMsg('Failed loading notes'))
    }

    function filterPinnedNotes(notes) {
        const arePinned = notes.filter(note => note.isPinned === true)
        setPinnedNoteList(() => (!arePinned.length) ? '' : arePinned)
    }
    
    const isNoteSelected = (!filterBy.noteId.length) ? '' : 'back-drop'
    return (
        <section className="note-index ">
            <CreateNewNote onSetNoteList={setNoteList} />
            {filterBy.noteId && <div className={isNoteSelected}></div>}
            {filterBy.noteId && <NoteDetails />}
            {pinnedNoteList && <NoteList key={'pinned-notes'} type={'pinned'} notes={pinnedNoteList} />}
            {!filterBy.noteId && noteList && <NoteList key={'other-notes'} type={'other'} notes={noteList} />}
        </section>
    )
}
