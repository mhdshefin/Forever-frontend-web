import React from 'react'
import { ClipLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className='w-full h-screen bg-[#ffffff91] flex items-center justify-center fixed z-50'>
        <ClipLoader color="tomato" size={70}/>
    </div>
  )
}

export default Spinner