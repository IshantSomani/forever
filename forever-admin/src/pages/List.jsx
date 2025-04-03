import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Auth } from '../context/AuthProvider';
import { usePagination } from '../hooks/usePagination.js';
import Pagination from '../components/Pagination.jsx';

const List = () => {
  const [list, setList] = useState([]); 
  const { token, currency } = useContext(Auth);

  const { currentPage, setCurrentPage, currentProducts, totalPages } = usePagination({ list });

  const fetchList = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/products/allProduct`);
      
      if (response.data?.message) {
        setList(response.data.data);
      } else {
        toast.error(response.data?.message || 'Failed to fetch products');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error(error.response?.data?.message || error.message || 'Something went wrong');
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URI}/products/remove/${id}`, {
        headers: { token },
      });
      if (response.data?.message) {
        await fetchList();  
      } else {
        toast.error(response.data?.message || 'Failed to remove product');
      }
    } catch (error) {
      console.error('Remove error:', error);
      toast.error(error.response?.data?.message || error.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold mb-4'>All Products List</h1>

      {/* ----------List Table Title---------- */}
      <div className='overflow-x-auto'>
        <table className='min-w-full border-collapse'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='p-2 text-left'>ID</th>
              <th className='p-2 text-left'>Image</th>
              <th className='p-2 text-left'>Name</th>
              <th className='p-2 text-left'>Category</th>
              <th className='p-2 text-left'>Price</th>
              <th className='p-2 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* ----------Product List---------- */}
            {currentProducts.map((item, index) => (
              <tr key={item._id || index} className='border-t hover:bg-gray-50'>
                <td className='p-2'>{item.id}</td>
                <td className='p-2 h-fit'>
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className='w-20 h-auto object-cover '
                  />
                </td>
                <td className='p-2'>{item.name}</td>
                <td className='p-2 capitalize'>{item.category}</td>
                <td className='p-2'>{currency}{item.price}</td>
                <td className='p-2'>
                  <button onClick={() => removeProduct(item._id)} className='text-red-500 hover:text-red-700 cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ff0000" fill="none">
                      <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Component */}
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />

        {list.length === 0 && (
          <div className='text-center py-4 text-gray-500'>
            No products found
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
