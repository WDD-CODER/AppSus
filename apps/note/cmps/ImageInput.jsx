

export function ImageInput({ onSelect ,curNoteBackGround }) {

    const images = [
        { imageUrl: 'url("assets/images/back1.jpeg")', imageName: 'cover1' },
        { imageUrl: 'url("assets/images/back2.jpeg")', imageName: 'cover2' },
        { imageUrl: 'url("assets/images/back3.jpeg")', imageName: 'cover3' },
        { imageUrl: 'url("assets/images/back4.jpeg")', imageName: 'cover4' },
        { imageUrl: 'url("assets/images/back5.jpeg")', imageName: 'cover5' },
        { imageUrl: 'url("assets/images/back6.jpeg")', imageName: 'cover6' },
    ]

    return (
        <div className="background-select-option flex ">
            {images.map(Image => {
                return <div key={Image.imageUrl} onClick={onSelect} style={{ backgroundImage:Image.imageUrl }} data-type={Image.imageName} className="img-pick box hover-show"></div>
            })}
        </div>
    )


} 