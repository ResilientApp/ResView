import { Resizable } from "re-resizable";
import React, { useContext, useMemo } from "react";
import { GraphResizerContext, GraphViewContext } from "../../../Context/graph";
import { anglesRightIcon } from "../../../Resources/Icons";
import { Icon } from "../../Shared/Icon";
import Wrapper from "../../Shared/Wrapper";
import ButtonRow from "./Components/Ancillary/Buttons";
import Dropdown from "./Components/Ancillary/Dropdown";
import TypeSelector from "./Components/Ancillary/TypeSelector";
import CandC from "./Components/Graphs/CandC";
import TestingGraph from "./Components/Graphs/TestingGraphs";
import PbftGraph from "./Components/Graphs/PbftGraph";

// TODO: Remove the below Unknown dummy component once the other graphs are built and remove it from GRAPH_CHANGE object
const Dummy = () => {
  return <div className='text-18p my-4 mx-4 text-red-50'>Dummy</div>;
};

const mvtTitles = {
  1: "Commit Messages vs Time Graph",
  2: "Prepare Messages vs Time Graph",
};


const Visualizer = () => {
  const { graph, mvtGraphNo } = useContext(GraphViewContext);
  const { boxValues, setBoxValues } = useContext(GraphResizerContext);

  // TODO: Fill the below ? with appropriate title and its full form
  const graphToTitle = useMemo(
    () => ({
      PBFT: "Practical Byzantine Fault Tolerance Graph",
      MvT: mvtTitles[mvtGraphNo],
      "?": "",
    }),
    [mvtGraphNo]
  );

  const GRAPH_CHANGE = useMemo(
    () => ({
      PBFT: <PbftGraph />,
      // PBFT: <TestingGraph />,
      MvT: <CandC />,
      "?": <Dummy />,
    }),
    []
  );

  return (
    <Wrapper>
      <div className='mt-[2em] mb-4 mx-8'>
        <ButtonRow />
      </div>
      {graph === "MvT" && (
        <div className="my-4" data-aos='fade-in' data-aos-delay={100}>
          <TypeSelector />
        </div>
      )}
      <div
        className='my-18p mx-5p text-22p text-blue-190'
        data-aos='fade-in'
        data-aos-delay={200}
      >
        {graphToTitle[graph]}
      </div>
      {graph === "PBFT" && (
        <div className='my-4 mx-8' data-aos='fade-in' data-aos-delay={200}>
          <Dropdown length={4} />
        </div>
      )}
      {/* // ! DO NOT TOUCH THE BELOW COMPONENT !!!!!! */}
      <Resizable
        className='py-3 px-2 shadow-md flex justify-center items-center rounded-md bg-white my-[2em] dark:border-1p dark:border-solid dark:border-gray-50 dark:bg-blue-300 relative'
        data-aos='fade-in'
        data-aos-delay={300}
        size={{ width: boxValues.width, height: boxValues.height }}
        onResizeStop={(e, direction, ref, d) => {
          setBoxValues({
            width: boxValues.width + d.width,
            height: boxValues.height + d.height,
          });
        }}
      >
        {GRAPH_CHANGE[graph]}
        <div className='absolute bottom-0 right-0 rotate-45'>
          <Icon path={anglesRightIcon} fill={"gray"} height={"0.8em"} />
        </div>
      </Resizable>
    </Wrapper>
  );
};

export default Visualizer;
