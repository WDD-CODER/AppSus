import { mailService } from "../services/mail.service.js";
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js";

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

    function onDeleteMail(mailId) {
        mailService.get(mailId)
            .then(mail => {
                if (!mail.removedAt) {
                    mail.removedAt = Date.now()
                    mailService.save(mail)
                        .then(trashedMail => {
                            console.log('mail has trashed!', trashedMail)
                            showSuccessMsg('Mail is moved to trash folder..')
                            onBack()
                        })
                        .catch(err => {
                            console.log('err', err)
                            showErrorMsg('cant trashed mail')
                        })
                } else {
                    mailService.remove(mailId)
                        .then(deletedMail => {
                            console.log('mail has deleted!', deletedMail)
                            showSuccessMsg('Mail has deleted!')
                            onBack()
                        })
                        .catch(err => {
                            console.log('err', err)
                            showErrorMsg('Cant deleted mail')
                        })
                }
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Cant get mail..')
            })
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
            <button className="icon-delete icon" onClick={(ev) => onDeleteMail(mail.id)}>delete</button>
            <button className={checkIsMailRead.iconClassName} data-action="mark-read"
                onClick={onMarkRead}
            >{checkIsMailRead.iconString}</button>
        </section>
    )
}