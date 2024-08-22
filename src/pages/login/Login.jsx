import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// CSS
import './Login.css'

// Components
import Input from '../../components/form/input/Input'
import Button from '../../components/button/Button'

// Functions
import { login } from '../../api/services/auth'
import { loginUser } from '../../redux/auth/authActions'
import toast from '../../components/toast/toast'

// Constants
import { images } from '../../libs/constants'


const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector(state => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')

  useEffect (() => {
    if (auth && auth.token) {
      if (auth.role === 'ROLE_ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/history');
      }
    }
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await login(username, password);
      dispatch(loginUser(data));
      window.localStorage.setItem('authtoken', data.token);
      toast.success('Login successfull');
    } catch (error) {
      console.log(error);
      const msg = error.response.data.errorMessage || 'Login failed!';
      toast.error(msg);
    }

  }


  return (
    <div className='login-page'>
      <form onSubmit={handleSubmit} className="login-form">
        <img src={images.logo} alt='logo'  />
        { 
        !auth.loading 
          ? <h2 className=''>Login to your account</h2>
          : <h2 className='' style={{color: 'red'}}>Loading ...</h2>
        }
        <br />
        <Input onChange={(e) => setUsername(e.target.value)} type='text' name='username' value={username} lable={'Username:'} placeholder={'Enter your username'} required />
        <Input onChange={(e) => setPassword(e.target.value)} type='text' name='password' value={password} lable={'Password:'} placeholder={'Enter your password'} required />
        <div className="login-btn">
          <Button type={'submit'} varient={'primary'}  >Login</Button>
        </div>
      </form>
    </div>
  )
}

export default Login