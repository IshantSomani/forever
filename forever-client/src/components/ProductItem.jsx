import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext)
    
    return (
        <article className="group">
            <Link 
                to={`/product/${id}`} 
                className="block text-gray-700"
                aria-label={`View ${name} product details`}
            >
                <div className="relative overflow-hidden bg-gray-100 rounded-md">
                    <img 
                        src={image[0]} 
                        alt={`${name} - Fashion product`}
                        className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        width={400}
                        height={400}
                        loading="lazy"
                        decoding="async"
                    />
                    <div className="absolute inset-0 bg-black/10 bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300" />
                </div>
                <div className="mt-3 space-y-1">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2" title={name}>
                        {name}
                    </h3>
                    <p className="text-sm font-semibold text-gray-900">
                        {currency}{price.toLocaleString()}
                    </p>
                </div>
            </Link>
        </article>
    )
}

export default React.memo(ProductItem)