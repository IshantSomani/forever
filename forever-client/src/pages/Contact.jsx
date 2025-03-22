import React from 'react'
import Title from '../components/Title'
import NewsLetterBox from '../components/NewsLetterBox'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <>
      <div className='text-center text-2xl pt-10 border-t-gray'>
        <Title title1={'CONTACT'} title2={'US'} />
      </div>
      <div className='my-8 sm:my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} alt='image' className='w-full md:max-w-[480px]' loading='lazy' />
        <div className="flex flex-col justify-center items-start gap-6">
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Our Store</h2>
          <p className="text-gray-600">
            54709 Willms Station <br />
            Suite 350, Washington, USA
          </p>
          <p className='text-gray-600'>
            Tel: <a href="tel:+919928271130" className='hover:text-gray-800'>+91 99282 71130</a>
            <br />
            Email: <a href="mailto:admin@forever.com" className='hover:text-gray-800'>admin@forever.com</a>
          </p>
          <h3 className='text-xl font-semibold text-gray-800 mb-4'>Careers at Forever</h3>
          <p className='text-gray-600 mb-6'>Join our team and explore exciting career opportunities!</p>
          <button className='border px-8 py-4 text-sm hover:bg-black hover:text-white'>Explore Jobs</button>
        </div>
      </div >
      <section className='mb-16 lg:mb-20'>
        <NewsLetterBox />
      </section>
    </>
  )
}

export default Contact