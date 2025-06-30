
export function MailList({ mails }) {

    if (!mails.length) return <div>No Mails to Show...</div>
    return (
        <tbody>
            {mails.map(mail => (
                <tr key={mail.id}>{mail.subject}</tr>
            ))}
        </tbody>
    )
}
