import { CreateNewNote } from "../cmps/CreateNewNote.jsx";
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
        loadNotes()
    }, [])

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

    return (
        <section className="note-index ">
            <CreateNewNote />
            {pinnedNoteList && <NoteList key={'pinned-notes'} type={'pinned'} notes={pinnedNoteList} />}
            {noteList && <NoteList key={'other-notes'} type={'other'} notes={noteList} />}
        </section>
    )
}
