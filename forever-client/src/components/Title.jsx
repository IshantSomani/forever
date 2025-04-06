import React from 'react'
import PropTypes from 'prop-types'
const Title = ({ title1, title2 }) => {
    return (
        <div className='inline-flex gap-1.5 items-center mb-3'>
            <p className='text-gray-500 uppercase'>{title1}<span className='text-gray-700 font-medium uppercase'>{title2}</span></p>
            <p className='w-8 sm:w-12 h-[1px] sm:h-[2.5px] bg-gray-700' ></p>
        </div>
    )
}

Title.propTypes = {
    title1: PropTypes.string.isRequired,
    title2: PropTypes.string.isRequired,
    className: PropTypes.string
}

export default React.memo(Title)