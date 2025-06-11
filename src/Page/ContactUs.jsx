import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const ContactUs = () => {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="bg-gray-100 py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Get In Touch
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or need assistance? Our team is here to help. Reach out to us, and we'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-xl shadow-lg p-8 md:p-12">
          
          <motion.div
            className="lg:col-span-5 space-y-8"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold text-gray-800">Contact Information</h3>
            <p className="text-gray-600">
              Fill up the form and our team will get back to you within 24 hours. For urgent queries, feel free to contact us directly through the channels below.
            </p>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12 bg-indigo-600 text-white rounded-lg flex items-center justify-center">
                  <FaPhoneAlt className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-900">(+880) 123 456 7890</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12 bg-indigo-600 text-white rounded-lg flex items-center justify-center">
                  <FaEnvelope className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-900">help@echonest.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12 bg-indigo-600 text-white rounded-lg flex items-center justify-center">
                  <FaMapMarkerAlt className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-900">Chittagong, Bangladesh</p>
                </div>
              </div>
            </div>
          </motion.div>

          
          <motion.div
            className="lg:col-span-7"
            variants={itemVariants}
          >
            <form action="#" method="POST" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="mt-2 block w-full shadow-sm py-3 px-4 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                    placeholder="e.g., John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="font-medium text-gray-700">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="mt-2 block w-full shadow-sm py-3 px-4 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                  <label htmlFor="subject" className="font-medium text-gray-700">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    className="mt-2 block w-full shadow-sm py-3 px-4 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                    placeholder="How can we help?"
                  />
              </div>
              <div>
                <label htmlFor="message" className="font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-2 block w-full shadow-sm py-3 px-4 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                  placeholder="Your message..."
                />
              </div>
              <div className="text-right">
                <motion.button
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="inline-flex justify-center py-3 px-8 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUs;