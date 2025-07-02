import { CreateNewNote } from "../cmps/CreateNewNote.jsx";
import { NoteList } from "../cmps/NoteList.jsx"
import { NotePreview } from "../cmps/NotePreview.jsx";
import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

export function NoteIndex() {
    const list = ''

    const [searchParams, setSearchParams] = useSearchParams()

    const [noteList, setNoteList] = useState()
    const [filterBy, setFilterBy] = useState(noteService.getFilterFromSearchParams(searchParams))
    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query(filterBy)
            .then(notes => {
                setNoteList(notes)
            })
            .catch(() => showErrorMsg('Failed loading notes'))
    }


    return (
        <section className="note-index ">
            <CreateNewNote />
            {list && <PinedNotes />}
            {noteList && <NoteList notes={noteList} />}
        </section>
    )
}
