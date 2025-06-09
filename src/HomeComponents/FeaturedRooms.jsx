import { useEffect, useState } from "react";
import axiosSecure from "../Axios/Axios";
import {  Star } from "lucide-react";
import { Link } from "react-router";




const FeaturedRooms = () => {
  const [featuredRooms, setFeaturedRooms] = useState([]);

  useEffect(() => {
    axiosSecure.get(`/rooms/featured/top-rated`)
      .then(res => setFeaturedRooms(res.data))
      .catch(err => console.error("Error fetching featured rooms:", err));
  }, []);

  return (
    <section className="my-12 px-4 md:px-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
        🌟 Our Top-Rated Rooms
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredRooms.map(room => (
          <div key={room._id} className="rounded-xl shadow-lg border p-4 bg-white hover:shadow-xl transition duration-300">
            <img
              src={room.image}
              alt={room.name}
              className="rounded-lg w-full h-52 object-cover mb-4"
            />
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">{room.name}</h3>
              <div className="flex items-center text-yellow-500">
                <Star size={18} />
                <span className="ml-1 font-medium">{room.rating}</span>
              </div>
            </div>
            <p className="text-gray-600 my-2">{room.description.slice(0, 100)}...</p>
            <p className="font-semibold text-green-600">${room.price} / night</p>
            <Link
                to={`/rooms/${room._id}`}
                className="btn btn-sm px-5 mt-1 py-2 bg-gradient-to-r from-pink-500 to-rose-600 
             hover:from-rose-600 hover:to-pink-500 
             text-white font-semibold rounded-lg shadow-lg 
             transition duration-300 border border-pink-600 outline-none focus:outline-none"
>
                Details 
              </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedRooms;
