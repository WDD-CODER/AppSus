import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getFilterFromSearchParams
}

window.mailService = mailService

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail =>
                    regExp.test(mail.subject)
                    || regExp.test(mail.body)
                    || regExp.test(mail.from)
                )
            }
            if (filterBy.folder) {
                if (filterBy.folder === 'inbox') {
                    mails = mails.filter(mail => mail.to === loggedinUser.email && !mail.removedAt)
                } else if (filterBy.folder === 'starred') {
                    mails = mails.filter(mail => mail.starred && mail.sentAt && !mail.removedAt)
                } else if (filterBy.folder === 'sent') {
                    mails = mails.filter(mail => mail.from === loggedinUser.email && mail.sentAt && !mail.removedAt)
                } else if (filterBy.folder === 'draft') {
                    mails = mails.filter(mail => mail.from === loggedinUser.email && mail.sentAt === null && !mail.removedAt)
                } else if (filterBy.folder === 'trash') {
                    mails = mails.filter(mail => mail.removedAt)
                }
            }
            return mails
        })
}


function get(mailId) {
    return storageService.get(MAIL_KEY, mailId).then(_setNextPrevMailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail() {
    return {
        createdAt: Date.now(),
        subject: '',
        body: '',
        isRead: true,
        sentAt: null,
        removedAt: null,
        from: loggedinUser.email,
        to: '',
    }
}

function getDefaultFilter() {
    return { txt: '', folder: 'inbox' }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || defaultFilter[field]
    }

    return filterBy
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            { id: 'e101', createdAt: 1551133930500, subject: 'Miss you!', body: 'Would love to catch up sometime.', isRead: false, sentAt: 1551133930594, removedAt: null, from: 'momo@momo.com', to: 'user@appsus.com' },
            { id: 'e102', createdAt: 1678886400000, subject: 'Project Update', body: 'The latest project updates are attached.', isRead: true, sentAt: 1678886410000, removedAt: null, from: 'team@company.com', to: 'user@appsus.com' },
            { id: 'e103', createdAt: 1751310260724, subject: 'Meeting Reminder', body: 'Reminder: Our meeting is tomorrow at 10 AM.', isRead: false, sentAt: 1751310270724, removedAt: null, from: 'calendar@appsus.com', to: 'user@appsus.com' },
            { id: 'e104', createdAt: 1651810260724, subject: 'Your Order Shipped!', body: 'Good news! Your recent order has shipped.', isRead: true, sentAt: 1651810460724, removedAt: null, from: 'noreply@store.com', to: 'user@appsus.com' },
            { id: 'e105', createdAt: 1679145600000, subject: 'Holiday Discount', body: 'Exclusive holiday discounts just for you!', isRead: false, sentAt: 1679145620000, removedAt: null, from: 'promos@marketing.com', to: 'user@appsus.com' },
            { id: 'e106', createdAt: 1679232000000, subject: 'Password Reset', body: 'You requested a password reset. Click here.', isRead: false, sentAt: 1679232030000, removedAt: null, from: 'security@website.com', to: 'user@appsus.com' },
            { id: 'e107', createdAt: 1679318400000, subject: 'Feedback Request', body: 'We value your feedback on our new feature.', isRead: true, sentAt: 1679318440000, removedAt: null, from: 'support@service.com', to: 'user@appsus.com' },
            { id: 'e108', createdAt: 1679404800000, subject: 'Invoice #12345', body: 'Please find your latest invoice attached.', isRead: true, sentAt: 1679404850000, removedAt: null, from: 'billing@company.com', to: 'user@appsus.com' },
            { id: 'e109', createdAt: 1679491200000, subject: 'Upcoming Event', body: 'Join us for our exciting upcoming event!', isRead: false, sentAt: 1679491260000, removedAt: null, from: 'events@community.org', to: 'user@appsus.com' },
            { id: 'e110', createdAt: 1679577600000, subject: 'Newsletter - March Edition', body: 'Read our latest newsletter for March.', isRead: true, sentAt: 1679577670000, removedAt: null, from: 'newsletter@blog.com', to: 'user@appsus.com' },
            { id: 'e111', createdAt: 1679664000000, subject: 'Job Application Status', body: 'Update on your recent job application.', isRead: false, sentAt: 1679664080000, removedAt: null, from: 'hr@corp.com', to: 'user@appsus.com' },
            { id: 'e112', createdAt: 1751710260724, subject: 'Your Subscription Expiring', body: 'Action required: Your subscription is expiring soon.', isRead: false, sentAt: 1751710270724, removedAt: null, from: 'accounts@service.com', to: 'user@appsus.com' },
            { id: 'e113', createdAt: 1679836800000, subject: 'New Feature Alert!', body: 'Discover our exciting new feature today.', isRead: true, sentAt: 1679836895000, removedAt: null, from: 'product@app.com', to: 'user@appsus.com' },
            { id: 'e114', createdAt: 1751810260724, subject: 'Welcome to Our Service', body: 'Thank you for joining! Here\'s how to get started.', isRead: false, sentAt: 1751810263724, removedAt: null, from: 'welcome@onboarding.com', to: 'user@appsus.com' },
            { id: 'e115', createdAt: 1680009600000, subject: 'Quick Question', body: 'Just a quick question about our last discussion.', isRead: false, sentAt: 1680009700000, removedAt: null, from: 'colleague@work.com', to: 'user@appsus.com' }
        ]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(subject) {
    const mail = getEmptyMail(subject)
    mail.id = utilService.makeId()
    return mail
}

function _setNextPrevMailId(mail) {
    return query().then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        return mail
    })
}