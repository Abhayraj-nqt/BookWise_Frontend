import React, { useState } from 'react'

// CSS
import './Book.css'

// Components
import DashboardHOC from '../../../components/HOC/dashboardHOC/DashboardHOC'
import Searchbar from '../../../components/searchbar/Searchbar'
import Button from '../../../components/button/Button'
import Popup from '../../../components/popup/Popup'
import Input from '../../../components/form/input/Input'
import Select from '../../../components/form/select/Select'
import Table from '../../../components/table/Table'

import { CiFilter } from "react-icons/ci";

const initialCategories = [
  { id: 1, name: 'History' },
  { id: 2, name: 'Politics' },
  { id: 3, name: 'Geography' },
  { id: 4, name: 'Math' },
  { id: 5, name: 'Science' }
]

const bookCols = ['Id', 'Title', 'Author', 'Avl. Qty', 'Category'];

const initalBooks = [
  { id: 1, title: 'Game Of Thrones', author: 'R.R. Martin', avlQty: 10, image: null, category: { id: 1, name: 'History' } },
  { id: 2, title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', avlQty: 10, image: null, category: { id: 2, name: 'Politics' } },
  { id: 3, title: 'Harry Potter', author: 'J.K. Rollins', avlQty: 10, image: null, category: { id: 3, name: 'Geography' } },
  { id: 4, title: 'Doglapan', author: 'Ashneer Grover', avlQty: 10, image: null, category: { id: 4, name: 'Math' } },
  { id: 5, title: 'Song Of Ice & Fire', author: 'R.R. Martin', avlQty: 10, image: null, category: { id: 5, name: 'Science' } },
]

const Book = () => {

  const iconSize = 20;

  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    avlQty: '',
    image: '',
    category: '',
  })

  const [categories, setCategories] = useState(initialCategories);
  const [books, setBooks] = useState(initalBooks)

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const _setBookData = (book) => {
    setBookData({
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

  const handleEdit = (bookObj) => {
    bookObj.category = Number(bookObj.category);
    bookObj.avlQty = Number(bookObj.avlQty);
    console.log('UPDATE', bookObj);
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you really want to delete?')) {
      console.log('DELETE', id);
    }
  }

  const handleAddNewBook = () => {
    // bookData.image = null;
    bookData.category = Number(bookData.category);
    bookData.avlQty = Number(bookData.avlQty);
    console.log('ADD', bookData);
  }

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filteredBooks = initalBooks.filter(book => book.title.toLowerCase().includes(query));
    setBooks(filteredBooks);
  };

  return (
    <div className='book-page'>
      <div className="book-header">
        {/* <div className="filter-section"> */}
          <Searchbar placeholder={'Search book'} />
          {/* <div className="filter-icon">
            <span>Filter</span>
            <CiFilter size={25} />
          </div> */}
        {/* </div> */}

        <Button onClick={openPopup} varient={'primary'} >Add</Button>
      </div>
      <br />

      <div className="">
        <Table colums={bookCols} data={initalBooks} addDelete={true} addEdit={true} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      <Popup isOpen={isPopupOpen} title={'Add book'} onClose={closePopup} >

        <Input type={'text'} value={bookData.title} name={'title'} onChange={(e) => handleChange(e)} lable={'Title'} placeholder={'Enter book title'} />
        <Input type={'text'} value={bookData.author} name={'author'} onChange={(e) => handleChange(e)} lable={'Author'} placeholder={'Enter author name'} />
        <Input type={'number'} value={bookData.avlQty} name={'avlQty'} onChange={(e) => handleChange(e)} lable={'Quantity'} placeholder={'Enter book quantity'} />
        <Select lable={'Category'} name={'category'} value={bookData.category} onChange={(e) => handleChange(e)} placeholder={'Select category'} required={true} >
          <option defaultValue={undefined} value={undefined}>Select category</option>
          {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
        </Select>
        {/* <Input type={'text'} value={bookData.image} name={'image'} onChange={(e) => handleChange(e)} lable={'Image'} placeholder={'Upload image'} /> */}

        <div className="book-update-btn">
          <Button onClick={() => handleAddNewBook()} varient={'primary'} >Add</Button>
        </div>
      </Popup>

    </div>
  )
}

export default DashboardHOC(Book);