import { Link } from 'react-router-dom';
import { useCart, useRemoveFromCart, useAddToCart, useClearCart } from '../hooks/useCart';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import LoadingScreen from './common/LoadingScreen';

const CartPage = () => {
  const { data: cartData, isLoading, error } = useCart();
  const removeFromCartMutation = useRemoveFromCart();
  const updateCartMutation = useAddToCart();
  const clearCartMutation = useClearCart();
  
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateCartMutation.mutate({ productId, quantity: newQuantity });
  };
  
  const handleRemoveItem = (productId) => {
    removeFromCartMutation.mutate(productId);
  };
  
  const handleClearCart = () => {
    clearCartMutation.mutate();
  };
  
  const calculateSubtotal = () => {
    if (!cartData?.data) return 0;
    
    return cartData.data.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  if (isLoading) return <LoadingScreen />;
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 p-4 rounded-md text-red-800">
          <p>Failed to load your cart. Please try again later.</p>
        </div>
      </div>
    );
  }

  const isEmpty = !cartData?.data || cartData.data.length === 0;
  
  return (
    <div className="container mx-auto px-4 py-8">
      {!isEmpty && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Cart</h1>
          <Link 
            to="/shop" 
            className="text-sage-600 hover:text-sage-800 inline-flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Continue Shopping
          </Link>
        </div>
      )}

      {isEmpty ? (
        <div className="bg-white bg-opacity-10 rounded-lg p-8 text-center max-w-2xl mx-auto border border-flax border-opacity-30 shadow-sm mt-8">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-ecru bg-opacity-30 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-redwood" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-caput-mortuum mb-3">Your cart is empty</h2>
            
            <p className="text-wine mb-8 max-w-md">
              Looks like you haven't added any floral arrangements to your cart yet. 
              Explore our collection of beautiful bouquets and arrangements to brighten someone's day!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/shop" 
                className="bg-redwood px-6 py-3 rounded-md text-white font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center"
          >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            Browse Products
          </Link>
              
              <Link 
                to="/" 
                className="border border-wine px-6 py-3 rounded-md text-wine font-medium hover:bg-wine hover:text-white transition-colors flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Remove</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {cartData?.data.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={`${import.meta.env.VITE_API_URL}/storage/products/${item.product.image}`}
                            alt={item.product.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.product.name}</div>
                          <div className="text-sm text-gray-500">{item.product.product_type.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${Number(item.product.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="flex items-center justify-center w-8 h-8 bg-flax bg-opacity-20 border border-flax rounded-l-md hover:bg-flax hover:bg-opacity-30 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Decrease quantity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <div className="w-10 h-8 border-y border-flax font-medium flex items-center justify-center">
                          {item.quantity}
                        </div>
                        <button
                          onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)}
                          className="flex items-center justify-center w-8 h-8 bg-flax bg-opacity-20 border border-flax rounded-r-md hover:bg-flax hover:bg-opacity-30 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage"
                          aria-label="Increase quantity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${(Number(item.product.price) * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleRemoveItem(item.product_id)}
                        className="text-redwood hover:opacity-80"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-start flex-col md:flex-row">
            <button
              onClick={handleClearCart}
              className="mb-4 md:mb-0 bg-flax bg-opacity-20 text-caput-mortuum px-6 py-3 rounded-md hover:bg-flax hover:bg-opacity-30 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage text-redwood"
            >
              Clear Cart
            </button>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-lg font-bold">${calculateSubtotal().toFixed(2)}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="w-full bg-redwood text-white px-6 py-3 rounded-md flex items-center justify-center hover:bg-redwood-700 transition"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
