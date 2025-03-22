import React, { useContext, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Auth } from '../context/AuthProvider';

const Login = () => {
    const { setToken } = useContext(Auth);
    const [formData, setFormData] = useState({
        email: 'admin@gmail.com',
        password: 'admin'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/users/login`, formData);

            if (data.token) {
                setToken(data.token);
                toast.success('Login successful!');
            } else {
                toast.error('Login failed: No token received');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Login failed. Please try again.';
            toast.error(errorMessage);
        }
    }

    const inputClasses = 'rounded-md w-full px-3 py-2 border border-gray-300 outline-none'

    return (
        <div className='min-h-screen flex items-center justify-center w-full'>
            <div className='bg-white shadow rounded-xl px-8 py-6 max-w-md'>
                <h1 className='text-2xl font-bold mb-4 text-center'>Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                        <input
                            value={formData.email}
                            onChange={handleInputChange}
                            id="email"
                            name="email"
                            type="email"
                            placeholder='your@email.com' className={inputClasses} required />
                    </div>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                        <input
                            value={formData.password}
                            onChange={handleInputChange}
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password" className={inputClasses} required />
                    </div>
                    <button type="submit" className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;