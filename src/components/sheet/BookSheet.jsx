import React, { useEffect, useState } from 'react'
import Sheet from './Sheet'
import Searchbar from '../searchbar/Searchbar'
import Card from '../card/Card'
import { getUserByMobile } from '../../api/services/user'
import toast from '../toast/toast'
import { useSelector } from 'react-redux'
import Button from '../button/Button'

import './BookSheet.css'
import Select from '../form/select/Select'
import Input from '../form/input/Input'
import { createIssuance } from '../../api/services/Issuance'
import TimePicker from '../form/time/TimePicker'
import DatePicker  from '../form/date/DatePicker'
import { validateNotEmpty } from '../../libs/utils'

const initialErrors = {
    returnTime: ''
}

const BookSheet = ({ isSheetOpen, onClose, bookData }) => {

    const auth = useSelector(state => state.auth);

    const [userData, setUserData] = useState({
        id: '',
        name: '',
        mobileNumber: '',
        email: '',
    })

    const [currentTime] = useState(
        new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    );

    const [query, setQuery] = useState('');
    const [clearInput, setClearInput] = useState(false);
    const [issuanceType, setIssuanceType] = useState('IN_HOUSE');
    const [returnTime, setReturnTme] = useState();
    const [errors, setErrors] = useState(initialErrors);

    useEffect(() => {
        if(!isSheetOpen) {
            setUserData({
                id: '',
                name: '',
                mobileNumber: '',
                email: '',
            })
            setQuery('');
            setClearInput(true);
            setErrors(initialErrors);
        } else {
            setClearInput(false);
        }
    }, [isSheetOpen])

    const handleSearch = (searchQuery) => {
        setQuery(searchQuery);
    }

    const handleClickSearch = async () => {
        try {
            const { data } = await getUserByMobile(query, auth.token);
            setUserData(data);
        } catch (error) {
            console.log(error);
            toast.error(`Failed to find user`);
        }
    }

    const handleBookIssue = async () => {

        if (!validate()) {
            return;
        }

        let formatedDateTime = '';
        const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });

        const currentDate = new Date().toLocaleDateString('en-CA');

        if (issuanceType === 'IN_HOUSE') {
            formatedDateTime = `${currentDate}T${returnTime}:00`
        } else {
            formatedDateTime = `${returnTime}T${currentTime}`;
        }

        console.log({ "user mobile": userData?.id, "book id": bookData?.id, issuanceType, formatedDateTime });
        const issenceObj = {
            user: userData?.id,
            book: bookData?.id,
            issuanceType: issuanceType,
            returnTime: formatedDateTime,
        }

        try {
            const {data} = await createIssuance(issenceObj, auth.token);
            console.log('ISSUANCE', data);
            toast.success('Issuance created successfully');
        } catch (error) {
            console.log(error);
            toast.error('Failed to create issuance');
        }

        onClose();
    }

    const validate = () => {
        let isValid = false;
        const newErrors = {
            returnTime: ''
        }

        if (!validateNotEmpty(returnTime)) {
            newErrors.returnTime = `Return time is required!`
            isValid = false;
        }

        if (!isValid) {
            setErrors(newErrors);
        }

        return isValid;
    }

    return (
        <Sheet isOpen={isSheetOpen} onClose={onClose}>
            <div className="book-sheet">
                <h2>Issue book to user</h2>
                <div className="sheet-serch-bar">
                    <Searchbar placeholder={'Search user by mobile no.'} onSearch={handleSearch} varient={'secondary'} clearInput={clearInput} icon={false} />
                    <Button onClick={handleClickSearch} varient={'primary'}>Search</Button>
                </div>
                <div className="">
                    <Select label={'Type'} name={'issuanceType'} value={issuanceType} onChange={(e) => setIssuanceType(e.target.value)} placeholder={'Select issuance typr'} >
                        <option value="IN_HOUSE">In house</option>
                        <option value="TAKE_AWAY">Take away</option>
                    </Select>
                    {/* <Input label={'Return date'} onChange={(e) => setReturnDate(e.target.value)} name='returnDate' value={returnDate} type='datetime-local' placeholder={'Select date'}  /> */}
                    {issuanceType === 'IN_HOUSE' && <TimePicker label={'Return time'} name='returnTime' value={returnTime} onChange={(e) => {setReturnTme(e.target.value); setErrors(initialErrors)}} placeholder={'Select time'} className={''} min={currentTime} error={errors.returnTime} />}
                    {issuanceType === 'TAKE_AWAY' && <DatePicker label={'Return date'} name='returnTime' value={returnTime} onChange={(e) => {setReturnTme(e.target.value); setErrors(initialErrors)}} placeholder={'Select date'} className={''} min={new Date().toISOString().split("T")[0]} error={errors.returnTime} />}
                </div>

                {bookData && 
                <div className='user-details-container'>
                    <div className="uder-detail-row">
                        <div className='user-label'>Id: </div>
                        <div>{bookData?.id}</div>
                    </div>
                    <div className="uder-detail-row">
                        <div className='user-label'>Title: </div>
                        <div>{bookData?.title}</div>
                    </div>
                    <div className="uder-detail-row">
                        <div className='user-label'>Author: </div>
                        <div>{bookData?.author}</div>
                    </div>
                    <div className="uder-detail-row">
                        <div className='user-label'>Category: </div>
                        <div>{bookData?.category?.name}</div>
                    </div>
                    <div className="uder-detail-row">
                        <div className='user-label'>Avl. Qty: </div>
                        <div>{bookData?.avlQty}</div>
                    </div>
                </div>}

                {userData && userData.mobileNumber && 
                <div className='user-details-container'>
                    <div className="user-id uder-detail-row">
                        <div className='user-label'>Id: </div>
                        <div>{userData.id}</div>
                    </div>
                    <div className="user-name uder-detail-row">
                        <div className='user-label'>Name: </div>
                        <div>{userData.name}</div>
                    </div>
                    <div className="user-mobile uder-detail-row">
                        <div className='user-label'>Mobile: </div>
                        <div>{userData.mobileNumber}</div>
                    </div>
                    <div className="user-email uder-detail-row">
                        <div className='user-label'>Email: </div>
                        <div>{userData.email}</div>
                    </div>
                </div>}

                {userData && userData.mobileNumber && 
                    <div className="book-sheet-issue-btn">
                        <Button onClick={handleBookIssue} varient={'primary'}>Issue</Button>
                    </div>
                }

            </div>
        </Sheet>
    )
}

export default BookSheet