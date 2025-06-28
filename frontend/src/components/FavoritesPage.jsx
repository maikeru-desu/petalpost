import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites, useToggleFavorite } from '../hooks/useFavorites';
import { FaHeart, FaLeaf } from 'react-icons/fa';
import { GiFlowerPot } from 'react-icons/gi';
import Pagination from './common/Pagination';

const FavoritesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: favorites, isLoading, error } = useFavorites({page: currentPage, per_page: 12});
  const toggleFavorite = useToggleFavorite();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleToggleFavorite = (productId) => {
    toggleFavorite.mutate(productId);
  };

  // Skeleton loader
  const renderSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array(8).fill(null).map((_, idx) => (
        <div key={idx} className="backdrop-blur-sm bg-white bg-opacity-40 rounded-lg overflow-hidden shadow-md animate-pulse border border-flax border-opacity-10">
          <div className="w-full h-64 bg-white bg-opacity-40"></div>
          <div className="p-4">
            <div className="h-5 bg-white bg-opacity-60 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-white bg-opacity-60 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-white bg-opacity-60 rounded w-full mb-4"></div>
            <div className="h-6 bg-white bg-opacity-60 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <div className="backdrop-blur-sm bg-white bg-opacity-50 rounded-lg p-8 border border-redwood border-opacity-20 shadow-md max-w-xl mx-auto">
          <GiFlowerPot className="mx-auto text-redwood text-5xl mb-4" />
          <h2 className="text-2xl font-bold text-caput-mortuum">Error Loading Your Favorites</h2>
          <p className="mt-2 text-sage-800">Please try again later or sign in if you haven't already.</p>
          <Link to="/" className="mt-4 inline-block px-6 py-3 bg-redwood text-white rounded-md hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with floral decoration */}
        <div className="relative mb-8 pb-6 border-b border-caput-mortuum border-opacity-20">
          <div className="flex items-center mb-4">
            <FaHeart className="text-redwood mr-3 text-3xl" />
            <h1 className="text-3xl font-bold text-caput-mortuum">My Favorite Flowers</h1>
          </div>
          <p className="text-sage-800 mb-8 ml-1">
            Your collection of favorite PetalPost arrangements
          </p>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0">
            <div className="flex space-x-2">
              <FaLeaf className="text-sage text-2xl transform rotate-45 opacity-60" />
              <FaLeaf className="text-redwood text-3xl transform -rotate-12 opacity-40" />
              <FaLeaf className="text-caput-mortuum text-2xl transform rotate-90 opacity-50" />
            </div>
          </div>
        </div>
        
        {isLoading ? (
          renderSkeleton()
        ) : favorites.data?.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.data.map(product => (
                <div key={product.id} className="backdrop-blur-sm bg-white bg-opacity-60 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 duration-300 border border-flax border-opacity-20">
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
                        className="p-2 rounded-full bg-white bg-opacity-90 backdrop-blur-sm shadow-md text-redwood hover:bg-opacity-100 focus:outline-none transition-all"
                        aria-label="Remove from favorites"
                      >
                        <FaHeart className="h-5 w-5" />
                      </button>
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link to={`/product/${product.id}`} className="block">
                      <h2 className="text-lg font-semibold text-caput-mortuum">{product.name}</h2>
                      <p className="text-sm text-sage-700 mt-1 line-clamp-2">{product.mini_description}</p>
                      <p className="mt-2 text-lg font-medium text-redwood">${parseFloat(product.price).toFixed(2)}</p>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-flax bg-opacity-20 backdrop-blur-sm border border-sage border-opacity-10 text-caput-mortuum">
                          {product.product_type?.name}
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination component */}
            <Pagination 
              pagination={favorites.pagination} 
              currentPage={currentPage} 
              onPageChange={handlePageChange} 
            />
          </>
        ) : (
          <div className="backdrop-blur-sm bg-white bg-opacity-40 rounded-lg p-8 text-center border-2 border-flax border-opacity-20 shadow-inner">
            <FaHeart className="mx-auto text-redwood text-5xl mb-4 opacity-70" />
            <h3 className="mt-2 text-xl font-medium text-caput-mortuum">No Favorite Flowers Yet</h3>
            <p className="mt-1 text-sage-800">Browse our beautiful arrangements and add some flowers to your favorites.</p>
            <Link to="/shop" className="mt-4 inline-block px-6 py-3 bg-redwood text-white rounded-md hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300">
              Browse Flowers
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
