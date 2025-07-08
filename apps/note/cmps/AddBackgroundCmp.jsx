export function AddBackgroundCmp({onSetBackgroundStyle}) {

    const colors = [
        '#F44236',
        '#9C27B0',
        '#3F51B5',
        '#2196F3',
        '#4caf50',
        '#101010',
    ]


    return (
<section className="add-background box "> 
{colors.map(color => {
                 <div key={color} onClick={() => onSetBgColor()} style={{ backgroundColor: color }} data={'Purple'} className="color-pick box hover-show"> </div>
})}
</section>

)

}