import { FC, useState } from "react";
import classes from './MyPageHeader.module.scss'
import ModalAlert from "../../UI/ModalAlert/ModalAlert";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { updateAvatar } from "../../store/thunk/updateAvatar";
import { deleteAvatar } from "../../store/thunk/deleteAvatar";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const MyPageHeader: FC = () => {
    const { user } = useAppSelector(value => value.user)
    const dispatch = useAppDispatch()
    const [error, setError] = useState<string | null>(null)

    // const updateAvatarHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (!FileReader) { setError('FileReader is not supported'); return }
    //     if (!e.target.files?.length) { setError('Nothing loaded'); return }

    //     const validImageTypes = ["image/gif", "image/jpeg", "image/png", "image/webp"];

    //     if (!validImageTypes.includes((e.target.files as FileList)[0].type)) {
    //         setError('Selected file is not an image.')
    //         return
    //     }

    //     const fileReader = new FileReader()
    //     fileReader.onload = () => {
    //         dispatch(updateAvatar({ setError, uid: user?.uid as string, url: fileReader.result as string }))
    //     }

    //     fileReader.readAsDataURL(e.target.files[0])
    // }

    // const deleteAvatarHandler = () => {
    //     dispatch(deleteAvatar({ uid: user?.uid as string, setError }))
    // }

    return (
        <>
            {error && <ModalAlert setError={setError}>{error}</ModalAlert>}

            <div className={classes.best}>
            <div className={classes.background}>
                    {user?.backgroundImage && (
                        <div className={classes.inner}
                            style={{ backgroundImage: `url(${user.backgroundImage})` }} />
                    )}
                </div>

                <div className={classes.first}>
                    <div className={classes.icon}>
                        {user?.avatar && user.avatar.startsWith('http') &&
                            <img src={user.avatar} alt="" className={classes.inner} />}
                        {/* <div className={classes.popup}>
                            <p className={classes.text}><MdOutlineModeEdit className={classes.pin} />
                                Update photo
                                <input type="file" className={classes.input} onChange={updateAvatarHandler} />
                            </p>
                            <p className={classes.text} onClick={deleteAvatarHandler}><RiDeleteBin6Line className={classes.pin} />
                                Delete photo
                            </p>
                        </div> */}
                    </div>

                    <div className={classes.info}>
                        <h1 className={classes.username}>{user?.username}</h1>
                        <h2 className={classes.email}>{user?.email}</h2>
                    </div>
                </div>

                <Link to={"/settings"} className={classes.button}>Edit profile</Link>
            </div>
        </>
    )
}
export default MyPageHeader