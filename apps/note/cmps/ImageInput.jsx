

export function ImageInput({ onSelect ,curNoteBackGround }) {



    const images = [
        { imageUrl: 'url("assets/images/coverImg1.png")', imageName: 'cover1' },
        { imageUrl: 'url("assets/images/coverImg2.png")', imageName: 'cover2' },
        { imageUrl: 'url("assets/images/coverImg3.png")', imageName: 'cover3' },
        { imageUrl: 'url("assets/images/coverImg4.png")', imageName: 'cover4' },
        { imageUrl: 'url("assets/images/coverImg5.png")', imageName: 'cover5' }
    ]


    return (
        <div className="color-choose flex ">
            {images.map(Image => {
                return <div key={Image.imageUrl} onClick={onSelect} style={{ backgroundImage:Image.imageUrl }} data-type={Image.imageName} className="img-pick box hover-show"></div>
            })}
        </div>
    )


} 