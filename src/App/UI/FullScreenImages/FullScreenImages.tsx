import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import classes from './FullScreenImages.module.scss'
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import { convertBytes } from "../../secondaryFunctions/convertBytes";
import FullScreen from "../FullScreen/FullScreen";
import { ImageType } from "../PostImages/PostImages";

type FullScreenImagesProps = {
    images: ImageType[];
    setIsVisible: Dispatch<SetStateAction<boolean>>;
    setImages?: Dispatch<SetStateAction<ImageType[]>>
}

const FullScreenImages: FC<FullScreenImagesProps> = ({ images, setIsVisible, setImages }) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const [totalFullScreenImage, setTotalFullScreenImage] = useState<ImageType | null>(null)

    const closeComponent = () => {
        wrapperRef.current?.classList.add(classes['disable-wrapper'])
        setTimeout(() => {
            setIsVisible(false)
        }, 300)
    }

    const deleteImage = (image: ImageType) => {
        if (!setImages) return

        setImages(prev => prev.filter(currentImage => currentImage.url !== image.url))

        if (images.length - 1 < 3) closeComponent()
    }

    return createPortal(
        <div ref={wrapperRef} className={classes.wrapper}>
            {totalFullScreenImage && <FullScreen image={totalFullScreenImage} setImage={setTotalFullScreenImage} />}

            <div className={classes.container}>
                <div className={classes.header}>
                    <p className={classes['count-of-images']}>Images ({images.length})</p>

                    <IoClose className={classes.close} onClick={closeComponent} />
                </div>

                <div className={classes.images}>
                    {images.map(image => {
                        return (
                            <div key={image.url} className={classes['image-wrapper']} onClick={() => setTotalFullScreenImage(image)}>
                                <img src={image.url} alt="" className={classes.image} />
                                {setImages && <IoClose className={classes['delete-image']}
                                    onClick={(e: React.MouseEvent<HTMLOrSVGElement>) => {
                                        e.stopPropagation()
                                        deleteImage(image);
                                    }} />}

                                <div className={classes['image-info']}>
                                    <p className={classes['image-name']}>{image.name}</p>
                                    <p className={classes['image-size']}>{convertBytes(image.size)}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>,
        document.getElementById('modal') as HTMLDivElement
    )
}

export default FullScreenImages