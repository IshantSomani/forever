import React, { useCallback, useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Auth } from '../context/AuthProvider';
import Parcel from '../assets/parcel_icon.svg'

const Orders = () => {
  const { token, currency } = useContext(Auth)
  const [orders, setOrders] = useState([])

  const fetchAllOrders = useCallback(async () => {
    if (!token) {
      console.error('No token provided')
      return null;
    }
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/order/list`, { headers: { token } })
      if (response.data.message) {
        setOrders(response.data.data.reverse())
        // toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
        setOrders([])
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to fetch orders')
    }
  }, [token])

  useEffect(() => {
    fetchAllOrders()
  }, [fetchAllOrders])

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URI}/order/status`, { orderId, status: event.target.value }, { headers: { token } })
      if (response.data.message) {
        await fetchAllOrders()
        toast.success(response.data.message)
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to update order status')
    }
  }

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Your Orders</h3>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded shadow border-2 border-gray-400 p-4 md:p-6 transition-all hover:shadow-md"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              {/* Order Image */}
              <div className="md:col-span-1 flex justify-center">
                <img className="w-16 h-16 object-contain" src={Parcel} alt="parcel" />
              </div>

              {/* Order Details */}
              <div className="md:col-span-6 space-y-2">
                <div className="space-y-1">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-baseline space-x-2 text-gray-600">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm">× {item.quantity}</span>
                      <span className="text-xs text-gray-500">{item.size}</span>
                    </div>
                  ))}
                </div>
                <div className="text-sm space-y-1 text-gray-600">
                  <p className="font-medium">{order.address.firstName} {order.address.lastName}</p>
                  <p className="break-words">
                    {order.address.address}, {order.address.state}, {order.address.country}, {order.address.zipCode}
                  </p>
                  <p>{order.address.phone}</p>
                </div>
              </div>

              {/* Order Info */}
              <div className="md:col-span-3 text-sm space-y-2">
                <div className="flex justify-between md:block">
                  <p><span className="text-gray-500">Items:</span> {order.items.length}</p>
                  <p><span className="text-gray-500">Method:</span> {order.paymentMethod}</p>
                </div>
                <div className="flex justify-between md:block">
                  <p><span className="text-gray-500">Payment:</span> {order.payment ? "Done" : "Pending"}</p>
                  <p className='selection:bg-black selection:text-white'><span className="text-gray-500">Date:</span> {new Date(order.date).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Price and Status */}
              <div className="md:col-span-2 space-y-3">
                <p className="text-lg font-semibold text-right md:text-left">
                  {currency} {order.amount}
                </p>
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                  className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div >
  )
}

export default Orders