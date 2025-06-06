import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { updateProfile } from 'firebase/auth';
import { UserCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthContext/AuthContext';



const UpdateProfile = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(user, { displayName: name, photoURL });
      toast.success('✅ Profile updated successfully!');
      navigate('/'); 
    } catch (error) {
      toast.error('❌ Failed to update profile!');
      console.error(error);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-10 text-zinc-600 dark:text-zinc-400">
        Please log in first to update your profile.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-4 sm:mx-auto mt-12 p-6 sm:p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <UserCircle className="text-green-600 dark:text-green-400" />
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-white">Edit Profile</h2>
      </div>

      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Display Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Photo URL</label>
          <input
            type="url"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="https://your-photo-url.com"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow-md transition-all"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;