import React, { useState } from 'react'

// CSS
import './Table.css'

// Components
import Popup from '../popup/Popup'
import Input from '../form/input/Input'
import Select from '../form/select/Select'
import Button from '../button/Button'
import { DeleteIcon, EditIcon } from '../icons/Icons'

const initialCategories = [
    { id: 1, name: 'History' },
    { id: 2, name: 'Politics' },
    { id: 3, name: 'Geography' },
    { id: 4, name: 'Math' },
    { id: 5, name: 'Science' }
  ]

const Table = ({ colums=[], data=[], addEdit=false, addDelete=false, onEdit, onDelete, iconSize = 25, type}) => {

    const [bookData, setBookData] = useState({
        id: '',
        title: '',
        author: '',
        avlQty: '',
        image: '',
        category: '',
    });
    const [categories, setCategories] = useState(initialCategories);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    const _setBookData = (book) => {
        setBookData({
            id: book.id,
          title: book.title,
          author: book.author,
          avlQty: book.avlQty,
          category: book.category.name,
          image: book.image,
        })
    }

    const handleChange = (e) => {
        setBookData({ ...bookData, [e.target.name]: e.target.value });
    }

    const getPopup = () => {
        if (type === 'category') {
            return (

                <Popup isOpen={isPopupOpen} title={'Edit category'} onClose={closePopup} >
                    <Input type={'text'} value={name} onChange={(e) => setName(e.target.value)} lable={'Name'} placeholder={'Enter category name'} />
                    <div className="cat-update-btn">
                        <Button onClick={() => onEdit(category.id, name)} varient={'primary'} >Update</Button>
                    </div>
                </Popup>

            )
        } else if (type === 'book') {
            return (

                <Popup isOpen={isPopupOpen} title={'Edit book'} onClose={closePopup} >
                    <Input type={'text'} value={bookData.title} name={'title'} onChange={(e) => handleChange(e)} lable={'Title'} placeholder={'Enter book title'} />
                    <Input type={'text'} value={bookData.author} name={'author'} onChange={(e) => handleChange(e)} lable={'Author'} placeholder={'Enter author name'} />
                    <Input type={'number'} value={bookData.avlQty} name={'avlQty'} onChange={(e) => handleChange(e)} lable={'Quantity'} placeholder={'Enter book quantity'} />
                    <Select lable={'Category'} name={'category'} value={bookData.category} onChange={(e) => handleChange(e)} placeholder={'Select category'} >
                        {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                    </Select>
                    {/* <Input type={'text'} value={bookData.image} name={'image'} onChange={(e) => handleChange(e)} lable={'Image'} placeholder={'Upload image'} /> */}
                    <div className="book-update-btn">
                        <Button onClick={() => onEdit(bookData)} varient={'primary'} >Update</Button>
                    </div>
                </Popup>

            )
        } else if (type === 'user') {

        } else {
            return ''
        }
    }


    return (
        <>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            {colums.map((cols, i) => (
                                <th key={`${cols}-${i}`}>{cols}</th>
                            ))}
                            {(addEdit || addDelete) && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, i) => (
                            <tr key={`${i}-${row?.id}`} >
                                {Object.entries(row).map(([key, value]) => (
                                    key !== 'image' && (typeof value === 'object' ? <td key={key}>{value?.name}</td> : <td key={key}>{value} </td>)
                                ))}
                                {(addEdit || addDelete) && <td className='table-action-btns'>
                                    {addEdit && <span onClick={() => { openPopup(true); _setBookData(row) }} className='table-edit-icon icon'><EditIcon size={iconSize} /></span>}
                                    {addDelete && <span onClick={() => onDelete(row.id)} className='table-delete-icon icon'><DeleteIcon size={iconSize} /></span>}
                                </td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* <Popup /> */}
            
            {/* <Popup isOpen={isPopupOpen} title={'Edit book'} onClose={closePopup} >
                <Input type={'text'} value={bookData.title} name={'title'} onChange={(e) => handleChange(e)} lable={'Title'} placeholder={'Enter book title'} />
                <Input type={'text'} value={bookData.author} name={'author'} onChange={(e) => handleChange(e)} lable={'Author'} placeholder={'Enter author name'} />
                <Input type={'number'} value={bookData.avlQty} name={'avlQty'} onChange={(e) => handleChange(e)} lable={'Quantity'} placeholder={'Enter book quantity'} />
                <Select lable={'Category'} name={'category'} value={bookData.category} onChange={(e) => handleChange(e)} placeholder={'Select category'} >
                    {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                </Select>

                <Input type={'text'} value={bookData.image} name={'image'} onChange={(e) => handleChange(e)} lable={'Image'} placeholder={'Upload image'} />

                <div className="book-update-btn">
                    <Button onClick={() => onEdit(bookData)} varient={'primary'} >Update</Button>
                </div>
            </Popup> */}
        </>
    )
}

export default Table
