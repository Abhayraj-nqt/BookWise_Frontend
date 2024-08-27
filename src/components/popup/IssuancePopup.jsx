import React, { useEffect, useState } from 'react'
import Popup from './Popup';
import Button from '../button/Button';
import Select from '../form/select/Select';

const IssuancePopup = ({title, isPopupOpen, closePopup, issuance, onEdit, onAdd, type='add'}) => {

    const [issuanceData, setIssuanceData] = useState({
        id: '',
        user: '',
        book: '',
        issueTime: '',
        returnTime: '',
        status: '',
        issuanceType: '',
    })

    useEffect(() => {
        setIssuanceData({
            id: issuance?.id || '',
            user: issuance?.user || '',
            book: issuance?.book || '',
            issueTime: issuance?.issueTime || '',
            returnTime: issuance?.returnTime || '',
            status: issuance?.status || '',
            issuanceType: issuance?.issuanceType || '',
        })
    }, [issuance])

    useEffect(() => {
        if (isPopupOpen === false) {
            setIssuanceData({
                id: '',
                user: '',
                book: '',
                issueTime: '',
                returnTime: '',
                status: '',
                issuanceType: '',
            })
        }
    }, [isPopupOpen])

    const handleChange = (e) => {
        setIssuanceData({ ...issuanceData, [e.target.name]: e.target.value });
    }

    return (
        <Popup isOpen={isPopupOpen} title={title} onClose={closePopup} >
            {/* <Input type={'text'} value={bookData.title} name={'title'} onChange={(e) => handleChange(e)} lable={'Title'} placeholder={'Enter book title'} />
            <Input type={'text'} value={bookData.author} name={'author'} onChange={(e) => handleChange(e)} lable={'Author'} placeholder={'Enter author name'} />
            <Input type={'number'} value={bookData.avlQty} name={'avlQty'} onChange={(e) => handleChange(e)} lable={'Quantity'} placeholder={'Enter book quantity'} /> */}
            <Select lable={'Status'} name={'status'} value={issuanceData.status} onChange={(e) => handleChange(e)} placeholder={'Select status'} >
                {/* <option value="">Select</option> */}
                <option value="ISSUED">Issued</option>
                <option value="RETURNED">Returned</option>
            </Select>
            <Select lable={'Type'} name={'issuanceType'} value={issuanceData.issuanceType} onChange={(e) => handleChange(e)} placeholder={'Select issuance typr'} >
                {/* <option value="">Select</option> */}
                <option value="IN_HOUSE">In house</option>
                <option value="TAKE_AWAY">Take away</option>
            </Select>
            <div className="issuance-update-btn">
                {
                    type === 'edit' ?
                        <Button onClick={() => { onEdit(issuanceData); closePopup() }} varient={'primary'} >Update</Button> :
                        <Button onClick={() => onAdd(issuanceData)} varient={'primary'} >Add</Button>
                }
            </div>
        </Popup>
    )
}

export default IssuancePopup