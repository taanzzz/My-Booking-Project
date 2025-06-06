import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Pencil, User } from 'lucide-react';
import { AuthContext } from '../AuthContext/AuthContext';


const UserProfile = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="loading loading-spinner text-green-500"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-10 text-zinc-600 dark:text-zinc-400">
        No user is currently logged in.
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 mt-10 max-w-4xl mx-2 sm:mx-auto px-2 sm:px-6 dark:bg-zinc-900 bg-white rounded-xl shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <User className="text-green-600 dark:text-green-400" />
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-white">My Profile</h2>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <img
          src={user.photoURL || 'https://i.ibb.co/FbDdMYbZ/vecteezy-blue-profile-icon-36885313.png'}
          alt="User Avatar"
          className="w-32 h-32 rounded-full border-4 border-green-500 shadow-md"
        />
        <div className="flex-1 text-zinc-800 dark:text-zinc-200 space-y-2">
          <p><span className="font-semibold">Name:</span> {user.displayName || 'N/A'}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">UID:</span> {user.uid}</p>
        </div>
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={() => navigate('/update-profile')}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-colors"
        >
          <Pencil size={18} /> Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;