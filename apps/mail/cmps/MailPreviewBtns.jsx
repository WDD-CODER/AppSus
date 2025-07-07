

export function MailPreviewBtns({ mail }) {

    const handleActionClick = (ev) => {
        ev.preventDefault()
        ev.stopPropagation() 
        console.log('Action button clicked for mail:', mail.id)
        // e.g., if you have different buttons:
        if (ev.target.dataset.action === 'mark-read') console.log('mark')
        if (ev.target.dataset.action === 'delete') console.log('mark')
    }

    const checkIsMailRead = isReadMail()

    function isReadMail() {
        const readMail = {
            iconClassName: '',
            iconString: ''
        }

        if (mail.isRead) {
            readMail.iconClassName = 'icon-mark_email_unread icon'
            readMail.iconString = 'mark_email_unread'
        } else {
            readMail.iconClassName = 'icon-drafts icon'
            readMail.iconString = 'drafts'
        }
        return readMail
    }

    return (
        <div className="mail-prev mail-act-btns">
            <button className="icon-delete icon" data-action="delete" onClick={handleActionClick}>delete</button>
            <button className={checkIsMailRead.iconClassName} data-action="mark-read" onClick={handleActionClick}>{checkIsMailRead.iconString}</button>
        </div>
    )
}