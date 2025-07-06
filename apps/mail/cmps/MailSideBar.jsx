const { useState } = React

export function MailSideBar() {

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
        <section className="mail-side-bar">
            <div className="mail-filters-container">
                <div className="compose-mail flex align-center">
                    <button className="icon">✏</button>
                    <span>Compose</span>
                </div>
                <div className="mail-filter-container flex align-center" onClick={onSetActive}>
                    <button className="icon">📫</button>
                    <span>Inbox</span>
                </div>
                <div className="mail-filter-container flex align-center" onClick={onSetActive}>
                    <button className="icon">⭐</button>
                    <span>Starred</span>
                </div>
                <div className="mail-filter-container flex align-center" onClick={onSetActive}>
                    <button className="icon">📩</button>
                    <span>Sent</span>
                </div>
                <div className="mail-filter-container flex align-center" onClick={onSetActive}>
                    <button className="icon">📄</button>
                    <span>Draft</span>
                </div>
                <div className="mail-filter-container flex align-center" onClick={onSetActive}>
                    <button className="icon">🗑</button>
                    <span>Trash</span>
                </div>
            </div>
        </section>
    )
}