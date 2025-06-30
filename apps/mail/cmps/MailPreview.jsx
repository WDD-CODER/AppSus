const { Fragment } = React

export function MailPreview({ mail }) {

    const { from, subject, body, isRead, sentAt } = mail
    return (
        <Fragment>
            <td>{from}</td>
            <td>{subject}</td>
            <td>{body}</td>
            <td>{isRead}</td>
            <td>{sentAt}</td>
        </Fragment>
    )
}