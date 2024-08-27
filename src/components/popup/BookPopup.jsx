import React, { useEffect, useState } from 'react'
import Popup from './Popup';
import Input from '../form/input/Input';
import Select from '../form/select/Select';
import Button from '../button/Button';
import { getAllCategories } from '../../api/services/category';

// const initialCategories = [
//     { id: 1, name: 'History' },
//     { id: 2, name: 'Politics' },
//     { id: 3, name: 'Geography' },
//     { id: 4, name: 'Math' },
//     { id: 5, name: 'Science' }
//   ]

const BookPopup = ({title, isPopupOpen, closePopup, book, onEdit, onAdd, type='add'}) => {

    const [categories, setCategories] = useState([]);
    const [bookData, setBookData] = useState({
        id: book?.id || '',
        title: book?.title || '',
        author: book?.author || '',
        avlQty: book?.avlQty || '',
        image: book?.image || '',
        category: book?.category?.name || '',
    });

    useEffect(() => {
        setBookData({
            id: book?.id || '',
            title: book?.title || '',
            author: book?.author || '',
            avlQty: book?.avlQty || '',
            image: book?.image || '',
            category: book?.category?.name || '',
        })
    }, [book])

    useEffect(() => {
        loadCategories();
    }, [])

    const loadCategories = async () => {
      try {
        const {data} = await getAllCategories(undefined, undefined, 'name', 'asc')
        console.log(data);
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
        if (isPopupOpen === false) {
            setBookData({
                id: book?.id || '',
                title: book?.title || '',
                author: book?.author || '',
                avlQty: book?.avlQty || '',
                image: book?.image || '',
                category: book?.category?.name || '',
            })
        }
    }, [isPopupOpen])

    const handleChange = (e) => {
        setBookData({ ...bookData, [e.target.name]: e.target.value });
    }

    return (
        <Popup isOpen={isPopupOpen} title={title} onClose={closePopup} >
            <Input type={'text'} value={bookData.title} name={'title'} onChange={(e) => handleChange(e)} lable={'Title'} placeholder={'Enter book title'} />
            <Input type={'text'} value={bookData.author} name={'author'} onChange={(e) => handleChange(e)} lable={'Author'} placeholder={'Enter author name'} />
            <Input type={'number'} value={bookData.avlQty} name={'avlQty'} onChange={(e) => handleChange(e)} lable={'Quantity'} placeholder={'Enter book quantity'} />
            <Select lable={'Category'} name={'category'} value={bookData.category} onChange={(e) => handleChange(e)} placeholder={'Select category'} >
                <option value="">Select category</option>
                {categories.map(category => <option key={category.id} /*defaultChecked={book?.category?.id == category?.id}*/ value={category.id}>{category.name}</option>)}
            </Select>
            {/* <Input type={'text'} value={bookData.image} name={'image'} onChange={(e) => handleChange(e)} lable={'Image'} placeholder={'Upload image'} /> */}
            <div className="book-update-btn">
                {
                    type === 'edit' ?
                    <Button onClick={() =>{onEdit(bookData); closePopup()}} varient={'primary'} >Update</Button> :
                    <Button onClick={() => onAdd(bookData)} varient={'primary'} >Add</Button> 
                }
            </div>
        </Popup>
    )
}

export default BookPopup