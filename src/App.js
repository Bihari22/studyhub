// src/App.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUniversity, FaUpload, FaBookOpen } from 'react-icons/fa';
import { motion } from 'framer-motion';

function App() {
  const navigate = useNavigate();
  const handleUploadClick = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    navigate(isLoggedIn ? '/upload' : '/auth', { state: { from: '/upload' } });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
   <main className="flex-grow pt-0 md:pt-14 flex items-center justify-center px-4 text-center">

        <div className="w-full max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Free Study Material for <br /><span className="text-black">Every Indian College Student</span></h2>
          <p className="text-gray-600 mb-8">Notes, PYQs, Projects & More – Powered by Students</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Browse Colleges */}
            <div className="text-center flex flex-col items-center">
              <Link to="/browse-colleges" className="mb-4">
                <FaUniversity className="text-6xl text-blue-600 hover:text-blue-800 transition duration-300 hover:scale-125" />
              </Link>
              <Link to="/browse-colleges">
                <button className="border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-600 hover:text-white transition duration-300">Browse Colleges</button>
              </Link>
              <h3 className="font-bold mb-1">🚀 Fast Access</h3>
              <p className="text-gray-600">Access Study Materials quickly</p>
            </div>
            {/* Upload Material */}
            <div className="text-center flex flex-col items-center">
              <div onClick={handleUploadClick} className="mb-4 cursor-pointer">
                <FaUpload className="text-6xl text-blue-600 hover:text-blue-800 transition duration-300 hover:scale-125" />
              </div>
              <button onClick={handleUploadClick} className="border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-600 hover:text-white transition duration-300">Upload Material</button>
              <h3 className="font-bold mb-1">🎁 Free Uploads</h3>
              <p className="text-gray-600">Share notes, projects and more</p>
            </div>
            {/* Access Material */}
            <div className="text-center flex flex-col items-center">
              <Link to="/access" className="mb-4">
                <FaBookOpen className="text-6xl text-blue-600 hover:text-blue-800 transition duration-300 hover:scale-125" />
              </Link>
              <Link to="/access">
                <button className="border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-600 hover:text-white transition duration-300">Access Material</button>
              </Link>
              <h3 className="font-bold mb-1">📚 Organised by Courses</h3>
              <p className="text-gray-600">Easy navigation for all subjects</p>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
}

export default App;
