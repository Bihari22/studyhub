import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const collegeList = ['IIT Delhi', 'NIT Trichy', 'BITS Pilani'];
const courseDatabase = {
  'IIT Delhi': {
    '1': ['CSE101', 'MATH111'],
    '2': ['PHY102', 'CHEM201'],
  },
  'NIT Trichy': {
    '1': ['ME101'],
    '2': ['EE102', 'MA202'],
  },
};


const UploadMaterial = () => {
  const [step, setStep] = useState(1);
  const [college, setCollege] = useState('');
  const [semester, setSemester] = useState('');
  const [collegeSuggestions, setCollegeSuggestions] = useState([]);
  const [showAddPrompt, setShowAddPrompt] = useState(false);
  const [courseCode, setCourseCode] = useState('');
  const [uploadLink, setUploadLink] = useState('');

  const [materialType, setMaterialType] = useState('');
  const [file, setFile] = useState(null);
  const [link, setLink] = useState('');

  const [semCollege, setSemCollege] = useState('');
  const [semNumber, setSemNumber] = useState('');
  const [courses, setCourses] = useState([{ name: '', code: '' }]);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleCollegeInput = (value) => {
    setCollege(value);
    const query = value.trim().toLowerCase();
    const words = query.split(' ').filter(Boolean);
    const suggestions = collegeList.filter((c) =>
      words.every((w) => c.toLowerCase().includes(w))
    );
    setCollegeSuggestions(suggestions);
    setShowAddPrompt(query.length > 2 && suggestions.length === 0);
  };

  const handleCourseChange = (index, field, value) => {
    const updated = [...courses];
    updated[index][field] = value;
    if (index === courses.length - 1 && updated[index].name && updated[index].code) {
      updated.push({ name: '', code: '' });
    }
    setCourses(updated);
  };

  const handleAddSemesterClick = () => {
    setStep(2);
  };

  const handleSemesterNext = () => {
    const validCollege = collegeList.some(
      (c) => c.toLowerCase() === semCollege.trim().toLowerCase()
    );
    const validCourses = courses.filter((c) => c.name && c.code);
    const errs = {};
    if (!validCollege) errs.semCollege = 'Please select a valid listed college.';
    if (!semNumber) errs.semNumber = 'Semester is required.';
    if (validCourses.length === 0) errs.courses = 'Add at least one course.';
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    alert('✅ Semester details saved (mock)');
    setStep(3);
  };

  const handleUpload = () => {
    if (!courseCode) {
      alert('Please select a course code.');
      return;
    }
    if (!materialType) {
      alert('Please select material type.');
      return;
    }
    if (!file && !link.trim()) {
      alert('Please upload a file or provide a link.');
      return;
    }
    if (link && !/^https?:\/\/\S+\.\S+/.test(link)) {
      alert('Please enter a valid URL.');
      return;
    }

    alert('✅ Thanks for your contribution! It may help many students.');
    setStep(1);
    setCollege('');
    setSemester('');
    setCourseCode('');
    setMaterialType('');
    setFile(null);
    setLink('');
  };

  return (
    <motion.div
      className=" flex flex-col items-center px-4 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        {step === 1 ? 'Upload Material' : step === 2 ? 'Add Semester' : 'Upload File / Link'}
      </h2>

      <div className="w-full max-w-xl">
        <AnimatePresence mode="wait">
          {/* Step 1: Select College & Semester */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="relative">
                <label className="block mb-1 font-medium text-gray-700">College *</label>
                <input
                  className="input w-full"
                  value={college}
                  onChange={(e) => handleCollegeInput(e.target.value)}
                  placeholder="Search college"
                />
                {collegeSuggestions.length > 0 && (
                  <ul className="absolute bg-white border rounded w-full shadow mt-1 z-10">
                    {collegeSuggestions.map((s, i) => (
                      <li key={i} className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                        onClick={() => {
                          setCollege(s);
                          setCollegeSuggestions([]);
                          setShowAddPrompt(false);
                        }}>
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
                {showAddPrompt && (
                  <p className="text-sm mt-2 text-yellow-700">
                    College not listed?{' '}
                   <button
      onClick={() => navigate(`/add-college?name=${encodeURIComponent(college)}`)}
      className="text-blue-600 underline"
    >Add Here </button>
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">Semester *</label>
                <select value={semester} onChange={(e) => setSemester(e.target.value)} className="input w-full">
                  <option value="">Select Semester</option>
                  {[1,2,3,4,5,6,7,8].map(n => <option key={n}>{n}</option>)}
                </select>
              </div>

              <div className="flex justify-between pt-4">
                <button onClick={handleAddSemesterClick} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                  ➕ Add Semester
                </button>
               <button
  onClick={() => {
    const trimmedCollege = college.trim();
    let hasError = false;

    if (!trimmedCollege) {
      toast.error('❗ Please enter your college');
      hasError = true;
    }

    if (!semester) {
      toast.error('❗ Please select semester');
      hasError = true;
    }

    if (hasError) return;

    // All good, proceed
    setErrors({});
    setStep(3);
  }}
  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
>
  Next →
</button>

              </div>
            </motion.div>
          )}

        {step === 2 && (
  <motion.div
    key="addSemester"
    initial={{ opacity: 0, x: 60 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -60 }}
    transition={{ duration: 0.4 }}
    className="space-y-6"
  >
    {/* College Name with suggestion & Add option */}
    <div className="relative">
      <label className="block text-gray-600 font-medium mb-1">College Name *</label>
      <input
        type="text"
        className="input w-full"
        placeholder="Full college name"
        value={semCollege}
        onChange={(e) => {
          const val = e.target.value;
          setSemCollege(val);
          const query = val.trim().toLowerCase();
          const words = query.split(' ').filter(Boolean);
          const suggestions = collegeList.filter((c) =>
            words.every((w) => c.toLowerCase().includes(w))
          );
          setErrors((prev) => ({ ...prev, semCollege: '' }));
          setShowAddPrompt(query.length > 2 && suggestions.length === 0);
          setCollegeSuggestions(suggestions);
        }}
      />
      {errors.semCollege && <p className="text-sm text-red-600 mt-1">{errors.semCollege}</p>}

      {/* Suggestions */}
      {collegeSuggestions.length > 0 && (
        <ul className="absolute bg-white border rounded w-full shadow mt-1 z-10">
          {collegeSuggestions.map((suggestion, i) => (
            <li
              key={i}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => {
                setSemCollege(suggestion);
                setCollegeSuggestions([]);
                setShowAddPrompt(false);
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      {/* Not listed prompt */}
      {showAddPrompt && (
        <p className="text-sm text-yellow-700 mt-2">
          College not listed?{' '}
         <button
      onClick={() => navigate(`/add-college?name=${encodeURIComponent(college)}`)}
      className="text-blue-600 underline"
    >
            Add here
          </button>
        </p>
      )}

      <p className="text-sm text-gray-500 italic mt-1">
        * Kindly enter the full name of your college
      </p>
    </div>

    {/* Semester Number */}
    <div>
      <label className="block text-gray-600 font-medium mb-1">Semester *</label>
      <select
        className="input w-full"
        value={semNumber}
        onChange={(e) => {
          setSemNumber(e.target.value);
          setErrors((prev) => ({ ...prev, semNumber: '' }));
        }}
      >
        <option value="">Select Semester</option>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
          <option key={sem} value={sem}>
            Semester {sem}
          </option>
        ))}
      </select>
      {errors.semNumber && (
        <p className="text-sm text-red-600 mt-1">{errors.semNumber}</p>
      )}
    </div>

    {/* Course Inputs */}
    <div>
      <label className="block text-gray-600 font-medium mb-1">
        Enter All Courses in this Semester
      </label>
      {courses.map((course, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Course Name"
            className="input flex-1"
            value={course.name}
            onChange={(e) => handleCourseChange(index, 'name', e.target.value)}
          />
          <input
            type="text"
            placeholder="Course Code"
            className="input flex-1"
            value={course.code}
            onChange={(e) => handleCourseChange(index, 'code', e.target.value)}
          />
        </div>
      ))}
      {errors.courses && (
        <p className="text-sm text-red-600">{errors.courses}</p>
      )}
    </div>

    {/* Preview */}
    {courses.filter((c) => c.name && c.code).length > 0 && (
      <div className="mt-4 text-sm text-gray-700">
        <p className="font-semibold mb-1">Added Courses:</p>
        <ul className="list-disc pl-5">
          {courses
            .filter((c) => c.name && c.code)
            .map((c, i) => (
              <li key={i}>
                {c.name} ({c.code})
              </li>
            ))}
        </ul>
      </div>
    )}

    {/* Navigation Buttons */}
    <div className="flex justify-between pt-4">
      <button
        onClick={() => setStep(1)}
        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
      >
        ← Back
      </button>
      <button
        onClick={handleSemesterNext}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Next →
      </button>
    </div>
  </motion.div>
)}

          {/* Step 3: Upload File or Link */}
         {step === 3 && (
  <motion.div
    key="uploadStep"
    initial={{ opacity: 0, x: 60 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -60 }}
    transition={{ duration: 0.4 }}
    className="space-y-2"
  >
    <h3 className="text-xl font-semibold text-gray-700 ">Upload Material</h3>

    {/* Course Code Dropdown */}
    <div>
      <label className="block text-gray-600 font-medium mb-1">
        Course Code <span className="text-red-500">*</span>
      </label>
      {courseDatabase[college]?.[semester]?.length > 0 ? (
        <select
          className="input w-full"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
        >
          <option value="">-- Select Course Code --</option>
          {courseDatabase[college][semester].map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      ) : (
        <div className="bg-yellow-100 text-yellow-800 p-3 rounded">
          <p>No courses found for <strong>{college}</strong>, semester <strong>{semester}</strong>.</p>
          <button
            className="mt-2 text-blue-600 underline"
            onClick={() => {
              setStep(2);
              setSemCollege(college);
              setSemNumber(semester);
            }}
          >
            Add course here
          </button>
        </div>
      )}
    </div>

    {/* Material Type */}
    <div>
      <label className="block text-gray-600 font-medium mb-1">
        Material Type <span className="text-red-500">*</span>
      </label>
      <select
        className="input w-full"
        value={materialType}
        onChange={(e) => setMaterialType(e.target.value)}
      >
        <option value="">-- Select Type --</option>
        <option value="notes">Notes</option>
        <option value="pyqs">Previous Year Questions</option>
        <option value="projects">Projects</option>
        <option value="others">Others</option>
      </select>
    </div>

    {/* Upload Fields */}
    <div>
      <label className="block mb-1 font-medium text-gray-600">Upload PDF <span className="text-red-500">*</span></label>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full"
      />
    </div>

    <div>
      <label className="block mb-1 font-medium text-gray-600">
       Upload Link 
      </label>
      <input
        type="url"
        placeholder="https://example.com"
        value={uploadLink}
        onChange={(e) => setUploadLink(e.target.value)}
        className="input w-full"
      />
    </div>

    {/* Upload button */}
    <div className="text-center pt-4">
  <button
  onClick={() => {
    if (!courseCode || !materialType || (!uploadLink && !file)) {
      toast.error('❗ Please complete all required fields.');
      return;
    }

    toast.success('✅ Thanks for your contribution!', {
      autoClose: 1500,
      onClose: () => navigate('/'),
    });
  }}
  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
>
  Upload
</button>
    </div>
  </motion.div>
)}

        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default UploadMaterial;
