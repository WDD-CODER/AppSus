import { ToolBar } from "./Toolbar.jsx";

export function NotePreview({onSaveNote,onUpdateNote}) {

    return (
        <section className="note-edit-container">
            <form className="" onSubmit={onSaveNote}>
                <button className="pin-note icon-bell "></button>
                <div className="text-info">
                    <h1 className="title"><input onBlur={onUpdateNote} name="title" type="text" placeholder="Titel..." /></h1>
                    <p className="text-info"><input onBlur={onUpdateNote} name="info" type="text" placeholder="Take a note..." /></p>
                </div>
                <div className="labels-container">{/* { Note.label && <LabelPicker/>} */}</div>
            </form>
            <section className="tool-bar flex"><ToolBar/>
                <button className="close btn" onClick={onSaveNote}>Close</button>
            </section>
        </section>
    )
}