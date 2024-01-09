import React, { useRef, useEffect, useContext, useState, useCallback } from "react";
import * as d3 from "d3";
import { line } from "d3-shape";
import { GraphResizerContext } from "../../../../../Context/graph";
import { ThemeContext } from "../../../../../Context/theme";
import { height } from "@mui/system";
import Loader from "../../../../Shared/Loader";

const colors = [
  "#2196F3", 
  "#9C27B0",  
  "#FFC107",
  "#00BCD4",
  "#4CAF50",
  "#795548"
];

const ACTION_TYPE = ["request", "prePrepare", "prepare", "commit", "reply"];

const TITLES = ["REQUEST", "PRE-PREPARE", "PREPARE", "COMMIT", "REPLY"];

const NODES = ["CLIENT", "REPLICA 1", "REPLICA 2", "REPLICA 3", "REPLICA 4"];

const dummy = {
  17: {
    1: {
      commit_message_timestamps: [
        1701956096777352000, 1701956096782048300, 1701956096786494200,
        1701956096786495200,
      ],
      commit_time: 1701956096786501400,
      execution_time: 1701956096786658600,
      ip: "127.0.0.1",
      port: 10001,
      prepare_message_timestamps: [
        1701956096771379200, 1701956096776308700, 1701956096776386300,
        1701956096777278200,
      ],
      prepare_time: 1701956096776394000,
      primary_id: 1,
      propose_pre_prepare_time: 1701956096769596400,
      replica_id: 2,
      txn_commands: ["GET"],
      txn_keys: ["test"],
      txn_number: 17,
      txn_values: [""],
      reply_time: 1702001829632,
    },
    2: {
      commit_message_timestamps: [
        1701956096777775600, 1701956096781659100, 1701956096788349400,
        1701956096788360400,
      ],
      commit_time: 1701956096788358400,
      execution_time: 1701956096789154300,
      ip: "127.0.0.1",
      port: 10002,
      prepare_message_timestamps: [
        1701956096771574300, 1701956096776823800, 1701956096777767000,
      ],
      prepare_time: 1701956096776841500,
      primary_id: 1,
      propose_pre_prepare_time: 1701956096767388700,
      replica_id: 1,
      txn_commands: ["GET"],
      txn_keys: ["test"],
      txn_number: 17,
      txn_values: [""],
      reply_time: 1702001829629,
    },
    3: {
      commit_message_timestamps: [
        1701956096777398000, 1701956096781702400, 1701956096787757600,
        1701956096787947500,
      ],
      commit_time: 1701956096787769900,
      execution_time: 1701956096788227600,
      ip: "127.0.0.1",
      port: 10003,
      prepare_message_timestamps: [
        1701956096772535600, 1701956096777049000, 1701956096777068300,
        1701956096777263900,
      ],
      prepare_time: 1701956096777074400,
      primary_id: 1,
      propose_pre_prepare_time: 1701956096767121700,
      replica_id: 3,
      txn_commands: ["GET"],
      txn_keys: ["test"],
      txn_number: 17,
      txn_values: [""],
      reply_time: 1702001829631,
    },
    4: {
      commit_message_timestamps: [
        1701956096777512700, 1701956096782015500, 1701956096786524200,
        1701956096786591700,
      ],
      commit_time: 1701956096786530000,
      execution_time: 1701956096786978000,
      ip: "127.0.0.1",
      port: 10004,
      prepare_message_timestamps: [
        1701956096772492300, 1701956096776289500, 1701956096776371200,
        1701956096777435000,
      ],
      prepare_time: 1701956096776375000,
      primary_id: 1,
      propose_pre_prepare_time: 1701956096767122200,
      replica_id: 4,
      txn_commands: ["GET"],
      txn_keys: ["test"],
      txn_number: 17,
      txn_values: [""],
      reply_time: 1702001829630,
    },
  },
  18: {
    1: {
      commit_message_timestamps: [
        1701956096777352000, 1701956096782048300, 1701956096786494200,
        1701956096786495200,
      ],
      commit_time: 1701956096786501400,
      execution_time: 1701956096786658600,
      ip: "127.0.0.1",
      port: 10001,
      prepare_message_timestamps: [
        1701956096771379200, 1701956096776308700, 1701956096776386300,
        1701956096777278200,
      ],
      prepare_time: 1701956096776394000,
      primary_id: 1,
      propose_pre_prepare_time: 1701956096769596400,
      replica_id: 1,
      txn_commands: ["GET"],
      txn_keys: ["test"],
      txn_number: 17,
      txn_values: [""],
      reply_time: 1702001829632,
    },
    2: {
      commit_message_timestamps: [
        1701956096777775600, 1701956096781659100, 1701956096788349400,
        1701956096788360400,
      ],
      commit_time: 1701956096788358400,
      execution_time: 1701956096789154300,
      ip: "127.0.0.1",
      port: 10002,
      prepare_message_timestamps: [
        1701956096771574300, 1701956096776823800, 1701956096777767000,
      ],
      prepare_time: 1701956096776841500,
      primary_id: 1,
      propose_pre_prepare_time: 1701956096767388700,
      replica_id: 2,
      txn_commands: ["GET"],
      txn_keys: ["test"],
      txn_number: 17,
      txn_values: [""],
      reply_time: 1702001829629,
    },
    3: {
      commit_message_timestamps: [
        1701956096777398000, 1701956096781702400, 1701956096787757600,
        1701956096787947500,
      ],
      commit_time: 1701956096787769900,
      execution_time: 1701956096788227600,
      ip: "127.0.0.1",
      port: 10003,
      prepare_message_timestamps: [
        1701956096772535600, 1701956096777049000, 1701956096777068300,
        1701956096777263900,
      ],
      prepare_time: 1701956096777074400,
      primary_id: 1,
      propose_pre_prepare_time: 1701956096767121700,
      replica_id: 3,
      txn_commands: ["GET"],
      txn_keys: ["test"],
      txn_number: 17,
      txn_values: [""],
      reply_time: 1702001829631,
    },
    4: {
      commit_message_timestamps: [
        1701956096777512700, 1701956096782015500, 1701956096786524200,
        1701956096786591700,
      ],
      commit_time: 1701956096786530000,
      execution_time: 1701956096786978000,
      ip: "127.0.0.1",
      port: 10004,
      prepare_message_timestamps: [
        1701956096772492300, 1701956096776289500, 1701956096776371200,
        1701956096777435000,
      ],
      prepare_time: 1701956096776375000,
      primary_id: 1,
      propose_pre_prepare_time: 1701956096767122200,
      replica_id: 4,
      txn_commands: ["GET"],
      txn_keys: ["test"],
      txn_number: 17,
      txn_values: [""],
      reply_time: 1702001829630,
    },
  },
};

