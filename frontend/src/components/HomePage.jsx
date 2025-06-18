import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { productService } from '../api/productService';

const HomePage = () => {
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getProducts(),
  });

  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Decorative floral elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-20">
          <svg width="400" height="400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0C55 15 85 30 85 50C85 70 55 85 50 100C45 85 15 70 15 50C15 30 45 15 50 0Z" fill="rgb(var(--color-redwood))" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 opacity-10">
          <svg width="300" height="300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0C60 20 80 35 100 50C80 65 60 80 50 100C40 80 20 65 0 50C20 35 40 20 50 0Z" fill="rgb(var(--color-wine))" />
          </svg>
        </div>
        
        <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(135deg, rgba(var(--color-ecru)/0.4), rgba(var(--color-flax)/0.3), rgba(var(--color-ecru)/0.2))' }}>
          <div className="max-w-7xl mx-auto">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:flex-col lg:justify-center">
                <div>
                  <h1 className="mt-4 text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                    <span className="block" style={{ color: 'rgb(var(--color-caput-mortuum))' }}>Thoughtful</span>
                    <span className="block mt-1" style={{ color: 'rgb(var(--color-wine))' }}>Floral Elegance</span>
                  </h1>
                  <p className="mt-3 text-base sm:mt-5 sm:text-xl lg:text-lg xl:text-xl" style={{ color: 'rgb(var(--color-caput-mortuum))' }}>
                    Handcrafted bouquets that speak louder than words. From special occasions to everyday moments, our fresh seasonal blooms bring joy to any space.
                  </p>
                  
                  {/* Quote testimonial */}
                  <div className="mt-8 p-4 bg-white/60 backdrop-blur-sm rounded-lg shadow-sm border border-ecru/20 italic">
                    <p className="text-sm text-wine">"The flowers were absolutely stunning and lasted for weeks! My favorite online florist."</p>
                    <p className="text-xs mt-2 text-right font-medium text-caput-mortuum">— Sarah T.</p>
                  </div>
                  
                  <div className="mt-8 sm:flex justify-start space-x-4">
                    <div className="rounded-md shadow">
                      <Link to="/shop" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white md:py-4 md:text-lg transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: 'rgb(var(--color-redwood))' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Shop Now
                      </Link>
                    </div>
                    <div className="mt-3 sm:mt-0">
                      <Link to="/about" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md md:py-4 md:text-lg transition-all duration-300" style={{ color: 'rgb(var(--color-caput-mortuum))', backgroundColor: 'rgba(var(--color-ecru)/0.2)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                  <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                    <img className="w-full" src="/hero-bouquet.jpg" alt="Beautiful floral arrangement" 
                       onError={(e) => {
                         e.target.onerror = null; 
                         e.target.src = 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                       }}/>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                        <span className="text-wine font-medium">Spring Collection</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Features banners */}
                <div className="absolute bottom-0 -mb-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                  <div className="bg-white py-2 px-4 rounded-full shadow-md text-xs sm:text-sm flex items-center">
                    <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                    <span className="text-caput-mortuum font-medium">Same Day Delivery</span>
                  </div>
                  <div className="bg-white py-2 px-4 rounded-full shadow-md text-xs sm:text-sm flex items-center">
                    <span className="h-3 w-3 rounded-full bg-caput-mortuum mr-2"></span>
                    <span className="text-caput-mortuum font-medium">Fresh Guarantee</span>
                  </div>
                </div>
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
            {products && products.data.map(product => (
              <div className="group relative transform transition-all duration-300 hover:scale-105" key={product.id}>
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-85 lg:h-80 lg:aspect-none shadow-md">
                  <img
                    src={ product.image 
                      ? `${import.meta.env.VITE_API_URL}/storage/products/${product.image}` 
                      : `${import.meta.env.VITE_API_URL}/products/default-image.jpg` }
                    alt={product.name}
                    className="w-full h-full object-center object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/products/default-image.jpg";
                    }}
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-caput-mortuum font-medium">
                      <Link to={`/product/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0"></span>
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-wine">{product.mini_description}</p>
                  </div>
                  <p className="text-sm font-medium text-caput-mortuum">${product.price}</p>
                </div>
              </div>
            ))}
            
            
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
