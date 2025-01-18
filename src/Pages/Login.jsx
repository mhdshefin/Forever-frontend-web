import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../Context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const [currentState, setCurrrentState] = useState('Sign Up')
  const { navigate, setToken, token, backendUrl } = useContext(shopContext)

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem("token", response.data.token)
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem("token", response.data.token)
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [token])

  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [])

  return (
    <div className='bg-[#67d85f] pt-24 pb-36 min-h-screen w-[122%] ml-[-11%] ' >
      <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[75%] sm:max-w-[450px] sm:px-10 px-5 pb-14 m-auto mt-14 gap-4 text-gray-800 shadow-2xl rounded-xl bg-white'>
        <div className='inline-flex items-center gap-2 mt-10 '>
          <p className='prata-regular text-3xl'>{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
        </div>
        <div className='mt-8'>
          {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} className='w-full px-3 py-2 border border-gray-400 mb-5 rounded-md outline-none' value={name} placeholder='Name' type="text" required />}
          <input onChange={(e) => setEmail(e.target.value)} className='w-full px-3 py-2 border border-gray-400 mb-5 rounded-md  outline-none' placeholder='Email' value={email} type="email" required />
          <input onChange={(e) => setPassword(e.target.value)} className='w-full px-3 py-2 border border-gray-400 mb-5 rounded-md  outline-none' placeholder='Password' value={password} type="password" required />
        </div>
        <div className='w-full justify-between flex text-xs mt-[-30px]'>
          <p className='cursor-pointer'>Forgot your password ?</p>
          {currentState === 'Login' ?
            <p className='cursor-pointer ' onClick={() => setCurrrentState('Sign Up')}>Create an account</p>
            : <p className='cursor-pointer' onClick={() => setCurrrentState('Login')}>Login here</p>}
        </div>
        <button className='bg-[#67d85f] hover:bg-black text-white font-light px-8 py-2 mt-6 rounded-sm'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
      </form>
    </div>
  )
}

export default Login