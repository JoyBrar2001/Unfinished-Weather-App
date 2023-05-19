import React, { useState } from 'react'
import { MdLocationOn } from 'react-icons/md'
import { BsSearch } from 'react-icons/bs'

const Inputs = ({ setQuery, units, setUnits }) => {

  const [city, setCity] = useState('')

  const handleSearchClick = () => {
    if(city !== ''){
      setQuery({q : city})
    }
  }

  const handleLocationClick = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude
        let lon = position.coords.longitude
      
        setQuery({lat, lon})
      })
    }
  }

  const handleUnitsChange = (e) =>{
    const selectedUnit = e.currentTarget.name
    if(units !== selectedUnit)
      setUnits(selectedUnit)
  }

  return (
    <div className='flex flex-row justify-center my-6'>
      <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
        <input 
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text" 
          className='text-xl font-light p-2 focus:outline-none w-full shadow-xl capitalize' 
          placeholder='Search...' 
        />
        <BsSearch
          onClick={handleSearchClick} 
          size={26} 
          className='cursor-pointer text-white transition-all ease-out hover:scale-125 duration-150' 
        />
        <MdLocationOn 
          onClick={handleLocationClick}
          size={34} 
          className='cursor-pointer text-white transition-all ease-out hover:scale-125 duration-150' 
        />
      </div>

      <div className='flex flex-row w-1/4 justify-center items-center'>
        <button name='metric' className='text-white text-xl font-light' onClick={handleUnitsChange}>°C</button>
        <p className='text-xl text-white mx-1'>|</p>
        <button name='imperial' className='text-white text-xl font-light' onClick={handleUnitsChange}>°F</button>
      </div>

    </div>
  )
}

export default Inputs
