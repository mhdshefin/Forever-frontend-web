import React, { useContext, useEffect } from 'react'
import { shopContext } from '../Context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {

    const { navigate, token, setCartitems, backendUrl } = useContext(shopContext)
    const [searchParams, setSearchParamas] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifryStripe = async () => {
        try {
            if (!token) {
                return null
            }

            const response = await axios.post(backendUrl + '/api/order/verifyStripe', { success, orderId }, { headers: { token } })
            if (response.data.success) {
                setCartitems({})
                navigate('/order')
            } else {
                navigate('/cart')
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        verifryStripe()
    }, [token])
    return (
        <div>

        </div>
    )
}

export default Verify