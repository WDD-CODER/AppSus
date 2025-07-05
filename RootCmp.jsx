const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'
import { SideBar } from './cmps/SideBar.jsx'
import { NotFound } from './cmps/NotFound.jsx'
import { AddNote } from './apps/note/pages/AddNote.jsx'
import { MailDetails } from './apps/mail/pages/MailDetails.jsx'
import { NoteEdit } from './apps/note/cmps/NoteEdit.jsx'
import { Modal } from './cmps/Modal.jsx'

export function RootCmp() {
    return <Router>
        <main className="root-cmp main-layout ">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} />
                <Route path="/mail/:mailId" element={<MailDetails />} />
                <Route path="/note" element={<NoteIndex />} />
                <Route path="/note/edit" element={<NoteIndex />} />
                <Route path="/note/edit/:noteId" element={<NoteIndex />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <UserMsg />
        </main>
    </Router>
}
