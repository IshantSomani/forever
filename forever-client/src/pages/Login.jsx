import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
  const [formState, setFormState] = useState('LOGIN')
  const FORM_TYPES = { LOGIN: 'LOGIN', SIGNUP: 'SIGN UP' }
  const { token, setToken } = useContext(ShopContext)
  const navigate = useNavigate();

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const handleToggle = () => {
    setFormState(prev => prev === FORM_TYPES.LOGIN ? FORM_TYPES.SIGNUP : FORM_TYPES.LOGIN)
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (formState === FORM_TYPES.SIGNUP) {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/users/register`, {
          name,
          email,
          password,
        });

        if (response.data?.message) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token)
          toast.success(response.data.message);
        } else {
          toast.error('Registration failed');
        }
      } else {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/users/login`, {
          email,
          password,
        });
        
        if (response.data?.token) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token)
          toast.success('Login successful');
        } else {
          toast.error('Invalid credentials');
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate])

  const inputClasses = "w-full px-4 py-3 border border-gray-300 rounded transition-all"

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-full max-w-md mx-auto mt-12 px-4 sm:px-0 select-none">
      <div className='inline-flex items-center gap-2 mb-8 mt-10'>
        <p className='prata-regular text-3xl'>{formState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-neutral-800' />
      </div>
      <div className="w-full space-y-5">
        {formState === FORM_TYPES.SIGNUP && (
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" className={inputClasses} placeholder="Full Name" required />
        )}

        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className={inputClasses} placeholder="Email Address" required />
        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className={inputClasses} placeholder="Password" required />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm mt-[-10px]">
          <button type="button" onClick={handleToggle} className="text-black hover:underline hover:underline-offset-4 font-medium transition-colors">
            {formState === FORM_TYPES.LOGIN ? 'Create New Account' : 'Already have an account?'}
          </button>

          <button type="button" className="text-gray-600 hover:text-gray-700 transition-colors">
            Forgot Password?
          </button>
        </div>

        <button type="submit" className="w-full py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 active:bg-gray-700 transition-colors rounded-sm" >
          {formState === FORM_TYPES.LOGIN ? 'Sign In' : 'Sign Up'}
        </button>

      </div>
    </form>
  )
}

export default Login