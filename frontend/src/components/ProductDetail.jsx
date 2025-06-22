import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAddToCart } from '../hooks/useCart';
import { toast } from 'react-hot-toast';
import LoadingScreen from './common/LoadingScreen';
import { useProduct } from '../hooks/useProduct';
import { useFavoriteStatus, useToggleFavorite } from '../hooks/useFavorites';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  
  const { data: product, isLoading, error } = useProduct(id)
  
  const { data: isFavorite } = useFavoriteStatus(id)
  
  // Mutation for adding to cart
  const addToCartMutation = useAddToCart();

  const toggleFavoriteMutation = useToggleFavorite();
  
  const handleToggleFavorite = () => {
    toggleFavoriteMutation.mutate(Number(id));
  };
  
  const handleAddToCart = () => {
    if (quantity < 1) {
      toast.error('Quantity must be at least 1');
      return;
    }
    
    addToCartMutation.mutate({
      productId: Number(id),
      quantity: quantity
    });
  };
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-caput-mortuum">Error loading product</h2>
        <p className="mt-2 text-wine">Please try again later.</p>
        <Link to="/" className="mt-4 inline-block px-6 py-3 bg-redwood text-white rounded-md hover:bg-opacity-90 transition-all">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product Image */}
          <div className="lg:max-w-lg lg:self-end">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link to="/" className="text-sm font-medium text-wine hover:text-redwood">Home</Link>
                </li>
                <li className="text-sm font-medium text-wine">/</li>
                <li>
                  <span className="text-sm font-medium text-wine">{product?.product_type?.name || 'Products'}</span>
                </li>
              </ol>
            </nav>
            
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
              <img 
                src={product?.image 
                  ? `${import.meta.env.VITE_API_URL}/storage/products/${product.image}` 
                  : `${import.meta.env.VITE_API_URL}/products/default-image.jpg`}
                alt={product?.name}
                className="w-full h-full object-center object-cover shadow-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/products/default-image.jpg";
                }}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-caput-mortuum">{product?.name}</h1>
            
            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-redwood">${parseFloat(product?.price).toFixed(2)}</p>
            </div>

            {/* Product Type & Tags */}
            <div className="mt-6">
              <div className="flex items-center">
                <div className="text-sm text-wine">
                  <span>Type: </span>
                  <span className="font-medium">{product?.product_type?.name}</span>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {product?.tags?.map(tag => (
                  <span key={tag.id} className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-ecru bg-opacity-30 text-caput-mortuum">
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-caput-mortuum">Description</h3>
              <div className="mt-2 space-y-6">
                <p className="text-sm text-wine">{product?.mini_description}</p>
                <p className="text-base text-gray-700">{product?.description}</p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mt-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-caput-mortuum">Quantity</label>
              <div className="mt-2 flex max-w-[180px]">
                <button 
                  type="button" 
                  className="flex items-center justify-center w-10 h-10 bg-flax bg-opacity-20 border border-flax rounded-l-md text-caput-mortuum hover:bg-flax hover:bg-opacity-30 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-14 h-10 border-y border-flax focus:ring-sage focus:border-sage text-center text-caput-mortuum font-medium text-lg"
                  aria-label="Product quantity"
                />
                <button 
                  type="button" 
                  className="flex items-center justify-center w-10 h-10 bg-flax bg-opacity-20 border border-flax rounded-r-md text-caput-mortuum hover:bg-flax hover:bg-opacity-30 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="flex flex-1 gap-2">
                {/* Checkout Now button */}
                <button
                  type="button"
                  className="flex-1 bg-wine border border-transparent rounded-md py-3 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wine transition-colors duration-200"
                  onClick={() => navigate('/checkout')}
                >
                  Checkout Now
                </button>
                
                {/* Add to Cart button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 bg-redwood border border-transparent rounded-md py-3 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-redwood transition-colors duration-200"
                  disabled={addToCartMutation.isLoading}
                >
                  {addToCartMutation.isLoading ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>

              {/* Favorite button */}
              <button
                type="button"
                onClick={handleToggleFavorite}
                className={`sm:ml-4 py-3 px-3 rounded-md flex items-center justify-center ${isFavorite ? 'text-redwood' : 'text-wine'} hover:bg-flax hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ecru transition-colors duration-200`}
                aria-pressed={isFavorite}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <svg className="h-6 w-6 flex-shrink-0" fill={isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isFavorite ? 1 : 2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="sr-only">{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</span>
              </button>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="text-sm font-medium text-caput-mortuum">Care instructions</h3>
              <div className="mt-4 prose prose-sm text-gray-500">
                <ul className="list-disc pl-5">
                  <li>Keep in cool, fresh water</li>
                  <li>Change water every 2-3 days</li>
                  <li>Trim stems at an angle before placing in water</li>
                  <li>Keep away from direct sunlight</li>
                  <li>Remove any wilting flowers promptly</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
