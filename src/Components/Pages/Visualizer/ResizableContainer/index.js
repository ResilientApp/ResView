import React, { useContext } from 'react';
import { Resizable } from "re-resizable";
import { GraphResizerContext } from '../../../../Context/graph';
import { FontVarTitle } from '../../../Shared/Title';

const ResizableContainer = ({ children, title }) => {
    const { boxValues, setBoxValues, setResizing } = useContext(GraphResizerContext);

    return (
        <div
            className='py-3 px-2 flex flex-col justify-center items-center rounded-md border-3p border-gray-700 bg-blue-10 dark:border-solid dark:border-gray-50 dark:bg-blue-450 relative w-full h-550p'
        >
            <FontVarTitle title={title} />
            {children}
        </div>
    )
}

export default ResizableContainer