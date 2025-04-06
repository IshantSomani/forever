import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-8 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <img src={assets.exchange_icon} alt="Exchange Icon" className='w-12 m-auto mb-5' loading="lazy" />
        <p className='font-semibold'>Easy Exchange Policy</p>
        <p className="text-gray-600">Enjoy a hassle-free exchange process for your convenience.</p>
      </div>
      <div>
        <img src={assets.quality_icon} alt="Return Policy Icon" className='w-12 m-auto mb-5' loading="lazy" />
        <p className='font-semibold'>7-Day Return Policy</p>
        <p className="text-gray-600">We offer a 7-day free return policy for your peace of mind.</p>
      </div>
      <div>
        <img src={assets.support_img} alt="Customer Support Icon" className='w-12 m-auto mb-5' loading="lazy" />
        <p className='font-semibold'>24/7 Customer Support</p>
        <p className="text-gray-600">Our dedicated customer support team is available 24/7 to assist you.</p>
      </div>
    </div>
  )
}

export default OurPolicy
