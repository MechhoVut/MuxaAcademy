import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Courses from './pages/Courses';
import Privacy from './pages/Privacy';
import Apply from './pages/Apply';
import AdminLayout from '../src/components/layout/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Applications from './pages/admin/Applications';
import AdminCourses from './pages/admin/Courses';
import Users from './pages/admin/Users';
import Auth from './pages/Auth';
import { AuthProvider } from '../src/server/contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="applications" element={<Applications />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="users" element={<Users />} />
          </Route>

          {/* Public Routes */}
          <Route
            path="/*"
            element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/apply/:courseId" element={<Apply />} />
                    <Route path="/login" element={<Auth />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;