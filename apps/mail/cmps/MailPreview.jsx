import { utilService } from "../../../services/util.service.js"

const { Fragment } = React

export function MailPreview({ mail }) {

    const { from, subject, body, sentAt, isRead } = mail
    const formatedTime = utilService.formatTimeOrDate(sentAt)
    const checkIsMailRead = isReadMail()

    function isReadMail() {
        const readMail = {
            iconClassName: '',
            iconString: ''
        }

        if (isRead) {
            readMail.iconClassName = 'icon-mark_email_unread icon'
            readMail.iconString = 'mark_email_unread'
        } else {
            readMail.iconClassName = 'icon-drafts icon'
            readMail.iconString = 'drafts'
        }
        return readMail
    }

    return (
        <Fragment>
            <div className="mail-prev mail-from">
                <p>{from}</p>
            </div>
            <div className="mail-prev mail-content">
                <p className="mail-subject">{subject}-</p>
                <p className="mail-body">{body}</p>
            </div>
            <div className="mail-prev mail-date">
                <p>{formatedTime}</p>
            </div>
            <div className="mail-prev mail-act-btns">
                <button className="icon-delete icon">delete</button>
                <button className={checkIsMailRead.iconClassName}>{checkIsMailRead.iconString}</button>
            </div>
        </Fragment >
    )
}