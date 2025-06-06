import React, { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router';
import { AuthContext } from '../AuthContext/AuthContext';


const MyProfile = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    
    const mq = window.matchMedia('(hover: hover)');
    setCanHover(mq.matches);

    
    const handler = (e) => setCanHover(e.matches);
    mq.addEventListener('change', handler);

    return () => mq.removeEventListener('change', handler);
  }, []);

  if (!user) return null;

  const defaultPhoto = 'https://i.ibb.co/FbDdMYbZ/vecteezy-blue-profile-icon-36885313.png';

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('👋 Successfully logged out!');
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('⚠️ Failed to logout!');
    }
  };

  const handleMouseEnter = () => {
    if (canHover) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (canHover) {
      timeoutRef.current = setTimeout(() => {
        setOpen(false);
      }, 300);
    }
  };

  const handleClick = () => {
    if (!canHover) {
      setOpen((prev) => !prev);
    }
  };

  return (
  <div
    className="relative"
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    onClick={handleClick}
  >
    <div className="btn btn-ghost btn-circle avatar relative ring-1 ring-zinc-300 dark:ring-zinc-700 hover:ring-green-500 transition">
      <img
        className="w-10 h-10 object-cover rounded-full"
        src={user.photoURL || defaultPhoto}
        alt="User"
      />
      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-zinc-900 rounded-full"></span>
    </div>

    <ul
      className={`absolute right-0 mt-2 bg-base-100 dark:bg-zinc-800 shadow-lg rounded-xl w-36 z-50 p-2 space-y-2 transition-all duration-200 ${
        open ? 'flex flex-col' : 'hidden'
      }`}
    >
      <li>
        <span
          onClick={() =>
            toast.info(`👤 Logged in as ${user.displayName || 'Anonymous'}`)
          }
          className="cursor-pointer text-sm  font-medium hover:text-green-600"
        >
          {user.displayName || 'Anonymous'}
        </span>
      </li>
      <li>
        <Link
          to="/user-profile"
          className="btn btn-sm w-full bg-blue-500 text-white hover:bg-blue-600 transition"
          onClick={() => setOpen(false)}
        >
          My Details
        </Link>
      </li>
      <li>
        <button
          onClick={handleLogout}
          className="btn btn-sm w-full bg-red-600 text-white hover:bg-red-700 transition"
        >
          Log Out
        </button>
      </li>
    </ul>
  </div>
);

};

export default MyProfile;
