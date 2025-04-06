import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
    return (
        <>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-30 text-sm'>
                <div>
                    <img src={assets.logo} alt="logo" className='mb-5 w-32' loading="lazy" />
                    <p className='w-full md:w-2/3 text-gray-600'>
                        At ForeverYou, we are committed to bringing you the best in fashion and lifestyle. We strive to make every experience with us memorable. Discover our exclusive collections and more at the click of a button.
                    </p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>ABOUT THE COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery & Returns</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>CONTACT US</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Phone: +91 99282 71130</li>
                        <li>Email: <a href="mailto:contact@foreveryou.com" className="text-blue-600">contact@foreveryou.com</a></li>
                    </ul>
                </div>
            </div>

            <div>
                <hr className='text-gray-300' />
                <p className='py-5 text-sm text-center text-gray-700'>
                    © 2025 ForeverYou. All Rights Reserved. | Crafted with care by the ForeverYou Team
                </p>
            </div>
        </>
    );
}

export default React.memo(Footer);
