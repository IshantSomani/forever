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
              <div key={index} className='bg-white p-4 border-t-b rounded-md transition-shadow sm:grid sm:grid-cols-[4fr_2fr_0.5fr]'>
                {/* Product Info */}
                <div className="flex items-start gap-4 sm:gap-8 mb-4 sm:mb-0">
                  <img
                    src={productsData.images[0]}
                    alt={productsData.name}
                    className='w-20 sm:w-24 object-cover rounded shadow'
                    width={96}
                    height={96}
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <p className='text-base font-medium text-gray-900'>{productsData.name}</p>
                    <p className='text-sm font-base text-gray-500'>{productsData.description}</p>
                    <div className='flex items-center gap-2 mt-1'>
                      <span className='text-sm text-gray-500'>{item.size}</span>
                      <span className='text-gray-400'>·</span>
                      <span className='text-sm font-medium text-gray-900'>
                        {currency}{productsData.price}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quantity Controls and Total */}
                <div className="flex items-center justify-between border-t sm:border-t-0 pt-4 sm:pt-0">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => removeFromCart(item._id, item.size)}
                      className="w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-xl">−</span>
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item._id, item.size)}
                      className="w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-xl">+</span>
                    </button>
                  </div>

                  <div className="text-right font-medium text-gray-900">
                    {currency}{(productsData.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {cartData.length > 0 && (
        <div className='max-w-xl ml-auto space-y-6'>
          <CartTotal />
          <button
            onClick={() => navigate('/place-order')}
            className='w-full bg-black text-white py-4 rounded font-medium flex items-center justify-center gap-2 hover:bg-black/95 transition-colors'

          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart