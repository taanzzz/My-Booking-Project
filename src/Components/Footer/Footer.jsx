import React from "react";
import {FaFacebookF,FaTwitter,FaInstagram,FaLinkedinIn,FaRegPaperPlane} from "react-icons/fa";
import Logo from "../../assets/echo.jpg"; 
import { Link } from "react-router"; 


const FooterLink = ({ to, children }) => (
    <li>
        <Link
            to={to}
            className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors duration-300"
        >
            {children}
        </Link>
    </li>
);


const SocialLink = ({ href, icon: Icon, brandColor }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700/50 rounded-full text-gray-500 dark:text-gray-400 transition-all duration-300 ${brandColor}`}
        aria-label={`Follow us on ${href}`}
    >
        <Icon className="text-xl" />
    </a>
);


const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
                    
                    <div className="lg:col-span-4">
                        <div className="flex items-center mb-4">
                            <img src={Logo} alt="Logo" loading="lazy" className="w-12 h-12 rounded-full shadow-md mr-3" />
                            <span className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                                Echo<span className="text-blue-600 dark:text-blue-400">Nest</span>
                            </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                            Your gateway to comfort and elegance. Discover and book your dream stay effortlessly with EchoNest, where every journey begins with the perfect room.
                        </p>
                    </div>

                   
                    <div className="lg:col-span-5 grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-semibold text-sm tracking-wider uppercase text-gray-800 dark:text-gray-200 mb-4">Company</h4>
                            <ul className="space-y-3 text-sm">
                                <FooterLink to="/about">About Us</FooterLink>
                                <FooterLink to="/careers">Careers</FooterLink>
                                <FooterLink to="/press">Press</FooterLink>
                                <FooterLink to="/contact">Contact</FooterLink>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm tracking-wider uppercase text-gray-800 dark:text-gray-200 mb-4">Support</h4>
                            <ul className="space-y-3 text-sm">
                                <FooterLink to="/help">Help Center</FooterLink>
                                <FooterLink to="/faq">FAQs</FooterLink>
                                <FooterLink to="/privacy">Privacy Policy</FooterLink>
                                <FooterLink to="/terms">Terms of Service</FooterLink>
                            </ul>
                        </div>
                    </div>

                    
                    <div className="lg:col-span-3">
                        <h4 className="font-semibold text-sm tracking-wider uppercase text-gray-800 dark:text-gray-200 mb-4">
                            Subscribe to our Newsletter
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                            Get the latest deals and travel inspiration sent directly to your inbox.
                        </p>
                        <form action="#" className="flex items-center gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                            />
                            <button
                                type="submit"
                                className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                aria-label="Subscribe"
                            >
                                <FaRegPaperPlane />
                            </button>
                        </form>
                    </div>
                </div>

                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        &copy; {new Date().getFullYear()} EchoNest. All Rights Reserved.
                    </p>
                    <div className="flex gap-4">
                        <SocialLink href="https://facebook.com" icon={FaFacebookF} brandColor="hover:text-white hover:bg-[#1877F2]" />
                        <SocialLink href="https://twitter.com" icon={FaTwitter} brandColor="hover:text-white hover:bg-[#1DA1F2]" />
                        <SocialLink href="https://instagram.com" icon={FaInstagram} brandColor="hover:text-white hover:bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]" />
                        <SocialLink href="https://linkedin.com" icon={FaLinkedinIn} brandColor="hover:text-white hover:bg-[#0A66C2]" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;