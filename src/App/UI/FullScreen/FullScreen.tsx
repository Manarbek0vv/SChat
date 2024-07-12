import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import classes from './FullScreen.module.scss'
import { createPortal } from "react-dom";
import { ImageType } from "../../components/CreateNewPost/CreateNewPost";
import { convertBytes } from "../../secondaryFunctions/convertBytes";

type FullScreenProps = {
    image: ImageType;
    setImage: Dispatch<SetStateAction<ImageType | null>>;
}

const FullScreen: FC<FullScreenProps> = ({ image, setImage }) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)

    const onDownload = () => {
        const downloader = document.createElement('a')
        downloader.setAttribute('href', image.url)
        downloader.setAttribute('download', image.name)
        downloader.click()
    }

    const closeFullScreen = () => {
        wrapperRef.current?.classList.add(classes['wrapper-disable'])
        containerRef.current?.classList.add(classes['container-disable'])
        setTimeout(() => {
            setImage(null)
        }, 300)
    }


    return createPortal(
        <div ref={wrapperRef} className={classes.wrapper}>
            <div ref={containerRef} className={classes.container}>
                <div className={classes['image-wrapper']}>
                    <img src={image.url} alt="" className={classes.image} />
                </div>

                <div className={classes.info}>
                    <p className={classes.text}>
                        {image.name}, {convertBytes(image.size)}
                    </p>

                    <div className={classes.buttons}>
                        <button className={classes.button} onClick={onDownload}>Download</button>
                        <button className={classes.button} onClick={closeFullScreen}>Close</button>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('modal') as HTMLDivElement
    )
}

export default FullScreen