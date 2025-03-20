import React, { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Clock, Users, Trophy, Star, Target, BarChart as ChartBar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    url: '/pic1.jpg',
    title: 'Welcome to Muxa Academy',
    subtitle: 'Empowering minds through quality education'
  },
  {
    url: '/pic3.jpg',
    title: 'World-Class Education',
    subtitle: 'Learn from industry experts and advance your career'
  },
  {
    url: '/pic2.jpg',
    title: 'Modern Learning Environment',
    subtitle: 'State-of-the-art facilities for optimal learning'
  },
  {
    url: '/pic4.jpg',
    title: 'Student Success',
    subtitle: '95% placement rate with top companies'
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  return (
    <div>
      {/* Hero Section with Slider */}
      <div className="relative h-[600px] overflow-hidden">
        {/* Slides */}
        <div className="relative h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url('${slide.url}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0" style={{ backgroundColor: '#000000', opacity: 0.5 }}>
                <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
                  <div className="text-white">
                    <h1 className="text-5xl font-bold mb-4">{slide.title}</h1>
                    <p className="text-xl mb-8">{slide.subtitle}</p>
                    <Link 
                      to="/courses" 
                      className="bg-[#FED8B1] text-black px-8 py-3 rounded-md inline-flex items-center space-x-2 hover:bg-[#D7B288]"
                    >
                      <span>Explore Courses</span>
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#5d4037] text-white p-2 rounded-full hover:bg-[#4e342e] transition-all"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#5d4037] text-white p-2 rounded-full hover:bg-[#4e342e] transition-all"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? 'bg-[#5d4037] scale-110' : 'bg-[#5d4037]/50 hover:bg-[#5d4037]/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16" style={{ backgroundColor: '#d7ccc8' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <BookOpen className="h-12 w-12 text-[#5d4037] mb-4" />
              <h3 className="text-xl font-bold mb-2">Quality Education</h3>
              <p className="text-gray-600">Expert instructors and comprehensive curriculum designed for success.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Clock className="h-12 w-12 text-[#5d4037] mb-4" />
              <h3 className="text-xl font-bold mb-2">Flexible Schedule</h3>
              <p className="text-gray-600">Learn at your own pace with our flexible course schedules.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Users className="h-12 w-12 text-[#5d4037] mb-4" />
              <h3 className="text-xl font-bold mb-2">Community Support</h3>
              <p className="text-gray-600">Join a thriving community of learners and educators.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16" style={{ backgroundColor: '#8d6e63', color: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Join Muxa Academy today and take the first step towards a successful career in technology.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/courses"
              className="bg-[#5d4037] text-white px-8 py-3 rounded-md hover:bg-[#4e342e] inline-flex items-center"
            >
              Browse Courses
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="bg-white text-[#5d4037] px-8 py-3 rounded-md border-2 border-[#5d4037] hover:bg-[#d7ccc8]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
