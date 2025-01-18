import React from 'react'
import { assets } from '../assets/assets'


const Hero = () => {
  return (
    <div className='w-full relative'>

      <img className='rounded-xl w-full mt-5' src={assets.hero} alt="" />
      {/* header left */}

      <div className='w-1/2 flex items-center justify-center py-10 sm:py-0 absolute inset-0'>
        <div className='text-[#414141]'>
          <div className='flex items-center gap-2'>
            <p className='w-3 md:w-11 h-[1px] md:h-[2px] bg-[#414141]'></p>
            <p className=' sm:text-sm font-medium text-[15px] text-base++1 md:text-1.5xl mt-2'>OUR BESTSELLER</p>
          </div>
          <h1 className='prata-regular text-[25px]  md:text-5xl lg:text-6xl leading-relaxed'>Latest Arrivals</h1>
          <div className='flex items-center gap-2'>
            <p className='sm:text-sm font-medium text-[15px] text-base++1 md:text-1.5xl mt-2'>SHOP NOW</p>
            <p className='w-3 md:w-11 h-[1px] md:h-[2px] bg-[#414141] mt-2'></p>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Hero