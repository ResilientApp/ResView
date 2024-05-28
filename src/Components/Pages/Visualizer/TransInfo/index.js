import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LOGO_DARK, LOGO_LIGHT, URL_HOME_PAGE } from '../../../../Constants';
import { ThemeContext } from '../../../../Context/theme';
import { cancelIcon, tickIcon } from '../../../../Resources/Icons';
import HRline from '../../../Shared/HRline';
import { Icon } from '../../../Shared/Icon';
import { computeTransInfo } from '../Computation/TransInfo';

const LINK_BUTTON_CLASSES = "relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border-3p before:border-blue-500 before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark: before:border-gray-700 dark:before:bg-gray-800 sm:w-max cursor-pointer"

const BasicInfoTile = ({ title, info }) => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='text-16p md:text-14p sm:text-10p font-bold py-1'>
                {info}
            </div>
            <div className='text-14p md:text-12p sm:text-8p pt-1'>
                {title}
            </div>
        </div>
    );
};

const ReplicaStatTile = ({ replica, status }) => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className="">
                <Icon path={status ? tickIcon : cancelIcon} viewBox={status ? '0 0 448 512' : '0 0 384 512'} height={'20px'} fill={status ? '#0ac24d' : '#ed1123'} />
            </div>
            <div className='text-16p md:text-14p sm:text-10p pt-2'>
                {replica}
            </div>
        </div>
    );
};

const LinkButton = ({ title, link }) => {
    return (
        <div className={LINK_BUTTON_CLASSES}>
            <Link
                to={link}
            >
                <span className="relative text-base font-semibold text-primary dark:text-white">{title}</span >
            </Link>
        </div>
    )
}

const TransInfo = ({ primary, numberOfReplicas, messageHistory, transactionNumber = 17, status }) => {

    const { theme } = useContext(ThemeContext);

    const logo = theme ? LOGO_DARK : LOGO_LIGHT;

    const { primaryIndex, currentStatus } = computeTransInfo(messageHistory, transactionNumber, status)


    return (
        <div className="h-full w-220p fixed z-1 top-0 left-0 overflow-x-hidden p-2 py-6 flex flex-col items-center justify-around opacity-1 border-r-3p border-solid border-gray-700 dark:border-gray-50 dark:text-gray-300">
            <Link to={URL_HOME_PAGE} className='flex items-center justify-center gap-x-2 w-full cursor-pointer'>
                <img
                    src={logo}
                    alt='ResDb View Logo'
                    className='h-30p w-30p'
                />
                <div className='text-blue-190 text-18p font-sans font-bold'>
                    <span className="text-20p font-bold text-gray-900 dark:text-white">ResView</span>
                </div>
            </Link>
            <div className='w-full px-4'>
                <HRline />
            </div>
            <div className='px-6 w-full'>
                <LinkButton title={'Home'} link={URL_HOME_PAGE} external={false} />
            </div>
            <div className='w-full px-4'>
                <HRline />
            </div>
            <div className='text-17p md:text-14p sm:text-10p font-bold py-1'>
                Current Transaction
            </div>
            <div>
                <BasicInfoTile title={'Transaction #'} info={transactionNumber ?? `17`} />
            </div>
            <div>
                <BasicInfoTile title={'Primary'} info={primary ?? `Replica ${primaryIndex}`} />
            </div>
            <div>
                <BasicInfoTile title={'# Replicas'} info={'4'} />
            </div>
            <div className='w-full px-4'>
                <HRline />
            </div>
            <div className='text-17p md:text-14p sm:text-10p font-bold py-1'>
                Replica Status
            </div>
            <div className='flex flex-col items-center justify-center gap-y-10'>
                {currentStatus.length > 0 && currentStatus.map((value, index) => (
                    <ReplicaStatTile
                        key={index}
                        replica={`Replica ${index + 1}`}
                        status={value}
                    />
                ))}
            </div>
        </div>
    )
}

export default TransInfo
