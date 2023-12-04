// TODO: ! KEEP THIS CODE AS IS. THIS IS FOR THE DYNAMIC GRAPH. I WILL CHANGE IT LATER.

import React, { useRef, useEffect, useContext, useState } from "react";
import * as d3 from "d3";
import { line } from "d3-shape";
import { GraphResizerContext } from "../../../../../Context/graph";
import { ThemeContext } from "../../../../../Context/theme";

const startPoint = { x: 50, y: 100 };

const endPoints = [
  { x: 200, y: 200 },
  { x: 200, y: 300 },
  { x: 200, y: 400 },
  { x: 200, y: 500 },
];

const verticalLineOne = [
  { x: 200, y: 0 },
  { x: 200, y: 100 },
  { x: 200, y: 200 },
  { x: 200, y: 300 },
  { x: 200, y: 400 },
  { x: 200, y: 500 },
  { x: 200, y: 600 },
];

const verticalLineTwo = [
  { x: 350, y: 0 },
  { x: 350, y: 100 },
  { x: 350, y: 200 },
  { x: 350, y: 300 },
  { x: 350, y: 400 },
  { x: 350, y: 500 },
  { x: 350, y: 600 },
];

const verticalLineThree = [
  { x: 500, y: 0 },
  { x: 500, y: 100 },
  { x: 500, y: 200 },
  { x: 500, y: 300 },
  { x: 500, y: 400 },
  { x: 500, y: 500 },
  { x: 500, y: 600 },
];

const verticalLineFour = [
  { x: 650, y: 0 },
  { x: 650, y: 100 },
  { x: 650, y: 200 },
  { x: 650, y: 300 },
  { x: 650, y: 400 },
  { x: 650, y: 500 },
  { x: 650, y: 600 },
];

const verticalLineFive = [
  { x: 800, y: 0 },
  { x: 800, y: 100 },
  { x: 800, y: 200 },
  { x: 800, y: 300 },
  { x: 800, y: 400 },
  { x: 800, y: 500 },
  { x: 800, y: 600 },
];

const verticalLineSix = [
  { x: 950, y: 0 },
  { x: 950, y: 100 },
  { x: 950, y: 200 },
  { x: 950, y: 300 },
  { x: 950, y: 400 },
  { x: 950, y: 500 },
  { x: 950, y: 600 },
];

const horizontalLineOne = [
  { x: 0, y: 100 },
  { x: 50, y: 100 },
  { x: 200, y: 100 },
  { x: 350, y: 100 },
  { x: 500, y: 100 },
  { x: 650, y: 100 },
  { x: 800, y: 100 },
  { x: 950, y: 100 },
];

const horizontalLineTwo = [
  { x: 0, y: 200 },
  { x: 50, y: 200 },
  { x: 200, y: 200 },
  { x: 350, y: 200 },
  { x: 500, y: 200 },
  { x: 650, y: 200 },
  { x: 800, y: 200 },
  { x: 950, y: 200 },
];

const horizontalLineThree = [
  { x: 0, y: 300 },
  { x: 50, y: 300 },
  { x: 200, y: 300 },
  { x: 350, y: 300 },
  { x: 500, y: 300 },
  { x: 650, y: 300 },
  { x: 800, y: 300 },
  { x: 950, y: 300 },
];

const horizontalLineFour = [
  { x: 0, y: 400 },
  { x: 50, y: 400 },
  { x: 200, y: 400 },
  { x: 350, y: 400 },
  { x: 500, y: 400 },
  { x: 650, y: 400 },
  { x: 800, y: 400 },
  { x: 950, y: 400 },
];

const horizontalLineFive = [
  { x: 0, y: 500 },
  { x: 50, y: 500 },
  { x: 200, y: 500 },
  { x: 350, y: 500 },
  { x: 500, y: 500 },
  { x: 650, y: 500 },
  { x: 800, y: 500 },
  { x: 950, y: 500 },
];

const generateLines = ({ data, numberOfTotalSteps, numberOfReplicas }) => {
  let verticalLineNo = numberOfTotalSteps;
  let horizontalLineNo = numberOfReplicas + 1;

  let xCoord = 0;
  let yCoord = 0;

  let verticalLines = new Array(verticalLineNo).fill([]);
  let horizontalLines = new Array(horizontalLineNo).fill([]);
};

