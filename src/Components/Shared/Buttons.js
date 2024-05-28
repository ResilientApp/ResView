import classNames from 'classnames'
import React, { useContext, useState } from 'react'
import { loadingPartialBueIcon } from '../../Resources/Icons'
import { Link } from 'react-router-dom'
import { GraphViewContext } from '../../Context/graph'

const LINK_BUTTON_CLASSES = "relative flex h-11 w-220p items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border-3p before:border-blue-500 before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark: before:border-gray-700 dark:before:bg-gray-800 sm:w-max cursor-pointer"

const REPLICA_BUTTON_CLASSES = "relative flex h-9 items-center justify-center px-4 before:absolute before:inset-0 before:border-3p before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max cursor-pointer"

const ICON_BUTTON_CLASSES = "relative flex h-10 items-center justify-center px-4 before:absolute before:inset-0 border-2p rounded-md before:transition before:duration-200 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max before:rounded-md w-auto flex items-center justify-center gap-x-2 h-9 text-primary before:cursor-pointer"

const DROPDOWN_BUTTON_CLASSES = "relative flex h-10 items-center justify-center px-4 before:absolute before:inset-0 before:border-2p before:border-gray-700 dark:before:border-white before:transition before:duration-200 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max before:rounded-md flex items-center justify-center gap-x-2 h-9 text-primary before:cursor-pointer"

const ICON_BTTN_CLSS_HOVER = {
    'play': 'dark:hover:before:border-green-700 before:hover:border-blue-500',
    'clear': 'dark:hover:before:border-red-700 before:hover:border-blue-500',
}

export const LinkButton = ({ title, link, external, scrollId }) => {
    const handleClick = () => {
        const element = document.getElementById(scrollId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        }
    };
    return (
        <div onClick={scrollId ? handleClick : null} className={LINK_BUTTON_CLASSES}>
            {external ? (
                <a href={link} target='_blank' rel='noreferrer nofollow'>
                    <span className="relative text-base font-semibold text-primary dark:text-white">{title}</span >
                </a>
            ) : (
                <Link
                    to={link}
                >
                    <span className="relative text-base font-semibold text-primary dark:text-white">{title}</span >
                </Link>
            )}
        </div>
    )
}

export const ReplicaButton = ({ title, onClick, faulty, lineToggle, lineActive }) => {
    const handleClick = () => {
        onClick()
    };
    return (
        <div onClick={handleClick} className={classNames(`${REPLICA_BUTTON_CLASSES} w-100p`, { 'dark:before:bg-red-400 dark:before:border-red-700 before:border-red-500 before:bg-red-100': faulty && !lineActive, 'dark:before:bg-gray-800 dark:before:border-gray-700 before:border-blue-500 before:bg-primary/10': !faulty && !lineActive, 'dark:before:bg-green-900 dark:before:border-green-700 before:border-green-500 before:bg-green-400': !faulty && lineActive }, { 'before:rounded-full': !lineToggle, 'before:rounded-md': lineToggle })}>
            <span className="relative text-14p text-primary dark:text-white">{title}</span >
        </div>
    )
}

export const MvTSelectButton = ({ title, onClick, graphNo }) => {
    const { mvtGraphNo } = useContext(GraphViewContext);

    const handleClick = () => {
        onClick()
    };
    return (
        <div onClick={handleClick} className={classNames(`${REPLICA_BUTTON_CLASSES} before:rounded-full w-200p`, { 'dark:before:bg-gray-500 dark:before:border-gray-50 before:border-gray-800 before:bg-gray-100 text-white': graphNo === mvtGraphNo, 'dark:before:bg-gray-800 dark:before:border-gray-700 before:border-blue-500 before:bg-primary/10': graphNo !== mvtGraphNo })}>
            <span className="relative text-base font-semibold text-primary dark:text-white">{title}</span >
        </div>
    )
}

export const SubmitButton = ({ title, loading }) => {
    return (
        <button type="button" className={classNames(
            'py-2.5 px-5 me-2 text-sm font-medium w-120p flex justify-center bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center',
            { 'cursor-not-allowed text-gray-300 dark:text-gray-400': loading },
            { 'cursor-pointer text-gray-900 dark:text-white': !loading }
        )}>
            {loading && (
                <div className='mb-1p'>
                    {loadingPartialBueIcon}
                </div>
            )}
            {title ?? 'Submit'}
        </button>
        
    )
}

export const IconButtons = ({ title, onClick, children, disabled }) => {
    const handleClick = () => {
        onClick()
    };
    const extraClass = disabled ? 'cursor-not-allowed border-gray-100 text-gray-100 dark:border-gray-700 dark:text-gray-700' : `${ICON_BTTN_CLSS_HOVER[title.toLowerCase()]} dark:text-white border-gray-700 dark:border-gray-10`;
    return (
        <button onClick={handleClick} className={`${ICON_BUTTON_CLASSES} ${extraClass}`} disabled={disabled}>
            {children}
            <span className="relative text-base font-semibold">{title}</span>
        </button>
    )
};


export const DropDownButtons = ({ selected, onClick, elements }) => {
    const [open, setOpen] = useState(false);

    const handleClick = (value) => {
        changeOpenStatus()
        onClick(value)
    };

    const changeOpenStatus = () => setOpen(open => !open)

    return (
        <div className='flex flex-col items-center justify-center gap-y-4 relative'>
            <button onClick={changeOpenStatus} className={`${DROPDOWN_BUTTON_CLASSES} w-60p`}>
                <span className="relative text-base font-semibold dark:text-white">{selected}</span>
            </button>
            {(elements.length > 0 && open) && (
                <div className='flex flex-col items-center justify-center gap-y-4 bg-blue-20 dark:bg-blue-450 px-2 py-3 rounded-lg border-1p absolute opacity-100 z-10 top-50p'>
                    {elements.map((value, index) => {
                        if (value !== selected) {
                            return <button onClick={() => handleClick(value)} className={`${DROPDOWN_BUTTON_CLASSES} w-50p`} key={index}>
                                <span className="relative text-base font-semibold dark:text-white">{value}</span>
                            </button>
                        } else return <></>
                    })}
                </div>
            )}
        </div>
    )
};