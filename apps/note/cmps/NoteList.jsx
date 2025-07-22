import { NotePreview } from "./NotePreview.jsx"
const {useState,useEffect} = React

export function NoteList({ notes, type, setNote, setNotes }) {
console.log("🚀 ~ NoteList ~ notes:", notes)

    const [curNotes, setCurNotes] = useState(notes)

    useEffect(() => {
        if (notes) setCurNotes(notes)
            console.log('setNotes')
            
    }, [notes])


    return (
        <div className="note-list-container ">
            <h4>{type}</h4>
            <section className="note-list ">
                {notes.map(curNote => {
                    return <NotePreview key={curNote.id} notes={notes} setNote={setNote} note={curNote} />
                })}
            </section>
        </div>
    )
}
