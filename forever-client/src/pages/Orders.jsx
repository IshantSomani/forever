import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
  const { token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = useCallback(async () => {
    try {
      if (!token) {
        toast.info('Please login to view your orders')
        return null;

      }
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/order/userOrders`,
        { headers: { token } }
      )

      if (response.data?.data) {
        let allOrdersItems = []
        response.data.data.map(order => {
          console.log(order)
          order.items.map(item => {
            item['status'] = order.status
            item['amount'] = order.amount
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItems.push(item)
          })
          setOrderData(allOrdersItems.reverse())
        })
      }
    } catch (err) {
      console.error('Error fetching order data', err);
    }
  }, [token])

  useEffect(() => {
    loadOrderData()
  }, [loadOrderData])

  return (
    <div className=' border-t-gray pt-16'>
      <div className="text-2xl">
        <Title title1={'MY'} title2={'ORDERS'} />
      </div>

      <div>
        {
          orderData.map((item, index) => (
            <div key={index} className='py-4 border-t-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img src={item.images[0]} alt="product" loading='lazy' className='w-20 sm:w-24' />
                <div>
                  <p className='sm:text-lg font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700 select-none'>
                    <p className='text-lg'>{currency}{item.amount}</p>
                    <p>Quentity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1'>Payment: <span className='text-gray-400 uppercase'>{item.paymentMethod}</span></p>
                </div>
              </div>

              <div className='md:w-1/2 flex justify-between'>
                <div className="flex items-center gap-2">
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>

                <button onClick={loadOrderData} className='border px-4 py-2 font-medium text-sm hover:bg-black hover:text-white'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div >
  )
}

export default Orders