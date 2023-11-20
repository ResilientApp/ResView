import React, { useContext } from 'react';
import { GraphViewContext } from '../../../../Context';
import cn from 'classnames';
import { Tooltip } from '@mui/material';

// TODO: Change the arrow below once the name of the third graph is known
const buttonRow = ['PBFT', 'C&C', '?'];

// TODO: Fill the below ? with appropriate title and its full form
const abbreviationToFullform = {
  'PBFT': 'Practical Byzantine Fault Tolerance Graph',
  'C&C': 'Commit and Compare Graph',
  '?': ''
};

const Button = ({ title }) => {
  const { graph, toggleGraphChange } = useContext(GraphViewContext);
  return (
    <Tooltip title={abbreviationToFullform[title] ?? ""} enterDelay={800}>
      <div
        className={cn(
          "text-22p border border-2p border-blue-190 text-blue-190 font-sans h-40p w-80p cursor-pointer rounded-md flex items-center justify-center hover:bg-blue-200 hover:text-white hover:border-blue-200",
          { "bg-blue-190 text-white": graph === title }
        )}
        onClick={() => toggleGraphChange(title || "PBFT")}
      >
        {title ?? ""}
      </div>
    </Tooltip>
  );
}

const ButtonRow = () => {
  return (
    <div className='flex items-center justify-center gap-x-7 bg-white rounded-md shadow-md w-350p py-3 px-2 dark:border-1p dark:border-solid dark:border-gray-50 dark:bg-blue-300'>{buttonRow.length > 0 && (
      buttonRow.map((graphType, index) => <Button key={index} title={graphType} />) 
    )}</div>
  );
};

export default ButtonRow;