import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
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
                <Link to="/shop" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white md:py-4 md:text-lg md:px-10 transition-colors duration-300" style={{ backgroundColor: 'rgb(var(--color-redwood))', ':hover': { backgroundColor: 'rgb(var(--color-wine))' } }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Shop Now
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link to="/about" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-caput-mortuum bg-white hover:bg-ecru/30 md:py-4 md:text-lg md:px-10 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Learn More
                </Link>
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
              <Link to="/about" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-wine hover:bg-redwood transition-all duration-300 shadow-md hover:shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Learn more about us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
