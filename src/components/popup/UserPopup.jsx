import React, { useEffect, useState } from 'react'
import Popup from './Popup';
import Input from '../form/input/Input';
import Button from '../button/Button';

const UserPopup = ({ title, isPopupOpen, closePopup, user, onEdit, onAdd, type = 'add' }) => {

    const [userData, setUserData] = useState({
        id: user?.id || '',
        name: user?.name || '',
        mobileNumber: user?.mobileNumber || '',
        email: user?.email || '',
        password: '',
    });

    useEffect(() => {
        setUserData({
            id: user?.id || '',
            name: user?.name || '',
            mobileNumber: user?.mobileNumber || '',
            email: user?.email || '',
            password: '',
        })
    }, [user]);


    useEffect(() => {
        if (isPopupOpen === false) {
            setUserData({
                id: user?.id || '',
                name: user?.name || '',
                mobileNumber: user?.mobileNumber || '',
                email: user?.email || '',
                password: '',
            })
        }
    }, [isPopupOpen])

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    return (
        <Popup isOpen={isPopupOpen} title={title} onClose={closePopup} >
            <Input type={'text'} value={userData.name} name={'name'} onChange={(e) => handleChange(e)} lable={'Name'} placeholder={'Enter name'} />
            <Input type={'text'} value={userData.mobileNumber} name={'mobileNumber'} onChange={(e) => handleChange(e)} lable={'Mobile'} placeholder={'Enter mobile no.'} />
            <Input type={'email'} value={userData.email} name={'email'} onChange={(e) => handleChange(e)} lable={'Email'} placeholder={'Enter email'} />
            <Input type={'text'} value={userData.password} name={'password'} onChange={(e) => handleChange(e)} lable={'Password'} placeholder={'Enter password'} />
            <div className="user-update-btn">
                {
                    type === 'edit' ?
                        <Button onClick={() => { onEdit(userData); closePopup() }} varient={'primary'} >Update</Button> :
                        <Button onClick={() => onAdd(userData)} varient={'primary'} >Add</Button>
                }
            </div>
        </Popup>
    )
}

export default UserPopup