import React, { useEffect, useState } from 'react'
import './AdminUserHistory.css'
import DashboardHOC from '../../../components/HOC/dashboardHOC/DashboardHOC'
import { useParams } from 'react-router-dom'

import { getUserByMobile, getUserHistory } from '../../../api/services/user'
import { useSelector } from 'react-redux'
import toast from '../../../components/toast/toast'
import Table from '../../../components/table/Table'

const tableCols = [
    "Id",
    "Book",
    "Issue",
    "Expected return",
    "Actual return",
    "Status",
    "Type"
]

const AdminUserHistory = () => {

    const { mobile } = useParams();

    const auth = useSelector(state => state.auth);
    const [user, setUser] = useState();
    const [firstName, setFirstName] = useState('');
    const [userHistory, setUserHistory] = useState([]);

    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [sortBy, setSortBy] = useState('id');
    const [sortDir, setSortDir] = useState('asc');
    const [search, setSearch] = useState('')

    useEffect(() => {
        loadUserHistory();
    }, [page, size, sortBy, sortDir]);

    const loadUserHistory = async () => {
        try {
            await loadUser();
            const {data} = await getUserHistory(mobile, page, size, sortBy, sortDir, search, auth.token)
            setUserHistory(data.content);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load user history");
        }
    }

    const loadUser = async () => {
        try {
            const {data} = await getUserByMobile(mobile, auth.token);
            setUser(data);
            const firstNameOfUser = data?.name.split(' ')[0];
            setFirstName(firstNameOfUser);
        } catch (error) {
            console.log(error);
            toast.error(`Failed to find user`);
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
            <h2>{firstName}'s history</h2>
            <Table colums={tableCols} data={userHistory} currentPage={page} totalPages={totalPages} onPageChange={setPage} sortBy={'Id'} onSort={handleSort} type={'userHistory'} />
        </div>
    )
}

export default DashboardHOC(AdminUserHistory);