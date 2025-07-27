import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const collegeList = ['IIT Delhi', 'NIT Trichy', 'BITS Pilani'];

const BrowseCollege = () => {
  const [college, setCollege] = useState('');
  const [semester, setSemester] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [materialType, setMaterialType] = useState('');

  const [collegeError, setCollegeError] = useState('');
  const [semesterError, setSemesterError] = useState('');
  const [collegeSuggestions, setCollegeSuggestions] = useState([]);
  const [showAddPrompt, setShowAddPrompt] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ reactive login state

  const navigate = useNavigate();

  // ✅ Check login status on mount
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const isCollegeValid = collegeList.some(
    (c) => c.toLowerCase() === college.trim().toLowerCase()
  );

  const handleCollegeInput = (value) => {
    setCollege(value);
    setCollegeError('');
    setSemester('');
    setSemesterError('');
    setCourseCode('');

    const query = value.trim().toLowerCase();
    const words = query.split(' ').filter(Boolean);

    const suggestions = collegeList.filter((collegeName) => {
      const lowerCaseName = collegeName.toLowerCase();
      return words.every((word) => lowerCaseName.includes(word));
    });

    setCollegeSuggestions(suggestions);
    setShowAddPrompt(query.length > 2 && suggestions.length === 0);
  };

  const handleCheck = () => {
    if (!college) return setCollegeError('Please select a college first.');
    if (!isCollegeValid) return setCollegeError('College not listed. Please add it.');
    if (!semester) return setSemesterError('Please select a semester first.');
    if (!courseCode || !materialType) {
      alert('Please select all required fields before proceeding.');
      return;
    }

    alert('✅ Checking if materials are available...');
  };

  return (
    <motion.div
      className=" px-6  flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Browse College</h2>

      <div className="w-full max-w-lg space-y-3">
        {/* College Input */}
        <div className="relative">
          <label className="block mb-1 text-gray-600 font-medium">
            Search Your College <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Type your college name..."
            value={college}
            onChange={(e) => handleCollegeInput(e.target.value)}
            className={`input w-full ${collegeError ? 'border-red-500' : ''}`}
          />
          {collegeError && <p className="text-sm text-red-500 mt-1">{collegeError}</p>}

          {collegeSuggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-y-auto shadow">
              {collegeSuggestions.map((suggestion, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setCollege(suggestion);
                    setCollegeSuggestions([]);
                    setShowAddPrompt(false);
                  }}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}

          {showAddPrompt && (
            <div className="mt-2 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded">
              <p>
                College not listed?{' '}
                <Link
                  to={isLoggedIn ? '/add-college' : '/auth'}
                  state={isLoggedIn ? {} : { from: '/add-college' }}
                  className="text-blue-600 underline font-medium"
                >
                  Add here
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Semester */}
        <div>
          <label className="block mb-1 text-gray-600 font-medium">
            Select Semester <span className="text-red-500">*</span>
          </label>
          <select
            value={semester}
            onChange={(e) => {
              if (!isCollegeValid) {
                setCollegeError('Please select a valid listed college first.');
                return;
              }
              setSemester(e.target.value);
              setSemesterError('');
            }}
            onClick={() => {
              if (!isCollegeValid) setCollegeError('Please select a valid listed college first.');
            }}
            className={`input w-full ${!isCollegeValid ? 'cursor-not-allowed' : ''} ${
              semesterError ? 'border-red-500' : ''
            }`}
            disabled={!isCollegeValid}
          >
            <option value="">-- Select Semester --</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>
          {semesterError && <p className="text-sm text-red-500 mt-1">{semesterError}</p>}
        </div>

        {/* Course Code */}
        <div>
          <label className="block mb-1 text-gray-600 font-medium">
            Course Code <span className="text-red-500">*</span>
          </label>
          <select
            value={courseCode}
            onChange={(e) => {
              if (!semester) {
                setSemesterError('Please select a semester first.');
                return;
              }
              setCourseCode(e.target.value);
            }}
            onClick={() => {
              if (!semester) setSemesterError('Please select a semester first.');
            }}
            className={`input w-full ${!semester ? 'cursor-not-allowed' : ''}`}
            disabled={!semester}
          >
            <option value="">-- Select Course Code --</option>
            <option value="CSE101">CSE101</option>
            <option value="MATH201">MATH201</option>
            <option value="PHY103">PHY103</option>
          </select>
        </div>

        {/* Material Type */}
        <div>
          <label className="block mb-1 text-gray-600 font-medium">
            Material Type <span className="text-red-500">*</span>
          </label>
          <select
            value={materialType}
            onChange={(e) => setMaterialType(e.target.value)}
            className="input w-full"
          >
            <option value="">-- Select Type --</option>
            <option value="notes">Notes</option>
            <option value="pyqs">Previous Year Questions</option>
            <option value="projects">Projects</option>
            <option value="others">Others</option>
          </select>
        </div>

        <p className="text-gray-700 text-center text-sm mt-2">
          Check whether something is uploaded from your college.
        </p>

        <button
          onClick={handleCheck}
          className="mx-auto block mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-300 disabled:opacity-50"
          disabled={!isCollegeValid}
        >
          Check
        </button>
      </div>
    </motion.div>
  );
};

export default BrowseCollege;
