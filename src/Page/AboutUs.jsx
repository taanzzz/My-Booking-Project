import React from 'react';
import { motion } from 'framer-motion';
import { FaBullseye, FaRegLightbulb } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router';


const teamMembers = [
  {
    name: 'Jane Doe',
    role: 'Founder & CEO',
    imageUrl: 'https://i.ibb.co/ycJFRJgs/20250611-101346.jpg',
  },
  {
    name: 'John Smith',
    role: 'Head of Operations',
    imageUrl: 'https://i.ibb.co/ycByc79z/20250611-101309.jpg',
  },
  {
    name: 'Porosh Islam Tarek',
    role: 'Lead Developer',
    imageUrl: 'https://i.ibb.co/HD6NSCPV/20250611-101215.jpg',
  },
  {
    name: 'Nanjiba Saraf',
    role: 'Assistant Developer',
    imageUrl: 'https://i.ibb.co/Y7Fzk8Vq/20250611-100938.jpg',
  },
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
};

const AboutUs = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      
      <motion.div
        className="relative bg-gray-50 dark:bg-gray-800/50 py-24 sm:py-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-sky-50 dark:from-gray-900 dark:via-gray-800/80 dark:to-blue-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            About <span className="text-blue-600 dark:text-blue-400">EchoNest</span>
          </motion.h1>
          <motion.p
            className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            Connecting you to unforgettable stays and seamless travel experiences across the globe.
          </motion.p>
        </div>
      </motion.div>

      
      <motion.section
        className="py-20 sm:py-28"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              EchoNest was born from a passion for travel and a desire to make booking accommodations simpler, more secure, and genuinely enjoyable. We noticed a gap between travelers and the perfect places to stay. Our journey began with a simple mission: to bridge that gap with technology, trust, and a touch of human care. Today, EchoNest stands as a testament to that vision, offering millions of properties and ensuring every journey is perfectly planned.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="hidden md:block relative w-full h-80 rounded-2xl bg-gradient-to-br from-blue-400 to-sky-500 shadow-2xl">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-300 rounded-full opacity-80"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-rose-400 rounded-2xl opacity-80 transform rotate-12"></div>
          </motion.div>
        </div>
      </motion.section>

      
       <section className="bg-gray-50 dark:bg-gray-800/50 py-20 sm:py-28">
        <motion.div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 mx-auto mb-6">
                        <FaBullseye className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">Our Mission</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                        To provide a seamless, secure, and supportive booking platform that empowers travelers to explore the world with confidence and ease.
                    </p>
                </motion.div>
                <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-300 mx-auto mb-6">
                        <FaRegLightbulb className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">Our Vision</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                        To be the world's most trusted and traveler-centric booking platform, creating a global community connected by memorable experiences.
                    </p>
                </motion.div>
            </div>
        </motion.div>
    </section>

     
      <section className="bg-white dark:bg-gray-900 py-20 sm:py-28">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Meet Our Team</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">The passionate minds behind EchoNest</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                className="group relative rounded-2xl overflow-hidden shadow-xl"
                variants={itemVariants}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
              >
                <img
                  className="w-full h-96 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                  src={member.imageUrl}
                  alt={member.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 p-6 text-white transition-all duration-300">
                  <h3 className="text-2xl font-bold">{member.name}</h3>
                  <p className="text-blue-300 text-sm font-semibold tracking-wide uppercase">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      
      <section className="bg-blue-600 dark:bg-blue-700">
        <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl font-extrabold text-white sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            Ready to Start Your Journey?
          </motion.h2>
          <motion.p
            className="mt-4 text-lg leading-6 text-blue-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Explore our vast selection of rooms and find your perfect stay today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
             <Link to="/rooms">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white"
                >
                  Explore Rooms <FiArrowRight/>
                </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;