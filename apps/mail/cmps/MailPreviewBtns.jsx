import { mailService } from "../services/mail.service.js"
import { showErrorMsg } from "../../../services/event-bus.service.js"

const { useState } = React

export function MailPreviewBtns({ mail, onToggleMailRead }) {

    // const [mailToMark, setMailToMark] = useState(mail)
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

    const checkIsMailRead = isReadMail()

    const handleActionClick = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        // console.log('Action button clicked for mail:', mail.id)

        const action = ev.currentTarget.dataset.action
        if (action === 'mark-read') {
            const originalIsRead = mail.isRead
            const updatedMail = { ...mail, isRead: !mail.isRead }
            onToggleMailRead(updatedMail)

            mailService.save(updatedMail)
                .then(savedMail => {
                    console.log('Mail status toggled and saved:', savedMail)
                })
                .catch(err => {
                    console.log('Error toggling mail read status:', err)
                    showErrorMsg('Could not toggle mail status.')
                    onToggleMailRead({ ...mail, isRead: originalIsRead })
                })
        } else if (action === 'delete') {
            console.log('Delete action triggered for mail:', mail.id)
        }

        // if (ev.target.dataset.action === 'mark-read') onMarkRead()
        // if (ev.target.dataset.action === 'delete') console.log('delete')
    }

    // function onMarkRead(ev) {
    //     // ev.preventDefault()
    //     mail.isRead = !mail.isRead
    //     setMailToMark(mail)
    //     mailService.save(mailToMark)
    //         .then(mail => console.log(mail))
    // }

    return (
        <div className="mail-prev mail-act-btns">
            <button className="icon-delete icon" data-action="delete"
                onClick={handleActionClick}>delete</button>
            <button className={checkIsMailRead.iconClassName} data-action="mark-read"
                onClick={handleActionClick}>{checkIsMailRead.iconString}</button>
        </div>
    )
}