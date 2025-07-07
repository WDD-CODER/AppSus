const { useState } = React

export function NoteSideBar() {

    const [isActive, setIsActive] = useState()

    function onSetActive(ev) {
        const el = ev.currentTarget

        if (isActive === el) {
            el.classList.remove('long', 'active')
            setIsActive(null)
        } else {
            if (isActive) {
                isActive.classList.remove('long', 'active')
            }
            el.classList.add('long', 'active')
            setIsActive(el)
        }
    }

    return (
        <section className="note-side-bar">
            <div className="filters-container">
                <div className="selection-container flex align-center" onClick={onSetActive}>
                    <button className="icon-lightbulb icon">lightbulb</button>
                    <span className="icon">Notes</span>
                </div>
                <div className="selection-container flex align-center" onClick={onSetActive}>
                    <button className="icon-notifications icon">notifications</button>
                    <span >Reminders</span>
                </div>
                <div className="selection-container flex align-center" onClick={onSetActive}>
                    <button className="icon-edit icon">edit</button>
                    <span >Labels</span>
                </div>
                <div className="selection-container flex align-center" onClick={onSetActive}>
                    <button className="icon-archive icon">archive</button>
                    <span >Edit Labels</span>
                </div>
                <div className="selection-container flex align-center " onClick={onSetActive}>
                    <button className="icon-delete icon">delete</button>
                    <span >Trashed</span>
                </div>
            </div>
        </section>
    )
}
