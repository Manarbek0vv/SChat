import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import classes from './CreateNewPost.module.scss'
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { MdOutlinePhotoCameraBack } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import Select, { OptionType } from "../../UI/Select/Select";
import Checkbox from "../../UI/Checkbox/Checkbox";
import ModalAlert from "../../UI/ModalAlert/ModalAlert";
import { addNewPost } from "../../store/thunk/addNewPost";
import PostImages from "../../UI/PostImages/PostImages";
import { SendPostType, ImageType, UsePostType } from "../types/post";

type CreateNewPostProps = {
    setIsCreatorOpen: Dispatch<SetStateAction<boolean>>;
    setPosts: React.Dispatch<React.SetStateAction<UsePostType[]>>;
}

const WHO_CAN_SEE_OPTIONS: OptionType[] = [
    { name: 'Everyone can see', value: 'EVERYONE' },
    { name: 'Visible to friends', value: 'FRIENDS' }
]


const CreateNewPost: FC<CreateNewPostProps> = ({ setIsCreatorOpen, setPosts }) => {
    const dispatch = useAppDispatch()

    const { user } = useAppSelector(value => value.user)
    const [error, setError] = useState<string | null>(null)

    const [newPostValue, setNewPostValue] = useState('')
    const [images, setImages] = useState<ImageType[]>([])
    const [whoCanSee, setWhoCanSee] = useState<OptionType>(WHO_CAN_SEE_OPTIONS[0])
    const [isHaveComments, setIsHaveComments] = useState(true)

    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)

    const onInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewPostValue(e.target.value)
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!FileReader) { setError('FileReader is not supported'); return }
        if (!e.target.files?.length) { setError('Nothing loaded'); return }
        if (images.some(currentImage => currentImage.name === (e.target.files as FileList)[0].name)) {
            setError('The image is already present')
        }

        const fileReader = new FileReader()

        fileReader.onload = () => {
            const validImageTypes = ["image/gif", "image/jpeg", "image/png", "image/webp"];

            if (!validImageTypes.includes((e.target.files as FileList)[0].type)) {
                setError('Selected file is not an image.')
                return
            }

            setImages(prev => [...prev, {
                url: fileReader.result as string,
                name: (e.target.files as FileList)[0].name,
                size: (e.target.files as FileList)[0].size
            }])
        }

        fileReader.readAsDataURL(e.target.files[0])
    }

    useEffect(() => {
        containerRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        })
    }, [containerRef])

    const sendNewPost = () => {
        if (!user) { setError('Unknown error'); return }
        if (!newPostValue.length) { setError(('Empty fields')); return }

        const currentTimestamp = Date.now()

        const commonProperties = {
            createdAt: Date.now(),
            whoCanSee: whoCanSee.value,
            comments: isHaveComments ? [] : null,
            likes: [],
            dislikes: [],
            description: newPostValue,
            id: user.uid + currentTimestamp,
            images
        }

        const newSendPost: SendPostType = {
            authorUid: user.uid,
            ...commonProperties
        }

        const newUsePost: UsePostType = {
            author: user,
            ...commonProperties
        }

        dispatch(addNewPost({ newPost: newSendPost, setError, user }))

        setPosts(prev => [newUsePost, ...prev])
        setIsCreatorOpen(false)
    }


    return (
        <div ref={containerRef} className={classes.container}>
            {error && <ModalAlert setError={setError}>{error}</ModalAlert>}


            <div className={classes.first}>
                <div className={classes.avatar}>
                    {user?.avatar && user.avatar.startsWith('http') ?
                        <img src={user.avatar} alt="" className={classes.avatar} /> :
                        <img src="/default.png" alt="" style={{ width: '100%', height: '100%' }} />}
                </div>

                <div className={classes['create__content']}>
                    <textarea ref={textareaRef} value={newPostValue} placeholder="Post text..." onInput={onInput} className={classes.textarea}></textarea>
                    <PostImages images={images} setImages={setImages} />
                </div>

                <div className={classes.buttons}>
                    <div className={classes['add__image']}>
                        <MdOutlinePhotoCameraBack className={classes.image} />
                        <input type="file" className={classes.input} onChange={onChange} />

                    </div>
                    <IoCloseSharp className={classes.close} onClick={() => setIsCreatorOpen(false)} />

                </div>
            </div>

            <hr className={classes.hr} />

            <div className={classes.second}>
                <div className={classes.options}>
                    <Select defaultValue={0} options={WHO_CAN_SEE_OPTIONS} setValue={setWhoCanSee} />

                    <label className={classes.comment}>
                        <Checkbox isChecked={isHaveComments} setIsChecked={setIsHaveComments} />
                        Enable comments
                    </label>
                </div>

                <div className={classes['button-wrapper']}>
                    <button className={classes.send} onClick={sendNewPost}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default CreateNewPost