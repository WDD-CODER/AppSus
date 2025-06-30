
export function NoteIndex() {


    return (
    <section className="note-index container ">
        <div className="create-note box-shadow container">
            <label htmlFor="text" className=" flex align-center">
                <input type="text" id="text" placeholder="Take a note..." />
                <span className="icon-square-check"></span>
                <span className="icon-paintbrush"></span>
                <span className="icon-image"></span>
            </label>
        </div>
    </section>
)
}
