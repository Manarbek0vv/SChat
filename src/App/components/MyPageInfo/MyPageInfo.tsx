import { FC, useState } from "react";
import classes from './MyPageInfo.module.scss'
import { AiOutlinePicture } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { MdOutlineEmail } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { FaDna } from "react-icons/fa6";
import { MdOutlineAppRegistration } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { UserState } from "../../store/reducers/userSlice";
import ModalAlert from "../../UI/ModalAlert/ModalAlert";
import { PhotoType, addPhoto } from "../../store/thunk/addPhoto";

type TextType = {
    pin: React.ReactNode | React.ReactChild;
    title: string;
    description: string;
}

const Months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];

const MyPageInfo: FC = () => {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(value => value.user)
    const [ error, setError ] = useState<string | null>(null)

    const convertTimeStampToString = (timestamp: number) => {
        const date = new Date(timestamp)
        return `${date.getDate()} ${Months[date.getMonth()]} ${date.getFullYear()}`
    }

    const Texts: TextType[] = [
        { pin: <MdOutlineEmail />, title: 'Email', description: user?.email as UserState['email'] },
        { pin: <FaBirthdayCake />, title: 'Birthday', description: user?.birthday ? 'Not specified' : 'Not specified' },
        { pin: <FaDna />, title: 'Gender', description: user?.gender ? user.gender : 'Not specified' },
        { pin: <MdOutlineAppRegistration />, title: 'Registration date', description: convertTimeStampToString(user?.registered as number)},
        { pin: <FaUserFriends />, title: 'Friends', description: user?.friends ? `${user.friends.length}` : '0' }
    ]

    const onPhotoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!FileReader) {
            setError('FileReader is not supported')
            return
        } if (!e.target.files?.length) {
            setError('Nothing loaded')
            return
        }

        const fileReader = new FileReader()
        fileReader.onload = () => {
            dispatch(addPhoto({ url: fileReader.result as string, setError, uid: user?.uid as string }))
        }

        fileReader.readAsDataURL(e.target.files[0])
    }

    return (
        <div className={classes.container}>
            {error && <ModalAlert setError={setError}>{error}</ModalAlert>}

            <div className={classes.info}>
                <h1 className={classes.title}>Information</h1>

                <div className={classes.texts}>
                    {Texts.map((text: TextType) => {
                        return (
                            <p key={text.title} className={classes.text}>{text.pin} {text.title}: {text.description}</p>
                        )
                    })}
                </div>
            </div>

            <div className={classes.second}>
                <h1 className={classes.title}>
                    <AiOutlinePicture className={classes.pin} />
                    Photo
                </h1>

                <div className={classes.photos}>
                    {user?.photos.map((photo: PhotoType) => {
                        return (
                            <div key={photo.url} className={classes.photo}>
                                <img src={photo.url} alt="" className={classes.inner} />
                            </div>
                        )
                    })}

                    {!user?.photos.length && <h1 className={classes.notfound}>No photos found</h1>}
                </div>

                <button className={classes.button}>
                    Upload a photo
                    <input type="file" className={classes.input} onChange={onPhotoHandler} />
                </button>
            </div>
        </div>
    )
}

export default MyPageInfo