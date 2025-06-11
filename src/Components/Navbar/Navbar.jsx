import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "../../assets/log3.jpg";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router";
import { FaBars } from "react-icons/fa";
import { AuthContext } from './../AuthContext/AuthContext';
import ToggleTheme from './../ToggleTheme/ToggleTheme';
import MyProfile from './../User/MyProfile';
import { AiFillHome } from "react-icons/ai";
import { FaBed, FaUserPlus } from "react-icons/fa";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { RiLoginBoxLine } from "react-icons/ri";


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  const navLinks = (
    <>
      <li>
  <NavLink
    to="/"
    onClick={() => setDropdownOpen(false)}
    className={({ isActive }) =>
      `m-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300
      ${
        isActive
          ? "bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-lg"
          : "text-gray-700 dark:text-green-300 hover:text-pink-500 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800"
      }`
    }
  >
  <AiFillHome className="inline text-2xl mr-1" />  Home
  </NavLink>
</li>

      <li>
        <NavLink
          to="/rooms"
          onClick={() => setDropdownOpen(false)}
          className={({ isActive }) =>
            `m-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300
            ${
              isActive
                ? "bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-md"
                : "text-gray-700 dark:text-green-300 hover:text-pink-500 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`
          }
        >
         <FaBed className="inline text-2xl mr-1" />Rooms
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/my-bookings"
            onClick={() => setDropdownOpen(false)}
            className={({ isActive }) =>
              `m-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300
              ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-md"
                  : "text-gray-700 dark:text-green-300 hover:text-pink-500 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`
            }
          >
           <MdOutlineBookmarkAdded className="inline text-2xl mr-1" />My Bookings
          </NavLink>
        </li>
      )}
    </>
  );

  return (
  <>
    {/* Outer container for background and positioning */}
    <div className="fixed top-0 left-0 w-full mt-1 bg-gradient-to-r from-[#f8fafc] via-[#e0f2fe] to-[#f8fafc] dark:from-[#1e293b] dark:via-[#0f172a] dark:to-[#1e293b] backdrop-blur border-b border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 z-50">
      
      {/* Inner container for content alignment and padding */}
      <div className="navbar px-4 md:px-12 mx-auto">
        
        {/* Navbar Start (Desktop Logo) */}
        <div className="navbar-start hidden lg:flex items-center">
          <img
            src={Image}
            alt="Logo"
            className="w-15 h-15 rounded-full mr-3 shadow-md"
          />
          <span className="text-2xl font-extrabold tracking-wide select-none">
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent dark:from-green-400 dark:to-teal-300">
              Echo
            </span>
            <span className="bg-gradient-to-r from-gray-500 to-zinc-300 bg-clip-text text-transparent dark:from-green-300 dark:to-emerald-200">
              Nest
            </span>
          </span>
        </div>

        {/* Navbar Start */}
        <div className="lg:hidden navbar-start" ref={dropdownRef}>
          <div className="dropdown relative">
            <button
              className="btn btn-ghost btn-square text-green-700 dark:text-green-400 focus:outline-none"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-label="Toggle menu"
            >
              <FaBars className="text-2xl" />
            </button>
            <ul
              className={`absolute top-12 z-50 w-52 p-2 rounded-xl shadow-xl transition-all duration-300 transform bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${
                dropdownOpen
                  ? "opacity-100 scale-100 visible"
                  : "opacity-0 scale-95 invisible"
              } space-y-2`}
            >
              {navLinks}
            </ul>
          </div>
        </div>

        {/* Navbar Center  */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal space-x-5">{navLinks}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end flex items-center gap-3">
          <ToggleTheme />
          {user ? (
            <MyProfile user={user} />
          ) : (
            <>
              <NavLink
                to="/login"
                className="btn btn-sm px-5 py-2 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-500 text-white font-semibold rounded-lg shadow-lg transition duration-300 border border-pink-600 outline-none focus:outline-none"
              >
                <RiLoginBoxLine className="inline mr-2 text-lg" /> Login
              </NavLink>
              <NavLink
                to="/register"
                className="btn btn-sm px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 text-white font-semibold rounded-lg shadow-lg transition duration-300 border border-purple-600 outline-none focus:outline-none"
              >
                <FaUserPlus className="inline mr-2 text-lg" /> Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  </>
);
};

export default Navbar;
