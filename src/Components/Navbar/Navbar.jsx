import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "./../AuthContext/AuthContext";
import ToggleTheme from "./../ToggleTheme/ToggleTheme";
import MyProfile from "./../User/MyProfile"; 
import Image from "../../assets/log3.jpg";
import {AiFillHome,AiOutlineClose,AiOutlineMenu} from "react-icons/ai";
import { FaBed, FaChevronDown, FaUserPlus } from "react-icons/fa";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { RiLoginBoxLine } from "react-icons/ri";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";


const mobileMenuVariants = {
  hidden: { x: "-100%", opacity: 0, transition: { type: "tween", duration: 0.3, ease: "easeIn" } },
  visible: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.3, ease: "easeOut" } },
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
};


const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false); 
  const navigate = useNavigate();
  const moreMenuRef = useRef(null);

  
  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
  }, [navigate]);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setMoreMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  
  const NavLinkItem = ({ to, children, icon: Icon, isDropdown = false }) => (
    <NavLink
      to={to}
      onClick={() => {
          setMobileMenuOpen(false);
          setMoreMenuOpen(false);
      }}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg text-base font-medium transition-colors duration-200 ${
            isDropdown ? 'w-full px-3 py-2 text-sm' : 'px-4 py-2'
        } ${
          isActive
            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700/50 dark:hover:text-white"
        }`
      }
    >
      <Icon className="text-xl" />
      <span>{children}</span>
    </NavLink>
  );

  
  const primaryNavLinks = (
    <nav className="flex flex-col lg:flex-row gap-2 lg:gap-4 lg:items-center">
      <NavLinkItem to="/" icon={AiFillHome}>Home</NavLinkItem>
      <NavLinkItem to="/rooms" icon={FaBed}>Rooms</NavLinkItem>
      {user && (
        <NavLinkItem to="/my-bookings" icon={MdOutlineBookmarkAdded}>My Bookings</NavLinkItem>
      )}
    </nav>
  );

  
  const secondaryNavLinks = (
      <div className="flex flex-col gap-1">
          <NavLinkItem to="/about" icon={BsFillInfoCircleFill} isDropdown={true}>About Us</NavLinkItem>
          <NavLinkItem to="/contact" icon={MdEmail} isDropdown={true}>Contact Us</NavLinkItem>
      </div>
  );

  return (
    <header className="fixed  left-0 right-0 z-[999]">
      <div className=" px-1  md:px-2 lg:px-3  bg-white/70 dark:bg-gray-800/60 backdrop-blur-lg border border-gray-200/80 dark:border-gray-700/60  shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between h-16 px-4">
         
          <NavLink to="/" className="flex items-center gap-3 flex-shrink-0">
            <img src={Image} alt="Logo" loading="lazy" className="w-10 h-10 rounded-full shadow-md" />
            <span className="text-xl font-extrabold tracking-tight select-none hidden sm:inline">
              <span className="text-gray-900 dark:text-white">Echo</span>
              <span className="text-blue-600 dark:text-blue-400">Nest</span>
            </span>
          </NavLink>

          
          <div className="hidden lg:flex items-center gap-4">
            {primaryNavLinks}
            
           
            <div className="relative" ref={moreMenuRef}>
                <button
                    onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                    className="flex items-center gap-2 px-4 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
                >
                    <span>More</span>
                    <FaChevronDown className={`w-3 h-3 transition-transform ${moreMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                    {moreMenuOpen && (
                        <motion.div
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-2"
                        >
                            {secondaryNavLinks}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
          </div>

          
          <div className="flex items-center gap-3">
            <ToggleTheme />
            {user ? (
              <MyProfile />
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <NavLink to="/login" className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/60 rounded-lg transition-colors">
                  <RiLoginBoxLine /> Login
                </NavLink>
                <NavLink to="/register" className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors">
                  <FaUserPlus /> Register
                </NavLink>
              </div>
            )}
           
            <div className="lg:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg focus:outline-none" aria-label="Toggle menu">
                {mobileMenuOpen ? <AiOutlineClose className="w-6 h-6" /> : <AiOutlineMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div variants={mobileMenuVariants} initial="hidden" animate="visible" exit="hidden" className="lg:hidden absolute top-full left-0 w-full mt-2">
            <div className="mx-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl">
              {primaryNavLinks}
              
              <div className="my-3 border-t border-gray-200 dark:border-gray-700"></div>

              
              <div className="flex flex-col gap-2">
                <NavLinkItem to="/about" icon={BsFillInfoCircleFill}>About Us</NavLinkItem>
                <NavLinkItem to="/contact" icon={MdEmail}>Contact Us</NavLinkItem>
              </div>
              
              {!user && (
                 <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <NavLink to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/60 rounded-lg transition-colors">
                      <RiLoginBoxLine /> Login
                    </NavLink>
                    <NavLink to="/register" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors">
                      <FaUserPlus /> Register
                    </NavLink>
                  </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;