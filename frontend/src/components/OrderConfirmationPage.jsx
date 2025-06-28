import { useParams, Link } from 'react-router-dom';
import { useOrderById } from '../hooks/useOrder';
import { FaCheckCircle, FaHome, FaList } from 'react-icons/fa';
import LoadingScreen from './common/LoadingScreen';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const { data: orderData, isLoading, error } = useOrderById(parseInt(orderId));

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error || !orderData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 p-4 rounded-md text-red-800 mb-4">
          <p>Failed to load your order details. Please check your orders history.</p>
        </div>
        <Link 
          to="/shop" 
          className="bg-redwood text-white px-6 py-3 rounded-md inline-flex items-center hover:bg-redwood-700 transition mr-4"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const order = orderData.data;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-sage bg-opacity-20 rounded-full mb-4">
            <FaCheckCircle size={32} className="text-sage" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Order Confirmation</h1>
          <p className="text-lg text-gray-600 mt-2">
            Thank you for your order! Your order #{order.id} has been successfully placed.
          </p>
        </div>

        <div className="border-t border-b border-gray-200 py-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-sm font-medium text-gray-500">Order Number</h2>
              <p className="text-lg font-medium text-gray-900">#{order.id}</p>
            </div>
            <div className="mb-4 md:mb-0">
              <h2 className="text-sm font-medium text-gray-500">Order Date</h2>
              <p className="text-lg font-medium text-gray-900">
                {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="mb-4 md:mb-0">
              <h2 className="text-sm font-medium text-gray-500">Status</h2>
              <p className="text-lg font-medium capitalize">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  order.status === 'paid' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Total</h2>
              <p className="text-lg font-bold text-gray-900">${Number(order.total).toFixed(2)}</p>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Order Items</h2>
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          {order.items?.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center py-3 border-b border-gray-200 last:border-0"
            >
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mr-4">
                <img
                  src={`${import.meta.env.VITE_API_URL}/storage/products/${item.product.image}`}
                  alt={item.product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium text-gray-900">{item.product.name}</h3>
                <p className="text-sm text-gray-500">
                  {item.quantity} x ${Number(item.unit_price).toFixed(2)}
                </p>
              </div>
              <p className="text-sm font-medium text-gray-900 whitespace-nowrap">
                ${Number(item.subtotal).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="whitespace-pre-line">{order.shipping_address}</p>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Billing Address</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="whitespace-pre-line">{order.billing_address}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link 
              to="/" 
              className="bg-redwood text-white px-6 py-3 rounded-md inline-flex items-center justify-center hover:bg-redwood-700 transition"
            >
              <FaHome className="mr-2" />
              Return to Home
            </Link>
            <Link 
              to="/shop" 
              className="border border-redwood text-redwood px-6 py-3 rounded-md inline-flex items-center justify-center hover:bg-redwood hover:text-white transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
