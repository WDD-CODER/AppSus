import { LongTxt } from "../cmps/LongTxt.jsx"
import { animateCSS } from "../services/util.service.js"

const { Outlet, Link, } = ReactRouterDOM
const { useState, useRef, useEffect } = React
export function About() {

    const refH1 = useRef()

    useEffect(() => {
        animateCSS(refH1.current, 'bounceInDown')
    }, [])

    const aboutTxt = `
Welcome to AppSus — your all-in-one space for notes and emails.
Whether you’re jotting down ideas, making lists, or editing that draft
you meant to send last week, AppSus keeps it all in one place.

Inspired by Google Keep and Gmail, we’ve combined note-taking and
email editing into a simple, clean app that actually helps you stay organized.
Pin important items, archive what’s done, and find everything easily
when you need it.

Why the horse logo? “Sus” means horse in Hebrew — and we liked the sound of it.

AppSus is a student-built project, designed with care (and a few late-night coding sessions).
We’re still adding features, but the goal is simple: help you manage
the little things before they pile up.

Start typing. We’ll handle the chaos.
`;

    const [active, setActive] = useState()
    return (
        <section className="home-about-layout about container">
            <h1 ref={refH1} >About Us</h1>
            <LongTxt txt={aboutTxt} />
            <Outlet />
            <div className="actions">
                <Link to="Dan">
                    <button className={active === "Dan" ? "btn active" : "btn"}
                        onClick={() => setActive("Dan")}
                    >Show About Dan</button>
                </Link>
                <Link to="Lioz">
                    <button className={active === 'Lioz' ? "btn active" : "btn"}
                        onClick={() => setActive('Lioz')}
                    >Show About Lioz</button>
                </Link>
            </div>
        </section >
    )
}