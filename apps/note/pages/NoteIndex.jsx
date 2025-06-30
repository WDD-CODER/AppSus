
export function NoteIndex() {


    return (
        <section className="note-index grid container">
            <div className="create-note box-shadow box flex align-center container">
                {/* <section htmlFor="text" className=" flex align-center"></label> */}
                <input type="text" id="text" placeholder="Take a note..." />
                <section className="icon-select">
                    <span className="icon-square-check"></span>
                    <span className="icon-paintbrush"></span>
                    <span className="icon-image"></span>
                </section>
            </div>
        </section>
    )
}
