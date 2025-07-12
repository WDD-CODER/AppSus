import { ColorInput } from "./ColorInput.jsx";
import { ImageInput } from "./ImageInput.jsx";
export function SetBackground({ onSetBackground }) {


    return (
        <section className="set-background box container ">
            <ColorInput onSelect={onSetBackground} />
            <ImageInput onSelect={onSetBackground} />
        </section>
    )

}

