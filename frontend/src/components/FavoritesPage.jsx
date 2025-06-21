import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites, useToggleFavorite } from '../hooks/useFavorites';

const FavoritesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: favorites, isLoading, error } = useFavorites(currentPage);
  const toggleFavorite = useToggleFavorite();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleToggleFavorite = (productId) => {
    toggleFavorite.mutate(productId);
  };

  // Generate array of page numbers with ellipsis for pagination
  const generatePageNumbers = () => {
    if (!favorites || !favorites.meta) return [];
    
    const totalPages = favorites.meta.last_page;
    const currentPageNum = favorites.meta.current_page;
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

  // Skeleton loader
  const renderSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array(8).fill(null).map((_, idx) => (
        <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
          <div className="w-full h-64 bg-gray-200"></div>
          <div className="p-4">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-caput-mortuum">Error loading favorites</h2>
        <p className="mt-2 text-wine">Please try again later or sign in if you haven't already.</p>
        <Link to="/" className="mt-4 inline-block px-6 py-3 bg-redwood text-white rounded-md hover:bg-opacity-90 transition-all">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-caput-mortuum mb-8">My Favorites</h1>
        
        {isLoading ? (
          renderSkeleton()
        ) : favorites?.data?.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.data.map(product => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <Link to={`/product/${product.id}`} className="block relative">
                    <img 
                      src={product.image 
                        ? `${import.meta.env.VITE_API_URL}/storage/products/${product.image}` 
                        : `/products/default-image.jpg`}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/products/default-image.jpg";
                      }}
                    />
                    <div className="absolute top-2 right-2">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          handleToggleFavorite(product.id);
                        }}
                        className="p-2 rounded-full bg-white shadow-md text-redwood hover:bg-gray-100 focus:outline-none"
                        aria-label="Remove from favorites"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link to={`/product/${product.id}`} className="block">
                      <h2 className="text-lg font-semibold text-caput-mortuum">{product.name}</h2>
                      <p className="text-sm text-wine mt-1 line-clamp-2">{product.mini_description}</p>
                      <p className="mt-2 text-lg font-medium text-redwood">${parseFloat(product.price).toFixed(2)}</p>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-ecru bg-opacity-30 text-caput-mortuum">
                          {product.product_type?.name}
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            {favorites.meta && favorites.meta.last_page > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-1" aria-label="Pagination">
                  {/* Previous button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
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
                          onClick={() => handlePageChange(page)}
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
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === favorites.meta.last_page}
                    className={`px-3 py-2 rounded-md ${
                      currentPage === favorites.meta.last_page
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
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <svg className="mx-auto h-12 w-12 text-redwood" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="mt-2 text-xl font-medium text-caput-mortuum">No Favorites Yet</h3>
            <p className="mt-1 text-wine">Browse our products and add some items to your favorites.</p>
            <Link to="/shop" className="mt-4 inline-block px-6 py-3 bg-redwood text-white rounded-md hover:bg-opacity-90 transition-all">
              Shop Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
