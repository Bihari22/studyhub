// MainLayout.jsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
  const location = useLocation();

  // Hide header on /auth
  const hideHeader = location.pathname === '/auth';

  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeader && <Header />}

      <main className="flex-grow pt-20 md:pt-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