const TRANSDURATION = 750;

const NUMBER_OF_STEPS = 5;

const computeDataDetails = (data) => {
  let transactions = new Set();
  let primaryInd = -1;

  for (const property in data) {
    transactions.add(parseInt(property));
  }

  for (const [key, value] of Object.entries(data)) {
    if (value.primary_id === value.replica_id) primaryInd = key;
  }

  let primaryIndex = parseInt(primaryInd);

  return { primaryIndex, transactions };
};

const primaryIndexToPoint = {
  1: 2,
  2: 8,
  3: 14,
  4: 20
}

const generateConnections = (
  data,
  numberOfSteps,
  xCoords,
  yCoords,
  messageHistory,
  transactionNumber = 17
) => {
  let points = {};

  const currentData = messageHistory[transactionNumber];

  const { primaryIndex, transactions } =
    computeDataDetails(currentData);

  console.log(transactions);

  ACTION_TYPE.forEach(
    (action, index) =>
      (points = {
        ...points,
        [action]: {
          color: `${colors[index]}`,
          start: [],
          end: [],
        },
      })
  );

  let currentPrimaryPointIndex = primaryIndexToPoint[primaryIndex]
  // REQUEST OBJECT
  points.request.start.push({
    flag: true,
    points: data[0],
  });
  points.request.end.push({
    flag: true,
    points: data[numberOfSteps + currentPrimaryPointIndex],
  });
  // PRE-PREPARE OBJECT
  points.prePrepare.start.push({
    flag: true,
    points: points.request.end[0].points,
  });

  for (let i = 1; i < yCoords.length; i++) {
    if (primaryIndex === i) continue;
    points.prePrepare.end.push({
      flag: true,
      points: {
        x: xCoords[2],
        y: yCoords[i],
      },
    });
  }

  let yCoordToReplicas = {};
  
  for (let i = 1; i < yCoords.length; i++) {
    yCoordToReplicas = {
      ...yCoordToReplicas,
      [yCoords[i]]: i,
    };
  }
  // PREPARE OBJECT
  points.prePrepare.end.forEach((element, index) => {
    if (transactions.has(yCoordToReplicas[element.points.y])) {
      points.prepare.start.push(element.points);
    }
  });

  for (const element of points.prepare.start) points.prepare.end.push([]);

  for (let i = 0; i < points.prepare.start.length; i++) {
    for (let j = 1; j < yCoords.length; j++) {
      if (points.prepare.start[i].y !== yCoords[j]) {
        points.prepare.end[i].push({
          flag: true,
          points: {
            x: xCoords[3],
            y: yCoords[j],
          },
        });
      }
    }
  }
  // COMMIT OBJECT
  for (let i = 1; i < yCoords.length; i++) {
    if(transactions.has(i)){
      points.commit.start.push({
        x: xCoords[3],
        y: yCoords[i],
      });
    }
  }

  for (const element of points.commit.start) points.commit.end.push([]);

  for (let i = 0; i < points.commit.start.length; i++) {
    for (let j = 1; j < yCoords.length; j++) {
      if (points.commit.start[i].y !== yCoords[j]) {
        points.commit.end[i].push({
          flag: true,
          points: {
            x: xCoords[4],
            y: yCoords[j],
          },
        });
      }
    }
  }
  // REPLY OBJECT
  points.reply.end.push({
    flag: true,
    points: data[numberOfSteps],
  });

  for (let i = 1; i < yCoords.length; i++) {
    if(transactions.has(i)){
      points.reply.start.push({
        flag: true,
        points: {
          x: xCoords[4],
          y: yCoords[i],
        },
      });
    }
  }
  return { points };
};

