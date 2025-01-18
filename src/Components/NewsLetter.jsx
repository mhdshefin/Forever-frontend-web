import React, { useState } from 'react'

const NewsLetter = () => {

    const [data, setData] = useState({
        email:""
    })

    const onSubmitHadler = (event) => {
        event.preventDefault()
    }

    const onChangehandler = ()=>{
        const name = event.target.name;
        const value = event.target.value;
        
        setData((data)=>({...data,[name]:value}))
    }

    return (
        <div className='text-center'>
            <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% 0ff</p>
            <p className='text-gray-400 mt-3'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.
            </p>
            <form onSubmit={onSubmitHadler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 '>
                <input name='email' onChange={onChangehandler} value={data.email} type="email" placeholder='Enter your email' className='w-full sm:flex-1 outline-none rounded-l-lg' required />
                <button onClick={()=>console.log(data)} className='bg-black text-white text-xs px-10 py-4 rounded-r-lg' type='submit'>Subscribe</button>
            </form>
        </div>
    )
}

export default NewsLetter