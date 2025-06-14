import React from 'react'
import HotelSlider from '../HomeComponents/HotelSlider'
import ReviewSlider from '../HomeComponents/ReviewSlider'
import FeaturedRooms from '../HomeComponents/FeaturedRooms'
import WhyChooseUs from '../HomeComponents/WhyChooseUs'
import FeaturedDestinations from '../HomeComponents/FeaturedDestinations'
import OfferModal from '../HomeComponents/OfferModal'
import StatsCounter from '../HomeComponents/StatsCounter'
import GalleryPage from '../Page/GalleryPage'



const Home = () => {
  return (
    <div className=''>
      <OfferModal></OfferModal>
     <HotelSlider></HotelSlider>
     <ReviewSlider></ReviewSlider>
     <FeaturedRooms></FeaturedRooms>
     <WhyChooseUs></WhyChooseUs>
     <StatsCounter></StatsCounter>
     <GalleryPage></GalleryPage>
     <FeaturedDestinations></FeaturedDestinations>
    </div>
  )
}

export default Home

