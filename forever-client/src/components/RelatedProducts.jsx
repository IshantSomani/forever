import React, { useContext, useEffect, useMemo, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const RelatedProducts = ({ category, subCategory }) => {
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);


    const filteredProducts = useMemo(() => {
        if (!products.length) return []

        return products
            .filter(item =>
                item.category === category &&
                item.subCategory === subCategory
            )
            .slice(0, 5)
    }, [products, category, subCategory])

    useEffect(() => {
        setRelated(filteredProducts)
    }, [filteredProducts])

    if (!related.length) {
        return (
            <div className="my-24">
                <div className="text-center text-3xl py-2">
                    <Title title1={'RELATED'} title2={'PRODUCTS'} />
                </div>
                <div className="text-center py-12 text-gray-400">
                    No related products found in this category
                </div>
            </div>
        )
    }

    return (
        <div className='my-24'>
            <div className="text-center text-3xl py-2">
                <Title title1={'RELATED'} title2={'PRODUCTS'} />
                <p className="text-center pb-12 text-gray-400 text-base">
                    Customers also viewed these {subCategory.toLowerCase()} items
                </p>
            </div>

            {related.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                    {related.map((item) => (
                        <ProductItem
                            key={item._id}
                            id={item._id}
                            name={item.name}
                            image={item?.images}
                            price={item.price}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 text-gray-400">
                    No related products found
                </div>
            )}
        </div>
    )
}

export default React.memo(RelatedProducts)