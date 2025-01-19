import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Cart from './Pages/Cart'
import Collection from './Pages/Collection'
import Contact from './Pages/Contact'
import Login from './Pages/Login'
import Orders from './Pages/Orders'
import Product from './Pages/Product'
import About from './Pages/About'
import PlaceOrder from './Pages/PlaceOrder'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Search from './Components/Search'
import Verify from './Pages/verify'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <Search />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='cart' element={<Cart />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/order' element={<Orders />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/about' element={<About />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      {location.pathname !== '/login' && <Footer />}
    </div>
  )
}

export default App
