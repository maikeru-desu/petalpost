import React from 'react';

/**
 * Reusable pagination component for PetalPost
 * 
 * @param {Object} props
 * @param {Object} props.pagination - Pagination data with current_page and last_page
 * @param {number} props.currentPage - Current page number
 * @param {Function} props.onPageChange - Function to call when page changes
 */
const Pagination = ({ pagination, currentPage, onPageChange }) => {
  // Don't render if there's no pagination data or only one page
  if (!pagination || pagination.last_page <= 1) {
    return null;
  }
  
  // Generate array of page numbers with ellipsis for pagination
  const generatePageNumbers = () => {
    const totalPages = pagination.last_page;
    const currentPageNum = parseInt(currentPage);
    const pages = [];
    
    if (totalPages <= 7) {
      // Less than 7 pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // More than 7 pages, use ellipsis
      pages.push(1);
      
      if (currentPageNum > 3) {
        pages.push('...');
      }
      
      // Pages around current page
      const startPage = Math.max(2, currentPageNum - 1);
      const endPage = Math.min(totalPages - 1, currentPageNum + 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (currentPageNum < totalPages - 2) {
        pages.push('...');
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="mt-8 flex justify-center">
      <nav className="flex items-center space-x-1" aria-label="Pagination">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-md ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-wine hover:bg-flax hover:bg-opacity-20'
          }`}
          aria-label="Previous page"
        >
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Page numbers */}
        {generatePageNumbers().map((page, idx) => (
          <React.Fragment key={idx}>
            {page === '...' ? (
              <span className="px-3 py-2 text-wine">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page)}
                className={`px-3 py-2 rounded-md ${
                  currentPage === page
                    ? 'bg-wine text-white'
                    : 'text-wine hover:bg-flax hover:bg-opacity-20'
                }`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === pagination.last_page}
          className={`px-3 py-2 rounded-md ${
            currentPage === pagination.last_page
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-wine hover:bg-flax hover:bg-opacity-20'
          }`}
          aria-label="Next page"
        >
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
