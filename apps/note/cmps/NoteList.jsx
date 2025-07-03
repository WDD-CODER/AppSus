import { NotePreview } from "./NotePreview.jsx"
const { useState } = React
const { Link, } = ReactRouterDOM
export function NoteList({ notes, type}) {

const [renderList, setRenderList] = useState()


    return (
        <div className="note-list-container ">
            <h4>{type}</h4>
            <section className="note-list ">
                {notes.map(curNote => {
                    return <NotePreview onSetNote={setRenderList} key={curNote.id} note={curNote} />
                })}
            </section>
        </div>
    )
}
