import React, { useEffect, useState } from "react";
import axiosSecure from './../Axios/Axios';
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const badgeColors = {
  price: "bg-green-100 text-green-800",
  location: "bg-blue-100 text-blue-800",
  guests: "bg-purple-100 text-purple-800",
};

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axiosSecure.get("/rooms").then((res) => setRooms(res.data));
  }, []);

  return (
    <div className="p-6  bg-gradient-to-br from-[#f4f8ff] via-[#e7f0fb] to-[#f9fbff] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a]">

      <h1 className="text-4xl font-extrabold mb-10 text-gray-900 text-center">
        Available Rooms
      </h1>

      <div className="grid gap-8 md:grid-cols-3">
        {rooms.map((room) => (
          <motion.div
            key={room._id}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col overflow-hidden"
          >
            
            <div className="h-48 w-full overflow-hidden rounded-t-xl">
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{room.name}</h2>

              <div className="flex flex-wrap gap-3 mb-6">
                <span
                  className={`px-3 py-1 rounded-full font-semibold text-sm ${badgeColors.price}`}
                >
                  Price: ${room.price}
                </span>

                <span
                  className={`px-3 py-1 rounded-full font-semibold text-sm ${badgeColors.location}`}
                >
                  Location: {room.location}
                </span>

                <span
                  className={`px-3 py-1 rounded-full font-semibold text-sm ${badgeColors.guests}`}
                >
                  Max Guests: {room.maxGuests}
                </span>
              </div>

              <Link
              to={`/rooms/${room._id}`}
             className="mt-auto inline-flex items-center justify-center gap-2 
             bg-gradient-to-r from-indigo-500 to-purple-600 
             hover:from-purple-600 hover:to-indigo-500 
             text-white font-semibold rounded-lg px-5 py-3 transition duration-300"
>
             View Details <FaArrowRight />
            </Link>

            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RoomsPage;
