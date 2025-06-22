import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children }) => {
  const location = useLocation();
  const isProductDetail = location.pathname.startsWith('/product/');
  
  return (
    <div 
      className="min-h-screen overflow-x-hidden flex flex-col" 
      style={{ 
        background: isProductDetail 
          ? 'white' 
          : 'linear-gradient(to bottom, rgb(var(--color-ecru)), rgb(var(--color-flax)))'
      }}
    >
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Toaster 
        position='bottom-right'
        toastOptions={{
          duration: 4000,
          success: {
            style: {
              background: 'rgb(var(--color-ecru))',
              color: 'rgb(var(--color-caput-mortuum))',
              border: '1px solid rgb(var(--color-flax))',
              fontWeight: '500',
            },
            iconTheme: {
              primary: 'rgb(var(--color-redwood))',
              secondary: 'white',
            }
          },
          error: {
            style: {
              background: 'rgb(var(--color-wine))',
              color: 'white',
              border: '1px solid rgb(var(--color-redwood))',
              fontWeight: '500',
            },
          },
        }}
      />
      <Footer />
    </div>
  );
};

export default Layout;
