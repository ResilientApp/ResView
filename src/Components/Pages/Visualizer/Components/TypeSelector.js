import { Tooltip } from '@mui/material';
import cn from 'classnames';
import React, { useContext } from 'react'
import { GraphViewContext } from '../../../../Context/graph';

const selectorArr = [1, 2];

const mvtTitles = {
  one: "Commit Messages vs Time Graph",
  two: "Prepare Messages vs Time Graph",
};

const TypeSelect = ({ number }) => {
  const { mvtGraphNo, toggleMvtGraphNoChange } = useContext(GraphViewContext);

  return (
    <Tooltip title={mvtTitles[mvtGraphNo] || ""} enterDelay={800}>
      <div
        className={cn(
          "text-20p border border-2p border-blue-190 text-blue-190 font-sans h-40p w-40p cursor-pointer rounded-full flex items-center justify-center hover:bg-blue-200 hover:text-white hover:border-blue-200",
          { "bg-blue-190 text-white": mvtGraphNo === number }
        )}
        onClick={() => toggleMvtGraphNoChange(number || 1)}
      >
        {number || ""}
      </div>
    </Tooltip>
  );
}

const TypeSelector = () => {
  return <div className='flex items-center justify-between gap-x-8'>{selectorArr.length > 0 && selectorArr.map((element, index) => (
    <TypeSelect key={index} number={element} />
  ))}</div>;
};

export default TypeSelector;