import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// CSS ------------------------------------------------------------------------
import './App.css'

// Components -----------------------------------------------------------------
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import AdminRoute from './components/redirect/AdminRoute'
import UserRoute from './components/redirect/UserRoute'
import ToastContainer from './components/toast/ToastContainer'

// Pages ----------------------------------------------------------------------
import Dashboard from './pages/admin/dashboard/Dashboard'
import Category from './pages/admin/category/Category'
import Book from './pages/admin/book/Book'
import User from './pages/admin/user/User'
import Issuance from './pages/admin/issuance/Issuance'
import BookHistory from './pages/admin/bookHistory/BookHistory'
import AdminUserHistory from './pages/admin/userHistory/AdminUserHistory'

import History from './pages/user/history/History'

import Login from './pages/login/Login'
import Test from './pages/test/Test'

// Functions
import { getCurrentUser } from './api/services/auth'
import { loginUser } from './redux/auth/authActions'
import Account from './pages/user/account/Account'


const App = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const auth = useSelector(state => state.auth);

  useEffect(() => {
    const token = window.localStorage.getItem('authtoken');
    console.log('TOKEN APP ->', token);
    
    if (token) {
      loadUser(token);
    } else {
      navigate('/login');
    }
  }, [dispatch])

  const loadUser = async (token) => {

    try {
      const { data } = await getCurrentUser(token);
      dispatch(loginUser(data));
      window.localStorage.setItem('authtoken', data.token);

      console.log("APP ->", data);
      
      if (data.role === 'ROLE_ADMIN') {
        navigate('/admin/dashboard');
      } else if(data.role === 'ROLE_USER') {
        navigate('/user/history');
      } else {
        navigate('/login');
      }

    } catch (error) {
      console.log(error);
      navigate('/login');
    }
  }

  return (
    <>
      <Navbar />
      <ToastContainer />
      <Routes>

        {/* Public routes */}
        <Route path='/' element={<Test />} />
        <Route path='/login' element={<Login />} />

        {/* Protected routes for admin */}
        <Route path='/admin/dashboard' element={<AdminRoute> <Dashboard /> </AdminRoute>} />
        <Route path='/admin/category' element={<AdminRoute> <Category /> </AdminRoute>} />
        <Route path='/admin/book' element={<AdminRoute> <Book /> </AdminRoute>} />
        <Route path='/admin/user' element={<AdminRoute> <User /> </AdminRoute> } />
        <Route path='/admin/issuance' element={<AdminRoute> <Issuance /> </AdminRoute>} />
        <Route path='/admin/book-history/:bookId' element={<AdminRoute> <BookHistory /> </AdminRoute>} />
        <Route path='/admin/user-history/:mobile' element={<AdminRoute> <AdminUserHistory /> </AdminRoute>} />

        {/* Protected routes for user */}
        <Route path='/user/history' element={<UserRoute> <History /> </UserRoute>} />
        <Route path='/account' element={<UserRoute> <Account /> </UserRoute>} />

      </Routes>
      {/* <Footer /> */}
    </>
  )
}

export default App