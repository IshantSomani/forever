import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, logout, token } = useContext(ShopContext)

  const navigate = useNavigate()

  const handleToggleMenu = () => {
    setVisible(!visible);
  };
  const toggleSearch = () => {
    setShowSearch(true);
    navigate('/collection')
  }

  return (
    <nav className='flex justify-between items-center py-5 font-medium sticky top-0 z-50 px-0.5 select-none bg-white/70'>
      <Link to='/'><img src={assets.logo} className="w-36" alt='logo' loading="lazy" /></Link>
      <div className='hidden sm:flex gap-5 text-sm text-gray-700 items-center'>
        <NavLink
          to='/'
          className={({ isActive }) =>
            `nav-flex-web ${isActive ? 'active-b-bar' : ''}`
          }
        >
          <p>Home</p>
        </NavLink>
        <NavLink
          to='/collection'
          className={({ isActive }) =>
            `nav-flex-web ${isActive ? 'active-b-bar' : ''}`
          }
        >
          <p>Collection</p>
        </NavLink>
        <NavLink
          to='/about'
          className={({ isActive }) =>
            `nav-flex-web ${isActive ? 'active-b-bar' : ''}`
          }
        >
          <p>About</p>
        </NavLink>
        <NavLink
          to='/contact'
          className={({ isActive }) =>
            `nav-flex-web ${isActive ? 'active-b-bar' : ''}`
          }
        >
          <p>Contact</p>
        </NavLink>
        <Link to={`${import.meta.env.VITE_ADMIN_URI}`} className="cta">
          <span className="hover-underline-animation">Admin Panel</span>
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <img
          src={assets.search_icon}
          alt='search'
          className='w-5 cursor-pointer'
          onClick={toggleSearch}
        />

        <div className="group relative">
          <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} alt='profile' className='w-5 cursor-pointer' loading="lazy" />
          {/* ----------Dropdown Menu---------- */}
          {
            token &&
            <div className='group-hover:block hidden absolute right-0 pt-4 dropdown-menu'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                <p className='cursor-pointer hover:text-black'>My Profile</p>
                <p onClick={() => navigate('/order')} className='cursor-pointer hover:text-black'>Order</p>
                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
              </div>
            </div>
          }
        </div>

        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} alt='cart' className='w-5 cursor-pointer' loading="lazy" />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
        </Link>
        <img onClick={handleToggleMenu} src={assets.menu_icon} alt='menu' className='w-5 cursor-pointer sm:hidden' loading="lazy" />
      </div>

      {visible && (
        <div className='fixed top-0 left-0 w-full h-screen bg-white bg-opacity-95 z-50 flex flex-col text-gray-600'>
          <div
            onClick={handleToggleMenu}
            className="flex items-center gap-4 p-4 cursor-pointer border-b"
          >
            <img
              src={assets.dropdown_icon}
              alt='close'
              className='h-4 rotate-180 cursor-pointer'
            />
            <span>Close Menu</span>
          </div>

          <div className='flex flex-col p-4 gap-2'>
            <NavLink
              to={'/'}
              className={({ isActive }) =>
                `p-4 rounded-lg ${isActive ? 'text-white bg-black' : 'hover:bg-gray-100'}`
              }
              onClick={handleToggleMenu}
            >
              Home
            </NavLink>
            <NavLink
              to={'/collection'}
              className={({ isActive }) =>
                `p-4 rounded-lg ${isActive ? 'text-white bg-black' : 'hover:bg-gray-100'}`
              }
              onClick={handleToggleMenu}
            >
              Collection
            </NavLink>
            <NavLink
              to={'/about'}
              className={({ isActive }) =>
                `p-4 rounded-lg ${isActive ? 'text-white bg-black' : 'hover:bg-gray-100'}`
              }
              onClick={handleToggleMenu}
            >
              About
            </NavLink>
            <NavLink
              to={'/contact'}
              className={({ isActive }) =>
                `p-4 rounded-lg ${isActive ? 'text-white bg-black' : 'hover:bg-gray-100'}`
              }
              onClick={handleToggleMenu}
            >
              Contact
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  )
}

export default React.memo(Navbar)