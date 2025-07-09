

export function ColorInput({ onSelect, curNoteBackGround }) {

    const colors = [
        { mark: '#F44236', colorName: 'red' },
        { mark: '#9C27B0', colorName: 'purple' },
        { mark: '#3F51B5', colorName: 'indigo' },
        { mark: '#2196F3', colorName: 'blue' },
        { mark: '#4caf50', colorName: 'green' },
        { mark: '#101010', colorName: 'black' }
    ]

    function onSetColor(color) {
        const newStyle = { backgroundColor: color }
        onSelect(newStyle)
    }

    return (
        <div className="color-choose flex ">
            {colors.map(color => {
                return <div key={color.mark} onClick={onSelect} style={{ backgroundColor: color.mark }} data-type={color.colorName} className="color-pick box hover-show"></div>
            })}
        </div>
    )


} 