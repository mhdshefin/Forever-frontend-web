import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../Context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'


const Search = () => {

    const location = useLocation()
    const [visible, setVisible] = useState(false)
    const { Search, setSearch, showSearch, setShowSearch } = useContext(shopContext)

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [location])


    return showSearch && visible ? (
        <div className='text-center'>
            <div className='inline-flex items-center justify-center border border-gray-400 px-5  py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 shadow-md'>
                <input value={Search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search' className='flex-1 outline-none bg-inherit text-sm' />
                <img className='w-4 cursor-pointer' src={assets.search_icon} alt="" />
            </div>
            <img onClick={() => setShowSearch(false)} className='inline w-3 cursor-pointer' src={assets.cross_icon} alt="" />
        </div>
    ) : null
}

export default Search