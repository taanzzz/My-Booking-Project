import React from 'react';
import { motion } from 'framer-motion';
import { FiGlobe, FiHeart } from 'react-icons/fi';

const MissionStatement = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 py-20 sm:py-24">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl mx-auto px-4 text-center"
            >
               
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                        <FiGlobe className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                    </div>
                </div>

               
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900 dark:text-white">
                    Your Perfect Stay, Just a Click Away
                </h2>

                
                <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed">
                    At EchoNest, our mission is to simplify how you discover and book accommodations worldwide. We bring together a curated collection of quality hotels, resorts, and suites onto one secure and easy-to-use platform. Forget the hassle of searching across multiple sites. With verified reviews and a seamless booking process, your next perfect getaway is right at your fingertips.
                </p>

                
                <div className="flex justify-center mt-8">
                    <FiHeart className="h-8 w-8 text-gray-300 dark:text-gray-600" />
                </div>
            </motion.div>
        </div>
    );
};

export default MissionStatement;