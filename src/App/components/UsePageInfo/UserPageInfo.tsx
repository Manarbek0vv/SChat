import { FC, useState } from "react";
import classes from './UserPageInfo.module.scss'
import { AiOutlinePicture } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { FaDna } from "react-icons/fa6";
import { MdOutlineAppRegistration } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { UserState } from "../../store/reducers/userSlice";
import ModalAlert from "../../UI/ModalAlert/ModalAlert";
import { PhotoType } from "../../store/thunk/addPhoto";

type TextType = {
    pin: React.ReactNode | React.ReactChild;
    title: string;
    description: string;
}

const Months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];

type UserPageInfoProps = {
    user: UserState;
}

const UserPageInfo: FC<UserPageInfoProps> = ({ user }) => {
    const [ error, setError ] = useState<string | null>(null)

    const convertTimeStampToString = (timestamp: number) => {
        const date = new Date(timestamp)
        return `${date.getDate()} ${Months[date.getMonth()]} ${date.getFullYear()}`
    }

    const Texts: TextType[] = [
        { pin: <MdOutlineEmail />, title: 'Email', description: user.email as UserState['email'] },
        { pin: <FaBirthdayCake />, title: 'Birthday', description: user?.birthday ? 'Not specified' : 'Not specified' },
        { pin: <FaDna />, title: 'Gender', description: user?.gender ? user.gender : 'Not specified' },
        { pin: <MdOutlineAppRegistration />, title: 'Registration date', description: convertTimeStampToString(user.registered as number)},
        { pin: <FaUserFriends />, title: 'Friends', description: user.friends?.length ? `${user.friends.length}` : '0' }
    ]

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
                    See photo
                </button>
            </div>
        </div>
    )
}

export default UserPageInfo