import React from 'react'
import Image from 'next/image'
import DesktopImage from "./Assets/desktop_image.jpg"

const Hero = () => {
  return (
    <div>
        <Image
          src={DesktopImage}
          alt="Car"
          className='w-full'
          />
    </div>
  )
}

export default Hero