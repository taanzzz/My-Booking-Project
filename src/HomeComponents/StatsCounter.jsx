import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

const stats = [
  {
    id: 1,
    lottiePath: "/earth.json",
    label: "Countries Served",
    value: 75,
    suffix: "+",
    duration: 3,
  },
  {
    id: 2,
    lottiePath: "/room.json",
    label: "Luxury Rooms",
    value: 1250,
    suffix: "+",
    duration: 4,
  },
  {
    id: 3,
    lottiePath: "/visitor.json",
    label: "Daily Visitors",
    value: 15000,
    suffix: "+",
    duration: 5,
  },
  {
    id: 4,
    lottiePath: "/happy.json",
    label: "Happy Guests",
    value: 98000,
    suffix: "+",
    duration: 6,
  },
  {
    id: 5,
    lottiePath: "/booked.json",
    label: "Bookings Completed",
    value: 320000,
    suffix: "+",
    duration: 7,
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.2, duration: 0.8 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const StatsCounter = () => {
  const [lottieData, setLottieData] = useState({});

  useEffect(() => {
    const loadLotties = async () => {
      const dataMap = {};
      for (const stat of stats) {
        const res = await fetch(stat.lottiePath);
        const json = await res.json();
        dataMap[stat.id] = json;
      }
      setLottieData(dataMap);
    };

    loadLotties();
  }, []);

  return (
    <section className="bg-gradient-to-br from-[#f5faff] via-[#e0f4ff] to-[#e0fbfc] py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#023047]">
          Trusted Worldwide by Thousands
        </h2>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          EchoNest offers premium hospitality across the globe with seamless
          booking, exceptional comfort, and unforgettable stays.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            className="bg-white rounded-3xl shadow-lg py-8 px-6 flex flex-col items-center hover:shadow-xl transition duration-300"
            variants={itemVariants}
          >
            <div className="w-24 h-24 mb-4">
              {lottieData[stat.id] ? (
                <Lottie animationData={lottieData[stat.id]} loop={true} />
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <h3 className="text-3xl font-bold text-[#0a2a42]">
              <CountUp
                end={stat.value}
                duration={stat.duration}
                suffix={stat.suffix}
                useEasing={true}
                enableScrollSpy
                scrollSpyDelay={300}
              />
            </h3>
            <p className="text-md text-gray-500 mt-2 font-medium">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default StatsCounter;
