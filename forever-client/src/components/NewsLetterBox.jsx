import React from 'react'

const NewsLetterBox = () => {
    const onSubmitHandler = (e) => {
        e.preventDefault()
    }
    return (
        <div className='text-center'>
            <div className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</div>
            <p className='text-gray-600 mt-3'>Be the first to know about new arrivals, sales & promos!</p>
            <form className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border border-gray-300 pl-4 rounded">
                <input type="email" placeholder='Enter your email address' className='p-2 w-full sm:flex-1 outline-none' />
                <button onClick={onSubmitHandler} className='bg-black text-white px-10 py-4 text-sm uppercase'>Subscribe</button>
            </form>
        </div>
    )
}

export default NewsLetterBox