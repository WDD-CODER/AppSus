
const { useParams } = ReactRouterDOM
export function NoteDetails() {

    const { noteId } = useParams()


    return (
        <section className="note-edit">
            <dialog className="note-details">

                <form className="edit-note-form" onSubmit={onSaveNote}>
                    <button className="pin-note icon-bell "></button>
                    <div className="text-info">
                        <h1 className="title"><input onChange={onUpdateNote} name="title" type="text" placeholder="Titel..." /></h1>
                        <p className="text-info"><input onChange={onUpdateNote} name="info" type="text" placeholder="Take a note..." /></p>
                    </div>
                    <div className="labels-container">{/* { Note.label && <LabelPicker/>} */}</div>
                </form>
                <section className="tool-bar flex"><ToolBar />
                    <button className="close btn" onClick={goBack}>Close</button>
                </section>
            </dialog>
        </section>

    )
}