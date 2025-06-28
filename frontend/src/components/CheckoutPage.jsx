import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaLock } from 'react-icons/fa';
import { useCart } from '../hooks/useCart';
import { useCreateOrder } from '../hooks/useOrder';
import LoadingScreen from './common/LoadingScreen';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Card element styling
const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#32325d',
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

// Checkout form component with Stripe elements
const CheckoutForm = ({ cartData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const createOrderMutation = useCreateOrder();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [billingAddress, setBillingAddress] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [useShippingForBilling, setUseShippingForBilling] = useState(false);
  const [cardError, setCardError] = useState(null);

  // Use shipping address for billing if checkbox is checked
  useEffect(() => {
    if (useShippingForBilling) {
      setBillingAddress(shippingAddress);
    }
  }, [useShippingForBilling, shippingAddress]);

  // Calculate cart total
  const calculateSubtotal = () => {
    if (!cartData?.data) return 0;
    
    return cartData.data.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };
  
  // Map cart items to format expected by API
  const formatCartItems = () => {
    if (!cartData?.data) return [];
    
    return cartData.data.map(item => ({
      product_id: parseInt(item.product_id),
      quantity: parseInt(item.quantity)
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    // Validate form fields
    if (!shippingAddress.trim()) {
      toast.error('Please enter a shipping address');
      return;
    }
    
    if (!useShippingForBilling && !billingAddress.trim()) {
      toast.error('Please enter a billing address');
      return;
    }

    // Check if cart is empty
    if (!cartData?.data || cartData.data.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    setIsProcessing(true);
    setCardError(null);
    
    try {
      // Create order first to get payment intent
      const orderData = {
        items: formatCartItems(),
        shipping_address: shippingAddress,
        billing_address: useShippingForBilling ? shippingAddress : billingAddress
      };
      
      const response = await createOrderMutation.mutateAsync(orderData);
      
      if (response?.data?.payment?.client_secret) {
        // Complete payment with Stripe
        const cardElement = elements.getElement(CardElement);
        
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          response.data.payment.client_secret,
          {
            payment_method: {
              card: cardElement,
            },
          }
        );
        
        if (error) {
          setCardError(error.message);
          toast.error(error.message);
        } else if (paymentIntent.status === 'succeeded') {
          toast.success('Payment successful! Order has been placed.');
          navigate(`/order-confirmation/${response.data.order.id}`);
        }
      }
    } catch (err) {
      console.error('Checkout error:', err);
      // Error handling is managed by the useCreateOrder hook
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left column - Customer Information */}
      <div>
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <textarea
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage"
            placeholder="Enter your full shipping address"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            required
            disabled={isProcessing}
          />
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
          <div className="mb-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox rounded border-gray-300 text-sage focus:ring-sage"
                checked={useShippingForBilling}
                onChange={(e) => setUseShippingForBilling(e.target.checked)}
                disabled={isProcessing}
              />
              <span className="ml-2">Same as shipping address</span>
            </label>
          </div>
          
          {!useShippingForBilling && (
            <textarea
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage"
              placeholder="Enter your billing address"
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
              required={!useShippingForBilling}
              disabled={isProcessing || useShippingForBilling}
            />
          )}
        </div>
      </div>
      
      {/* Right column - Payment Details */}
      <div>
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          
          <div className="max-h-60 overflow-y-auto mb-4">
            {cartData?.data?.map((item) => (
              <div key={item.id} className="flex items-center py-2 border-b border-gray-200">
                <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mr-3">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/storage/products/${item.product.image}`}
                    alt={item.product.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.product.name}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-medium">
                  ${(Number(item.product.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg font-medium">Total</span>
              <span className="text-lg font-bold">${calculateSubtotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Card Details</label>
            <div className="border border-gray-300 rounded-md p-3">
              <CardElement options={cardElementOptions} />
            </div>
            {cardError && (
              <p className="text-red-500 text-sm mt-2">{cardError}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isProcessing || !stripe}
            className={`w-full bg-redwood text-white px-6 py-3 rounded-md flex items-center justify-center hover:bg-redwood-700 transition ${
              isProcessing || !stripe ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            <FaLock className="mr-2" />
            {isProcessing ? 'Processing...' : `Pay $${calculateSubtotal().toFixed(2)}`}
          </button>
          
          <p className="text-xs text-gray-500 mt-4 text-center">
            Your payment information is processed securely. We do not store your credit card details.
          </p>
        </div>
      </div>
    </form>
  );
};

// Main checkout page component
const CheckoutPage = () => {
  const { data: cartData, isLoading, error } = useCart();
  const navigate = useNavigate();
  
  // Redirect if cart is empty and loading is completed
  useEffect(() => {
    if (!isLoading && (!cartData?.data || cartData.data.length === 0)) {
      toast.error('Your cart is empty. Please add items before checkout.');
      navigate('/cart');
    }
  }, [cartData, isLoading, navigate]);

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
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
        <Link 
          to="/cart" 
          className="text-sage-600 hover:text-sage-800 inline-flex items-center"
        >
          <FaArrowLeft className="mr-2" /> Return to Cart
        </Link>
      </div>
      
      <Elements stripe={stripePromise}>
        <CheckoutForm cartData={cartData} />
      </Elements>
    </div>
  );
};

export default CheckoutPage;
