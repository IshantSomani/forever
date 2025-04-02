import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import LoadingSpinner from './LoadingSpinner';

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            const bestSellerProducts = products.filter((product) => product.bestSeller);
            setBestSeller(bestSellerProducts.slice(1, 6));
        }
    }, [products]);

    if (!products.length) {
        return (
            <div className="flex items-center justify-center p-4">
                <div className="p-8 max-w-md w-full">
                    <LoadingSpinner
                        message="We're fetching the most popular products just for you! Please hold on."
                    />
                </div>
            </div>
        );
    }

    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title title1={'BEST'} title2={'SELLERS'} />
                <p className='w-3/4 m-auto text-sm sm:text-sm md:text-base text-gray-600'>
                    Explore our best-selling products, carefully curated just for you.
                </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {bestSeller.map((item) => (
                    <ProductItem
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        image={item?.images}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    );
}

export default BestSeller;
