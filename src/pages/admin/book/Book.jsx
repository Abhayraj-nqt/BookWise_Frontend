import React, { useEffect, useState } from 'react'

// CSS
import './Book.css'

// Components
import DashboardHOC from '../../../components/HOC/dashboardHOC/DashboardHOC'
import Searchbar from '../../../components/searchbar/Searchbar'
import Button from '../../../components/button/Button'
import Table from '../../../components/table/Table'

import { FilterIcon } from '../../../components/icons/Icons'
import BookPopup from '../../../components/popup/BookPopup'
import { useSelector } from 'react-redux'
import { getAllCategories } from '../../../api/services/category'
import { createBook, getAllBooks, removeBook, updateBook } from '../../../api/services/book'
import toast from '../../../components/toast/toast'
import Sheet from '../../../components/sheet/Sheet'
import BookFilterPopup from '../../../components/popup/BookFilterPopup'
import AlertPopup from '../../../components/popup/AlertPopup'

// const initialCategories = [
//   { id: 1, name: 'History' },
//   { id: 2, name: 'Politics' },
//   { id: 3, name: 'Geography' },
//   { id: 4, name: 'Math' },
//   { id: 5, name: 'Science' }
// ]

const bookCols = ['Id', 'Title', 'Author', 'Total Qty', 'Avl. Qty', 'Category'];

// const initalBooks = [
//   { id: 1, title: 'Game Of Thrones', author: 'R.R. Martin', avlQty: 10, image: null, category: { id: 1, name: 'History' } },
//   { id: 2, title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', avlQty: 10, image: null, category: { id: 2, name: 'Politics' } },
//   { id: 3, title: 'Harry Potter', author: 'J.K. Rollins', avlQty: 10, image: null, category: { id: 3, name: 'Geography' } },
//   { id: 4, title: 'Doglapan', author: 'Ashneer Grover', avlQty: 10, image: null, category: { id: 4, name: 'Math' } },
//   { id: 5, title: 'Song Of Ice & Fire', author: 'R.R. Martin', avlQty: 10, image: null, category: { id: 5, name: 'Science' } },
// ]

