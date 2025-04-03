import { useState } from "react";

export const usePagination = ({ list }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);

    // Calculate pagination indexes
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = list.slice(indexOfFirstItem, indexOfLastItem);
    // Calculate total pages
    const totalPages = Math.ceil(list.length / itemsPerPage);

    const productList = currentProducts.map((item, index) => ({
        ...item,
        id: indexOfFirstItem + index + 1,
    }));

    return {
        currentPage, setCurrentPage,
        itemsPerPage, 
        currentProducts: productList,
        totalPages,
    }
}