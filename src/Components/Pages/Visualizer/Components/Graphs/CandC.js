import React, { useContext, useEffect, useState } from "react";
import Loader from "../../../../Shared/Loader";
import { GraphViewContext } from "../../../../../Context/graph";
import { WebSocketDemo } from '../../../../../Socket';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';


const secondTheme = {
  textColor: "#fff",
  fontSize: "140px",
};

const CandC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { cAndCGraphNumber } = useContext(GraphViewContext);
  const [graphData, setGraphData] = useState({ labels: [], datasets: [] });
  const replicaLabels = [];

  const onMessage = (newData) => {
    let updatedGraphData = { labels: [], datasets: [] };

    Object.entries(newData.current).forEach(([entryKey, entryValue]) => {
      console.log(`line 23: ${entryKey}`);
      Object.entries(entryValue).forEach(([replicaKey, replicaValue]) => {
        console.log(`line 25: ${replicaKey}`);
        const timestamps = replicaValue.prepare_message_timestamps;
        const min_timestamp = Math.min(...timestamps);
        if (!replicaLabels.includes(`Replica ${replicaValue.replica_id}`)) {
          replicaLabels.push(`Replica ${replicaValue.replica_id}`);
        }
        const data = timestamps.map((timestamp, messageIndex) => ({
          x: replicaValue.propose_pre_prepare_time - min_timestamp,
          y: replicaKey
        }));
        // const data = {
        //   x: replicaValue.propose_pre_prepare_time - min_timestamp,
        //   y: replicaKey
        // };
        console.log(data);

        // updatedGraphData.labels = timestamps.map((timestamp) => min_timestamp - Math.min(...replicaValue.prepare_message_timestamps));
        updatedGraphData.datasets.push({
          // label: `Replica ${replicaValue.replica_id}`,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data,
        });
      });
    });

    setGraphData(updatedGraphData);
  };

  useEffect(() => {
    // This code block will run after the component has rendered with the updated graphData
    console.log("Graph Data after rendering:", graphData);

    // You can add additional log statements or perform other side effects here
  }, [graphData]);

  return (
    <>
      <WebSocketDemo onMessage={onMessage} />
      {console.log(`hello : ${graphData}`)}
      {Object.entries(graphData).forEach(([entryKey, entryValue]) => {
        Object.entries(entryValue).forEach(([k, v]) => {
          console.log(`g key: '${k}', g value: ${v}`);
        })
      })}
      {isLoading ? (
        <Loader />
      ) : (
        <Line
          data={graphData}
          options={{
            scales: {
              x: {
                type: 'linear',
                position: 'bottom',
                title: {
                  display: true,
                  text: 'Prepare Time',
                  color: '#fff',
                },
              },
              y: {
                type: 'linear',
                position: 'left',
                title: {
                  display: true,
                  text: 'Number of Messages',
                  color: '#fff',
                  labels: replicaLabels,
                },
              },
            },
          }}
        />
      )}
    </>
  );
};

export default CandC;