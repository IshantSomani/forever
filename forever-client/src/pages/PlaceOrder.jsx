import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const [method, setMethod] = useState('stripe');
  const { cartItems, setCartItems, totalPrice, token, products } = useContext(ShopContext)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const itemInfo = products.find((product) => product._id === itemId);
            if (itemInfo) {
              orderItems.push({
                ...itemInfo, // Clone item details
                size,
                quantity: cartItems[itemId][size],
              });
            }
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error('Cart is empty. Add items before placing an order.');
        return;
      }

      let orderData = {
        items: orderItems,
        amount: totalPrice.grandTotal,
        address: formData,
      };

      // Cash On Delivery
      if (method === 'cod') {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/order/place`, orderData, {
          headers: { token },
        });

        if (response.data.message) {
          setCartItems({});
          toast.success(response.data.message);
          navigate('/order');
        } else {
          toast.error(response.data.message);
        }
      }

      if (method === 'stripe') {
        console.log('inside stripe')
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/order/stripe`, orderData, {
          headers: { token },
        });
        console.log("response:", response)

        if (response.data.message) {
          const { session_url } = response.data
          window.location.replace(session_url)
        } else {
          toast.error(response.data.message);
        }
      }



    } catch (error) {
      console.error('Failed to place order:', error);
      toast.error('Failed to place order');
    }

  }

  const handlePaymetService = (value) => {
    setMethod(value);
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t-gray'>
      {/* ----------Left Side---------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title title1={'DELIVERY'} title2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input type='text' onChange={onChangeHandler} value={formData.firstName} name="firstName" required placeholder='First Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input type='text' onChange={onChangeHandler} value={formData.lastName} name="lastName" placeholder='Last Name' required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input type='email' onChange={onChangeHandler} value={formData.email} name="email" placeholder='example@gamil.com' required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <input type='text' onChange={onChangeHandler} value={formData.address} name="address" placeholder="123 Main Street" required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <div className='flex gap-3'>
          <input type='text' onChange={onChangeHandler} value={formData.city} name="city" placeholder='City' required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input type='text' onChange={onChangeHandler} value={formData.state} name="state" placeholder='State' required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <div className='flex gap-3'>
          <input type='text' onChange={onChangeHandler} value={formData.zipCode} name="zipCode" placeholder='Zip Code' pattern="\d*" required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input type='text' onChange={onChangeHandler} value={formData.country} name="country" placeholder='Country' required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input type="tel" onChange={onChangeHandler} value={formData.phone} name="phone" placeholder='Phone' pattern="[0-9]{10}" required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
      </div>

      {/* ----------Right Side---------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title title1={'PAYMENT'} title2={'METHOD'} />
          {/* ----------Payment Method Selection---------- */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={() => handlePaymetService('stripe')} className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full border-gray-300 ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.stripe_logo} alt="stripe" className='h-5 mx-4' loading="lazy" />
            </div>
            {/* <div onClick={() => handlePaymetService('razorpay')} className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full border-gray-300 ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.razorpay_logo} alt="razorpay" className='h-5 mx-4' loading="lazy" />
            </div> */}
            <div onClick={() => handlePaymetService('cod')} className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full border-gray-300 ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4 uppercase">CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button type='submit' className="bg-black text-white px-16 py-3 text-sm uppercase">PLACE ORDER</button>
          </div>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder