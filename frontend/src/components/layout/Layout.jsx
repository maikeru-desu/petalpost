import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen overflow-x-hidden flex flex-col" style={{ background: 'linear-gradient(to bottom, rgb(var(--color-ecru)), rgb(var(--color-flax)))' }}>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
