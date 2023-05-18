import React from 'react'
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'
import { BsSun } from 'react-icons/bs'
import { BiWind } from 'react-icons/bi'
import { FaThermometerHalf } from 'react-icons/fa'
import { FiDroplet } from 'react-icons/fi'
import { WiSunset } from 'react-icons/wi'
import { formatToLocalTime, iconUrlFromCode } from '../services/weatherService'

const Temperature_Details = ({ weather: { details, icon, temp, temp_min, temp_max, sunrise, sunset, speed, humidity, feels_like, timezone } }) => {
  return (
    <div>
      <div className='flex items-center justify-center py-6 text-xl text-cyan-300'>
        <p>{`${details}`}</p>
      </div>

      <div className='flex flex-row justify-between items-center text-white py-3'>
        <img src={iconUrlFromCode(icon)} alt="Sunny" />
        <p className='text-5xl'>{`${temp.toFixed()}`}°</p>
        <div className='flex flex-col space-y-2'>

          <div className='flex font-light text-sm items-center justify-center'>
            <FaThermometerHalf size={18} className='mr-1' />
            Real Feel:
            <span className='font-semibold ml-1'>{feels_like.toFixed()}°</span>
          </div>

          <div className='flex font-light text-sm items-center justify-center'>
            <FiDroplet size={18} className='mr-1' />
            Humidity:
            <span className='font-semibold ml-1'>{humidity}%</span>
          </div>

          <div className='flex font-light text-sm items-center justify-center'>
            <BiWind size={18} className='mr-1' />
            Wind :
            <span className='font-semibold ml-1'>{speed.toFixed()} km/h</span>
          </div>

        </div>
      </div>

      <div className='flex flex-row justify-center items-center space-x-2 text-white text-sm py-3'>
        <BsSun />
        <p className='font-light'>Rise:
          <span className='font-medium ml-1'>
            {formatToLocalTime(sunrise, timezone, 'hh:mm a')}
          </span>
        </p>
        <p className='font-light'>|</p>

        <WiSunset />
        <p className='font-light'>Set:
          <span className='font-medium ml-1'>
            {formatToLocalTime(sunset, timezone, 'hh:mm a')}
          </span>
        </p>
        <p className='font-light'>|</p>

        <AiOutlineArrowUp />
        <p className='font-light'>High: <span className='font-medium ml-1'>{temp_max.toFixed()}°</span></p>
        <p className='font-light'>|</p>

        <AiOutlineArrowDown />
        <p className='font-light'>Low: <span className='font-medium ml-1'>{temp_min.toFixed()}°</span></p>
      </div>
    </div>
  )
}

export default Temperature_Details
