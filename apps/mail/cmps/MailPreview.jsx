const { Fragment } = React

export function MailPreview({ mail }) {

    const { from, subject, body, sentAt } = mail
    return (
        <Fragment>
            <p className="mail-prev mail-from">{from}</p>
            <p className="mail-prev mail-subject">{subject}-</p>
            <p className="mail-prev mail-body">{body}</p>
            <p className="mail-prev mail-date">{sentAt}</p>
        </Fragment>
    )
}