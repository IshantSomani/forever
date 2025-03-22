import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
    const baseLinkStyle = "flex items-center gap-3 px-4 py-3 rounded-l-lg transition-all"
    const activeStyle = "bg-pink-50 border-l-4 border-pink-500 font-semibold text-pink-700"
    const inactiveStyle = "text-gray-600 hover:bg-gray-50 hover:border-l-4 hover:border-gray-200"

    return (
        <div className='w-[18%] min-h-screen border-r-2 bg-white shadow-sm border-gray-200'>
            <div className='flex flex-col gap-4 pt-6 pl-[13%] md:pl-[20%] md:text-[15px]'>
                <NavLink to='/'
                    className={({ isActive }) =>
                        `${baseLinkStyle} ${isActive ? activeStyle : inactiveStyle}`
                    }
                >
                    <img src={assets.order_icon} alt='list items' loading='lazy' className='w-5 h-5' />
                    <p className='hidden sm:flex'>List Items</p>
                </NavLink>
                <NavLink to='/add'
                    className={({ isActive }) =>
                        `${baseLinkStyle} ${isActive ? activeStyle : inactiveStyle}`
                    }
                >
                    <img src={assets.add_icon} alt='add' loading='lazy' className='w-5 h-5' />
                    <p className='hidden sm:flex'>Add Items</p>
                </NavLink>
                <NavLink to='/order'
                    className={({ isActive }) =>
                        `${baseLinkStyle} ${isActive ? activeStyle : inactiveStyle}`
                    }
                >
                    <img src={assets.order_icon} alt='order' loading='lazy' className='w-5 h-5' />
                    <p className='hidden sm:flex'>Orders</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar