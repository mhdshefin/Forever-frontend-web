import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const shopContext = createContext();

const shopContextProvider = (props) => {

    const currency = '₹';
    const delivery_fee = 10;
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartitems, setCartitems] = useState({});
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    const [token, setToken] = useState('')
    const [loading, setLoading] = useState(true)

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const fetchAllProduct = async () => {
        try {
            setLoading(true)
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products)
                setLoading(false)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }


    const addTocart = async (itemId, size) => {


        if (!size) {
            toast.error("Select Product size")
            return
        }
        let cartData = structuredClone(cartitems)

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1
        }
        setCartitems(cartData)

        if (token) {
            try {
                console.log(token);

                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getUsercart = async (token) => {
        try {
            setLoading(true)
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
            if (response.data.success) {
                setCartitems(response.data.cartData)
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const updateCartProducts = async (itemId, size, quantity) => {

        const cartData = structuredClone(cartitems)

        cartData[itemId][size] = quantity;

        setCartitems(cartData)

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getTotalcartAmount = () => {
        let totalAmount = 0;

        for (const items in cartitems) {
            const itemInfo = products.find((product) => product._id === items)
            for (const item in cartitems[items]) {
                try {
                    if (cartitems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartitems[items][item]
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount
    }

    const getCartCount = () => {

        let totalCount = 0;

        for (const items in cartitems) {
            for (const item in cartitems[items]) {
                try {
                    if (cartitems[items][item] > 0) {
                        totalCount += cartitems[items][item]
                    }
                } catch (error) {

                }
            }


        }
        return totalCount;
    }


    useEffect(() => {
        setToken(localStorage.getItem("token"))
        getUsercart(localStorage.getItem("token"))
        fetchAllProduct()
    }, [])

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setToken,
        token,
        setSearch,
        showSearch,
        setShowSearch,
        cartitems,
        addTocart,
        getCartCount,
        updateCartProducts,
        getTotalcartAmount,
        navigate,
        backendUrl,
        setCartitems,
        loading
    }
    return (
        <shopContext.Provider value={value}>
            {props.children}
        </shopContext.Provider>
    )
}

export default shopContextProvider