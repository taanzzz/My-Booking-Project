import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosSecure from "../Axios/Axios";

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axiosSecure.get("/reviews")
      .then((res) => {
        const sorted = res.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6);
        setReviews(sorted);
      })
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  const settings = {
    dots: true,
    infinite: reviews.length > 3,
    speed: 600,
    slidesToShow: reviews.length >= 3 ? 3 : reviews.length,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="py-12 px-4 mb-3">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100">
        What Our Guests Say
      </h2>
      {reviews.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No reviews yet.</p>
      ) : (
        <Slider {...settings}>
          {reviews.map((r) => (
            <div key={r._id} className="px-4">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg h-full">
                <div className="flex items-center mb-3">
                  {r.userPhoto ? (
                    <img
                      src={r.userPhoto}
                      alt={r.username}
                      className="w-10 h-10 rounded-full mr-3 object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3" />
                  )}
                  <div>
                    <h4 className="text-lg font-semibold">{r.username}</h4>
                    <p className="text-sm text-gray-500">{r.userEmail}</p>
                  </div>
                </div>
                <div className="text-yellow-500 text-xl mb-2">
                  {"⭐".repeat(r.rating)}
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">"{r.comment}"</p>
                <p className="text-xs text-gray-400 mt-4">
                  {new Date(r.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ReviewSlider;
