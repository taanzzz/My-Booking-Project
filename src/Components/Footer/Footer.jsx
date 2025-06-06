import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHome,
  FaBed,
  FaClipboardList,
  FaInfoCircle,
  FaQuestionCircle,
  FaFileContract,
  FaUserShield,
  FaHeadset,
} from "react-icons/fa";
import Logo from "../../assets/log3.jpg";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#e0f7fa] via-[#b2ebf2] to-[#80deea] dark:from-[#0d1b2a] dark:via-[#1b263b] dark:to-[#415a77] backdrop-blur-md bg-opacity-80 dark:bg-opacity-90 text-gray-900 dark:text-gray-200 px-6 md:px-20 pt-12 pb-8 transition-all duration-300 rounded-t-3xl shadow-xl">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
        
       
        <div>
          <div className="flex items-center mb-4">
            <img src={Logo} alt="Logo" className="w-12 h-12 rounded-full shadow-md mr-2" />
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              Echo<span className="text-blue-500">Nest</span>
            </span>
          </div>
          <p className="text-sm">
            Your gateway to comfort and elegance. Book your dream stay effortlessly with EchoNest.
          </p>
        </div>

       
        <div>
          <h4 className="font-semibold text-lg mb-4 text-gray-800 dark:text-white">Company</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FaHome className="text-blue-500" />
              <Link to="/" className="hover:text-blue-600">Home</Link>
            </li>
            <li className="flex items-center gap-2">
              <FaBed className="text-blue-500" />
              <Link to="/rooms" className="hover:text-blue-600">Explore Rooms</Link>
            </li>
            <li className="flex items-center gap-2">
              <FaClipboardList className="text-blue-500" />
              <Link to="/my-bookings" className="hover:text-blue-600">My Bookings</Link>
            </li>
            <li className="flex items-center gap-2">
              <FaInfoCircle className="text-blue-500" />
              <Link to="/about" className="hover:text-blue-600">About Us</Link>
            </li>
          </ul>
        </div>

        
        <div>
          <h4 className="font-semibold text-lg mb-4 text-gray-800 dark:text-white">Support</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FaQuestionCircle className="text-blue-500" />
              <Link to="/help" className="hover:text-blue-600">Help Center</Link>
            </li>
            <li className="flex items-center gap-2">
              <FaFileContract className="text-blue-500" />
              <Link to="/terms" className="hover:text-blue-600">Terms & Conditions</Link>
            </li>
            <li className="flex items-center gap-2">
              <FaUserShield className="text-blue-500" />
              <Link to="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
            </li>
            <li className="flex items-center gap-2">
              <FaHeadset className="text-blue-500" />
              <Link to="/contact" className="hover:text-blue-600">Contact Us</Link>
            </li>
          </ul>
        </div>

       
        <div>
          <h4 className="font-semibold text-lg mb-4 text-gray-800 dark:text-white">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><FaPhoneAlt /> +880 1234-567890</li>
            <li className="flex items-center gap-2"><FaEnvelope /> support@echonest.com</li>
            <li className="flex items-center gap-2"><FaMapMarkerAlt /> Dhaka, Bangladesh</li>
          </ul>
          <div className="flex gap-4 mt-4">
            <a href="https://facebook.com" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600 dark:text-blue-400 transition">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-sky-100 dark:hover:bg-sky-900 text-sky-500 dark:text-sky-400 transition">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-pink-100 dark:hover:bg-pink-900 text-pink-500 dark:text-pink-400 transition">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      
      <div className="text-center text-sm font-medium tracking-wide text-gray-700 dark:text-gray-300 border-t border-gray-300 dark:border-gray-600 pt-4">
  <span className="inline-block text-transparent bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text dark:from-green-300 dark:to-cyan-400 animate-gradient">
    &copy; {new Date().getFullYear()} EchoNest
  </span>
  <span className="ml-1">— All rights reserved.</span>
</div>

    </footer>
  );
};

export default Footer;