const generateGroups = (
  initialX,
  initialY,
  data,
  numberOfSteps,
  numberOfReplicas
) => {
  //   ? FUTURE SCOPE: REmove the hard coding below and make this graph dynamic
  // FIRST STEP -> REQUEST
  let reqPoint = {
    x: 0,
    y: 0,
  };

  const spRequest = {
    x: data[reqPoint.x].x,
    y: data[reqPoint.y].y,
  };

  let prePreparePoint = {
    x: numberOfSteps + 2,
    y: numberOfSteps + 2,
  };

  const epRequest = {
    x: data[prePreparePoint.x].x,
    y: data[prePreparePoint.y].y,
  };

  const requestPoints = {
    start: spRequest,
    end: epRequest,
    color: "red",
  };

  //   SECOND STEP -> PRE-PREPARE
  const spPrePrepare = {
    ...epRequest,
  };

  let cumulativePoint = prePreparePoint.x + numberOfSteps + 2;

  const epPrePreparePoints = [];

  let countMax = numberOfReplicas - 1;
  let count = 1;

  while (count <= countMax) {
    epPrePreparePoints.push({
      x: data[cumulativePoint].x,
      y: data[cumulativePoint].y,
    });
    cumulativePoint = cumulativePoint + numberOfSteps + 1;
    count++;
  }

  const prePreparePoints = {
    spPrePrepare,
    epPrePreparePoints,
    color: "blue",
  };

  return {
    // STEP ONE -> REQUEST
    requestPoints,

    // STEP TWO -> PREPREPARE
    prePreparePoints,
  };
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

  const distX = Math.floor(cummulativeH / numberOfReplicas);
  const distY = Math.floor(cummulativeW / numberOfSteps);

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

  const { requestPoints, prePreparePoints } = generateGroups(
    0,
    0,
    newData,
    numberOfSteps,
    numberOfReplicas
  );

  return { newData, requestPoints, prePreparePoints };
};

const TITLES = ["REQUEST", "PRE-PREPARE", "PREPARE", "COMMIT", "REPLY"];

const TRANSDURATION = 750;

