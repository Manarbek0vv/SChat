import { Dispatch, FC, SetStateAction, useState } from "react";
import classes from './PostImages.module.scss';
import { IoMdClose } from "react-icons/io";
import FullScreen from "../FullScreen/FullScreen";
import FullScreenImages from "../FullScreenImages/FullScreenImages";
import { ImageType } from "../../components/types/post";

type PostImagesProps = {
    images: ImageType[];
    setImages?: Dispatch<SetStateAction<ImageType[]>>;
}

const PostImages: FC<PostImagesProps> = ({ images, setImages }) => {
    const [totalFullScreenImage, setTotalFullScreenImage] = useState<ImageType | null>(null)
    const [isFullScreenImagesOpen, setIsFullScreenImagesOpen] = useState(false)

    return (
        <div className={classes['create__content']}>
            {totalFullScreenImage && <FullScreen image={totalFullScreenImage} setImage={setTotalFullScreenImage} />}
            {isFullScreenImagesOpen && <FullScreenImages setImages={setImages} images={images} setIsVisible={setIsFullScreenImagesOpen} />}

            <div className={images.length === 1 ? classes['grid-one-element'] : images.length === 2 ? classes['grid-two-element'] : classes['grid-three-element']}>
                {images.slice(0, 3).map((image, index) => {
                    return <div key={image.url} className={classes['image-wrapper']}>
                        <img className={classes.image} src={image.url} alt="" onClick={() => setTotalFullScreenImage(image)} />
                        {setImages && <IoMdClose className={classes['close-image']} onClick={() => setImages(prev => {
                            return prev.filter(currentImage => currentImage.url !== image.url)
                        })} />}
                        {index === 2 && <div className={classes['open-more-images']} onClick={() => setIsFullScreenImagesOpen(true)}>+{images.length - 2}</div>}
                    </div>
                })}
            </div>
        </div>
    )
}

export default PostImages