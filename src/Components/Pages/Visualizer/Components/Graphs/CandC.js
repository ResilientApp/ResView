import { ResponsiveLine } from "@nivo/line";
import { ccData } from "../data/data";
import { useContext, useEffect, useState } from "react";
import Loader from "../../../../Shared/Loader";
import { GraphViewContext } from "../../../../../Context/graph";

const theme = {
  axis: {
    textColor: "#fff",
    fontSize: "140px",
    tickColor: "#eee",
  },
  grid: {
    stroke: "#fff",
    strokeWidth: 1,
  },
};

const secondTheme = {
  textColor: "#fff",
  fontSize: "140px",
};


const CandC = ({points}) => {
    const [isLoading, setIsLoading] = useState(false);
    const { cAndCGraphNumber } = useContext(GraphViewContext);

    // TODO:This the above and below code is just to showcase the loading as a dummy state. Will be changed later.
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);
  //   return () => clearTimeout(timer);
  // }, []);

  console.log(points);
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
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Time Since Replica Started Accepting Messages(10^-5 seconds)",
      legendOffset: 36,
      legendPosition: "middle",
      fontColor: '#fff'
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Number of Messages",
      legendOffset: -40,
      legendPosition: "middle",
    }}
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

export default CandC;