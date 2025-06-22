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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Cart</h1>
        <Link 
          to="/shop" 
          className="text-sage-600 hover:text-sage-800 inline-flex items-center"
        >
          <FaArrowLeft className="mr-2" /> Continue Shopping
        </Link>
      </div>

      {isEmpty ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Link 
            to="/shop" 
            className="bg-sage-600 text-white px-6 py-3 rounded-md hover:bg-sage-700 transition"
          >
            Browse Products
          </Link>
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
