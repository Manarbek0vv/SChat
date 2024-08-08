import { FC, useEffect, useState } from "react";
import classes from './CustomAccount.module.scss';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import SolidSelect, { OptionType, SolidSelectModeEnum } from "../../UI/SolidSelect/SolidSelect";
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/dark.css"
import { RxReset } from "react-icons/rx";
import { parseDate } from "../../secondaryFunctions/parseDate";
import { updateAvatar } from "../../store/thunk/updateAvatar";
import { deleteAvatar } from "../../store/thunk/deleteAvatar";
import { updateBackgroundImage } from "../../store/thunk/updateBackgroundImage";
import { deleteBackgroundImage } from "../../store/thunk/deleteBackgroundImage";
import { IoImageOutline } from "react-icons/io5";
import { saveNewSettings } from "../../store/thunk/saveNewSettings";
import ModalAlert from "../../UI/ModalAlert/ModalAlert";
import ModalForm from "../../UI/ModalForm/ModalForm";
import { useUsername } from "../../hooks/useUsername";
import { usePassword } from "../../hooks/usePassword";
import { GoKey } from "react-icons/go";
import { changeUsername } from "../../store/thunk/changeUsername";
import { FaRegUser } from "react-icons/fa";
import FullScreenLoader from "../../UI/FullScreenLoader/FullScreenLoader";

type CustomUserType = {
    username: string;
    isEmailVisible: boolean;
    birthday: number | null;
    gender: 'Male' | 'Female' | null;
}

