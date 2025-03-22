import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { Auth } from '../context/AuthProvider';
import { toast } from 'react-toastify';

const Add = () => {
  const { token } = useContext(Auth);

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('mens');
  const [subcategory, setSubCategory] = useState('topwear');
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!image1) {
      alert('Please upload at least one image (Image 1 is required)');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subcategory);
      formData.append('bestSeller', bestSeller);
      formData.append('sizes', JSON.stringify(sizes));

      // Append images if they exist
      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/products/add`,
        formData,
        {
          headers: { token }
        }
      );

      if (response?.data?.message) {
        toast.success(response.data.message);
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setName('');
        setDescription('');
        setPrice('');
        setCategory('mens');
        setSubCategory('topwear');
        setBestSeller(false);
        setSizes([]);
      } else {
        toast.error('Received unexpected response from server');
      }

    } catch (error) {
      const errorMessage = error.response?.data?.message
        || error.message
        || 'Failed to add product';
      console.error('Submission error:', errorMessage);
      toast.error(errorMessage);

    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3 select-none'>
      {/* Upload Image Section */}
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2 flex-wrap items-center'>
          {[1, 2, 3, 4].map((num) => (
            <label key={num} htmlFor={`image${num}`}>
              <img
                src={!eval(`image${num}`) ? assets.upload_area : URL.createObjectURL(eval(`image${num}`))}
                className='w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded-md cursor-pointer'
                alt={`Upload ${num}`}
              />
              <input
                onChange={(e) => eval(`setImage${num}`)(e.target.files[0] || null)}
                type="file"
                id={`image${num}`}
                hidden
                accept="image/*"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Name Input */}
      <div className='w-full'>
        <label className='block mb-2 text-gray-700 font-medium'>Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md'
          placeholder='Enter product name'
          required
        />
      </div>

      {/* Description Input */}
      <div className='w-full'>
        <label className='block mb-2 text-gray-700 font-medium'>Product Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md'
          placeholder='Enter product description'
          rows="3"
          required
        />
      </div>

      {/* Category, Subcategory, and Price */}
      <div className='flex flex-col sm:flex-row gap-4 w-full'>
        <div className="w-full sm:w-1/3">
          <label className="block mb-2 text-gray-700 font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
            required
          >
            <option value="mens">Men's Wear</option>
            <option value="womens">Women's Wear</option>
            <option value="kids">Kid's Wear</option>
          </select>
        </div>

        <div className="w-full sm:w-1/3">
          <label className="block mb-2 text-gray-700 font-medium">Sub Category</label>
          <select
            value={subcategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
            required
          >
            <option value="topwear">Top Wear</option>
            <option value="bottomwear">Bottom Wear</option>
            <option value="footwear">Foot Wear</option>
          </select>
        </div>

        <div className="w-full sm:w-1/3">
          <label className="block mb-2 text-gray-700 font-medium">Price (₹)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter price"
            min="0"
            required
          />
        </div>
      </div>

      {/* Size Selection */}
      <div className='w-full'>
        <label className='block mb-2 text-gray-700 font-medium'>Available Sizes</label>
        <div className='flex gap-3'>
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSizes(prev =>
                prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
              )}
              className={`px-4 py-2 rounded-md transition-colors ${sizes.includes(size)
                ? 'bg-pink-500 text-white hover:bg-pink-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Best Seller Checkbox */}
      <div className='flex items-center gap-2 mt-2'>
        <input
          type="checkbox"
          checked={bestSeller}
          onChange={(e) => setBestSeller(e.target.checked)}
          id="bestSeller"
          className='w-4 h-4 accent-pink-500'
        />
        <label htmlFor="bestSeller" className='text-gray-700 cursor-pointer'>
          Mark as Best Seller
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className='mt-4 px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors'
      >
        Add Product
      </button>
    </form>
  )
}

export default Add