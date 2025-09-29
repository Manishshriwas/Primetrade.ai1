
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Profile() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96 text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Profile</h2>
        
        <div className="text-left space-y-4">
          <div>
            <p className="text-gray-600 font-medium">Name</p>
            <p className="text-gray-900">{user.name}</p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Email</p>
            <p className="text-gray-900">{user.email}</p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">User ID</p>
            <p className="text-gray-900 text-sm">{user._id}</p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Member Since</p>
            <p className="text-gray-900 text-sm">{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mt-6">
          <button 
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
