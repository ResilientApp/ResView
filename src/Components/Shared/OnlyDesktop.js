import React from 'react'
import Logo from './Logo';

const OnlyDesktop = () => {
  return (
      <div className='flex items-center justify-center flex-col m-4 p-2 h-[95vh]'>
          <div className="m-2">
              <Logo className='h-100p w-100p' />
          </div>
          <div className='dark:text-white text-gray-700 text-18p text-bold flex items-center justify-center text-center'>
              ResView is available only on desktops, Macs and PCs
          </div>
          <div className='mt-2 dark:text-white text-gray-700 flex items-center justify-center text-16p'>
              Please check it out using a laptop!
          </div>
      </div>
  )
}

export default OnlyDesktop