import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';

const ContactUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const contactInfo = [
    {
      icon: FaPhoneAlt,
      text: '(+880) 123 456 7890',
      href: 'tel:+8801234567890',
    },
    {
      icon: FaEnvelope,
      text: 'help@echonest.com',
      href: 'mailto:help@echonest.com',
    },
    {
      icon: FaMapMarkerAlt,
      text: 'Chittagong, Bangladesh',
      href: '#', 
    },
  ];

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-blue-50 to-sky-100 dark:from-gray-900 dark:to-blue-900/20"></div>
      
      <motion.div
        className="relative max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Get In Touch
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions or need assistance? Our team is here to help. Reach out, and we'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white/60 dark:bg-gray-800/40 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/80 dark:border-gray-700/60">
          
          <motion.div
            className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between"
            variants={itemVariants}
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Information</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
                Fill up the form and our team will get back to you within 24 hours. For urgent queries, feel free to use the details below.
              </p>
              <div className="mt-8 space-y-6">
                {contactInfo.map((item, index) => (
                  <a key={index} href={item.href} className="flex items-center group">
                    <div className="flex-shrink-0 h-12 w-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-lg font-medium text-gray-900 dark:text-gray-100 transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">{item.text}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
             <div className="mt-12 hidden lg:block text-center">
                 <p className="text-6xl font-black text-gray-100 dark:text-gray-700/50 select-none">
                    EchoNest
                 </p>
            </div>
          </motion.div>

          
          <motion.div
            className="lg:col-span-7 bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-r-2xl"
            variants={itemVariants}
          >
            <form action="#" method="POST" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text" name="name" id="name" required
                    className="block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:border-blue-500 transition-all"
                    placeholder="e.g., John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                  <input
                    id="email" name="email" type="email" required
                    className="block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:border-blue-500 transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                <input
                  type="text" name="subject" id="subject" required
                  className="block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:border-blue-500 transition-all"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea
                  id="message" name="message" rows={4} required
                  className="block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:border-blue-500 transition-all"
                  placeholder="Your message..."
                />
              </div>
              <div className="text-right">
                <motion.button
                  whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 py-3 px-8 border border-transparent rounded-lg shadow-lg text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-blue-500 transition-all"
                >
                  <span>Send Message</span>
                  <FiSend />
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