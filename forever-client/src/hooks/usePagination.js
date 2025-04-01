import { useState } from "react";

export const usePagination = ({ FilterProducts }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);

    // Calculate pagination indexes
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = FilterProducts.slice(indexOfFirstItem, indexOfLastItem);
    // Calculate total pages
    const totalPages = Math.ceil(FilterProducts.length / itemsPerPage);

    return {
        currentPage, setCurrentPage,
        itemsPerPage, currentProducts,
        totalPages,
    }
}