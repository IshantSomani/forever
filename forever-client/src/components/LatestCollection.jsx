import React, { useContext, useMemo } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);

    const LatestProducts = useMemo(() => {
        if (!products.length) return [];

        return [...products].slice(0, 10).reverse();
    }, [products])


    return (
        <div className="my-10">
            <div className="text-center py-8 text-3xl">
                <Title title1={'LATEST'} title2={'COLLECTIONS'} />
                <p className="w-3/4 m-auto text-sm sm:text-sm md:text-base text-gray-600">
                    Discover the newest additions to our collection, handpicked for you.
                </p>
            </div>

            {/* Rendering Products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {LatestProducts.map((item) => (
                    <ProductItem key={item._id} id={item._id} image={item?.images} name={item.name} price={item.price} />
                ))}
            </div>
        </div>
    )
}

export default React.memo(LatestCollection);