import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaGlobeAmericas, FaStar, FaCheckCircle } from "react-icons/fa";
import { format } from "date-fns";
import { useTheme } from "next-themes";
import clsx from "clsx";

const hotels = [
  {
    country: "Japan",
    name: "Kyoto Zen Retreat",
    rating: 4.9,
    description:
      "Immerse yourself in the tranquil beauty of traditional Japan with views of cherry blossoms, serene gardens, and onsen hot springs.",
    image:
      "https://images.unsplash.com/photo-1600047508610-4ca8e6f74e65?auto=format&fit=crop&w=1200&q=80",
  },
  {
    country: "France",
    name: "Parisian Luxury Suites",
    rating: 4.8,
    description:
      "Stay in the heart of Paris with Eiffel Tower views, opulent interiors, and unmatched gourmet experiences.",
    image:
      "https://images.unsplash.com/photo-1582719478250-04b2b82c62aa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    country: "Brazil",
    name: "Amazon Rainforest Eco-Lodge",
    rating: 4.7,
    description:
      "Explore the vibrant biodiversity of the Amazon while staying in an eco-conscious lodge offering guided jungle treks.",
    image:
      "https://images.unsplash.com/photo-1562004760-aceed7bbfa6e?auto=format&fit=crop&w=1200&q=80",
  },
];

const HotelCard = ({ hotel, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const animation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: index * 0.2 } },
  };

  return (
    <motion.div
      ref={ref}
      variants={animation}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="bg-white dark:bg-zinc-900 shadow-xl rounded-2xl overflow-hidden w-full max-w-sm mx-auto"
    >
      <img
        src={hotel.image}
        alt={hotel.name}
        className="w-full h-56 object-cover"
        loading="lazy"
      />
      <div className="p-5 space-y-2">
        <h3 className="text-xl font-semibold dark:text-white flex items-center gap-2">
          <FaGlobeAmericas className="text-green-500" /> {hotel.country}
        </h3>
        <h4 className="text-lg font-bold dark:text-white">{hotel.name}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {hotel.description}
        </p>
        <div className="flex items-center gap-1 text-yellow-400">
          <FaStar /> <span className="text-black dark:text-white">{hotel.rating}</span>
        </div>
        <button className="mt-2 bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full shadow hover:scale-105 transition-transform">
          Explore Now
        </button>
      </div>
    </motion.div>
  );
};

const InternationalShowcase = () => {
  const { theme } = useTheme();
  const today = format(new Date(), "MMMM d, yyyy");

  return (
    <section className={clsx("py-16 px-4 md:px-20 transition-colors duration-500", theme === "dark" ? "bg-zinc-950" : "bg-gray-50")}>      
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl font-bold text-center mb-12 dark:text-white"
      >
        🌍 Explore World-Class Hotels — Curated for You
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-10">
        {hotels.map((hotel, i) => (
          <HotelCard key={hotel.name} hotel={hotel} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="mt-16 text-center text-sm text-gray-600 dark:text-gray-400"
      >
        <FaCheckCircle className="inline-block text-green-500 mr-1" /> Updated: {today}
      </motion.div>
    </section>
  );
};

export default InternationalShowcase;
