import React from 'react'
import { MdLocationOn } from 'react-icons/md'
import { BsSearch } from 'react-icons/bs'

const Inputs = () => {
  return (
    <div className='flex flex-row justify-center my-6'>
      <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
        <input type="text" className='text-xl font-light p-2 focus:outline-none w-full shadow-xl capitalize' placeholder='Search...' />
        <BsSearch size={26} className='cursor-pointer text-white transition-all ease-out hover:scale-125 duration-150' />
        <MdLocationOn size={34} className='cursor-pointer text-white transition-all ease-out hover:scale-125 duration-150' />
      </div>

      <div className='flex flex-row w-1/4 justify-center items-center'>
        <button name='metric' className='text-white text-xl font-light'>°C</button>
        <p className='text-xl text-white mx-1'>|</p>
        <button name='imperial' className='text-white text-xl font-light'>°F</button>
      </div>

    </div>
  )
}

export default Inputs
