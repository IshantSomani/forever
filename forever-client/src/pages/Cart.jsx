import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { products, currency, cartItems, addToCart, removeFromCart } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title title1={'YOUR'} title2={'CART'} />
      </div>

      <div className='mb-8'>
        {cartData.length === 0 ? (
          <p className='text-center text-gray-500 py-8'>Your cart is empty</p>
        ) : (
          cartData.map((item, index) => {
            const productsData = products.find((product) => product._id === item._id);
            return (
              <div key={index} className='py-4 border-t-b text-gray-700 grid grid-cols-[3fr_1fr_1fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-2 sm:gap-4'>
                {/* Product Info */}
                <div className="flex items-start gap-6">
                  <img
                    src={productsData.images[0]}
                    alt='product'
                    className='w-20 sm:w-24'
                  />
                  <div>
                    <p className='text-sm sm:text-lg font-medium'>{productsData.name}</p>
                    <div className='flex items-center gap-3 mt-2 select-none'>
                      <p>{currency}{productsData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border border-gray-400 bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-center gap-2  select-none">
                  <button
                    onClick={() => removeFromCart(item._id, item.size)}
                    className="px-2 sm:px-3 py-1 border hover:bg-gray-100 text-sm sm:text-base"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-sm sm:text-base">{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item._id, item.size)}
                    className="px-2 sm:px-3 py-1 border hover:bg-gray-100 text-sm sm:text-base"
                  >
                    +
                  </button>
                </div>

                {/* Total Price */}
                <div className="text-right pr-2 sm:pr-4 text-sm sm:text-base">
                  {currency}{(productsData.price * item.quantity).toFixed(2)}
                </div>
              </div>

            )
          })
        )}
      </div>
      {cartData.length > 0 && (
        <div className='max-w-xl ml-auto space-y-4'>
          <CartTotal />
          <button onClick={() => navigate('/place-order')} className='w-full bg-black text-white py-3 hover:bg-black/95 transition-colors'>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart