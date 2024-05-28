import React from 'react';

const Footer = () => {
  return (
    <div className='w-full h-full flex justify-center items-center z-10 my-8'>
    <div className='flex flex-col items-center justify-center'>
        <div className='text-12p text-gray-100 bold py-[-6em]'>
        Handcrafted with &#10084;
        <span className='hover:text-blue-190 mx-1'>
            @ UC Davis
        </span>
        </div>
        <div className='text-12p text-gray-100 my-1p'>
          by {" "}
          <span className='hover:text-blue-190 mx-1'>
            <a href='https://deploy-preview-5--helpful-hamster-a151d8.netlify.app/'>
              aunshx
            </a>
          </span>
          <span>
            &
          </span>
          <span className='hover:text-blue-190 mx-1'>
            <a href='https://github.com/Saipranav-Kotamreddy'>
              saipranav
            </a>
          </span>
        </div>
        <div className='text-12p text-gray-100 bold'>
        v3.0.1 &middot; &copy; 2023-2024 &middot; All rights reserved
        </div>
    </div>
    </div>
  );
}

export default Footer