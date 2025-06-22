import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProduct';
import { useProductTypes } from '../hooks/useProductType';

// Scroll-to-top helper for pagination
const scrollToTop = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const ShopPage = () => {
  // Filter state
  const [filters, setFilters] = useState({
    type_id: '',
    search: '',
    min_price: '',
    max_price: '',
    sort_by: 'created_at',
    sort_direction: 'desc',
    per_page: 12,
    page: 1
  });
  
  // Products query with filters
  const { 
    data: products, 
    isLoading: productsLoading 
  } = useProducts(filters);

  // Product types query for filter dropdown using custom hook
  const { 
    data: productTypes, 
    isLoading: typesLoading 
  } = useProductTypes();

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ 
      ...prev, 
      [name]: value,
      page: 1 // Reset to first page on filter change
    }));
  };

  // Handle price range changes
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    // Allow empty value or valid number
    if (value === '' || !isNaN(parseFloat(value))) {
      setFilters(prev => ({ 
        ...prev, 
        [name]: value,
        page: 1 // Reset to first page on filter change
      }));
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage < 1 || (products && newPage > products.last_page)) return;
    setFilters(prev => ({ ...prev, page: newPage }));
    scrollToTop('products-section');
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      type_id: '',
      search: '',
      min_price: '',
      max_price: '',
      sort_by: 'created_at',
      sort_direction: 'desc',
      per_page: 12,
      page: 1
    });
  };

  // Generate skeleton product cards for loading state
  const skeletonProducts = Array(filters.per_page).fill(null);

  // Start UI implementation
  return (
    <div className="min-h-screen bg-white">
      {/* Hero section with elegant floral-inspired design */}
      <div className="relative overflow-hidden" 
        style={{ 
          background: 'linear-gradient(to right, rgba(var(--color-flax)/0.3), rgba(var(--color-ecru)/0.5))',
          borderBottom: '1px solid rgba(var(--color-redwood), 0.2)'
        }}>
        <div className="relative overflow-hidden opacity-10" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-96 h-96">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ fill: 'rgb(var(--color-caput-mortuum))' }}>
              <path d="M40,0 C60,40 100,40 100,60 C100,80 60,100 40,120 C20,140 0,180 20,200 C40,220 80,180 100,200 C120,220 140,200 160,180 C180,160 200,140 180,120 C160,100 140,80 160,60 C180,40 200,20 180,0 C160,-20 120,20 100,0 C80,-20 60,0 40,0Z" />
            </svg>
          </div>
          <div className="absolute top-1/2 left-1/4 w-48 h-48">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ fill: 'rgb(var(--color-wine))' }}>
              <path d="M40,0 C60,40 100,40 100,60 C100,80 60,120 40,120 C20,120 0,100 0,80 C0,60 20,40 40,0Z" />
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: 'rgb(var(--color-caput-mortuum))' }}>
              Our Collection
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: 'rgb(var(--color-wine))' }}>
              Browse our exquisite selection of handcrafted floral arrangements, each carefully designed to bring natural beauty to your space
            </p>
          </div>
        </div>
      </div>
      
      {/* Shop content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filter Section with elegant design */}
        <div className="mb-8 rounded-lg overflow-hidden border border-opacity-20" 
          style={{ borderColor: 'rgb(var(--color-redwood))' }}>
          
          {/* Filter Header */}
          <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-4"
            style={{ 
              background: 'linear-gradient(to right, rgba(var(--color-ecru)/0.7), rgba(var(--color-flax)/0.4))',
              borderBottom: '1px solid rgba(var(--color-redwood), 0.15)'
            }}>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                style={{ color: 'rgb(var(--color-wine))' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
              </svg>
              <h2 className="text-xl font-semibold" style={{ color: 'rgb(var(--color-caput-mortuum))' }}>
                Filter Products
              </h2>
            </div>
            
            <button 
              onClick={resetFilters}
              className="text-sm flex items-center px-4 py-2 rounded-md transition-all duration-300 hover:shadow-sm focus:ring-2 focus:ring-wine/30 focus:outline-none"
              style={{ 
                color: 'rgb(var(--color-wine))',
                background: 'rgba(var(--color-ecru)/0.5)',
                border: '1px solid rgba(var(--color-redwood), 0.2)'
              }}
              aria-label="Reset all filters"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Reset Filters
            </button>
          </div>
          
          {/* Filter Content */}
          <div className="p-6 bg-white bg-opacity-60" 
            style={{ background: 'rgba(var(--color-ecru)/0.07)' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Product Type Filter */}
              <div className="filter-group">
                <label className="block mb-2 text-sm font-medium" style={{ color: 'rgb(var(--color-wine))' }}>
                  Product Type
                </label>
                <select
                  name="type_id"
                  value={filters.type_id}
                  onChange={handleFilterChange}
                  className="w-full p-3 rounded-md border border-opacity-30 bg-white bg-opacity-80 transition-all focus:ring-2 focus:ring-opacity-50 focus:border-wine/50"
                  style={{ 
                    borderColor: 'rgba(var(--color-redwood), 0.3)',
                    color: 'rgb(var(--color-caput-mortuum))',
                    outline: 'none',
                  }}
                  disabled={typesLoading}
                  aria-label="Filter by product type"
                >
                  <option value="">All Types</option>
                  {productTypes?.data?.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Search Filter */}
              <div className="filter-group">
                <label className="block mb-2 text-sm font-medium" style={{ color: 'rgb(var(--color-wine))' }}>
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    placeholder="Search products..."
                    className="w-full p-3 pl-10 rounded-md border border-opacity-30 bg-white bg-opacity-80 transition-all focus:ring-2 focus:ring-opacity-50 focus:border-wine/50"
                    style={{ 
                      borderColor: 'rgba(var(--color-redwood), 0.3)',
                      color: 'rgb(var(--color-caput-mortuum))',
                      outline: 'none',
                    }}
                    aria-label="Search products by name or description"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                      style={{ color: 'rgba(var(--color-caput-mortuum), 0.5)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Price Range Filters */}
              <div className="filter-group">
                <label className="block mb-2 text-sm font-medium" style={{ color: 'rgb(var(--color-wine))' }}>
                  Min Price ($)
                </label>
                <input
                  type="number"
                  name="min_price"
                  value={filters.min_price}
                  onChange={handlePriceChange}
                  placeholder="Min price"
                  min="0"
                  className="w-full p-3 rounded-md border border-opacity-30 bg-white bg-opacity-80 transition-all focus:ring-2 focus:ring-opacity-50 focus:border-wine/50"
                  style={{ 
                    borderColor: 'rgba(var(--color-redwood), 0.3)',
                    color: 'rgb(var(--color-caput-mortuum))',
                    outline: 'none',
                  }}
                  aria-label="Minimum price filter"
                />
              </div>
              
              <div className="filter-group">
                <label className="block mb-2 text-sm font-medium" style={{ color: 'rgb(var(--color-wine))' }}>
                  Max Price ($)
                </label>
                <input
                  type="number"
                  name="max_price"
                  value={filters.max_price}
                  onChange={handlePriceChange}
                  placeholder="Max price"
                  min="0"
                  className="w-full p-3 rounded-md border border-opacity-30 bg-white bg-opacity-80 transition-all focus:ring-2 focus:ring-opacity-50 focus:border-wine/50"
                  style={{ 
                    borderColor: 'rgba(var(--color-redwood), 0.3)',
                    color: 'rgb(var(--color-caput-mortuum))',
                    outline: 'none',
                  }}
                  aria-label="Maximum price filter"
                />
              </div>
            </div>
            
            {/* Sorting Options */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <label className="mr-2 text-sm font-medium" style={{ color: 'rgb(var(--color-wine))' }}>
                  Sort by:
                </label>
                <select
                  name="sort_by"
                  value={filters.sort_by}
                  onChange={handleFilterChange}
                  className="p-2 rounded-md border border-opacity-30 bg-white bg-opacity-80 transition-all focus:ring-2 focus:ring-opacity-50 focus:border-wine/50"
                  style={{ 
                    borderColor: 'rgba(var(--color-redwood), 0.3)',
                    color: 'rgb(var(--color-caput-mortuum))',
                    outline: 'none',
                  }}
                  aria-label="Sort products by field"
                >
                  <option value="created_at">Date Added</option>
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <label className="mr-2 text-sm font-medium" style={{ color: 'rgb(var(--color-wine))' }}>
                  Direction:
                </label>
                <select
                  name="sort_direction"
                  value={filters.sort_direction}
                  onChange={handleFilterChange}
                  className="p-2 rounded-md border border-opacity-30 bg-white bg-opacity-80 transition-all focus:ring-2 focus:ring-opacity-50"
                  style={{ 
                    borderColor: 'rgba(var(--color-redwood), 0.3)',
                    color: 'rgb(var(--color-caput-mortuum))',
                    outline: 'none',
                  }}
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Products Section */}
        <div id="products-section">
          {/* Products header with count and results summary */}
          <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
            <h2 className="text-2xl font-semibold" style={{ color: 'rgb(var(--color-caput-mortuum))' }}>
              {!productsLoading && products?.data?.length > 0 ? (
                <>Products <span className="text-xl">({products.total})</span></>
              ) : (
                'Products'
              )}
            </h2>
            
            {/* Show summary of current page when data is loaded */}
            {!productsLoading && products && products.data.length > 0 && (
              <p className="text-sm" style={{ color: 'rgba(var(--color-caput-mortuum), 0.7)' }}>
                Showing {products.from}-{products.to} of {products.total} items
              </p>
            )}
          </div>
          
          {/* Product grid with loading state */}
          {productsLoading ? (
            // Skeleton loading grid
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {skeletonProducts.map((_, index) => (
                <div key={index} className="rounded-lg overflow-hidden border border-opacity-10 bg-white animate-pulse" 
                  style={{ borderColor: 'rgb(var(--color-flax))' }}>
                  {/* Skeleton image */}
                  <div className="h-60 bg-gray-200"></div>
                  
                  {/* Skeleton content */}
                  <div className="p-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-100 rounded w-1/2 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/4 mt-4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : products?.data?.length > 0 ? (
            // Actual products grid
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
              {products.data.map(product => (
                <Link to={`/product/${product.id}`} key={product.id} 
                  className="group rounded-lg overflow-hidden border border-opacity-10 bg-white transition-all duration-300 hover:shadow-md hover:border-opacity-30"
                  style={{ borderColor: 'rgb(var(--color-flax))' }}>
                  {/* Product image with fallback and loading state */}
                  <div className="relative h-60 overflow-hidden bg-gray-50">
                    <img
                      src={ product.image 
                        ? `${import.meta.env.VITE_API_URL}/storage/products/${product.image}` 
                        : `${import.meta.env.VITE_API_URL}/products/default-image.jpg` 
                      }
                      alt={product.name}
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = '/images/placeholder.jpg'; }}
                      loading="lazy"
                    />
                    
                    {/* Product type badge - top right corner */}
                    {product.productType && (
                      <div className="absolute top-2 right-2 px-2 py-1 text-xs rounded-full" 
                        style={{ 
                          backgroundColor: 'rgba(var(--color-ecru)/0.7)',
                          color: 'rgb(var(--color-caput-mortuum))',
                          backdropFilter: 'blur(3px)'
                        }}>
                        {product.productType.name}
                      </div>
                    )}
                  </div>
                  
                  {/* Product details */}
                  <div className="p-4">
                    <h3 className="text-lg font-medium line-clamp-1" style={{ color: 'rgb(var(--color-caput-mortuum))' }}>
                      {product.name}
                    </h3>
                    <p className="text-sm mt-1 line-clamp-2 h-10" style={{ color: 'rgba(var(--color-caput-mortuum), 0.7)' }}>
                      {product.description}
                    </p>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-lg font-semibold" style={{ color: 'rgb(var(--color-wine))' }}>
                        ${parseFloat(product.price).toFixed(2)}
                      </span>
                      <span className="text-xs px-2 py-1 rounded" 
                        style={{ 
                          backgroundColor: 'rgba(var(--color-flax), 0.2)',
                          color: 'rgb(var(--color-redwood))'
                        }}>
                        {product.productType?.name || 'Arrangement'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            // No products found
            <div className="text-center py-16 border border-dashed rounded-lg" 
              style={{ borderColor: 'rgba(var(--color-flax), 0.5)' }}>
              <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                style={{ color: 'rgba(var(--color-redwood), 0.6)' }}
                aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              <h3 className="text-xl font-medium mb-2" style={{ color: 'rgb(var(--color-caput-mortuum))' }}>
                No products found
              </h3>
              <p className="text-md" style={{ color: 'rgb(var(--color-wine))' }}>
                Try adjusting your filters or search criteria
              </p>
              <button 
                onClick={resetFilters}
                className="mt-6 inline-flex items-center px-4 py-2 rounded-md transition-all duration-300 focus:ring-2 focus:ring-wine/30 focus:outline-none"
                style={{ 
                  backgroundColor: 'rgba(var(--color-redwood), 0.1)',
                  color: 'rgb(var(--color-caput-mortuum))',
                  border: '1px solid rgba(var(--color-redwood), 0.2)'
                }}
                aria-label="Reset all filters"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Reset Filters
              </button>
            </div>
          )}
          
          {/* Pagination Controls */}
          {!productsLoading && products && products.last_page > 1 && (
            <div className="flex justify-center items-center mt-8 mb-4">
              <nav className="inline-flex items-center rounded-md shadow-sm border border-opacity-10"
                style={{ borderColor: 'rgba(var(--color-flax), 0.5)' }}
              >
                {/* Previous button */}
                <button
                  onClick={() => handlePageChange(filters.page - 1)}
                  disabled={filters.page === 1}
                  className={`px-3 py-2 rounded-l-md text-sm border-r transition-colors duration-300 ${filters.page === 1 ? 'cursor-not-allowed' : 'hover:bg-opacity-10'} focus:ring-2 focus:ring-wine/30 focus:outline-none focus:relative focus:z-10`}
                  style={{ 
                    color: filters.page === 1 ? 'rgba(var(--color-caput-mortuum), 0.5)' : 'rgb(var(--color-caput-mortuum))',
                    borderColor: 'rgba(var(--color-flax), 0.3)',
                    background: filters.page === 1 ? 'rgba(var(--color-flax), 0.05)' : 'transparent',
                  }}
                  aria-label="Go to previous page"
                >
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </div>
                </button>
                
                {/* Page numbers with intelligent ellipses */}
                <div className="flex items-center">
                  {Array.from({ length: products.last_page }, (_, i) => i + 1).map(pageNum => {
                    // Always show first and last page
                    // Show pages around current page
                    // Show ellipses for gaps
                    const isCurrentPage = pageNum === filters.page;
                    const isFirstPage = pageNum === 1;
                    const isLastPage = pageNum === products.last_page;
                    const isWithinOneOfCurrent = Math.abs(pageNum - filters.page) <= 1;
                    
                    if (isFirstPage || isLastPage || isWithinOneOfCurrent) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-3 py-2 text-sm border-r transition-all duration-300 ${isCurrentPage ? 'font-semibold' : 'hover:bg-opacity-10'}`}
                          style={{ 
                            color: isCurrentPage ? 'rgb(var(--color-wine))' : 'rgb(var(--color-caput-mortuum))',
                            borderColor: 'rgba(var(--color-flax), 0.3)',
                            background: isCurrentPage ? 'rgba(var(--color-flax), 0.2)' : 'transparent',
                            minWidth: '36px',
                            textAlign: 'center'
                          }}
                        >
                          {pageNum}
                        </button>
                      );
                    } else if (
                      // Show ellipsis after page 1 if needed
                      (pageNum === 2 && !isWithinOneOfCurrent) ||
                      // Show ellipsis before last page if needed
                      (pageNum === products.last_page - 1 && !isWithinOneOfCurrent)
                    ) {
                      return (
                        <span 
                          key={pageNum}
                          className="px-3 py-2 text-sm border-r"
                          style={{ 
                            borderColor: 'rgba(var(--color-flax), 0.3)',
                            color: 'rgba(var(--color-caput-mortuum), 0.6)'
                          }}
                        >
                          &hellip;
                        </span>
                      );
                    }
                    
                    // Hide other pages
                    return null;
                  })}
                </div>
                
                {/* Next button */}
                <button
                  onClick={() => handlePageChange(filters.page + 1)}
                  disabled={filters.page === products.last_page}
                  className={`px-3 py-2 rounded-r-md text-sm transition-colors duration-300 ${filters.page === products.last_page ? 'cursor-not-allowed' : 'hover:bg-opacity-10'}`}
                  style={{ 
                    color: filters.page === products.last_page ? 'rgba(var(--color-caput-mortuum), 0.5)' : 'rgb(var(--color-caput-mortuum))',
                    background: filters.page === products.last_page ? 'rgba(var(--color-flax), 0.05)' : 'transparent',
                  }}
                >
                  <div className="flex items-center">
                    Next
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