const generateLabels = (xCoords, yCoords) => {
  let labelsX = [], labelsY = [];

  if(xCoords.length < 2 || yCoords.length < 2) return labelsX;

  for(let i=0; i<xCoords.length-1; i++){
    let obj = {
      x: Math.floor((xCoords[i] + xCoords[i + 1]) / 2),
      y: yCoords[0] - 20,
      title: `${TITLES[i]}`,
    };
    labelsX.push(obj)
  }

  for(let i=0; i<yCoords.length; i++){
    let obj = {
      x: xCoords[0]-50,
      y: yCoords[i]+5,
      title: `${NODES[i]}`,
    };
    labelsY.push(obj);
  }

  return { labelsX, labelsY };
};

const generateLines = (data, numberOfSteps) => {
    let verticalLines = [],
      horizontalLines = [];

    let xCoords = [];
    let yCoords = [];

    for (let i = 0; i <= numberOfSteps; i++) {
      xCoords.push(data[i].x);
    }

    for (let i = 0; i < data.length; i += (numberOfSteps+1)) {
      yCoords.push(data[i].y);
    }

    for(const eleX of xCoords){
        let arr = [];
        for(const eleY of yCoords){
           arr.push({
             x: eleX,
             y: eleY,
           });
        }
        verticalLines.push(arr);
    }

    for (const eleY of yCoords) {
      let arr = [];
      for (const eleX of xCoords) {
        arr.push({
          x: eleX,
          y: eleY,
        });
      }
      horizontalLines.push(arr);
    }

    return { verticalLines, horizontalLines, xCoords, yCoords };
};

const generatePoints = (
  width,
  height,
  margin = 0,
  padding = 0,
  numberOfReplicas = 4,
  numberOfSteps = 5
) => {
  const xStart = Math.floor(margin / 2) + Math.floor(padding / 2);
  const yStart = Math.floor(margin / 2) + Math.floor(padding / 2);

  const numberOfTotalSteps = numberOfSteps + 1;

  const cummulativeH = height - (padding + margin);
  const cummulativeW = width - (padding + margin);

  const distX = Math.floor(cummulativeW / numberOfSteps);
  const distY = Math.floor(cummulativeH / numberOfReplicas);

  let data = new Array((numberOfReplicas + 1) * numberOfTotalSteps).fill({
    x: 0,
    y: 0,
  });

  let changeX = xStart,
    changeY = yStart;
  let newData = [];

  for (let i = 0; i < data.length; i++) {
    if (i !== 0) {
      if (i < numberOfSteps && i % numberOfSteps === 0) {
        changeY += distY;
        changeX = xStart;
      } else if (i % (numberOfSteps + 1) === 0) {
        changeY += distY;
        changeX = xStart;
      }
    }
    data[i].x = changeX;
    data[i].y = changeY;
    changeX += distX;
    newData.push({ x: data[i].x, y: data[i].y });
  }
  return newData;
};

