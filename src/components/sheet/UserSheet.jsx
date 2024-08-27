import React, { useEffect, useState } from 'react'
import Sheet from './Sheet'
import { getBookByTitle } from '../../api/services/book';
import { useSelector } from 'react-redux';
import Searchbar from '../searchbar/Searchbar';
import Button from '../button/Button';

import './UserSheet.css'
import toast from '../toast/toast';
import Select from '../form/select/Select';
import { createIssuance } from '../../api/services/Issuance';

const UserSheet = ({ isSheetOpen, onClose, userData }) => {

    const auth = useSelector(state => state.auth);

    const [bookData, setBookData] = useState({
        id: '',
        title: '',
        author: '',
        category: {
            id: '',
            name: '',
        },
        avlQty: '',
    })

    const [query, setQuery] = useState('');
    const [clearInput, setClearInput] = useState(false);
    const [issuanceType, setIssuanceType] = useState('IN_HOUSE');

    useEffect(() => {
        if (!isSheetOpen) {
            setBookData({
                id: '',
                title: '',
                author: '',
                category: {
                    id: '',
                    name: '',
                },
                avlQty: '',
            })
            setQuery('');
            setClearInput(true);
        } else {
            setClearInput(false);
        }
    }, [isSheetOpen])

    const handleSearch = (searchQuery) => {
        setQuery(searchQuery);
    }

    const handleClickSearch = async () => {
        try {
            const { data } = await getBookByTitle(query, auth.token);
            setBookData(data);
        } catch (error) {
            console.log(error);
            toast.error(`Failed to find book`);
        }
    }

    const handleBookIssue = async () => {
        console.log({ "user mobile": userData?.id, "book id": bookData?.id, issuanceType });
        const issenceObj = {
            user: userData?.id,
            book: bookData?.id,
            issuanceType: issuanceType,
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

    return (
        <Sheet isOpen={isSheetOpen} onClose={onClose}>
            <div className="user-sheet">
                <h2>Issue book to user</h2>
                <div className="sheet-serch-bar">
                    <Searchbar placeholder={'Search book by title'} onSearch={handleSearch} varient={'secondary'} clearInput={clearInput} icon={false} />
                    <Button onClick={handleClickSearch} varient={'primary'}>Search</Button>
                </div>
                <div className="">
                    <Select lable={'Type'} name={'issuanceType'} value={issuanceType} onChange={(e) => setIssuanceType(e.target.value)} placeholder={'Select issuance typr'} >
                        <option value="IN_HOUSE">In house</option>
                        <option value="TAKE_AWAY">Take away</option>
                    </Select>
                </div>

                {userData && userData.mobileNumber &&
                    <div className='user-details-container'>
                        <div className="user-id uder-detail-row">
                            <div className='user-lable'>Id: </div>
                            <div>{userData.id}</div>
                        </div>
                        <div className="user-name uder-detail-row">
                            <div className='user-lable'>Name: </div>
                            <div>{userData.name}</div>
                        </div>
                        <div className="user-mobile uder-detail-row">
                            <div className='user-lable'>Mobile: </div>
                            <div>{userData.mobileNumber}</div>
                        </div>
                        <div className="user-email uder-detail-row">
                            <div className='user-lable'>Email: </div>
                            <div>{userData.email}</div>
                        </div>
                    </div>}

                {bookData && bookData?.id &&
                    <div className='user-details-container'>
                        <div className="uder-detail-row">
                            <div className='user-lable'>Id: </div>
                            <div>{bookData?.id}</div>
                        </div>
                        <div className="uder-detail-row">
                            <div className='user-lable'>Title: </div>
                            <div>{bookData?.title}</div>
                        </div>
                        <div className="uder-detail-row">
                            <div className='user-lable'>Author: </div>
                            <div>{bookData?.author}</div>
                        </div>
                        <div className="uder-detail-row">
                            <div className='user-lable'>Category: </div>
                            <div>{bookData?.category?.name}</div>
                        </div>
                        <div className="uder-detail-row">
                            <div className='user-lable'>Avl. Qty: </div>
                            <div>{bookData?.avlQty}</div>
                        </div>
                    </div>}

                {bookData && bookData?.id &&
                    <div className="user-sheet-issue-btn">
                        <Button onClick={handleBookIssue} varient={'primary'}>Issue</Button>
                    </div>
                }

            </div>
        </Sheet>
    )
}

export default UserSheet