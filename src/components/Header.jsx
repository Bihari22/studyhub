import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserGraduate, FaBars } from 'react-icons/fa';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setShowMenu(false);
    navigate('/');
  };

  const handleUploadClick = () => {
    if (!isLoggedIn) {
      navigate('/auth', { state: { from: '/upload' } }); // 👈 redirect after login
    } else {
      navigate('/upload');
    }
    setShowMenu(false);
  };

  return (
    <header className="bg-white shadow-md border-b fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-700 hover:text-blue-800 transition"
        >
          StudyHub
        </Link>

        <button
          className="md:hidden text-2xl text-blue-700"
          onClick={() => setShowMenu(!showMenu)}
        >
          {isLoggedIn ? <FaUserGraduate /> : <FaBars />}
        </button>

        <nav
          className={`${
            showMenu ? 'flex' : 'hidden'
          } flex-col md:flex md:flex-row items-start md:items-center md:space-x-6 text-gray-800 font-medium absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent px-4 md:px-0 py-4 md:py-0 shadow-md md:shadow-none space-y-3 md:space-y-0`}
        >
          <Link to="/access" className="hover:text-blue-600" onClick={() => setShowMenu(false)}>
            Access
          </Link>

          <button onClick={handleUploadClick} className="hover:text-blue-600">
            Upload
          </button>

          <Link
            to="/browse-colleges"
            className="hover:text-blue-600"
            onClick={() => setShowMenu(false)}
          >
            College
          </Link>

          {isLoggedIn ? (
            <>
              <div className="relative group hidden md:block">
                <FaUserGraduate className="text-2xl text-blue-600 cursor-pointer hover:text-blue-800" />
                <div className="absolute right-0 mt-0 w-36 bg-white border rounded shadow-md opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-10">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="md:hidden text-left w-full text-red-600 hover:bg-red-50 rounded px-2 py-1 border-t pt-2"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth" onClick={() => setShowMenu(false)}>
              <button className="bg-blue-600 text-white px-4 py-1.5 rounded-full hover:bg-blue-700 hover:shadow-md transform hover:scale-105 transition w-full md:w-auto">
                Login
              </button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
