// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import App from './App';
import AuthPage from './components/AuthPage';
import './index.css';
import BrowseCollege from './components/BrowseCollege';
import UploadMaterial from './components/UploadMaterial'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCollege from './components/AddCollege';
import AccessPage from './components/AccessPage';
import MainLayout from './components/MainLayout';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Shared layout wrapper for all routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<App />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="browse-colleges" element={<BrowseCollege />} />
          <Route path="upload" element={<UploadMaterial />} />
          <Route path="add-college" element={<AddCollege />} />
          <Route path="access" element={<AccessPage />} />
        </Route>
      </Routes>

      {/* Toasts outside of AnimatePresence for consistent behavior */}
      <ToastContainer position="top-center" autoClose={3000} />
    </AnimatePresence>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <AnimatedRoutes />
    </HashRouter>
  </React.StrictMode>
);
