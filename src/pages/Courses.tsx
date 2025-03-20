import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Award, BookOpen, Users, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Course {
  _id: string;
  name: string;
  duration: string;
  fees: string;
  intake: number;
  description: string;
  highlights: string[];
  career: string[];
  status: string;
  image: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        setCourses(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch courses');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3e9e7] flex items-center justify-center">
        <div className="text-[#8d6e63] text-xl">Loading courses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f3e9e7] flex items-center justify-center">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-[#f3e9e7] min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-[#8d6e63] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Academic Programs</h1>
          <p className="text-xl max-w-2xl">
            Choose from our wide range of industry-aligned courses designed to launch your career in technology
          </p>
        </div>
      </div>

      {/* Course Listing */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12">
          {courses.map((course) => (
            <div key={course._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Course Image */}
                <div className="md:col-span-1">
                  <img
                    src={course.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'}
                    alt={course.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Course Details */}
                <div className="md:col-span-2 p-6">
                  <h2 className="text-2xl font-bold text-[#8d6e63] mb-4">{course.name}</h2>
                  <p className="text-gray-600 mb-6">{course.description}</p>

                  {/* Key Information */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-[#8d6e63]" />
                      <span className="text-sm text-gray-600">{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-[#8d6e63]" />
                      <span className="text-sm text-gray-600">{course.fees}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-[#8d6e63]" />
                      <span className="text-sm text-gray-600">Intake: {course.intake}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-[#8d6e63]" />
                      <span className="text-sm text-gray-600">Next Batch: June 2024</span>
                    </div>
                  </div>

                  {/* Course Highlights */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                      <BookOpen className="h-5 w-5 text-[#8d6e63] mr-2" />
                      Course Highlights
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {course.highlights.map((highlight, index) => (
                        <li key={index} className="text-gray-600 text-sm flex items-center">
                          <span className="w-2 h-2 bg-[#8d6e63] rounded-full mr-2"></span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Career Prospects */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                      <Award className="h-5 w-5 text-[#8d6e63] mr-2" />
                      Career Prospects
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {course.career.map((career, index) => (
                        <li key={index} className="text-gray-600 text-sm flex items-center">
                          <span className="w-2 h-2 bg-[#8d6e63] rounded-full mr-2"></span>
                          {career}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Apply Button */}
                  <Link
                    to={`/apply/${course._id}`}
                    className="inline-flex items-center px-6 py-3 bg-[#8d6e63] text-white rounded-md hover:bg-[#704e45] transition-colors"
                  >
                    Apply Now
                    <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Muxa Academy?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#f3e9e7] rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-[#8d6e63]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Accredited Programs</h3>
              <p className="text-gray-600">All our courses are recognized by leading universities and industry bodies</p>
            </div>
            <div className="text-center">
              <div className="bg-[#f3e9e7] rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-[#8d6e63]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Faculty</h3>
              <p className="text-gray-600">Learn from industry experts with years of practical experience</p>
            </div>
            <div className="text-center">
              <div className="bg-[#f3e9e7] rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-[#8d6e63]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Modern Curriculum</h3>
              <p className="text-gray-600">Updated syllabus aligned with current industry requirements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;