const PlotPoints = () => {
  const { boxValues, setBoxValues } = useContext(GraphResizerContext);
  const { theme } = useContext(ThemeContext);
  const { width, height } = boxValues;

  const ref = useRef(null);

  useEffect(() => {
    const { newData, requestPoints, prePreparePoints } = generatePoints(
      width,
      height,
      0,
      Math.floor(height / 20),
      4,
      5
    );
    console.log("DATA", newData, requestPoints, prePreparePoints);
    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .classed("border-1p", true)
      .classed("border-solid", true)
      .classed("border-gray-100", true);

    svg
      .selectAll("circle")
      .data(newData)
      .enter()
      .append("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 2)
      .attr("fill", `${!theme ? "black" : "white"}`);

    const lineGen = line()
      .x((d) => d.x)
      .y((d) => d.y);

    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 10)
      .attr("refY", 5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto-start-reverse")
      .append("path")
      .attr("fill", `${!theme ? "black" : "white"}`)
      .attr("d", "M 0 0 L 10 5 L 0 10 z");

    // First dotted vertical line DVL1
    svg
      .append("path")
      .attr("d", lineGen(verticalLineOne))
      .attr("stroke", "gray")
      .attr("fill", "none")
      .attr("stroke-width", 0.2)
      .attr("stroke-dasharray", "5,10");

    // dotted vertical line DVL2
    svg
      .append("path")
      .attr("d", lineGen(verticalLineTwo))
      .attr("stroke", "gray")
      .attr("fill", "none")
      .attr("stroke-width", 0.2)
      .attr("stroke-dasharray", "5,10");

    // dotted vertical line DVL3
    svg
      .append("path")
      .attr("d", lineGen(verticalLineThree))
      .attr("stroke", "gray")
      .attr("fill", "none")
      .attr("stroke-width", 0.2)
      .attr("stroke-dasharray", "5,10");

    // dotted vertical line DVL4
    svg
      .append("path")
      .attr("d", lineGen(verticalLineFour))
      .attr("stroke", "gray")
      .attr("fill", "none")
      .attr("stroke-width", 0.2)
      .attr("stroke-dasharray", "5,10");

    // dotted vertical line DVL5
    svg
      .append("path")
      .attr("d", lineGen(verticalLineFive))
      .attr("stroke", "gray")
      .attr("fill", "none")
      .attr("stroke-width", 0.2)
      .attr("stroke-dasharray", "5,10");

    // dotted vertical line DVL6
    svg
      .append("path")
      .attr("d", lineGen(verticalLineSix))
      .attr("stroke", "gray")
      .attr("fill", "none")
      .attr("stroke-width", 0.2)
      .attr("stroke-dasharray", "5,10");

    // dotted horizontal line DHL1
    svg
      .append("path")
      .attr("d", lineGen(horizontalLineOne))
      .attr("stroke", "gray")
      .attr("fill", "none")
      .attr("stroke-width", 0.2)
      .attr("stroke-dasharray", "5,10");

    // dotted horizontal line DHL2
    svg
      .append("path")
      .attr("d", lineGen(horizontalLineTwo))
      .attr("stroke", "gray")
      .attr("fill", "none")
      .attr("stroke-width", 0.2)
      .attr("stroke-dasharray", "5,10");

    // dotted horizontal line DHL3
    svg
      .append("path")
      .attr("d", lineGen(horizontalLineThree))
      .attr("stroke", "gray")
      .attr("fill", "none")
      .attr("stroke-width", 0.2)
      .attr("stroke-dasharray", "5,10");

    // dotted horizontal line DHL4
    svg
      .append("path")
      .attr("d", lineGen(horizontalLineFour))
      .attr("stroke", "gray")
      .attr("fill", "none")
      .attr("stroke-width", 0.2)
      .attr("stroke-dasharray", "5,10");

    // dotted horizontal line DHL5
    svg
      .append("path")
      .attr("d", lineGen(horizontalLineFive))
      .attr("stroke", "gray")
      .attr("fill", "none")
      .attr("stroke-width", 0.2)
      .attr("stroke-dasharray", "5,10");

    // Title: Request
    svg
      .append("text")
      .attr("transform", "translate(" + 130 + " ," + 50 + ")")
      .attr("fill", "white")
      .style("text-anchor", "middle")
      .text("Request");

    // REQUEST LINE ---->
    svg
      .append("path")
      .attr("d", lineGen([requestPoints.start, requestPoints.end]))
      .attr("stroke", `${requestPoints.color}`)
      .attr("fill", "none")
      .attr("stroke-width", 1)
      .attr("marker-end", "url(#arrow)")
      .style("opacity", 0)
      .transition()
      .duration(500)
      .delay(100)
      .style("opacity", 1);

    // PRE PREPARE LINE --->
    prePreparePoints.epPrePreparePoints.forEach((end, i) => {
      svg
        .append("path")
        .attr("d", lineGen([prePreparePoints.spPrePrepare, end]))
        .attr("stroke", `${prePreparePoints.color}`)
        .attr("fill", "none")
        .attr("stroke-width", 1)
        .attr("marker-end", "url(#arrow)")
        .style("opacity", 0)
        .transition()
        .duration(TRANSDURATION)
        .delay(i * 100)
        .style("opacity", 1);
    });
  }, [theme, boxValues]);

  return <svg ref={ref}></svg>;
};

export default PlotPoints;

const dataTest = [
  { x: 5, y: 10 },
  { x: 5, y: 20 },
  { x: 5, y: 30 },
  { x: 5, y: 40 },
  { x: 5, y: 50 },

  { x: 20, y: 10 },
  { x: 20, y: 20 },
  { x: 20, y: 30 },
  { x: 20, y: 40 },
  { x: 20, y: 50 },

  { x: 35, y: 10 },
  { x: 35, y: 20 },
  { x: 35, y: 30 },
  { x: 35, y: 40 },
  { x: 35, y: 50 },

  { x: 50, y: 10 },
  { x: 50, y: 20 },
  { x: 50, y: 30 },
  { x: 50, y: 40 },
  { x: 50, y: 50 },

  { x: 65, y: 10 },
  { x: 65, y: 20 },
  { x: 65, y: 30 },
  { x: 65, y: 40 },
  { x: 65, y: 50 },

  { x: 80, y: 10 },
  { x: 80, y: 20 },
  { x: 80, y: 30 },
  { x: 80, y: 40 },
  { x: 80, y: 50 },

  { x: 95, y: 10 },
  { x: 95, y: 20 },
  { x: 95, y: 30 },
  { x: 95, y: 40 },
  { x: 95, y: 50 },
];
