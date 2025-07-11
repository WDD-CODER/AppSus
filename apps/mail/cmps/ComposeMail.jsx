import { mailService } from '../services/mail.service.js'
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { Fragment, useEffect, useState } = React

export function ComposeMail({ toggleModal, isVisable, setIsVisable }) {

    const [mailToCompose, setMailToCompose] = useState(mailService.getEmptyMail())

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setMailToCompose(prevMailToCompose => ({ ...prevMailToCompose, [field]: value }))
    }

    function onCloseAndDraftingCompose() {
        console.log(mailToCompose)
        mailService.save(mailToCompose)
            .then(mail => {
                console.log('Mail saved as a draft 📤', mail)
                showSuccessMsg('The email saved as a draft')
                closeModal()
            })
            .catch(err => {
                console.log('Cannot save mail as a draft', err)
                showErrorMsg('The email cant saved as a draft for now...')
                closeModal()
            })

    }

    function closeModal() {
        console.log('close modal...')
        toggleModal('close')
        setMailToCompose(mailService.getEmptyMail())
    }

    function onSendMail(ev) {
        ev.preventDefault()
        const mailToSend = { ...mailToCompose, sentAt: Date.now() }
        setMailToCompose(mailToSend)
        mailService.save(mailToSend)
            .then(mail => {
                console.log('Mail sent 📤', mail)
                showSuccessMsg('The email was sent successfully')
                closeModal()
            })
            .catch(err => {
                console.log('Cannot sent mail', err)
                showErrorMsg('The email cant senting for now...')
                onCloseAndDraftingCompose()
                closeModal()
            })
    }

    const { subject, body, to } = mailToCompose

    return (
        <Fragment>
            <form className="new-mail-compose">
                <div className="mail-compose-header">
                    <span>New Message</span>
                    <button className="icon-close icon" type="button"
                        onClick={onCloseAndDraftingCompose}>close
                    </button>
                </div>

                <input onChange={handleChange} value={to}
                    type="text" placeholder="Recipients" name="to" id="to" />
                <input onChange={handleChange} value={subject}
                    type="text" placeholder="Subject" name="subject" id="subject" />
                <textarea
                    onChange={handleChange} value={body}
                    name="body" id="body">
                </textarea>

                <div className="mail-compose-footer">
                    <button className="send-mail-btn" onClick={onSendMail} type="submit">Send</button>
                    <button className="icon-delete icon" type="button"
                        onClick={closeModal}>delete
                    </button>
                </div>
            </form>
        </Fragment >
    )
}