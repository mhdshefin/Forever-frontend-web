import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { shopContext } from '../Context/ShopContext'

const Navbar = () => {

    const [visible, setVisible] = useState(false)
    const { setShowSearch, getCartCount, setCartitems, token, setToken, navigate } = useContext(shopContext)

    const logout = () => {
        navigate('/')
        localStorage.removeItem("token")
        setToken("")
        setCartitems({})
    }
    return (
        <div className='flex items-center justify-between py-5 sm:py-3 font-medium'>
            <Link to='/'><img className='sm:w-36 w-24' src={assets.logo} alt="" /></Link>
            <ul className='hidden sm:flex gap-3 sm:gap-12 text-[16px] text-gray-700'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>Home</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    <p>Collection</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p>About</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p>Contact</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>

            <div className='flex items-center gap-6'>
                <Link to='/collection'> <img onClick={() => setShowSearch(true)} className='sm:w-5 w-4 cursor-pointer' src={assets.search_icon} alt="" /></Link>

                <div className='group relative'>
                    <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} className='w-4 sm:w-5 cursor-pointer' alt="" />
                    {
                        token ?
                            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-10'>
                                <div className='flex flex-col w-36 gap-2 py-3 px-5 bg-slate-100 text-gray-500 rounded '>
                                    <p className='cursor-pointer hover:text-black'>My Profile</p>
                                    <p onClick={()=>navigate('/order')} className='cursor-pointer hover:text-black'>Orders</p>
                                    <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                                </div>
                            </div>
                            :
                            null
                    }

                </div>
                <Link to='/cart' className='relative'>
                    <img className='w-4 min-w-4 sm:w-5' src={assets.cart_icon} alt="" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full sm:text-[8px] text-[6px]'>{getCartCount()}</p>
                </Link>
                <img onClick={() => setVisible(true)} className='w-5 cursor-pointer sm:hidden' src={assets.menu_icon} alt="" />
            </div>
            {/*sidebar menu for small screen */}
            <div className={`absolute top-0 bottom-0 overflow-hidden bg-white transition-all right-0 z-20 ${visible ? 'w-1/2' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600 gap-3 border-l border-gray-200 h-[100%] '>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img className='h-4 rotate-180 ' src={assets.dropdown_icon} alt="" />
                        <p >Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} to='/' className='py-2 p-3 hover:bg-gray-100 hover:text-black  '>Home</NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/collection' className='py-2 p-3 hover:bg-gray-100 hover:text-black '>Collections</NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/about' className='py-2 p-3 hover:bg-gray-100 hover:text-black'>About</NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/contact' className='py-2 p-3 hover:bg-gray-100 hover:text-black '>Contact</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar