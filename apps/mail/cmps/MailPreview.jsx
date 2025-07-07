import { utilService } from "../../../services/util.service.js"

const { Fragment } = React

export function MailPreview({ mail }) {

    const { from, subject, body, sentAt, isRead } = mail
    const formatedTime = utilService.formatTimeOrDate(sentAt)

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
        </Fragment >
    )
}