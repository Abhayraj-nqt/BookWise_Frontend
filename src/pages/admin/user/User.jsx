import React, { useEffect, useState } from 'react'
import './User.css'
import DashboardHOC from '../../../components/HOC/dashboardHOC/DashboardHOC'
import { useSelector } from 'react-redux'
import { getAllUsers, registerUser, removeUser, updateUser } from '../../../api/services/user'
import toast from '../../../components/toast/toast'
import Searchbar from '../../../components/searchbar/Searchbar'
import Button from '../../../components/button/Button'
import Table from '../../../components/table/Table'
import UserPopup from '../../../components/popup/UserPopup'

const userCols = [
  "Id",
  "Name",
  "Mobile",
  "Email",
]

const User = () => {

  const auth = useSelector(state => state.auth);

  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [sortBy, setSortBy] = useState('id');
  const [sortDir, setSortDir] = useState('asc');
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    mobileNumber: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    loadUsers();
  }, [page, size, sortBy, sortDir])

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadUsers();
    }, 3000)

    return () => clearTimeout(timeout);
  }, [search])

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const loadUsers = async () => {
    try {
      const { data } = await getAllUsers(page, size, sortBy, sortDir, search, auth.token);

      if (Array.isArray(data)) {
        setUsers(data)
      } else {
        setUsers(data.content);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.log('Error fetching users', error);
    }
  }

  const handleEdit = async (userObj) => {
    try {
      const { data } = await updateUser(userObj.mobileNumber, userObj, auth.token);
      await loadUsers();
      closePopup();
      toast.success(`Successfully updated`)
    } catch (error) {
      console.log(error);
      closePopup()
      toast.error('Failed to update');
    }
  }

  const handleDelete = async (mobileNumber) => {
    if (window.confirm('Are you really want to delete?')) {
      try {
        const {data} = await removeUser(mobileNumber, auth.token);
        // dispatch(deleteCategory(data.id));
        await loadUsers();
        toast.success(`${data?.name} is deleted`);
      } catch (error) {
        console.log(error);
        toast.error('Failed to delete.')
      }
    }
  }

  const handleAddNewUser = async (userObj) => {
    try {
      delete userObj?.id;
      const { data } = await registerUser(userObj, auth.token);
      setUserData({
        id: '',
        name: '',
        mobileNumber: '',
        email: '',
        password: '',
      })
      closePopup();
      await loadUsers();
      toast.success(`${data?.name} is added`);
    } catch (error) {
      console.log(error);
      closePopup();
      toast.error(`Failed to add ${userObj?.name}`);
    }
  }

  const handleSort = (col, isDesc) => {

    const colMapping = {
      'Id': 'id',
      'Name': 'name',
      'Mobile': 'mobileNumber',
      'Email': 'email',
    }

    console.log({"col": colMapping[col], isDesc});

    setSortBy(colMapping[col]);
    if (isDesc) {
      setSortDir('desc')
    } else {
      setSortDir('asc')
    }
  }

  const handleSearch = async (searchQuery) => {
    setSearch(searchQuery);
  };

  return (
    <div className='user-page'>
      <div className="user-header">
        <Searchbar placeholder={'Search user'} onSearch={handleSearch} />
        <Button onClick={openPopup} varient={'primary'} >Add</Button>
      </div>
      <br />

      <div className="">
        <Table colums={userCols} data={users} currentPage={page} totalPages={totalPages} onPageChange={setPage} sortBy={'Id'} onSort={handleSort} addEdit={true} addDelete={true} onEdit={handleEdit} onDelete={handleDelete} type={'user'}  />
      </div>

      <UserPopup title={'Add user'} isPopupOpen={isPopupOpen} closePopup={closePopup} onAdd={handleAddNewUser} category={userData} type='add'  />

    </div>
  )
}

export default DashboardHOC(
  User,
)