const Book = () => {

  // const iconSize = 20;

  const auth = useSelector(state => state.auth);

  const [bookData, setBookData] = useState({
    id: '',
    title: '',
    author: '',
    totalQty: '',
    image: '',
    category: '',
  })

  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [sortBy, setSortBy] = useState('id');
  const [sortDir, setSortDir] = useState('asc');
  const [search, setSearch] = useState('')

  // const [categories, setCategories] = useState(initialCategories);
  const [books, setBooks] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const openFilter = () => setIsFilterOpen(true);
  const closeFilter = () => setIsFilterOpen(false);

  const openAlert = () => setIsAlertOpen(true);
  const closeAlert = () => setIsAlertOpen(false);

  useEffect(() => {
    loadBooks();
  }, [page, size, sortBy, sortDir])

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadBooks();
    }, 1000)

    return () => clearTimeout(timeout);
  }, [search])


  // const loadCategories = async () => {
  //   try {
  //     const {data} = await getAllCategories(undefined, undefined, 'name', 'asc')
  //     console.log(data);
  //     setCategories(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const loadBooks = async () => {
    try {
      const {data} = await getAllBooks(page, size, sortBy, sortDir, search, auth.token);
      console.log(data);
      
      if (Array.isArray(data)) {
        setBooks(data);
      } else {
        setBooks(data.content);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.log('Error fetching books', error);
    }
  }

  // const _setBookData = (book) => {
  //   setBookData({
  //     title: book.title,
  //     author: book.author,
  //     avlQty: book.avlQty,
  //     category: book.category.name,
  //     image: book.image,
  //   })
  // }

  // const handleChange = (e) => {
  //   setBookData({ ...bookData, [e.target.name]: e.target.value });
  // }

  const handleEdit = async (bookObj) => {
    // bookObj.category = Number(bookObj.category);
    // bookObj.avlQty = Number(bookObj.avlQty);
    // console.log('UPDATE', bookObj);

    // const newBook = {
    //   title: bookObj.title,
    //   author: bookObj.author,
    //   avlQty: bookObj.avlQty,
    //   image: bookObj.image,
    //   category: bookObj.category,
    // }

    const id = bookObj?.id;
    delete bookObj?.id;
    
    try {
      const { data } = await updateBook(id, bookObj, auth.token);
      await loadBooks();
      closePopup();
      toast.success(`Successfully updated`);
    } catch (error) {
      console.log(error);
      closePopup();
      toast.error(`Failed to update`)
    }
  }

  const handleDelete = (id) => {
    setDeleteId(id);
    openAlert();

    // if (window.confirm('Are you really want to delete?')) {
    //   try {
    //     const { data } = await removeBook(id, auth.token);
    //     await loadBooks();
    //     toast.success(`${data?.title} is deleted`);
    //   } catch (error) {
    //     console.log(error);
    //     toast.error('Failed to delete.');
    //   }
    // }
  }

  const handleConfirmDelete = async (confirm) => {
    if (confirm && deleteId) {
      try {
        const { data } = await removeBook(deleteId, auth.token);
        await loadBooks();
        toast.success(`${data?.title} is deleted`);
        setDeleteId(undefined);
      } catch (error) {
        console.log(error);
        toast.error('Failed to delete.');
        setDeleteId(undefined);
      }
    } else {
      setDeleteId(undefined);
    }
  }

  const handleAddNewBook = async (bookObj) => {
    // bookData.image = null;
    // setBookData(bookObj);
    // bookData.category = Number(bookData.category);
    // bookData.avlQty = Number(bookData.avlQty);
    // console.log('ADD', bookData);
    delete bookObj?.id;
    console.log('ADD', bookObj);

    try {
      const {data} = await createBook(bookObj, auth?.token);
      setBookData({
        id: '',
        title: '',
        author: '',
        totalQty: '',
        image: '',
        category: '',
      })
      closePopup();
      await loadBooks();
      toast.success(`${data?.title} is added`);
    } catch (error) {
      console.log(error);
      closePopup();
      toast.error(`Failed to add ${bookObj?.title}`);
    }
    
  }

  const handleSort = (col, isDesc) => {
    const colMapping = {
      'Id': 'id',
      'Title': 'title',
      'Author': 'author',
      'Total qty': 'totalQty',
      'Avl. qty': 'avlQty',
      'Category': 'category',
    }

    setSortBy(colMapping[col]);
    if (isDesc) {
      setSortDir('desc');
    } else {
      setSortDir('asc');
    }
  }

  const handleSearch = (searchQuery) => {
    setSearch(searchQuery);
  };

  const handleFilter = (filterObj) => {
    // TODO - Make an api call to fetch filtered data
    console.log(filterObj);
  }

  return (
    <div className='book-page'>
      <div className="book-header">
        {/* <div className="filter-section">
          <Searchbar placeholder={'Search book'} onSearch={handleSearch} />
          <div onClick={openFilter} className="filter-icon">
            <span>Filter</span>
            <FilterIcon size={20} />
          </div>
        </div> */}
        <Searchbar placeholder={'Search book'} onSearch={handleSearch} />
        <Button onClick={openPopup} varient={'primary'} >Add</Button>
      </div>
      <br />

      <div className="">
        <Table colums={bookCols} data={books} currentPage={page} totalPages={totalPages} onPageChange={setPage} sortBy={'Id'} onSort={handleSort} addDelete={true} addEdit={true} onEdit={handleEdit} onDelete={handleDelete} type={'book'} />
      </div>

      

      <BookPopup title={'Add book'} isPopupOpen={isPopupOpen} closePopup={closePopup} onAdd={handleAddNewBook} book={bookData} type='add' />
      <BookFilterPopup title={'Filter books'} isPopupOpen={isFilterOpen} closePopup={closeFilter} onFilter={handleFilter} />

      <AlertPopup isOpen={isAlertOpen} onClose={closeAlert} onConfirm={handleConfirmDelete} />
    </div>
  )
}

export default DashboardHOC(Book);