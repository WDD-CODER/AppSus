import { LongTxt } from "../cmps/LongTxt.jsx"
import { animateCSS } from "../services/util.service.js"
const { useRef, useEffect } = React

export function Home() {
    const ref = useRef()
    const imgRef = useRef()
    const pRef = useRef()

    useEffect(() => {
        animateCSS(ref.current, 'jackInTheBox', false)
            .then(() => {
                animateCSS(pRef.current, 'slideIn', false)
                animateCSS(imgRef.current, 'flash', false)
            })
    }, [])
    const aboutTxt =
    
        "Your notes are scattered, your emails are unread, and your brain gave up last Tuesday. " +
        "We get it. That’s why we built KeepItTogether — the all-in-one app to tame your digital chaos. " +
        "Think Google Keep meets Gmail, but with fewer corporate vibes and more human ones. " +
        "Create, pin, archive, and (eventually) reply to stuff you meant to deal with a week ago. " +
        "Coming Soon: BookSync. Ever jotted down a quote and lost the book? " +
        "Our upcoming BookSync feature links your notes to books you’re reading — " +
        "so your ideas finally have context. Or at least a title."


    return (
        <section className="home-about-layout home container">
            <h1 ref={ref} >Welcome to AppSuse the KeepItAllTogether app </h1>
            <p ref={pRef}><LongTxt txt={aboutTxt} />
            </p>
            <img ref={imgRef} src="./assets/utilImages/homePage.png" alt="welcome image" />
        </section>
    )
}

