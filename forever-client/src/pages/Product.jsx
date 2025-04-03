import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [activeTab, setActiveTab] = useState('description')

  const fetchProductData = useCallback(async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.images[0]);
        return null;
      }
    })
  }, [productId, products])

  useEffect(() => {
    fetchProductData();
  }, [productId, fetchProductData])

  if (!productData) return <div className="animate-pulse h-screen bg-gray-50" />

  return productData ? (
    <div className='border-t--gray-300 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* ----------Product Data---------- */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* ----------Product Images---------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              productData.images.map((item, index) => (
                <img
                  key={index}
                  src={item}
                  alt={`image ${index}`}
                  className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border-pink-200 border-2'
                  onClick={() => { setImage(item) }}
                  aria-label={`View image ${index + 1}`}
                />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img
              src={image}
              alt='image'
              className="w-full h-auto object-cover border-pink-200 border-2 aspect-auto lg:aspect-[3/4]"
              loading="eager"
            />
          </div>
        </div>

        {/* ----------Product Info---------- */}
        <div className="flex-1">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{productData.name}</h1>
          <p className="text-gray-600 leading-relaxed">{productData.description}</p>

          <div className='flex items-center gap-1 mt-2 select-none'>
            <img src={assets.star_icon} alt="star" className="w-3 h-3" aria-hidden="true" loading="lazy" />
            <img src={assets.star_icon} alt="star" className="w-3 h-3" aria-hidden="true" loading="lazy" />
            <img src={assets.star_icon} alt="star" className="w-3 h-3" aria-hidden="true" loading="lazy" />
            <img src={assets.star_icon} alt="star" className="w-3 h-3" aria-hidden="true" loading="lazy" />
            <img src={assets.star_dull_icon} alt="star" className="w-3 h-3" aria-hidden="true" loading="lazy" />
            <span className="ml-2 text-sm text-gray-500">(122 reviews)</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-4">
            {currency}{productData.price.toFixed(2)}
          </p>
          <div className='flex flex-col gap-4 my-8 select-none'>
            <h3 className="font-medium text-gray-900">Select Size</h3>
            <div className='flex gap-2'>
              {
                productData.sizes.map((item, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${item === size ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() => setSize(item)}
                  >
                    {item}
                  </button>
                ))
              }
            </div>
          </div>

          <button
            onClick={() => addToCart(productData._id, size)}
            disabled={!size}
            className="w-full bg-neutral-950 text-white py-3 rounded hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
          <hr className='mt-8 text-gray-300' />

          <div className="space-y-2 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>100% Original Products</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Cash on Delivery Available</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Easy 7-Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* ----------Description & Review Section---------- */}
      <div className="mt-16 border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('description')}
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'description'
              ? 'text-pink-500 border-b-2 border-pink-500'
              : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'reviews'
              ? 'text-pink-500 border-b-2 border-pink-500'
              : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Reviews (122)
          </button>
        </div>
      </div>

      <div className="mt-8 prose max-w-none">
        {activeTab === 'description' && (
          <div className="space-y-4 text-gray-600">
            <p>
              Our {productData.name} is crafted with premium materials to ensure lasting comfort and style.
              The carefully selected fabric provides breathability and durability, making it perfect for
              everyday wear or special occasions.
            </p>
            <p>
              Designed with attention to detail, this product features a modern cut that flatters all body
              types. The versatile design makes it easy to pair with your existing wardrobe essentials.
            </p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {/* Reviews would be implemented here */}
            <p className="text-gray-500">Review system coming soon!</p>
          </div>
        )}
      </div>


      {/* ----------display related products---------- */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div >
  ) : <div className='opacity-0'>

  </div>
}

export default Product