import React from 'react';
import logo from '../assets/Adobe Express - file.png';
import '../App.css'; // Ensure CSS is imported

const WelcomePage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'linear-gradient(to bottom, rgb(var(--color-ecru)), rgb(var(--color-flax)))' }}>
      {/* Navigation Bar */}
      <nav className="bg-caput-mortuum shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img className="h-14 w-auto object-contain" src={logo} alt="PetalPost Logo" />
              </div>
              <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8 h-full">
                <a href="#" className="text-white hover:opacity-80 flex items-center h-full px-3 py-2 border-b-2 border-transparent" style={{ ':hover': { color: 'rgb(var(--color-flax))', borderColor: 'rgb(var(--color-flax))' } }}>Home</a>
                <a href="#" className="text-white hover:opacity-80 flex items-center h-full px-3 py-2 border-b-2 border-transparent" style={{ ':hover': { color: 'rgb(var(--color-flax))', borderColor: 'rgb(var(--color-flax))' } }}>Shop</a>
                <a href="#" className="text-white hover:opacity-80 flex items-center h-full px-3 py-2 border-b-2 border-transparent" style={{ ':hover': { color: 'rgb(var(--color-flax))', borderColor: 'rgb(var(--color-flax))' } }}>Arrangements</a>
                <a href="#" className="text-white hover:opacity-80 flex items-center h-full px-3 py-2 border-b-2 border-transparent" style={{ ':hover': { color: 'rgb(var(--color-flax))', borderColor: 'rgb(var(--color-flax))' } }}>Contact</a>
              </div>
            </div>
            <div className="flex items-center">
              <button className="text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200" style={{ backgroundColor: 'rgb(var(--color-wine))', ':hover': { backgroundColor: 'rgb(var(--color-redwood))' } }}>Sign In</button>
              <button className="ml-4 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center" style={{ backgroundColor: 'rgb(var(--color-redwood))', ':hover': { backgroundColor: 'rgb(var(--color-wine))' } }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Cart (0)
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(to right, rgba(var(--color-ecru)/0.3), rgba(var(--color-flax)/0.3))' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl" style={{ color: 'rgb(var(--color-caput-mortuum))' }}>
              <span className="block">Welcome to</span>
              <span className="block mt-2" style={{ color: 'rgb(var(--color-wine))' }}>PetalPost</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl" style={{ color: 'rgb(var(--color-caput-mortuum))' }}>
              Blooming beauty delivered to your doorstep. Discover our handcrafted floral arrangements.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white md:py-4 md:text-lg md:px-10 transition-colors duration-300" style={{ backgroundColor: 'rgb(var(--color-redwood))', ':hover': { backgroundColor: 'rgb(var(--color-wine))' } }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Shop Now
                </a>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-caput-mortuum bg-white hover:bg-ecru/30 md:py-4 md:text-lg md:px-10 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-opacity-50 pointer-events-none overflow-hidden">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full" style={{ backgroundColor: 'rgba(var(--color-ecru)/0.05)' }}></div>
          <div className="absolute -left-24 -bottom-24 w-96 h-96 rounded-full" style={{ backgroundColor: 'rgba(var(--color-flax)/0.05)' }}></div>
        </div>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12" style={{ color: 'rgb(var(--color-caput-mortuum))' }}>
            Featured Arrangements
          </h2>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
            {/* Product 1 */}
            <div className="group relative transform transition-all duration-300 hover:scale-105">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-85 lg:h-80 lg:aspect-none shadow-md">
                <div className="w-full h-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: 'rgb(var(--color-redwood))' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-caput-mortuum font-medium">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0"></span>
                      Spring Delight
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-wine">Fresh seasonal blooms</p>
                </div>
                <p className="text-sm font-medium text-caput-mortuum">$89.99</p>
              </div>
            </div>

            {/* Product 2 */}
            <div className="group relative transform transition-all duration-300 hover:scale-105">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-85 lg:h-80 lg:aspect-none shadow-md">
                <div className="w-full h-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: 'rgb(var(--color-wine))' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-caput-mortuum font-medium">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0"></span>
                      Romantic Rose Bouquet
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-wine">Premium long-stem roses</p>
                </div>
                <p className="text-sm font-medium text-caput-mortuum">$129.99</p>
              </div>
            </div>

            {/* Product 3 */}
            <div className="group relative transform transition-all duration-300 hover:scale-105">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-85 lg:h-80 lg:aspect-none shadow-md">
                <div className="w-full h-full flex items-center justify-center font-bold" style={{ backgroundColor: 'rgb(var(--color-ecru))', color: 'rgb(var(--color-caput-mortuum))' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-caput-mortuum font-medium">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0"></span>
                      Succulent Garden
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-wine">Long-lasting arrangement</p>
                </div>
                <p className="text-sm font-medium text-caput-mortuum">$69.99</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: 'linear-gradient(to top, rgb(var(--color-ecru)), rgb(var(--color-flax)))' }}>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full" style={{ backgroundColor: 'rgba(var(--color-redwood)/0.1)' }}></div>
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full" style={{ backgroundColor: 'rgba(var(--color-wine)/0.1)' }}></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: 'rgb(var(--color-caput-mortuum))' }}>
              Our Story
            </h2>
            <p className="mt-4 text-lg leading-6" style={{ color: 'rgb(var(--color-caput-mortuum))' }}>
              At PetalPost, we believe that flowers have the power to transform spaces and emotions. 
              Our expert florists handcraft each arrangement with care, selecting only the freshest blooms 
              to ensure your flowers stay beautiful for longer. From celebrating life's special moments 
              to brightening someone's day, we're here to help you express what words sometimes cannot.
            </p>
            <div className="mt-8">
              <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-wine hover:bg-redwood transition-all duration-300 shadow-md hover:shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Learn more about us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: 'rgb(var(--color-caput-mortuum))' }}>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase" style={{ color: 'rgb(var(--color-flax))' }}>Shop</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-white" style={{ ':hover': { color: 'rgb(var(--color-ecru))' } }}>All Arrangements</a></li>
                <li><a href="#" className="text-base text-white" style={{ ':hover': { color: 'rgb(var(--color-ecru))' } }}>Seasonal Collections</a></li>
                <li><a href="#" className="text-base text-white" style={{ ':hover': { color: 'rgb(var(--color-ecru))' } }}>Plants</a></li>
                <li><a href="#" className="text-base text-white" style={{ ':hover': { color: 'rgb(var(--color-ecru))' } }}>Gift Sets</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase" style={{ color: 'rgb(var(--color-flax))' }}>Customer Service</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-white" style={{ ':hover': { color: 'rgb(var(--color-ecru))' } }}>Contact Us</a></li>
                <li><a href="#" className="text-base text-white" style={{ ':hover': { color: 'rgb(var(--color-ecru))' } }}>Delivery Information</a></li>
                <li><a href="#" className="text-base text-white" style={{ ':hover': { color: 'rgb(var(--color-ecru))' } }}>FAQ</a></li>
                <li><a href="#" className="text-base text-white" style={{ ':hover': { color: 'rgb(var(--color-ecru))' } }}>Returns & Refunds</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase" style={{ color: 'rgb(var(--color-flax))' }}>Connect With Us</h3>
              <p className="mt-4 text-base text-white">
                Subscribe to our newsletter for seasonal updates and exclusive offers.
              </p>
              <div className="mt-4 flex">
                <input type="email" placeholder="Enter your email" className="px-4 py-2 rounded-l-md w-full focus:outline-none" />
                <button className="bg-wine hover:bg-redwood text-white px-4 py-2 rounded-r-md transition-colors duration-300">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Subscribe
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 md:flex md:items-center md:justify-between" style={{ borderTopWidth: '1px', borderColor: 'rgb(var(--color-wine))' }}>
            <div className="flex space-x-6 md:order-2">
              <a href="#" className="text-white hover:text-ecru">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-ecru">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-ecru">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
            <p className="mt-8 text-base text-white md:mt-0 md:order-1">
              &copy; 2025 PetalPost. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
