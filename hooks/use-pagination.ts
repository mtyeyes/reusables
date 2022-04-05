import { useState, useEffect } from 'react';

export const usePagination = <T extends Array<any> = Array<any>>(
  items: T,
  itemsPerPage: number = 20,
) => {
  const calculateTotalPages = () => Math.ceil(items.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(calculateTotalPages);
  const [displayedItems, setDisplayedItems] = useState([] as unknown as T);

  useEffect(() => {
    const endIndex = itemsPerPage * currentPage;
    const startIndex = endIndex - itemsPerPage;

    setDisplayedItems(items.slice(startIndex, endIndex) as T);
  }, [currentPage, items.length, itemsPerPage]);

  useEffect(() => {
    setTotalPages(calculateTotalPages);
  }, [items.length, itemsPerPage]);

  return { currentPage, setCurrentPage, totalPages, displayedItems };
};
