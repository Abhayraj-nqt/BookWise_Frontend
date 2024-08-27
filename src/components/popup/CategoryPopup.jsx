import React, { useEffect, useState } from 'react'
import Popup from './Popup'
import Input from '../form/input/Input'
import Button from '../button/Button'

const CategoryPopup = ({title, isPopupOpen, closePopup, category, onEdit, onAdd, type='add'}) => {

    const [categoryData, setCategoryData] = useState({
        id: category?.id || '',
        name: category?.name || '',
    });

    useEffect(() => {
        setCategoryData({
            id: category?.id || '',
            name: category?.name || '',
        })
    }, [category])

    useEffect(() => {
        if (isPopupOpen === false) {
            setCategoryData({
                id: category?.id || '',
                name: category?.name || '',
            })
        }
    }, [isPopupOpen])

    
    const handleChange = (e) => {
        setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
    }


    return (
        <Popup isOpen={isPopupOpen} title={title} onClose={closePopup} >
            <Input type={'text'} value={categoryData.name} name='name' onChange={handleChange} lable={'Name'} placeholder={'Enter category name'} />
            <div className="cat-update-btn">
                {
                    type === 'edit' ?
                    <Button onClick={() => {onEdit(categoryData); closePopup()}} varient={'primary'} >Update</Button> :
                    <Button onClick={() => onAdd(categoryData)} varient={'primary'} >Add</Button>
                }
            </div>
        </Popup>
    )
}

export default CategoryPopup