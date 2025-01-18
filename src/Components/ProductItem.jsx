import React, { useContext, useEffect } from 'react'
import { shopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, images , price, name }) => {

    const { currency } = useContext(shopContext)

    return (
        <div className='hover:scale-105 shadow-md rounded-xl transform transition-transform duration-300 ease-in-out'>
        <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
            <div className='overflow-hidden '>
                <img src={images[0]} className='rounded-t-xl' alt="" />
                <div className='p-3'>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>{currency}{price}</p>
                </div>
            </div>
        </Link>
        </div>
    )
}

export default ProductItem