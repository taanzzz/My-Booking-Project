import React from 'react'
import HotelSlider from '../HomeComponents/HotelSlider'
import ReviewSlider from '../HomeComponents/ReviewSlider'
import FeaturedRooms from '../HomeComponents/FeaturedRooms'
import WhyChooseUs from '../HomeComponents/WhyChooseUs'
import FeaturedDestinations from '../HomeComponents/FeaturedDestinations'
import InternationalShowcase from '../HomeComponents/InternationalShowcase'
import OfferModal from '../HomeComponents/OfferModal'


const Home = () => {
  return (
    <div className=''>
      <OfferModal></OfferModal>
     <HotelSlider></HotelSlider>
     <ReviewSlider></ReviewSlider>
     <FeaturedRooms></FeaturedRooms>
     <WhyChooseUs></WhyChooseUs>
     <FeaturedDestinations></FeaturedDestinations>
     <InternationalShowcase></InternationalShowcase>
    </div>
  )
}

export default Home

