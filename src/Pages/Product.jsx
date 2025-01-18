import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopContext } from '../Context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../Components/RelatedProducts'

const Product = () => {

  const { productId } = useParams()
  const { products, currency, addTocart } = useContext(shopContext)
  const [data, setaData] = useState(false)
  const [image, setImage] = useState([])
  const [size, setSize] = useState('')

  const fetchProductData = async () => {

    const product = products.find((item) => item._id === productId)
    if (product) {
      setaData(product)
      setImage(product.images[0])
    }
  }


  useEffect(() => {
    fetchProductData()
  }, [productId, products])


  return data ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row '>

        <div className='flex-1 flex flex-col-reverse sm:flex-row gap-3'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {data.images.map((item, index) => {
              return <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-32 sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
            })}
          </div>

          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>



        <div className='flex-1'>
          <h1 className='font-medium text-3xl mt-2'>{data.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className='pl-3'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{data.price}</p>
          <p className='mt-5 text-gray-600 md:w-4/5'>{data.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className='flex gap-2'>
              {data.sizes.map((item, index) => {
                return <button type='button' onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-gray-400' : ''}`} key={index}>{item}</button>
              })}
            </div>
          </div>
          <button onClick={()=>addTocart(data._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-900'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm  text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% orginal product</p>
            <p>cash on delivery is available</p>
            <p>Easy return and exchange policy in 7 days</p>
          </div>
        </div>
      </div>


      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm '>Description</b>
          <p className='border px-5 py-3 text-sm'>
            Reviews (122)
          </p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
        </div>
      </div>

      <RelatedProducts category={data.category} subcategory={data.subcategory}/>

    </div>
  )
    : <div className='opacity-0'></div>
}

export default Product