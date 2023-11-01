import React, { useEffect } from 'react'
import "./preloader.css"
import { preLoaderAnim } from './animations'

const PreLoader = () => {
  useEffect(() => {
    preLoaderAnim()
  }, [])
  return (
    <div className='preloader bg-gradient-to-br from-gray-700 via-gray-900 to-black'>
      <div className='texts-container'>
        <span>Code,</span>
        <span>Color,</span>
        <span>Convey</span>
      </div>
    </div>
  )
}

export default PreLoader