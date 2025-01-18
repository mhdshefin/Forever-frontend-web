import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../Context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {

    const { products } = useContext(shopContext)
    const [bestSeller, setBestSeller] = useState([])

    const deviceWidth = window.innerWidth;

    useEffect(() => {
        const bestProduct = products.filter((item) => item.bestSeller)
        
        console.log(bestProduct);
        if (deviceWidth < 640) {
            setBestSeller(bestProduct.slice(0, 4))
        } else {
            setBestSeller(bestProduct.slice(0, 5))
        }
        
    }, [products])


    return (
        <div className='my-5'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'BEST'} text2={'SELLER'} />
                <p className='e-3/4 m-auto text-xs sm:text-sm md:text-base'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.
                </p>
            </div>
            < div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    bestSeller.map((item, index) => {
                        return <ProductItem key={index} name={item.name} price={item.price} images={item.images} id={item._id} />
                    })
                }
            </div>
        </div>
    )
}

export default BestSeller