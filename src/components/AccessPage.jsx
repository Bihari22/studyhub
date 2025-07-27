import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const mockData = {
  "IIT Delhi": {
    semesters: {
      "1": {
        courses: {
          "CSE101": {
            type: "Notes",
            fileUrl: "/files/iitdelhi_sem1_cse101_notes.pdf",
          },
          "MATH101": {
            type: "PYQs",
            fileUrl: "/files/iitdelhi_sem1_math101_pyqs.pdf",
          },
        },
      },
      "2": {
        courses: {
          "PHY102": {
            type: "Notes",
            fileUrl: "/files/iitdelhi_sem2_phy102_notes.pdf",
          },
        },
      },
    },
  },
  "NIT Trichy": {
    semesters: {
      "1": {
        courses: {
          "EEE101": {
            type: "Projects",
            fileUrl: "/files/nittrichy_sem1_eee101_projects.zip",
          },
        },
      },
    },
  },
};

// Helper to normalize strings
const normalize = (str) => str.trim().toLowerCase();

// Helper to match exact college
const findMatchingCollegeKey = (input) => {
  const normInput = normalize(input);
  return Object.keys(mockData).find(
    (key) => normalize(key) === normInput
  );
};

// Helper to suggest colleges
const getCollegeSuggestions = (input) => {
  const normInput = normalize(input);
  return Object.keys(mockData).filter(
    (key) => normalize(key).includes(normInput)
  );
};

const AccessPage = () => {
  const [college, setCollege] = useState('');
  const [semester, setSemester] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [result, setResult] = useState(null);
  const [collegeSuggestions, setCollegeSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    setResult(null);
    const matchedCollegeKey = findMatchingCollegeKey(college);

    if (!college || !semester || !courseCode) {
      toast.warning('⚠️ Please fill all required fields.');
      return;
    }

    if (!matchedCollegeKey) {
      toast.error('🚫 College not found. Please wait until it is listed.');
      return;
    }

    const collegeData = mockData[matchedCollegeKey];
    const semData = collegeData.semesters?.[semester];
    const courseData = semData?.courses?.[courseCode];

    if (courseData) {
      setResult(courseData);
    } else {
      toast.info('ℹ️ No material found. Please wait until someone updates it.');
    }
  };

  const availableSemesters = findMatchingCollegeKey(college)
    ? Object.keys(mockData[findMatchingCollegeKey(college)].semesters || {})
    : [];

  const availableCourses =
    findMatchingCollegeKey(college) &&
    semester &&
    mockData[findMatchingCollegeKey(college)].semesters?.[semester]?.courses
      ? Object.keys(
          mockData[findMatchingCollegeKey(college)].semesters[semester].courses
        )
      : [];

  const handleCollegeChange = (value) => {
    setCollege(value);
    setSemester('');
    setCourseCode('');
    setResult(null);

    setCollegeSuggestions(getCollegeSuggestions(value));
  };

  return (
    <motion.div
      className=" px-6 py-3 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-semibold mb-4">📥 Access Study Materials</h2>

      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md space-y-2">
        {/* College */}
        <div>
          <label className="block mb-1 text-gray-600 font-medium">
            Enter College Name
          </label>
          <input
            type="text"
            className="input w-full"
            placeholder="e.g. IIT Delhi"
            value={college}
            onChange={(e) => handleCollegeChange(e.target.value)}
          />
          {collegeSuggestions.length > 0 && (
            <ul className="bg-white border mt-1 rounded shadow max-h-40 overflow-y-auto">
              {collegeSuggestions.map((suggestion, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setCollege(suggestion);
                    setSemester('');
                    setCourseCode('');
                    setCollegeSuggestions([]);
                  }}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Semester */}
        <div>
          <label className="block mb-1 text-gray-600 font-medium">
            Select Semester
          </label>
          <select
            className="input w-full"
            value={semester}
            onChange={(e) => {
              setSemester(e.target.value);
              setCourseCode('');
              setResult(null);
            }}
            disabled={!availableSemesters.length}
          >
            <option value="">-- Select Semester --</option>
            {availableSemesters.map((sem, i) => (
              <option key={i} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </div>

        {/* Course Code */}
        <div>
          <label className="block mb-1 text-gray-600 font-medium">
            Select Course Code
          </label>
          <select
            className="input w-full"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            disabled={!availableCourses.length}
          >
            <option value="">-- Select Course --</option>
            {availableCourses.map((course, i) => (
              <option key={i} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        {/* Info if any part missing */}
        {!availableSemesters.length || !availableCourses.length ? (
          <p className="text-sm text-yellow-700 bg-yellow-100 p-2 rounded">
            *If any of the above details not found then wait for anyone to upload material. No material has uploaded till now.
          </p>
        ) : null}
 
        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-all"
        >
          🔍 Search Material
        </button>

        {/* Result */}
        {result && (
          <div className="mt-4 bg-green-50 border border-green-400 p-4 rounded">
            <h3 className="font-semibold text-green-700 mb-2">✅ Material Found!</h3>
            <p>
              📘 <strong>Type:</strong> {result.type}
            </p>
            <a
              href={result.fileUrl}
              download
              className="mt-2 inline-block text-blue-600 underline hover:text-blue-800"
            >
              ⬇️ Download File
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AccessPage;
