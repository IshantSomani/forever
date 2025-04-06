import React, { memo, useCallback, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import { usePagination } from '../hooks/usePagination';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilters, setShowFilters] = useState(false);
  const [FilterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  // Pagination Custom Hook 
  const { currentPage, setCurrentPage, currentProducts, totalPages } = usePagination({ FilterProducts })

  const toggleCategory = useCallback((value) => {
    setCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  }, []);

  const toggleSubCategory = useCallback((value) => {
    setSubCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  }, []);
  const appliyFilter = useCallback(() => {
    let tempProducts = [...products];

    if (showSearch && search) {
      tempProducts = tempProducts.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      tempProducts = tempProducts.filter(item => category.includes(item.category))
    }

    if (subCategory.length > 0) {
      tempProducts = tempProducts.filter(item => subCategory.includes(item.subCategory))
    }

    switch (sortType) {
      case 'low-high':
        tempProducts.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        tempProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilterProducts(tempProducts)
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [products, category, subCategory, search, showSearch, sortType, setCurrentPage]);

  const handleSortChange = useCallback((e) => {
    setSortType(e.target.value);
  }, []);

  useEffect(() => {
    appliyFilter()
  }, [appliyFilter, category, subCategory, search, showSearch, products])

  const categories = [
    { value: 'mens', label: 'Men' },
    { value: 'womens', label: 'Women' },
    { value: 'kids', label: 'Kids' }
  ];

  const subCategories = [
    { value: 'topwear', label: 'Topwear' },
    { value: 'bottomwear', label: 'Bottomwear' },
    { value: 'footwear', label: 'Footwear' }
  ];


  if (!products.length) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="p-8 max-w-md w-full">
          <LoadingSpinner
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
              {categories.map(({ value, label }) => (
                <label key={value} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    value={value}
                    checked={category.includes(value)}
                    onChange={() => toggleCategory(value)}
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
          {/* Sub-Categorey Filter */}
          <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilters ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium uppercase select-none'>TYPE</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              {subCategories.map(({ value, label }) => (
                <label key={value} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    value={value}
                    checked={subCategory.includes(value)}
                    onChange={() => toggleSubCategory(value)}
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className='flex-1'>

          <div className="flex justify-between text-base sm:text-2xl items-center">
            <Title title1={"All"} title2={"COLLECTIONS"} />
            <select
              onChange={handleSortChange}
              className='border-2 border-gray-300 text-sm px-2 py-1 select-none mb-4'
            >
              <option value="relavent">Sort by: Relavent</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {
              currentProducts.map((item) => (
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

          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div></>
  )
}

export default memo(Collection)