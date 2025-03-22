import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import LoadingSpinner from '../components/LoadingSpinner';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilters, setShowFilters] = useState(false);
  const [FilterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const appliyFilter = useCallback(() => {
    let tempProducts = products.slice();

    if (showSearch && search) {
      tempProducts = tempProducts.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      tempProducts = tempProducts.filter(item => category.includes(item.category))
    }

    if (subCategory.length > 0) {
      tempProducts = tempProducts.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(tempProducts)
  }, [products, category, subCategory, search, showSearch])

  useEffect(() => {
    appliyFilter()
  }, [appliyFilter, category, subCategory, search, showSearch, products])

  const sortProduct = useCallback(() => {
    let fpCopy = [...FilterProducts];
    switch (sortType) {
      case 'low-high':
        fpCopy.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        fpCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        return;
    }
    setFilterProducts(fpCopy);
  }, [FilterProducts, sortType]);

  useEffect(() => {
    sortProduct()
  }, [sortProduct])

  if (!products.length) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="p-8 max-w-md w-full">
          <LoadingSpinner
            title="Loading..."
            message="We're fetching the selling products. Please wait a moment."
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t-gray'>
        {/* Filter options */}
        <div className='min-w-60'>
          <p onClick={() => (setShowFilters(!showFilters))} className="uppercase my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS
            <img src={assets.dropdown_icon} alt='dropdown' className={`h-3 sm:hidden ${showFilters ? 'rotate-90' : ''}`} loading="lazy" />
          </p>
          {/* Category Filter */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilters ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium uppercase select-none'>CATEGORIES</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input type='checkbox' className='w-3' value={'mens'} onChange={toggleCategory} /><span>Men</span>
              </p>
              <p className='flex gap-2'>
                <input type='checkbox' className='w-3' value={'womens'} onChange={toggleCategory} /><span>Women</span>
              </p>
              <p className='flex gap-2'>
                <input type='checkbox' className='w-3' value={'kids'} onChange={toggleCategory} /><span>Kids</span>
              </p>
            </div>
          </div>
          {/* Sub-Categorey Filter */}
          <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilters ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium uppercase select-none'>TYPE</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input type='checkbox' className='w-3' value={'topwear'} onChange={toggleSubCategory} /><span>Topwear</span>
              </p>
              <p className='flex gap-2'>
                <input type='checkbox' className='w-3' value={'bottomwear'} onClick={toggleSubCategory} /><span>Bottomwear</span>
              </p>
              <p className='flex gap-2'>
                <input type='checkbox' className='w-3' value={'footwear'} onClick={toggleSubCategory} /><span>Footwear</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className='flex-1'>

          <div className="flex justify-between text-base sm:text-2xl mb-4">
            <Title title1={"All"} title2={"COLLECTIONS"} />
            <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2 select-none'>
              <option value="relavent">Sort by: Relavent</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {
              FilterProducts.map((item) => (
                <ProductItem
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  image={item?.images}
                  price={item.price}
                />
              ))
            }
          </div>
        </div>
      </div></>
  )
}

export default Collection