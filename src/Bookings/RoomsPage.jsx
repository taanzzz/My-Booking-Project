import React, { useEffect, useState } from "react";
import axiosSecure from "./../Axios/Axios"; 
import {FaArrowRight,FaThLarge,FaList,FaDollarSign,FaTimesCircle} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";


const badgeColors = {
  price: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
  location: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300",
  guests: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300",
};


const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-40">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full"
    />
  </div>
);


const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState("card"); 

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    
    const url = `/rooms?${params.toString()}`;

    
    const timer = setTimeout(() => {
        axiosSecure
        .get(url)
        .then((res) => {
          setRooms(res.data);
        })
        .catch((error) => console.error("Error fetching rooms:", error))
        .finally(() => setLoading(false));
    }, 500); 

    return () => clearTimeout(timer);
  }, [minPrice, maxPrice]);

  const handleClearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-3">
            Discover Your Perfect Room
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Filter by price and find the ideal space for your stay.
          </p>
        </header>

        
        <div className="sticky top-0 z-10 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm mb-8 py-4">
             <div className="flex flex-col md:flex-row gap-4 justify-between items-center p-4 bg-white dark:bg-gray-800/60 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <div className="relative w-full">
                        <FaDollarSign className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"/>
                        <input
                            type="number"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                    </div>
                    <div className="relative w-full">
                         <FaDollarSign className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"/>
                        <input
                            type="number"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                    </div>
                     {(minPrice || maxPrice) && (
                        <button
                            onClick={handleClearFilters}
                            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                            aria-label="Clear filters"
                        >
                            <FaTimesCircle />
                            <span className="sm:hidden">Clear</span>
                        </button>
                    )}
                </div>

                <div className="flex-shrink-0 flex gap-2 p-1 bg-gray-200 dark:bg-gray-700 rounded-lg">
                    <button
                        onClick={() => setLayout("card")}
                        aria-label="Card view"
                        className={`p-2 rounded-md text-xl transition-colors ${layout === "card" ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-white shadow-sm" : "text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600"}`}
                    >
                        <FaThLarge />
                    </button>
                    <button
                        onClick={() => setLayout("table")}
                        aria-label="Table view"
                        className={`p-2 rounded-md text-xl transition-colors ${layout === "table" ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-white shadow-sm" : "text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600"}`}
                    >
                        <FaList />
                    </button>
                </div>
            </div>
        </div>


        
        {loading ? (
          <LoadingSpinner />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={layout}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {layout === "card" ? (
                
                <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {rooms.map((room) => (
                    <motion.div
                      key={room._id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ y: -8 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden group"
                    >
                      <div className="h-56 w-full overflow-hidden">
                        <img
                          src={room.image}
                          alt={room.name}
                          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                        />
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{room.name}</h2>
                        <div className="flex flex-wrap gap-2 mb-4">
                           <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold text-xs ${badgeColors.location}`}>
                                <MdLocationOn /> {room.location}
                           </span>
                           <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold text-xs ${badgeColors.guests}`}>
                                <BsPeopleFill /> {room.maxGuests} Guests
                           </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-5 flex-grow text-sm leading-relaxed">{room.description || "No description available."}</p>
                        <div className="mt-auto flex justify-between items-center">
                            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                                ${room.price}<span className="text-sm font-normal text-gray-500 dark:text-gray-400">/night</span>
                            </p>
                            <Link
                              to={`/rooms/${room._id}`}
                              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 transition-all duration-300 transform hover:scale-105"
                            >
                              Details <FaArrowRight />
                            </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
               
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-100 dark:bg-gray-700/50 text-xs text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      <tr>
                        <th scope="col" className="px-6 py-4">Room</th>
                        <th scope="col" className="px-6 py-4 hidden md:table-cell">Location</th>
                        <th scope="col" className="px-6 py-4 text-center hidden sm:table-cell">Max Guests</th>
                        <th scope="col" className="px-6 py-4 text-right">Price/Night</th>
                        <th scope="col" className="px-1 py-4"><span className="sr-only">Details</span></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {rooms.map((room) => (
                        <tr key={room._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                            <div className="flex items-center gap-4">
                               <img src={room.image} alt={room.name} className="w-20 h-14 object-cover rounded-md hidden sm:block" />
                               <div className="flex flex-col">
                                    <span>{room.name}</span>
                                    <span className="md:hidden text-xs text-gray-500">{room.location}</span>
                               </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 hidden md:table-cell">{room.location}</td>
                          <td className="px-6 py-4 text-center hidden sm:table-cell">{room.maxGuests}</td>
                          <td className="px-6 py-4 text-right font-semibold text-emerald-600 dark:text-emerald-400">${room.price}</td>
                          <td className="px-6 py-4 text-right">
                            <Link
                              to={`/rooms/${room._id}`}
                              className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {!loading && rooms.length === 0 && (
          <div className="text-center py-24">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">No Rooms Found</h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400">Try adjusting your price filters or check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomsPage;