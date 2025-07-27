import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// mock database
let collegeDatabase = {
  'IIT Delhi': {
    '1': ['CSE101', 'MATH111'],
  },
};

const AddCollege = () => {
  const [college, setCollege] = useState('');
  const [semester, setSemester] = useState('');
  const [courses, setCourses] = useState([{ name: '', code: '' }]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleCourseChange = (index, field, value) => {
    const updated = [...courses];
    updated[index][field] = value;
    if (index === courses.length - 1 && updated[index].name && updated[index].code) {
      updated.push({ name: '', code: '' });
    }
    setCourses(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    const trimmedCollege = college.trim();
    if (trimmedCollege.length < 3) {
      errs.college = 'College name must be at least 3 characters.';
    }
    if (!semester) {
      errs.semester = 'Semester is required.';
    }
    const validCourses = courses.filter((c) => c.name && c.code);
    if (validCourses.length === 0) {
      errs.courses = 'Add at least one valid course.';
    }
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    if (collegeDatabase[trimmedCollege]) {
      toast.error('❗ College already listed.');
      return;
    }

    collegeDatabase[trimmedCollege] = {};
    collegeDatabase[trimmedCollege][semester] = validCourses.map((course) => course.code);

    toast.success('✅ College added successfully!', {
      autoClose: 1500,
      onClose: () => navigate('/'),
    });
  };

  return (
    <div className="px-4">
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className=" p-6 sm:p-8  w-full max-w-2xl space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center">Add College & Courses</h2>

          {/* College Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">College Name *</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. IIIT Hyderabad"
              value={college}
              onChange={(e) => {
                setCollege(e.target.value);
                setErrors((prev) => ({ ...prev, college: '' }));
              }}
            />
            {errors.college && <p className="text-sm text-red-600 mt-1">{errors.college}</p>}
          </div>

          {/* Semester Dropdown */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Semester *</label>
          <select
  className="block w-full border border-gray-300 rounded-md px-4 py-2 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
  value={semester}
  onChange={(e) => {
    setSemester(e.target.value);
    setErrors((prev) => ({ ...prev, semester: '' }));
  }}
>
  <option value="">Select Semester</option>
  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
    <option key={sem} value={sem}>
      Semester {sem}
    </option>
  ))}
</select>

            {errors.semester && (
              <p className="text-sm text-red-600 mt-1">{errors.semester}</p>
            )}
          </div>

          {/* Courses Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Courses *</label>
            {courses.map((course, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-2 mb-2"
              >
                <input
                  type="text"
                  placeholder="Course Name"
                  className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={course.name}
                  onChange={(e) => handleCourseChange(index, 'name', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Course Code"
                  className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={course.code}
                  onChange={(e) => handleCourseChange(index, 'code', e.target.value)}
                />
              </div>
            ))}
            {errors.courses && <p className="text-sm text-red-600">{errors.courses}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            ➕ Add College
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCollege;
