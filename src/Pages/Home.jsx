import React from 'react'
import Hero from '../Components/Hero'
import LattestCollection from '../Components/LattestCollection'
import BestSeller from '../Components/BestSeller'
import OurPolicy from '../Components/OurPolicy'
import NewsLetter from '../Components/NewsLetter'


const Home = () => {
  return (
    <div>
      <Hero/>
      <LattestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsLetter/>
    </div>
  )
}

export default Home