import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../Context/ShopContext'
import Title from '../Components/Title'
import ProductItem from '../Components/ProductItem'


const LattestCollection = () => {

    const [latestProduct, setLatestProducts] = useState([])
    const { products } = useContext(shopContext)


    useEffect(() => {
        setLatestProducts(products.slice(0, 10))
    }, [products])

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'LATEST'} text2={'COLLECTION'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                </p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {latestProduct.map((item,index)=>{
                  return <ProductItem key={index} id={item._id} name={item.name} price={item.price} images={item.images} />
                })}
            </div>
        </div>
    )
}

export default LattestCollection