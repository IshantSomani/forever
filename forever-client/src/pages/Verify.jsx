import React, { useCallback, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
    const { token, setCartItems } = useContext(ShopContext);
    const [searchParams] = useSearchParams()
    const navigate = useNavigate();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const varifyPayment = useCallback(async () => {
        try {
            if (!token) {
                return null
            }

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/order/verifyPayment`, { success, orderId }, { headers: { token } })

            if (response.data?.success) {
                toast.success(response.data.message)
                setCartItems({})
                navigate('/order')
            } else {
                navigate('/cart')
                toast.error(response.data?.message || 'Failed to verify payment')
            }
        } catch (error) {
            console.error(error)
            toast.error(error?.response?.data?.message || 'Failed to verify payment')
        }
    }, [navigate, setCartItems, token, orderId, success])

    useEffect(() => {
        varifyPayment()
    }, [varifyPayment])
    return (
        <div>Verify</div>
    )
}

export default Verify