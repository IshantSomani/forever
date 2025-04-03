import { useState } from "react";

export const usePagination = ({ list }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = list.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(list.length / itemsPerPage);

  // Adjust the index for each product on each page (global index)
  const adjustedCurrentProducts = currentProducts.map((product, index) => ({
      ...product,
      id: indexOfFirstItem + index + 1,  // Global index based on current page
    }));

  return {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    currentProducts: adjustedCurrentProducts,
    totalPages,
  };
};
