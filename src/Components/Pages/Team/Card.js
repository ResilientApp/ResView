import React from 'react'
import defaultProfileImage from '../../../Resources/Images/defaultProfileImage.png';
import { Icon } from '../../Shared/Icon';
import { githubIcon, linkedinIcon, instagramIcon } from "../../../Resources/Icons";
import { ICON_DEFAULT_COLOR } from '../../Shared/Constants';

const linkToIcon = {
  github: githubIcon,
  linkedin: linkedinIcon,
  ig: instagramIcon
};

const indexToSocial = {
  1: 'linkedin',
  2: 'github',
  0: 'ig'
};

const LinkIcon = ({ link, social }) => {
  return (
    <a href={link} target='_blank' rel='noreferrer nofollow' className='cursor-pointer'>
      <Icon 
        fill={ICON_DEFAULT_COLOR}
        path={linkToIcon[social]}
        height={'1.5em'}
      />
    </a>
  );
};

const Card = ({ element }) => {
  const { name, title, socials, profilePic, quote } = element;
  return (
    <div className='w-full h-250p bg-white text-black rounded-md shadow-md dark:border-1p grid grid-cols-2 gap-x-4 dark:border-solid dark:border-gray-50 dark:bg-blue-300 dark:text-white px-4 py-6 hover:scale-105 transition'>
      <div className='w-full h-full flex items-center justify-center'>
        <img
          src={profilePic || defaultProfileImage}
          alt={`Profile pic of ${name}`}
          className='object-fit rounded-md w-full'
        />
      </div>
      <div className='py-10p flex flex-col items-center justify-evenly gap-y-4'>
        <div className='truncate text-20p bold text-black max-w-200p dark:text-white'>
          {name}
        </div>
        <div className='text-14p'>{title}</div>
        <div className='text-14p italic'>"{quote}"</div>
        <div className='flex items-center justify-between gap-x-6'>
          {socials.length > 0 &&
            socials.map((element, index) => (
              <LinkIcon
                key={index}
                link={element}
                social={indexToSocial[index]}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Card