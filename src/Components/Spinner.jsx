import React from 'react'
import { ClipLoader } from "react-spinners";

const cssOfSpinner = {
  borderWidth: "5px",
}

const Spinner = () => {
  return (
    <div className='w-screen h-screen bg-[#ffffff91] flex items-center justify-center fixed z-50'> 
        <ClipLoader color="tomato" size={window.innerWidth<400?120:150} cssOverride={cssOfSpinner}/>
    </div>
  )
}

export default Spinner