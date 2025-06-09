import React from 'react'
import HotelSlider from '../HomeComponents/HotelSlider'
import ReviewSlider from '../HomeComponents/ReviewSlider'
import FeaturedRooms from '../HomeComponents/FeaturedRooms'
import WhyChooseUs from '../HomeComponents/WhyChooseUs'
import FeaturedDestinations from '../HomeComponents/FeaturedDestinations'
const Home = () => {
  return (
    <div className=''>
     <HotelSlider></HotelSlider>
     <ReviewSlider></ReviewSlider>
     <FeaturedRooms></FeaturedRooms>
     <WhyChooseUs></WhyChooseUs>
     <FeaturedDestinations></FeaturedDestinations>
     
    </div>
  )
}

export default Home

