const { useState } = React

export function MailFolderList() {

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
        <section className="mail-folder-list">
            <div className="mail-filters-container">
                <div className="compose-mail flex align-center">
                    <button className="icon-edit icon">edit</button>
                    <span>Compose</span>
                </div>
                <div className="mail-filter-container flex align-center" onClick={onSetActive}>
                    <button className="icon-inbox icon">inbox</button>
                    <span>Inbox</span>
                </div>
                <div className="mail-filter-container flex align-center" onClick={onSetActive}>
                    <button className="icon-star icon">star</button>
                    <span>Starred</span>
                </div>
                <div className="mail-filter-container flex align-center" onClick={onSetActive}>
                    <button className="icon-send icon">send</button>
                    <span>Sent</span>
                </div>
                <div className="mail-filter-container flex align-center" onClick={onSetActive}>
                    <button className="icon-draft icon">draft</button>
                    <span>Draft</span>
                </div>
                <div className="mail-filter-container flex align-center" onClick={onSetActive}>
                    <button className="icon-delete icon">delete</button>
                    <span>Trash</span>
                </div>
            </div>
        </section>
    )
}