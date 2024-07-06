import { useState, useMemo } from "react";

const usePagination = (data, rowsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return data.slice(startIndex, startIndex + rowsPerPage);
  }, [currentPage, rowsPerPage, data]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return {
    currentPage,
    totalPages,
    currentData,
    handlePageChange,
  };
};

export default usePagination;
