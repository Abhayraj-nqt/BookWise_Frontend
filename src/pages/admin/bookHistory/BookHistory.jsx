import React, { useEffect, useState } from 'react'
import './BookHistory.css'
import DashboardHOC from '../../../components/HOC/dashboardHOC/DashboardHOC'
import { useParams } from 'react-router-dom'
import toast from '../../../components/toast/toast'
import { getBookById, getBookHistory } from '../../../api/services/book'
import Table from '../../../components/table/Table'
import { useSelector } from 'react-redux'

const tableCols = [
    "Id",
    "User",
    "Issue",
    "Expected return",
    "Actual return",
    "Status",
    "Type"
]

const BookHistory = () => {

    const {bookId} = useParams();

    const auth = useSelector(state => state.auth);
    const [book, setBook] = useState();
    const [bookHistory, setBookHistory] = useState([]);

    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [sortBy, setSortBy] = useState('id');
    const [sortDir, setSortDir] = useState('asc');
    const [search, setSearch] = useState('');

    useEffect(() => {
        loadBookHistory();
    }, [page, size, sortBy, sortDir])

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //       loadBooks();
    //     }, 3000)
    
    //     return () => clearTimeout(timeout);
    //   }, [search])

    const loadBookHistory = async () => {
        try {
            await loadBook();
            const {data} = await getBookHistory(bookId, page, size, sortBy, sortDir, search, auth.token);
            setBookHistory(data.content);
        } catch (error) {
            console.log(error);
            toast.error(`Failed to load book history`);
        }
    }

    const loadBook = async () => {
        try {
            const {data} = await getBookById(bookId, auth.token);
            setBook(data);
            console.log(book);
        } catch (error) {
            console.log(error);
            toast.error(`Failed to find book`);
        }
    }

    const handleSort = (col, isDesc) => {
        const colMapping = {
            'Id': 'id',
            'Book': 'book'
        }

        setSortBy(colMapping[col]);
        if (isDesc) {
            setSortDir('desc');
        } else {
            setSortDir('asc');
        }

    }

  return (
        <div>
            <h2 className='history-title'>{book?.title}'s history</h2>
            <Table colums={tableCols} data={bookHistory} currentPage={page} totalPages={totalPages} onPageChange={setPage} sortBy={'Id'} onSort={handleSort} type={'userHistory'} />
        </div>
  )
}

export default DashboardHOC(BookHistory);