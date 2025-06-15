import React from 'react';
import { motion } from 'framer-motion';
import { FaGlobeAmericas, FaTags, FaShieldAlt, FaHeadset } from 'react-icons/fa';


const features = [
  {
    id: 1,
    icon: <FaGlobeAmericas className="w-6 h-6" />,
    title: "Unmatched Global Coverage",
    description: "Explore and book from over 1.5 million properties across 220+ countries.From luxury city hotels to secluded beach villas,your perfect stay is just a click away."
  },
  {
    id: 2,
    icon: <FaTags className="w-6 h-6" />,
    title: "Guaranteed Best Prices",
    description: "We work tirelessly to bring you the best available rates.If you find a lower price for the same room on another platform,we'll match it. No questions asked."
  },
  {
    id: 3,
    icon: <FaShieldAlt className="w-6 h-6" />,
    title: "Secure and Trusted Platform",
    description: "Your privacy and security are our top priorities.We use industry-leading encryption and secure payment gateways to ensure your data is always protected."
  },
  {
    id: 4,
    icon: <FaHeadset className="w-6 h-6" />,
    title: "24/7 Dedicated Support",
    description: "Have a question or need assistance with your booking? Our global customer support team is available around the clock via chat,email or phone to help you."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="bg-base-200 py-20 lg:py-28">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-extrabold mb-4">Your Journey,Perfectly Planned</h2>
          <p className="text-lg text-base-content/80 max-w-3xl mx-auto">
            We don't just offer accommodations;we provide a seamless,secure and supportive booking experience from start to finish.
          </p>
        </div>

       
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
         
          <motion.div
            className="w-full h-80 lg:h-full rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <img 
              src="https://i.ibb.co/B8P5SMG/20250610-031938.jpg" 
              alt="Luxurious hotel lobby"
              loading="lazy"
              className="w-full h-full "
            />
          </motion.div>

          
          <motion.div 
            className="flex flex-col gap-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.2 }}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                className="flex items-start gap-4"
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } }
                }}
              >
                <div className="flex-shrink-0 bg-primary/10 text-primary rounded-full p-3">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{feature.title}</h3>
                  <p className="text-base-content/80">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;