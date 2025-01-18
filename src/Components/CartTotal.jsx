import React, { useContext } from 'react'
import { shopContext } from '../Context/ShopContext'
import Title from './Title'

const CartTotal = () => {

    const { currency, getTotalcartAmount } = useContext(shopContext)
    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>

            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Sub Total</p>
                    <p>{currency}{getTotalcartAmount()}.00</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <b>Total</b>
                    <b>{currency}{getTotalcartAmount() === 0 ? 0 : getTotalcartAmount()}.00</b>
                </div>
            </div>
        </div>
    )
}

export default CartTotal