const getTransactionData = (data) => {
  let phaseTimes = {
    propose_time: 0,
    pre_prepare_times: [],
    prepare_times: [],
    commit_times: []
  };

  console.log(data);

  for (const replicaNum in data) {
    let replicaData=data[replicaNum];
    console.log(replicaData);
    if(replicaData.primary_id==replicaData.replica_id){
      phaseTimes.propose_time=replicaData.propose_pre_prepare_time;
    }
    else{
      phaseTimes.pre_prepare_times.push(replicaData.propose_pre_prepare_time);
    }
    phaseTimes.prepare_times.push(replicaData.prepare_time);
    phaseTimes.commit_times.push(replicaData.commit_time);
  }

  console.log(phaseTimes);

  return phaseTimes;
};

const PbftGraph = ({ messageHistory, transactionNumber }) => {
  const { boxValues, resizing, setResizing } = useContext(GraphResizerContext);
  const { width, height } = boxValues;
  const { theme } = useContext(ThemeContext);
  let missingData = false;

  console.log("History: ", messageHistory);

  // TODO: Make the below messageHistory instead of dummy
  //const { transactionIds } = generateTransactionIds(messageHistory);

  //const [transactionNumber, setTransactionNumber] = useState(transactionIds[0]);

  if(!(transactionNumber in messageHistory)){
    messageHistory=dummy;
    transactionNumber=17;
    missingData=true;
  }

  const ref = useRef(null);

  const debouncedRender = useCallback(() => {
    const data = generatePoints(
      width,
      height,
      0,
      Math.floor(height / 4),
      4,
      NUMBER_OF_STEPS
    );

    const { xCoords, yCoords, verticalLines, horizontalLines } = generateLines(
      data,
      NUMBER_OF_STEPS
    );

    const { points } = generateConnections(
      data,
      NUMBER_OF_STEPS,
      xCoords,
      yCoords,
      messageHistory,
      transactionNumber
    );

    const timeData = getTransactionData(messageHistory[transactionNumber]);

    const { labelsX, labelsY } = generateLabels(xCoords, yCoords);

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .classed("flex", true)
      .classed("justify-center", true)
      .classed("items-center", true);

    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 2)
      .attr("fill", `${!theme ? "black" : "white"}`);

    const lineGen = line()
      .x((d) => d.x)
      .y((d) => d.y);

    // ARROW HEAD
    ACTION_TYPE.forEach((action, index) =>
      svg
        .append("defs")
        .append("marker")
        .attr("id", `arrow-${action}`)
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 10)
        .attr("refY", 5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto-start-reverse")
        .append("path")
        .attr("fill", `${colors[index]}`)
        .attr("d", "M 0 0 L 10 5 L 0 10 z")
    );

    // VERTICAL DOTTED LINES
    verticalLines.forEach((line, index) =>
      svg
        .append("path")
        .attr("d", lineGen(line))
        .attr("stroke", "gray")
        .attr("fill", "none")
        .attr("stroke-width", 0.2)
        .attr("stroke-dasharray", "5,10")
    );

    // HORIZONTAL DOTTED LINES
    horizontalLines.forEach((line, index) =>
      svg
        .append("path")
        .attr("d", lineGen(line))
        .attr("stroke", "gray")
        .attr("fill", "none")
        .attr("stroke-width", 0.2)
        .attr("stroke-dasharray", "5,10")
    );

    // LABELS FOR EACH ACTION
    labelsX.forEach((label) =>
      svg
        .append("text")
        .attr("transform", "translate(" + label.x + " ," + label.y + ")")
        .attr("fill", "#c4c4c4")
        .style("text-anchor", "middle")
        .text(`${label.title}`)
    );

    // LABELS FOR EACH NODE
    labelsY.forEach((label) =>
      svg
        .append("text")
        .attr("transform", "translate(" + label.x + " ," + label.y + ")")
        .attr("fill", "#c4c4c4")
        .style("text-anchor", "middle")
        .text(`${label.title}`)
    );

    if(!missingData){
      // REQUEST LINES
      points.request.end.forEach((end, i) => {
        end.flag &&
          svg
            .append("path")
            .attr("d", lineGen([points.request.start[0].points, end.points]))
            .attr("stroke", `${points.request.color}`)
            .attr("fill", "none")
            .attr("stroke-width", 1)
            .attr("marker-end", "url(#arrow-request)")
            .style("opacity", 0)
            .on("mouseover", function (event, d) {
              d3.select(this).attr("stroke-width", 2);
              svg
                .append("text")
                .attr("x", end.points.x + 10)
                .attr("y", end.points.y - 10)
                .attr("class", "tooltip")
                .text("Request Phase Propose Time: " + timeData.propose_time);
            })
            .on("mouseout", function () {
              // Hide tooltip on mouseout
              d3.select(this).attr("stroke-width", 1);
              svg.selectAll(".tooltip").remove();
            })
            .transition()
            .duration(TRANSDURATION)
            .delay(i * 100)
            .style("opacity", 1);
      });

      // PRE-PREPARE LINES
      points.prePrepare.end.forEach((end, i) => {
        end.flag &&
          svg
            .append("path")
            .attr("d", lineGen([points.prePrepare.start[0].points, end.points]))
            .attr("stroke", `${points.prePrepare.color}`)
            .attr("fill", "none")
            .attr("stroke-width", 1)
            .attr("marker-end", "url(#arrow-prePrepare)")
            .style("opacity", 0)
            .on("mouseover", function (event, d) {
              d3.select(this).attr("stroke-width", 2);
              svg
                .append("text")
                .attr("x", end.points.x + 10)
                .attr("y", end.points.y - 10)
                .attr("class", "tooltip")
                .text("Pre-prepare Phase Completion Time: " + timeData.pre_prepare_times[i]);
            })
            .on("mouseout", function () {
              // Hide tooltip on mouseout
              d3.select(this).attr("stroke-width", 1);
              svg.selectAll(".tooltip").remove();
            })
            .transition()
            .duration(TRANSDURATION + 200)
            .delay(i * 200)
            .style("opacity", 1);
      });

      // PREPARE LINES
      points.prepare.start.map((start, index) =>
        points.prepare.end[index].map((end, i) => {
          return (
            end.flag &&
            svg
              .append("path")
              .attr("d", lineGen([start, end.points]))
              .attr("stroke", `${points.prepare.color}`)
              .attr("fill", "none")
              .attr("stroke-width", 1)
              .attr("marker-end", "url(#arrow-prepare)")
              .style("opacity", 0)
              .on("mouseover", function (event, d) {
                d3.select(this).attr("stroke-width", 2);
                svg
                  .append("text")
                  .attr("x", end.points.x + 10)
                  .attr("y", end.points.y - 10)
                  .attr("class", "tooltip")
                  .text("Prepare Phase Completion Time: " + timeData.prepare_times[i]);
              })
              .on("mouseout", function () {
                // Hide tooltip on mouseout
                d3.select(this).attr("stroke-width", 1);
                svg.selectAll(".tooltip").remove();
              })
              .transition()
              .duration(TRANSDURATION + 200)
              .delay(i * 300)
              .style("opacity", 1)
          );
        })
      );

      // COMMIT LINES
      points.commit.start.map((start, index) =>
        points.commit.end[index].map((end, i) => {
          return (
            end.flag &&
            svg
              .append("path")
              .attr("d", lineGen([start, end.points]))
              .attr("stroke", `${points.commit.color}`)
              .attr("fill", "none")
              .attr("stroke-width", 1)
              .attr("marker-end", "url(#arrow-commit)")
              .style("opacity", 0)
              .on("mouseover", function (event, d) {
                d3.select(this).attr("stroke-width", 2);
                svg
                  .append("text")
                  .attr("x", end.points.x + 10)
                  .attr("y", end.points.y - 10)
                  .attr("class", "tooltip")
                  .text("Commit Phase Completion Time: " + timeData.commit_times[i]);
              })
              .on("mouseout", function () {
                // Hide tooltip on mouseout
                d3.select(this).attr("stroke-width", 1);
                svg.selectAll(".tooltip").remove();
              })
              .transition()
              .duration(TRANSDURATION + 200)
              .delay(i * 400)
              .style("opacity", 1)
          );
        })
      );

      // REPLY LINES
      points.reply.start.forEach((start, i) => {
        return (
          start.flag &&
          svg
            .append("path")
            .attr("d", lineGen([start.points, points.reply.end[0].points]))
            .attr("stroke", `${points.reply.color}`)
            .attr("fill", "none")
            .attr("stroke-width", 1)
            .attr("marker-end", "url(#arrow-reply)")
            .style("opacity", 0)
            .transition()
            .duration(TRANSDURATION + 400)
            .delay(i * 500)
            .style("opacity", 1)
        );
      });
    }
  }, [theme, width, height]);

  useEffect(() => {
    debouncedRender();
  }, [debouncedRender]);

  useEffect(() => {
    console.log("MESSAGE HISTIRY", messageHistory);
  }, [messageHistory]);

  return (
    <div className='relative w-full h-full p-4'>
      {resizing ? (
        <div class='loader'>
          <div>PBFT</div>
          <div class='inner' />
        </div>
      ) : (
        <svg ref={ref} className='absolute'></svg>
      )}
    </div>
  );
};

export default PbftGraph;