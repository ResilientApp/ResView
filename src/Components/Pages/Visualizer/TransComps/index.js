import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LOGO_DARK, LOGO_LIGHT, URL_HOME_PAGE } from '../../../../Constants';
import { ThemeContext } from '../../../../Context/theme';
import { VizDataHistoryContext } from '../../../../Context/visualizer';
import { cancelIcon, tickIcon } from '../../../../Resources/Icons';
import HRline from '../../../Shared/HRline';
import { Icon } from '../../../Shared/Icon';

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
                <Icon path={status ? tickIcon : cancelIcon} viewBox={status ? '0 0 448 512' : '0 0 384 512'} height={'18px'} fill={status ? '#0ac24d' : '#ed1123'} />
            </div>
            <div className='text-14p md:text-12p sm:text-10p pt-2'>
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

const TransInfo = () => {

    const { primaryIndexVal, currentTransaction, replicaStatus } = useContext(VizDataHistoryContext)

    const { theme } = useContext(ThemeContext);

    const logo = theme ? LOGO_DARK : LOGO_LIGHT;

    const primary = primaryIndexVal === -1 ? 'No Primary' : `Replica ${primaryIndexVal}`

    const [replicaCurrentStatus, setReplicaStatus] = useState([false, false, false, false])

    function fetchWithTimeout(url, options, timeout = 5000) {
        return Promise.race([
            fetch(url, options),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Timeout')), timeout)
            )
        ]);
    }

    function fetchReplicaStatuses() {
        let promises = [];
        let results = [false, false, false, false];

        for (let i = 0; i < 4; i++) {
            let port = parseInt(18501) + i
            let url = process.env.REACT_APP_DEFAULT_LOCAL + String(port) + process.env.REACT_APP_REPLICA_STATUS_EP
            console.log("Replica Status Endpoint: ", url)
            let promise = fetchWithTimeout(url)
                .then(response => {
                    console.log(response)
                    return response.text();
                })
                .then(body => {
                    if (body === 'Not Faulty') {
                        results[i] = true;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });

            promises.push(promise);
        }

        Promise.all(promises)
            .then(() => {
                setReplicaStatus(results);
            });
    }
    useEffect(() => {
        const interval = setInterval(() => {
            if(currentTransaction < 0) {
                setReplicaStatus(replicaStatus);
            } else {
                fetchReplicaStatuses();
            }
        }, 3000); // 3000 milliseconds = 3 seconds

        return () => clearInterval(interval);
    }, [replicaStatus]);

    return (
        <div className="h-full w-220p fixed z-1 top-0 left-0 overflow-x-hidden p-2 py-6 flex flex-col items-center justify-around opacity-1 border-r-3p border-solid border-gray-700 dark:border-gray-50 dark:text-gray-300 gap-y-6 scrollbar">
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
            <div className='text-16p md:text-14p sm:text-10p font-bold py-1'>
                Current Transaction
            </div>
            <div>
                <BasicInfoTile title={'Transaction #'} info={currentTransaction ?? `17`} />
            </div>
            <div>
                <BasicInfoTile title={'Primary'} info={primary} />
            </div>
            <div>
                <BasicInfoTile title={'# Replicas'} info={'4'} />
            </div>
            <div className='w-full px-4'>
                <HRline />
            </div>
            <div className='text-16p md:text-14p sm:text-10p font-bold py-1'>
                Replica Status
            </div>
            <div className='flex flex-col items-center justify-center gap-y-10'>
                {replicaCurrentStatus.length > 0 && replicaCurrentStatus.map((value, index) => (
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
