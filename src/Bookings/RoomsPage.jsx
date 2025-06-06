import React, { useEffect, useState } from "react";
import axiosSecure from './../Axios/Axios';
import { Link } from "react-router";


const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axiosSecure.get("/rooms").then((res) => setRooms(res.data));
  }, []);

  return (
    <div className="p-4 grid md:grid-cols-3 gap-4">
      {rooms.map((room) => (
        <div key={room._id} className="border p-4 rounded shadow">
          <img src={room.image} alt={room.name} className="w-full h-48  rounded" />
          <h2 className="text-xl font-semibold mt-2">{room.name}</h2>
          <p className="text-sm">Price: ${room.price}</p>
          <Link
            to={`/rooms/${room._id}`}
            className="mt-2 inline-block text-green-600 hover:underline"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RoomsPage;