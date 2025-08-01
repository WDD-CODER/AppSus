import { utilService } from "../../../services/util.service.js"

const { Fragment } = React

export function MailPreview({ mail, onToggleMailStarred }) {

    const handleActionClick = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()

        if (ev.target.dataset.action === 'starred') {
            onToggleMailStarred(mail.id)
        }
    }

    const { from, subject, body, sentAt, isStarred } = mail
    const formatedTime = utilService.formatTimeOrDate(sentAt)

    return (
        <Fragment>
            <div className="mail-prev mail-from">
                <button className={`icon-star icon ${isStarred ? 'starred' : ''}`}
                    data-action="starred" onClick={handleActionClick}>star</button>
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