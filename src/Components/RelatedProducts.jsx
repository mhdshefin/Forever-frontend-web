import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../Context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProducts = ({ category, subcategory }) => {

    const { products } = useContext(shopContext)
    const [related, setRelated] = useState([])

    useEffect(() => {

        if (products.length > 0) {

            let productsCopy = products.slice();

            productsCopy = productsCopy.filter((item) => item.category === category)
            productsCopy = productsCopy.filter((item) => item.subcategory === subcategory)

            setRelated(productsCopy.slice(0, 10))
        }
    }, [products])
    return (
        <div className='my-24'>
            <div className='text-center text-3xl py-2'>
                <Title text1={'RELATED'} text2={'PRODUCTS'} />
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-4 gap-y-6'>
                {related.map((item, index) => {
                    return <div key={index} onClick={window.scrollTo(0,0)}><ProductItem   id={item._id} name={item.name} price={item.price} images={item.images} /></div>
                })}
            </div>
        </div>
    )
}

export default RelatedProducts