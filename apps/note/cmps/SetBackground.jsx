import { ColorInput } from "./ColorInput.jsx";
import { ImageInput } from "./ImageInput.jsx";
// const { useState, useEffect } = React
export function SetBackground({ onSetBackground }) {

    // const [NoteBackground, setNoteBackground] = useState({
    //     BackgroundColor: 'rgb(255 255 255)',
    //     BackgroundImage: '',
    // })
    // useEffect(() => {
    //     console.log('variable')
        
    //     if (NoteBackground) onSetBackground(NoteBackground)
    // }, [NoteBackground])


    // function onSetBackgroundStyle(newStyle) {
    //     setNoteBackground(prevBack => ({...prevBack, ...newStyle}))
    // }


    return (
        <section className="set-background box container ">
            <ColorInput onSelect={onSetBackground} />
            <ImageInput onSelect={onSetBackground} />
        </section>
    )

}


    // const [NoteBackground, setNoteBackground] = useState({
    //     BackgroundColor: 'rgb(255 255 255)',
    //     BackgroundImage: '',
    // })
    // useEffect(() => {
    //     console.log('variable')
        
    //     if (NoteBackground) onSetBackground(NoteBackground)
    // }, [NoteBackground])


    // function onSetBackgroundStyle(newStyle) {
    //     setNoteBackground(prevBack => ({...prevBack, ...newStyle}))
    // }


    // return (
    //     <section className="set-background box container ">
    //         <DynamicCmp cmpType="color" onSelect={onSetBackgroundStyle} />
    //     </section>
    // )

    // function DynamicCmp(props) {
    //     const dynamicCmpMap = {
    //         color: <ColorInput {...props} />
    //     }
    //     return dynamicCmpMap[props.cmpType]
    // }

