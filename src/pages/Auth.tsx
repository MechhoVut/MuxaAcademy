import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../server/contexts/AuthContext';
import { AlertCircle } from 'lucide-react';

interface LoginForm {
  identifier: string;
  password: string;
}

interface RegistrationForm {
  mobile: string;
  email: string;
  name: string;
  course: string;
  password: string;
  confirmPassword: string;
}

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  
  const [loginData, setLoginData] = useState<LoginForm>({ 
    identifier: '', 
    password: '' 
  });
  
  const [registrationData, setRegistrationData] = useState<RegistrationForm>({
    mobile: '',
    email: '',
    name: '',
    course: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    formType: 'login' | 'registration'
  ) => {
    const { name, value } = e.target;
    if (formType === 'login') {
      setLoginData({ ...loginData, [name]: value });
    } else {
      setRegistrationData({ ...registrationData, [name]: value });
    }
    setError(''); // Clear any previous errors
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn(loginData.identifier, loginData.password);
      navigate('/'); // Redirect to home page after successful login
    } catch (error: any) {
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (registrationData.password !== registrationData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...userData } = registrationData;
      await signUp(userData);
      alert('Registration successful! Please login to continue.');
      setIsLogin(true);
    } catch (error: any) {
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url(../../loginPic.jpg)" }}
    >
      <div className="w-full max-w-md bg-[#f5f5f5] bg-opacity-95 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#4b2e2e]">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        {isLogin ? (
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label className="block text-[#6d4c41] mb-2" htmlFor="identifier">
                Phone Number / Email
              </label>
              <input
                type="text"
                id="identifier"
                name="identifier"
                value={loginData.identifier}
                onChange={(e) => handleInputChange(e, 'login')}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
                required
                disabled={loading}
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#6d4c41] mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={(e) => handleInputChange(e, 'login')}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
                required
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#8d6e63] text-white py-2 rounded-lg hover:bg-[#6d4c41] transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegistrationSubmit}>
            <div className="mb-4">
              <label className="block text-[#6d4c41] mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={registrationData.name}
                onChange={(e) => handleInputChange(e, 'registration')}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
                required
                disabled={loading}
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#6d4c41] mb-2" htmlFor="mobile">
                Mobile Number
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={registrationData.mobile}
                onChange={(e) => handleInputChange(e, 'registration')}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
                required
                disabled={loading}
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#6d4c41] mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={registrationData.email}
                onChange={(e) => handleInputChange(e, 'registration')}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
                required
                disabled={loading}
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#6d4c41] mb-2" htmlFor="course">
                Course
              </label>
              <select
                id="course"
                name="course"
                value={registrationData.course}
                onChange={(e) => handleInputChange(e, 'registration')}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
                required
                disabled={loading}
              >
                <option value="">Select a course</option>
                <option value="bca">BCA</option>
                <option value="mca">MCA</option>
                <option value="btech">B-Tech</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-[#6d4c41] mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={registrationData.password}
                onChange={(e) => handleInputChange(e, 'registration')}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
                required
                disabled={loading}
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#6d4c41] mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={registrationData.confirmPassword}
                onChange={(e) => handleInputChange(e, 'registration')}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
                required
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#8d6e63] text-white py-2 rounded-lg hover:bg-[#6d4c41] transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Register'}
            </button>
          </form>
        )}
        <p className="text-center text-sm text-[#6d4c41] mt-4">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-[#8d6e63] hover:underline"
            disabled={loading}
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;