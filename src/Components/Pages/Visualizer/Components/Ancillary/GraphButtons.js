import React, { useContext, useState } from "react";
import cn from "classnames";
import { Tooltip } from "@mui/material";
import { GraphViewContext } from "../../../../../Context/graph";

// TODO: Change the arrow below once the name of the third graph is known
const GraphbuttonRow = ["Set Transaction", "Get Transaction"];

// TODO: Fill the below ? with appropriate title and its full form
const abbreviationToFullform = {
  PBFT: "Practical Byzantine Fault Tolerance Graph",
  MvT: "Message vs Time Graph",
  "?": "",
};

const Button = ({ title }) => {
  const { graph, toggleGraphChange } = useContext(GraphViewContext);
  
  return (
    <Tooltip enterDelay={800}>
      <div
        className={cn(
          "text-22p border border-2p border-blue-190 text-blue-190 font-sans h-40p w-350p cursor-pointer rounded-md flex items-center justify-center hover:bg-blue-200 hover:text-white hover:border-blue-200",
          { "bg-blue-190 text-white": graph === title }
        )}
      >
        {title || ""}
      </div>
    </Tooltip>
  );
};

const GraphButtonRow = () => {
  return (
    <div className='mt-2 flex items-center justify-center gap-x-7 bg-white rounded-md shadow-md w-350p py-3 px-2 dark:border-1p dark:border-solid dark:border-gray-50 dark:bg-blue-300'>
      {GraphbuttonRow.length > 0 &&
        GraphbuttonRow.map((graphType, index) => (
          <Button key={index} title={graphType} />
        ))}
    </div>
  );
};

// TODO: DO the below code later
// export const RadialButtons = ({ title }) => {
//   const { graph, toggleGraphChange } = useContext(GraphViewContext);

//   return (
//     <div
//       className={cn(
//         "text-22p border border-2p border-blue-190 text-blue-190 font-sans h-40p w-80p cursor-pointer rounded-full flex items-center justify-center hover:bg-blue-200 hover:text-white hover:border-blue-200",
//         { "bg-blue-190 text-white": graph === title }
//       )}
//       onClick={() => toggleGraphChange(title || "PBFT")}
//     >
//       {title || ''}
//     </div>
//   );
// };

// const RadialButtonRow = () => {
//   const [whichGraph, setWhichGraph] = useState('one');

//   return (
//     <div>

//     </div>
//   );
// };

export default GraphButtonRow;
