import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [showSearch, location]);

  return showSearch && visible ? (
    <div className='border-t border-b border-gray-100 bg-gray-50 text-center select-none'>
      <div className='inline-flex items-center bg-white justify-center border-2 border-neutral-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input
          type='text'
          placeholder='Search products...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='flex-1 bg-inherit outline-none text-sm'
          aria-label='Search products'
        />
        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#6a7282">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>

      <img
        src={assets.cross_icon}
        alt="cross"
        className='inline w-3 cursor-pointer'
        onClick={() => setShowSearch(false)}
        aria-hidden="true"
      />
    </div>
  ) : null
}

export default SearchBar