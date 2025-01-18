import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../Context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../Components/Title'
import ProductItem from '../Components/ProductItem'

const Collection = () => {

  const { products, search, showSearch } = useContext(shopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filteredProducts, setFilteredProduct] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relavent')

  const devicewidth = window.innerWidth;


  const toggleSubcategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }


  const togglecategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }


  const applyFilter = () => {

    let productsCopy = products.slice()

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category))
    }

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory))
    }
    setFilteredProduct(productsCopy)
  }

  const filterReset = () => {
    setCategory([])
    setSubCategory([])

  }

  const sortProducts = () => {
    let fpCopy = filteredProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilteredProduct(fpCopy.sort((a, b) => a.price - b.price))
        break;

      case 'high-low':
        setFilteredProduct(fpCopy.sort((a, b) => b.price - a.price))
        break;
      default:
        applyFilter()
        break;
    }
  }

  useEffect(() => {
    applyFilter()
  }, [category, subCategory, search, showSearch,products])

  useEffect(() => {
    sortProducts()
  }, [sortType])

  return (
    <div className={`flex flex-col sm:flex-row gap-1 sm:gap-10 border-t`}>
      <div className={`min-w-60 mt-10 ${devicewidth > 640 ? 'sticky top-5 self-start' : ''}`}>

        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTER
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>

        <div className={`border border-gray-300 rounded pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'}  sm:block `}>
          <p className='mb-3 text-sm font-medium '>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Men'} onChange={togglecategory} checked={category.includes('Men')} />Men
            </p><p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Women'} onChange={togglecategory} checked={category.includes('Women')} />Women
            </p><p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kids'} onChange={togglecategory} checked={category.includes('Kids')} />Kids
            </p>
          </div>
        </div>


        <div className={`border border-gray-300 rounded pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block `}>
          <p className='mb-3 text-sm font-medium '>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" name="" id="" value={'Topwear'} onChange={toggleSubcategory} checked={subCategory.includes('Topwear')} />Topwear
            </p><p className='flex gap-2'>
              <input className='w-3' type="checkbox" name="" id="" value={'Bottomwear'} onChange={toggleSubcategory} checked={subCategory.includes('Bottomwear')} />Bottomwear
            </p><p className='flex gap-2'>
              <input className='w-3' type="checkbox" name="" id="" value={'Winterwear'} onChange={toggleSubcategory} checked={subCategory.includes('Winterwear')} />Winterwear
            </p>
          </div>
        </div>

        <div className={`flex justify-end ${showFilter ? '' : 'hidden'} sm:block`}>
          <button onClick={() => filterReset()} className='border border-gray-300 rounded-md py-1 px-3 hover:bg-black hover:text-white transition-all duration-300'>Reset</button>
        </div>
      </div>

     

      <div className='flex-1'>

        <div className='flex justify-between text-base sm:text-2xl mb-4 mt-10'>
          <Title text1={'ALL'} text2={'COLLECTION'} />

          <select onChange={(e) => setSortType(e.target.value)} className='border-2 rounded-lg border-gray-300 text-sm px-2'>
            <option value="relavent">sort by: Relavent</option>
            <option value="low-high">sort by: Low-High</option>
            <option value="high-low">sort by: High-Low</option>
          </select>
        </div>


        <div className='grid grid-cols-2 md:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {
            filteredProducts.map((item, index) => {
              return <ProductItem key={index} name={item.name} price={item.price} images={item.images} id={item._id} />
            })
          }
        </div>

      </div>
    </div>
  )
}

export default Collection