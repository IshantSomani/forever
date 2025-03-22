import { useContext } from 'react'
import { assets } from '../assets/assets'
import { Auth } from '../context/AuthProvider'

const Navbar = () => {

    const { logout } = useContext(Auth)

    return (
        <nav
            className='flex items-center justify-between py-2 px-[4%] bg-white shadow-sm sticky top-0'
            role="navigation"
            aria-label="Main navigation"
        >
            <img
                src={assets.logo}
                alt="Company Logo"
                loading='lazy'
                className='w-[max(10%,80px)] h-auto'
                width="120"
                height="40"
            />

            <button
                className="fancy"
                onClick={logout}
                aria-label="Logout from account"
                type="button"
            >
                <span className="top-key"></span>
                <span className="text">Logout</span>
                <span className="bottom-key-1"></span>
                <span className="bottom-key-2"></span>
            </button>
        </nav>
    )
}

export default Navbar