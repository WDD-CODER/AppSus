const { useState } = React

export function NoteSideBar() {

    const [isActive, setIsActive] = useState()

    function onSetActive(ev) {
        if (isActive) {
            isActive.classList.remove('long')
            isActive.classList.remove('active')
        }

        ev.currentTarget.classList.add('long')
        ev.currentTarget.classList.add('active')
        setIsActive(ev.currentTarget)
    }

    return (
        <section className="note-side-bar">
            <div className="filters-container">
                <div className="selection-container flex align-center" onClick={onSetActive}>
                    <button className="icon-lightbulb icon"></button>
                    <span >Notes</span>
                </div>
                <div className="selection-container flex align-center" onClick={onSetActive}>
                    <button className="icon-bell icon"></button>
                    <span >Reminders</span>
                </div>
                <div className="selection-container flex align-center" onClick={onSetActive}>
                    <button className="icon-pen icon"></button>
                    <span >Labels</span>
                </div>
                <div className="selection-container flex align-center" onClick={onSetActive}>
                    <button className="icon-archive icon"></button>
                    <span >Edit Labels</span>
                </div>
                {/* <div className="selection-container flex align-center" onClick={onSetActive}>
                    <button className="icon-archive icon"></button>
                    <span >Archive</span>
                </div> */}
                <div className="selection-container flex align-center " onClick={onSetActive}>
                    <button className="icon-trash-can icon"></button>
                    <span >Trashed</span>
                </div>
            </div>
        </section>
    )
}