const CustomAccount: FC = () => {
    const { user: myUser } = useAppSelector(value => value.user)
    const [error, setError] = useState<string | null>(null)

    const [isVisible, setIsVisible] = useState(false)

    const [loading, setLoading] = useState(false)

    const { username, onUsernameChange } = useUsername('', setError)
    const { password, onPasswordChange } = usePassword('', setError)

    const dispatch = useAppDispatch()

    if (!myUser) return

    const [customUser, setCustomUser] = useState<CustomUserType>({
        username: myUser.username,
        isEmailVisible: myUser.isEmailVisible,
        birthday: myUser.birthday,
        gender: myUser.gender,
    })

    useEffect(() => {
        setCustomUser({
            username: myUser.username,
            isEmailVisible: myUser.isEmailVisible,
            birthday: myUser.birthday,
            gender: myUser.gender,
        })
    }, [myUser])

    const updateAvatarHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!FileReader) { setError('FileReader is not supported'); return }
        if (!e.target.files?.length) { setError('Nothing loaded'); return }

        const validImageTypes = ["image/gif", "image/jpeg", "image/png", "image/webp"];

        if (!validImageTypes.includes((e.target.files as FileList)[0].type)) {
            setError('Selected file is not an image.')
            return
        }

        const fileReader = new FileReader()
        fileReader.onload = () => {
            dispatch(updateAvatar({ setError, uid: myUser.uid as string, url: fileReader.result as string }))
        }

        fileReader.readAsDataURL(e.target.files[0])
    }

    const deleteAvatarHandler = () => {
        dispatch(deleteAvatar({ uid: myUser.uid as string, setError }))
    }


    const updateBackgroundImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!FileReader) { setError('FileReader is not supported'); return }
        if (!e.target.files?.length) { setError('Nothing loaded'); return }

        const validImageTypes = ["image/gif", "image/jpeg", "image/png", "image/webp"];

        if (!validImageTypes.includes((e.target.files as FileList)[0].type)) {
            setError('Selected file is not an image.')
            return
        }

        const fileReader = new FileReader()
        fileReader.onload = () => {
            dispatch(updateBackgroundImage({ setError, uid: myUser.uid as string, url: fileReader.result as string }))
        }

        fileReader.readAsDataURL(e.target.files[0])
    }

    const deleteBackgroundImageHandler = () => {
        dispatch(deleteBackgroundImage({ uid: myUser.uid as string, setError }))
    }

    useEffect(() => {
        flatpickr(`.${classes.date}`, {
            defaultDate: customUser.birthday ? new Date(customUser.birthday) : undefined,
            dateFormat: 'd-m-y',
            maxDate: new Date(),
            minDate: new Date(1950, 0, 1),
            onChange: (_, dateStr) => {
                console.log(dateStr)
                console.log(parseDate(dateStr))
                setCustomUser(prev => ({
                    ...prev, birthday: parseDate(dateStr).getTime()
                }))
            },
            disableMobile: true
        })
    }, [])

    const saveNewSettingsHandler = () => {
        dispatch(saveNewSettings({
            myUser,
            setError,
            isEmailVisible: customUser.isEmailVisible,
            birthday: customUser.birthday,
            gender: customUser.gender
        }))
    }

    const changeUsernameHandler = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (username === myUser.username) {
            setError('The new username cannot be the same as yours')
            return
        }

        dispatch(changeUsername({ user: myUser, newUsername: username, password, setError, setLoading, setIsVisible }))
            .then(() => setLoading(false))
    }

    return (
        <div className={classes.container}>
            {loading && <FullScreenLoader />}
            {error && <ModalAlert setError={setError}>{error}</ModalAlert>}
            {isVisible &&
                <ModalForm
                    title="Change"
                    buttonTitle="Change"
                    setIsVisible={setIsVisible}
                    onSubmit={changeUsernameHandler}>
                    <label className={classes.label}>
                        <FaRegUser className={classes.icon} />
                        <input type="text"
                            value={username}
                            onChange={onUsernameChange}
                            className={classes.input}
                            placeholder='Enter username' />
                    </label>
                    <label className={classes.label}>
                        <GoKey className={classes.icon} />
                        <input
                            type="password"
                            value={password}
                            onChange={onPasswordChange}
                            className={classes.input}
                            placeholder='Enter password' />
                    </label>
                </ModalForm>}

            <div className={classes.header}>
                <h1 className={classes.profile}>
                    Profile
                </h1>

                <div className={classes.background}>
                    <div className={classes.inner}
                        style={{ backgroundImage: `url(${myUser.backgroundImage})` }} />
                    <div className={classes['change-background']}>
                        <MdOutlineModeEdit className={classes.pencil} /> Change cover

                        <div className={classes.popup}>
                            <p className={classes.text}><IoImageOutline className={classes.pin} />
                                Upload image
                                <input type="file" className={classes.input} onChange={updateBackgroundImageHandler} />
                            </p>
                            <p className={classes.text} onClick={deleteBackgroundImageHandler}>
                                <RiDeleteBin6Line className={classes.pin} />
                                Delete
                            </p>
                        </div>
                    </div>
                </div>

                <div className={classes.info}>
                    <div className={classes['first-line']}>
                        <div className={classes.avatar}>
                            {myUser.avatar && myUser.avatar.startsWith('http') ?
                                <img src={myUser.avatar} alt="" className={classes.inner} /> :
                                <img src="/default.png" alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />}
                            <div className={classes.popup}>
                                <p className={classes.text}><MdOutlineModeEdit className={classes.pin} />
                                    Update photo
                                    <input type="file" className={classes.input} onChange={updateAvatarHandler} />
                                </p>
                                <p className={classes.text} onClick={deleteAvatarHandler}>
                                    <RiDeleteBin6Line className={classes.pin} />
                                    Delete photo
                                </p>
                            </div>
                        </div>
                    </div>

                    <hr className={classes.hr} />

                    <div className={classes['second-line']}>
                        <p className={classes['username-title']}>Username</p>

                        <div className={classes['username-wrapper']}>
                            <p className={classes.username}>{customUser.username}</p>
                        </div>

                        <p className={classes.change} onClick={() => setIsVisible(true)}>Change</p>
                    </div>
                </div>
            </div>

            {/* --------------------------------------------- */}

            <div className={classes.basic}>
                <div className={classes.email}>
                    Email:
                    <SolidSelect
                        style={{ width: '65%', padding: '5px 10px', color: 'rgb(222, 222, 222)' }}
                        defaultValue={customUser.isEmailVisible ? 0 : 1}
                        options={[
                            { name: 'Visible', value: true },
                            { name: 'Hidden', value: false }
                        ]} setValue={(option: OptionType) => {
                            setCustomUser(prev => ({ ...prev, isEmailVisible: option.value as boolean }))
                        }}
                        optionVisibleHeight="70px"
                        mode={SolidSelectModeEnum.TOP} />
                </div>

                <div className={classes.birthday}>
                    Birthday:
                    <label className={classes['date-label']}>
                        <input type="date" className={classes.date} style={{ opacity: !!customUser.birthday ? '1' : '0' }} />

                        {!customUser.birthday && <p className={classes['not-specified']}>Not specified</p>}

                        {!!customUser.birthday && (
                            <div className={classes['reset-wrapper']}
                                onClick={() => setCustomUser(prev => ({
                                    ...prev, birthday: null
                                }))}>
                                <RxReset className={classes['reset-date']} />
                            </div>
                        )}
                    </label>
                </div>

                <div className={classes.gender}>
                    Gender:

                    <SolidSelect
                        style={{ width: '65%', padding: '5px 10px', color: 'rgb(222, 222, 222)' }}
                        defaultValue={customUser.gender ? customUser.gender === 'Male' ? 0 : 1 : 2}
                        options={[
                            { name: 'Male', value: 'Male' },
                            { name: 'Female', value: 'Female' },
                            { name: 'Not specified', value: null }
                        ]} setValue={(option: OptionType) => {
                            setCustomUser(prev => ({ ...prev, gender: option.value as any }))
                        }}
                        optionVisibleHeight="103px" />
                </div>

                <hr className={classes.hr} />

                <button className={classes.save} onClick={saveNewSettingsHandler}>Save</button>
            </div>
        </div>
    )
}

export default CustomAccount