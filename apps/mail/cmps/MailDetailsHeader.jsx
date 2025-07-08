import { mailService } from "../services/mail.service.js";

// const { useState, useEffect } = React

export function MailDetailsHeader({ onBack, mail, onToggleMailRead }) {

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

    function onMarkRead(ev) {
        ev.preventDefault()
        // mail.isRead = !mail.isRead
        // setMailToMark(mail)
        // mailService.save(mailToMark)
        //     .then(mail => console.log(mail))
        onToggleMailRead(mail)
    }

    return (
        <section className="mail-details-header">
            <button className="icon-arrow_back icon" onClick={onBack}>arrow_back</button>
            <button className="icon-delete icon">delete</button>
            <button className={checkIsMailRead.iconClassName} data-action="mark-read"
                onClick={onMarkRead}
            >{checkIsMailRead.iconString}</button>
        </section>
    )
}