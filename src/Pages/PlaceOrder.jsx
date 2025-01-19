import React, { useContext, useState } from 'react'
import Title from '../Components/Title'
import CartTotal from '../Components/CartTotal'
import { assets } from '../assets/assets'
import { shopContext } from '../Context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [method, setmethod] = useState('cod')
  const { navigate, backendUrl, token, delivery_fee, cartitems, setCartitems, getTotalcartAmount, products } = useContext(shopContext)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onchangehandler = (e) => {
    const name = e.target.name;
    const value = e.target.value

    setFormData((data) => ({ ...data, [name]: value }))
  }

  const onSubmithandler = async (e) => {
    e.preventDefault()

    try {
      const orderItem = []
      for (const items in cartitems) {
        for (const item in cartitems[items]) {
          if (cartitems[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartitems[items][item]
              orderItem.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItem,
        amount: getTotalcartAmount() + delivery_fee,
      }

      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
          if (response.data.success) {
            setCartitems({})
            navigate('/order')
          }
          else {
            toast.error(response.data.message)
          }
          break;

        case 'stripe':

          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } })
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data
            window.location.replace(session_url)
          }else{
            toast.error(responseStripe.data.message)
          }
          break;

        default:
          break;
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmithandler} className='flex flex-col sm:flex-row justify-between gap-5 pt-5 sm:py-14 min-h-[80vh] border-t'>
      <div className='flex flex-col w-full gap-9 sm:max-w-[480px]'>
        <div className='text-xl my-3 sm:text-2xl'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input onChange={onchangehandler} name='firstName' value={formData.firstName} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name' />
          <input onChange={onchangehandler} name='lastName' value={formData.lastName} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name' />
        </div>

        <input onChange={onchangehandler} name='email' value={formData.email} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Address' />
        <input onChange={onchangehandler} name='street' value={formData.street} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />

        <div className='gap-3 flex'>
          <input onChange={onchangehandler} name='city' value={formData.city} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input onChange={onchangehandler} name='state' value={formData.state} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>

        <div className='gap-3 flex'>
          <input onChange={onchangehandler} name='zipcode' value={formData.zipcode} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
          <input onChange={onchangehandler} name='country' value={formData.country} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
        </div>

        <input onChange={onchangehandler} name='phone' value={formData.phone} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />

      </div>

      <div className='mt-8 '>
        <div className='mt-8 sm:min-w-96 min-w-72'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex justify-between flex-col lg:flex-row min-w-80 gap-3'>

            <div onClick={() => setmethod('stripe')} className='sm:min-w-[45%] max-w-80 flex items-center border gap-3 p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''} `}></p>
              <img className='h-5 mx-1.5' src={assets.stripe_logo} alt="" />
            </div>

            <div onClick={() => setmethod('cod')} className='flex sm:min-w-[45%] max-w-80 items-center border gap-3 p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''} `}></p>
              <p className='text-gray-500 text-sm font-medium mx-1.5'>Cash On delivery</p>
            </div>


          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='text-white bg-black px-16 py-3 text-sm rounded'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder