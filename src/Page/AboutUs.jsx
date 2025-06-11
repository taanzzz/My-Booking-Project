import React from 'react';
import { motion } from 'framer-motion';
import { FaBullseye, FaRegLightbulb, FaUsers } from 'react-icons/fa';


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
  }
];


const AboutUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeInOut' } },
  };
  
  const cardHoverEffect = {
    hover: {
      scale: 1.05,
      boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="bg-white">
      
      <motion.div
        className="bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            About <span className="text-indigo-600">EchoNest</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-600">
            Connecting you to unforgettable stays and seamless travel experiences across the globe.
          </p>
        </div>
      </motion.div>

     
      <div className="py-20 sm:py-28">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="text-center" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Story</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-4xl mx-auto">
              EchoNest was born from a passion for travel and a desire to make booking accommodations simpler, more secure, and genuinely enjoyable. We noticed a gap between travelers and the perfect places to stay. Our journey began with a simple mission: to bridge that gap with technology, trust, and a touch of human care. Today, EchoNest stands as a testament to that vision, offering millions of properties and ensuring every journey is perfectly planned.
            </p>
          </motion.div>
          
          
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div variants={itemVariants} whileHover="hover" className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-600 text-white mx-auto mb-6">
                <FaBullseye className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Our Mission</h3>
              <p className="text-gray-600 text-center">
                To provide a seamless, secure, and supportive booking platform that empowers travelers to explore the world with confidence and ease.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} whileHover="hover" className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-600 text-white mx-auto mb-6">
                <FaRegLightbulb className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Our Vision</h3>
              <p className="text-gray-600 text-center">
                To be the world's most trusted and traveler-centric booking platform, creating a global community connected by memorable experiences.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      
      <div className="bg-gray-100 py-20 sm:py-28">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Meet Our Team</h2>
            <p className="mt-4 text-lg text-gray-600">The passionate minds behind EchoNest</p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="text-center"
                variants={itemVariants}
                whileHover="hover"
              >
                <motion.div variants={cardHoverEffect} className="bg-white rounded-lg shadow-md p-6">
                  <img
                    className="mx-auto h-32 w-32 rounded-full object-cover"
                    src={member.imageUrl}
                    alt={member.name}
                  />
                  <h3 className="mt-6 text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-indigo-600">{member.role}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      
      <div className="bg-indigo-700">
        <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to Start Your Journey?
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            Explore our vast selection of rooms and find your perfect stay today.
          </p>
          <motion.a
            href="/rooms"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
          >
            Explore Rooms
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;