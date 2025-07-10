const { useState } = React

export function NoteSideBar() {

    const [isActive, setIsActive] = useState()

    function onSetActive({currentTarget}) {
        if (isActive === currentTarget) {
            currentTarget.classList.remove('long', 'active')
            setIsActive(null)
        } else {
            if (isActive) {
                isActive.classList.remove('long', 'active')
            }
            currentTarget.classList.add('long', 'active')
            setIsActive(currentTarget)
        }
    }

    return (
        <section className="note-side-bar">
            <div className="filters-container">
                <div className="selection-container flex align-center" onClick={onSetActive}>
                    <button className="icon-lightbulb icon">lightbulb</button>
                    <span >Notes</span>
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
