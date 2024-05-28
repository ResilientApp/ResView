import React, { useContext } from 'react'
import { Icon } from './Icon'
import { ThemeContext } from '../../Context/theme';
import classNames from 'classnames';

const Title = ({ title, icon, iconHeight, iconViewBox }) => {
  const { theme } = useContext(ThemeContext);

  const iconFill = theme ? 'white' : '#2e2e2e';
  return (
    <div className='flex items-center justify-center gap-x-2 border-b-4 border-blue-550'>
        {icon && (
            <div className='mt-2p'>
                <Icon
                    fill={iconFill}
                    height={iconHeight}
                    path={icon}
                    viewBox={iconViewBox}
                />
            </div>
        )}
        <div className='text-36p font-bold dark:text-white text-gray-170'>
            {title}
        </div>
    </div>
  )
}

export const Subtitle = ({ subtitle }) => {
    return (
        <div className='text-16p text-center dark:text-white text-gray-170 w-750p'>
            {subtitle}
        </div>
    );
};

export const FontVarTitle = ({ title, fontClass }) => {
    const varFont = fontClass ? fontClass : 'text-18p';
    return (
        <div className={`dark:text-gray-300 text-gray-700 font-bold text-center ${varFont} mb-[-1em]`}>
            {title}
        </div>
    );
};

export default Title