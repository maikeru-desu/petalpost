import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../hooks/useOrder';
import { FaShoppingBag, FaAngleRight, FaCalendarAlt, FaBox, FaSearch, FaLeaf } from 'react-icons/fa';
import { GiFlowerPot } from 'react-icons/gi';
import LoadingScreen from './common/LoadingScreen';
import Pagination from './common/Pagination';

const OrdersListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: ordersData, isLoading, error } = useOrders({page: currentPage, per_page: 12});
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Page change handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderClick = (orderId) => {
    navigate(`/order-confirmation/${orderId}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-sage text-white';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const filteredOrders = ordersData?.data?.filter(order => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      order.id.toString().includes(searchLower) ||
      order.status?.toLowerCase().includes(searchLower) ||
      (order.items?.some(item => 
        item.product?.name?.toLowerCase().includes(searchLower)
      ))
    );
  });

  if (isLoading) return <LoadingScreen />;
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 p-4 rounded-md text-red-800">
          <p>Failed to load your orders. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with floral decoration */}
        <div className="relative mb-8 pb-6 border-b border-caput-mortuum border-opacity-20">
          <div className="flex items-center mb-4">
            <GiFlowerPot className="text-caput-mortuum mr-3 text-4xl" />
            <h1 className="text-3xl font-bold text-caput-mortuum">My Orders</h1>
          </div>
          <p className="text-sage-800 mb-8 ml-1">
            View and track all your PetalPost flower arrangements
          </p>
          
          {/* Search Box with floral accent */}
          <div className="relative max-w-md mb-6">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-redwood">
              <FaSearch />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-70 border-2 border-sage border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-redwood shadow-sm backdrop-blur-sm"
              placeholder="Search orders by number, status, or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0">
            <div className="flex space-x-2">
              <FaLeaf className="text-sage text-2xl transform rotate-45 opacity-60" />
              <FaLeaf className="text-redwood text-3xl transform -rotate-12 opacity-40" />
              <FaLeaf className="text-caput-mortuum text-2xl transform rotate-90 opacity-50" />
            </div>
          </div>
        </div>

        {/* Orders List */}
        {(!filteredOrders || filteredOrders.length === 0) ? (
          <div className="backdrop-blur-sm bg-white bg-opacity-40 rounded-lg p-8 text-center border-2 border-flax border-opacity-20 shadow-inner">
            <FaShoppingBag className="mx-auto text-redwood text-5xl mb-4 opacity-70" />
            <h3 className="text-xl font-medium text-caput-mortuum mb-2">No Orders Found</h3>
            <p className="text-sage-800">
              {searchTerm ? 'No orders match your search criteria.' : 'You haven\'t placed any orders yet.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredOrders.map(order => (
              <div 
                key={order.id}
                className="backdrop-blur-sm bg-white bg-opacity-60 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer border border-flax border-opacity-20 transform hover:-translate-y-1 duration-300"
                onClick={() => handleOrderClick(order.id)}
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div className="flex flex-col mb-3 md:mb-0">
                      <div className="flex items-center">
                        <span className="text-caput-mortuum font-medium text-lg">Order #{order.id}</span>
                        <span className={`ml-3 px-3 py-1 rounded-full text-xs font-medium uppercase ${getStatusBadgeClass(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-sage-700 mt-1">
                        <FaCalendarAlt className="mr-2 text-redwood opacity-70" />
                        {formatDate(order.created_at)}
                        
                        {order.shipped_at && (
                          <>
                            <span className="mx-2 text-sage-500">•</span>
                            <FaBox className="mr-2 text-redwood opacity-70" />
                            Shipped: {formatDate(order.shipped_at)}
                          </>
                        )}
                      </div>
                    </div>
                    <span className="text-redwood font-bold text-lg">
                      ${Number(order.total).toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {order.items?.slice(0, 3).map(item => (
                      <div 
                        key={item.id} 
                        className="flex items-center bg-flax bg-opacity-20 backdrop-blur-sm rounded-full px-3 py-1 border border-sage border-opacity-10"
                      >
                        <div className="h-6 w-6 flex-shrink-0 overflow-hidden rounded-full border border-sage border-opacity-30 mr-2 shadow-sm">
                          <img
                            src={`${import.meta.env.VITE_API_URL}/storage/products/${item.product.image}`}
                            alt={item.product.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <span className="text-xs text-caput-mortuum font-medium">
                          {item.product.name} × {item.quantity}
                        </span>
                      </div>
                    ))}
                    
                    {order.items?.length > 3 && (
                      <span className="text-xs text-sage-700 ml-2">
                        +{order.items.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  {/* Bottom Section with View Details */}
                  <div className="flex justify-between items-center pt-3 border-t border-sage border-opacity-20">
                    <span className="text-xs text-caput-mortuum opacity-70 italic">
                      Shipping to: {order.shipping_address?.split('\n')[0]}
                    </span>
                    <span className="text-redwood flex items-center text-sm font-medium hover:underline">
                      View Order Details <FaAngleRight className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Pagination component */}
            <Pagination 
              pagination={ordersData.pagination} 
              currentPage={currentPage} 
              onPageChange={handlePageChange} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersListPage;
