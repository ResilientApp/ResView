
import { ResponsiveLine } from "@nivo/line";
import { useContext, useState } from "react";
import { GraphViewContext } from "../../../../../Context/graph";
import Loader from "../../../../Shared/Loader";

const theme = {
  textColor: '#fff',
  legends: {
    text: {
      fill: '#fff'
    }
  },
  axis: {
    legend: {
      text: {
        fill: '#fff',
        fontSize: "14px",
      },
    },
    ticks: {
      text: {
        fill: '#fff',
        fontSize: '14px',
      }
    },
  },
  grid: {
    stroke: "#fff",
    strokeWidth: 1,
  },
};

const MvT = ({points}) => {
    const [isLoading, setIsLoading] = useState(false);
    const { cAndCGraphNumber } = useContext(GraphViewContext);

    // TODO:This the above and below code is just to showcase the loading as a dummy state. Will be changed later.
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);
  //   return () => clearTimeout(timer);
  // }, []);
    let pointScale=[];
    if(!points){
      points=[];
    }
    else{
      for(const repliData of points){
        for(let i=0; i<repliData.data.length; i=i+2){
          pointScale.push(repliData.data[i]['y']);
        }
        break;
      }
    }

  return (
    <>
        {isLoading ? (
            <Loader />
        ) : (
            <ResponsiveLine
    data={points}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: false,
      reverse: false,
    }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: false,
      reverse: false,
    }}
    xFormat=' >-.2f'
    yFormat=' >-.2f'
    theme={theme}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      tickColor: "#fff",
      legend: "Time Since Replica Started Accepting Messages(10^-5 seconds)",
      legendOffset: 36,
      legendPosition: "middle"
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      tickValues: pointScale.length,
      legend: "Number of Messages",
      legendOffset: -40,
      legendPosition: "middle"
    }}
    labelTextColor='#fff'
    enablePoints={true}
    pointSize={10}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
        )}
    </>
  );
};

export const MvTGraphManipulator = ({
  labelToggleFaulty,
  labelToggle,
  toggleFaulty,
  toggleLine,
}) => {
  return (
    <div className='mt-2 bg-white rounded-md shadow-md w-full py-3 px-2 dark:border-1p dark:border-solid dark:border-gray-50 dark:bg-blue-300'>
      <div className='text-20p text-center text-blue-190 p-2 '>
        Select Replica To be Faulty:{" "}
      </div>
      <div className='flex gap-x-7 justify-center'>
        <button
          className={`text-20p p-2 m-1 border border-2p border-blue-190 font-sans h-40p w-450p cursor-pointer rounded-md flex items-center justify-center ${
            labelToggleFaulty["Replica 1"]
              ? "bg-red-500 text-white"
              : "text-blue-190"
          }`}
          onClick={() => toggleFaulty("Replica 1")}
        >
          Replica 1
        </button>

        <button
          className={`text-20p p-2 m-1 border border-2p border-blue-190 font-sans h-40p w-450p cursor-pointer rounded-md flex items-center justify-center ${
            labelToggleFaulty["Replica 2"]
              ? "bg-red-500 text-white"
              : "text-blue-190"
          }`}
          onClick={() => toggleFaulty("Replica 2")}
        >
          Replica 2
        </button>

        <button
          className={`text-20p p-2 m-1 border border-2p border-blue-190 font-sans h-40p w-450p cursor-pointer rounded-md flex items-center justify-center ${
            labelToggleFaulty["Replica 3"]
              ? "bg-red-500 text-white"
              : "text-blue-190"
          }`}
          onClick={() => toggleFaulty("Replica 3")}
        >
          Replica 3
        </button>

        <button
          className={`text-20p p-2 m-1 border border-2p border-blue-190 font-sans h-40p w-450p cursor-pointer rounded-md flex items-center justify-center ${
            labelToggleFaulty["Replica 4"]
              ? "bg-red-500 text-white"
              : "text-blue-190"
          }`}
          onClick={() => toggleFaulty("Replica 4")}
        >
          Replica 4
        </button>
      </div>

      <div className='text-20p text-center text-blue-190 p-2 '>
        Toggle Line Graph:{" "}
      </div>

      <div className='flex gap-x-7'>
        {/* Replica Buttons */}
        <button
          className={`text-20p p-2 m-1 border border-2p border-blue-190 font-sans h-40p w-450p cursor-pointer rounded-md flex items-center justify-center ${
            labelToggle["Replica 1"]
              ? "bg-blue-190 text-white"
              : "text-blue-190"
          }`}
          onClick={() => toggleLine("Replica 1")}
        >
          Replica 1
        </button>

        <button
          className={`text-20p p-2 m-1 border border-2p border-blue-190 font-sans h-40p w-450p cursor-pointer rounded-md flex items-center justify-center ${
            labelToggle["Replica 2"]
              ? "bg-blue-190 text-white"
              : "text-blue-190"
          }`}
          onClick={() => toggleLine("Replica 2")}
        >
          Replica 2
        </button>

        <button
          className={`text-20p p-2 m-1 border border-2p border-blue-190 font-sans h-40p w-450p cursor-pointer rounded-md flex items-center justify-center ${
            labelToggle["Replica 3"]
              ? "bg-blue-190 text-white"
              : "text-blue-190"
          }`}
          onClick={() => toggleLine("Replica 3")}
        >
          Replica 3
        </button>

        <button
          className={`text-20p p-2 m-1 border border-2p border-blue-190 font-sans h-40p w-450p cursor-pointer rounded-md flex items-center justify-center ${
            labelToggle["Replica 4"]
              ? "bg-blue-190 text-white"
              : "text-blue-190"
          }`}
          onClick={() => toggleLine("Replica 4")}
        >
          Replica 4
        </button>
      </div>
    </div>
  );
};

export default MvT;
