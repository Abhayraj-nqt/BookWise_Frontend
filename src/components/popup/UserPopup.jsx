import React, { useEffect, useState } from 'react'
import Popup from './Popup';
import Input from '../form/input/Input';
import Button from '../button/Button';
import { validateEmail, validateMobile, validateNotEmpty } from '../../libs/utils';

const initialErrors = {
    name: '',
    mobileNumber: '',
    email: '',
    password: ''
}

const UserPopup = ({ title, isPopupOpen, closePopup, user, onEdit, onAdd, type = 'add' }) => {

    const [userData, setUserData] = useState({
        id: user?.id || '',
        name: user?.name || '',
        mobileNumber: user?.mobileNumber || '',
        email: user?.email || '',
        password: '',
    });

    const [errors, setErrors] = useState(initialErrors)

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

            setErrors(initialErrors);
        }
    }, [isPopupOpen])

    const handleChange = (e) => {
        setErrors(initialErrors);
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const validateUser = () => {
        let isValid = true;
        const newErrors = {
            name: '',
            mobileNumber: '',
            email: '',
            password: ''
        }

        if (!validateNotEmpty(userData.name)) {
            newErrors.name = `Name is required!`
            isValid = false;
        }

        if (!validateEmail(userData.email)) {
            newErrors.email = `Email is required!`
            isValid = false;
        }

        if (!validateMobile(userData.mobileNumber)) {
            newErrors.mobileNumber = `Mobile no. is required!`
            isValid = false;
        }

        if (!validateNotEmpty(userData.password)) {
            newErrors.password = `Password is required!`
            isValid = false;
        }

        if (!isValid) {
            setErrors(newErrors);
        }

        return isValid;
    }

    const handleAdd = () => {
        if (validateUser()) {
            onAdd(userData);
        }
    }

    const handleEdit = () => {
        if(validateUser()) {
            onEdit(userData)
            closePopup();
        }
    }

    return (
        <Popup isOpen={isPopupOpen} title={title} onClose={closePopup} >
            <Input type={'text'} value={userData.name} name={'name'} onChange={(e) => handleChange(e)} label={'Name'} placeholder={'Enter name'} error={errors.name} />
            <Input type={'text'} value={userData.mobileNumber} name={'mobileNumber'} onChange={(e) => handleChange(e)} label={'Mobile'} placeholder={'Enter mobile no.'} error={errors.mobileNumber} />
            <Input type={'email'} value={userData.email} name={'email'} onChange={(e) => handleChange(e)} label={'Email'} placeholder={'Enter email'} error={errors.email} />
            <Input type={'text'} value={userData.password} name={'password'} onChange={(e) => handleChange(e)} label={'Password'} placeholder={'Enter password'} error={errors.password} />
            <div className="user-update-btn">
                {
                    type === 'edit' ?
                        <Button onClick={() => handleEdit()} varient={'primary'} >Update</Button> :
                        <Button onClick={() => handleAdd()} varient={'primary'} >Add</Button>
                }
            </div>
        </Popup>
    )
}

export default UserPopup