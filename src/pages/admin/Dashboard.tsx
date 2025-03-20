import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Users,
  GraduationCap,
  FileText,
  BarChart,
  Bell,
  Settings,
  Mail,
  User
} from 'lucide-react';

interface DashboardStats {
  totalStudents: number;
  activeCourses: number;
  totalApplications: number;
  revenue: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch stats
        const statsResponse = await axios.get('http://localhost:5000/api/admin/stats', { headers });
        setStats(statsResponse.data);

        // Fetch recent applications
        const applicationsResponse = await axios.get('http://localhost:5000/api/admin/applications', { headers });
        setRecentApplications(applicationsResponse.data.slice(0, 3));

        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Students',
      value: stats?.totalStudents || 0,
      icon: <Users className="h-6 w-6 text-blue-600" />,
      trend: 'up'
    },
    {
      title: 'Active Courses',
      value: stats?.activeCourses || 0,
      icon: <GraduationCap className="h-6 w-6 text-green-600" />,
      trend: 'up'
    },
    {
      title: 'Applications',
      value: stats?.totalApplications || 0,
      icon: <FileText className="h-6 w-6 text-purple-600" />,
      trend: 'up'
    },
    {
      title: 'Revenue',
      value: `$${stats?.revenue || 0}`,
      icon: <BarChart className="h-6 w-6 text-yellow-600" />,
      trend: 'up'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Rest of your Dashboard JSX remains the same */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Settings className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=32&h=32&q=80"
                  alt="Admin"
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {statCards.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-full">{stat.icon}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Applications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h2>
                <div className="space-y-4">
                  {recentApplications.map((application: any) => (
                    <div key={application._id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <User className="h-10 w-10 text-gray-400 bg-gray-100 rounded-full p-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{application.name}</p>
                          <p className="text-sm text-gray-500">{application.course?.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          application.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : application.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {application.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link
                    to="/admin/applications"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    View all applications
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;