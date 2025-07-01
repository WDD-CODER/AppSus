

import { NoteEdit } from "./NoteEdit.jsx"
const { useState } = React

export function  CreateNewNote(){

const [expand, setExpand] = useState()

return (
            <div className="create-new-note box-shadow box flex align-center container">
               {!expand &&  <React.Fragment>
                    <button onClick={setExpand} className="open-create-note" > Take a note... </button>
                    <div className="icon-select">
                        <span className="icon-square-check"></span>
                        <span className="icon-paintbrush"></span>
                        <span className="icon-image"></span>
                        <input type="text" />
                    </div>
                </React.Fragment>}
                {expand &&  <NoteEdit onSetExpand={setExpand}/>}
            </div>

)

}