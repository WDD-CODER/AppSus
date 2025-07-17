const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'
import { NotFound } from './cmps/NotFound.jsx'
import { MailDetails } from './apps/mail/pages/MailDetails.jsx'
import { AboutDan } from './cmps/AboutDan.jsx'
import { AboutLioz } from './cmps/AboutLioz.jsx'
import { NoteEdit } from './apps/note/pages/NoteEdit.jsx'
import { Modal } from './cmps/Modal.jsx'
import { NoteList } from './apps/note/cmps/NoteList.jsx'
import { AddNoteBar } from './apps/note/cmps/AddNoteBar.jsx'

export function RootCmp() {
    return <Router>
        <main className="root-cmp">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />}>
                    <Route path="Dan" element={<AboutDan/>} />
                    <Route path="Lioz" element={<AboutLioz/>} />
                </Route>

                <Route path="/mail" element={<MailIndex />} />
                <Route path="/mail/:mailId" element={<MailDetails />} />

                <Route path="/note" element={<NoteIndex />}>
                <Route path="edit" element={<NoteEdit />} />
                <Route path="edit/:noteId" element={<Modal  />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
            <UserMsg />
        </main>
    </Router>
}
