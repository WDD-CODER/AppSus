import { utilService } from "../../../services/util.service.js"

const { Fragment } = React

export function MailPreview({ mail }) {

    const handleActionClick = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        console.log('Action button clicked for mail:', mail.id)

        // if (ev.target.dataset.action === 'check-box') console.log('check-box')
        if (ev.target.dataset.action === 'starred') console.log('starred')
    }

    const { from, subject, body, sentAt, isRead } = mail
    const formatedTime = utilService.formatTimeOrDate(sentAt)

    return (
        <Fragment>
            <div className="mail-prev mail-from">
                {/* <button className="icon-check_box_outline_blank icon"
                    data-action="check-box" onClick={handleActionClick}>check_box_outline_blank</button> */}
                <button className="icon-star icon"
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