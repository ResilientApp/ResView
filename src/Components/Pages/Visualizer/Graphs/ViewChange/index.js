import * as d3 from "d3";
import { line } from "d3-shape";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import throttle from 'lodash/throttle';
import { ThemeContext } from "../../../../../Context/theme";
import { useWindowSize } from "@react-hook/window-size";
import GraphContainer from "../Components/GraphContainer";
import { cancelIcon, pauseIcon, playIcon } from "../../../../../Resources/Icons";
import { DropDownButtons, IconButtons } from "../../../../Shared/Buttons";
import { Icon } from "../../../../Shared/Icon";
import { connectionRender } from "../../Ancilliary/Computation/D3Pbft";

const BPF_AGENT_URL = process.env.REACT_APP_BPF_TRACE_AGENT_URL || 'https://dev-bpf-agent.resilientdb.com';

const NUMBER_OF_STEPS_VIEW_CHANGE = 2; 
const ACTION_TYPE_VIEW_CHANGE = ['LEADER_ELECTION', 'NEW_VIEW'];
const COLORS_VIEW_CHANGE = ['#e91e63', '#4caf50'];

// Animation speeds (matching PBFT structure)
const VIEW_CHANGE_ANIMATION_SPEEDS = {
  '1x': {
    TRANSDURATION: 3000,
    VIEWCHANGE_BUFFER: 600,
    NEWVIEW_BUFFER: 600
  },
  '0.5x': {
    TRANSDURATION: 4000,
    VIEWCHANGE_BUFFER: 800,
    NEWVIEW_BUFFER: 800
  },
  '2x': {
    TRANSDURATION: 1500,
    VIEWCHANGE_BUFFER: 300,
    NEWVIEW_BUFFER: 300
  }
};

const generatePoints = (width, height, startY, spaceBetweenNodes, numReplicas, numSteps) => {
  const data = [];
  const usableWidth = width; // Use 90% of width for graph, leaving space for labels
  const graphStartX = width * 0.0; // Start 5% from left
  const stepWidth = usableWidth / (numSteps + 0.8);
  
  for (let step = 0; step <= numSteps; step++) {
    for (let replica = 0; replica < numReplicas; replica++) {
      const x = graphStartX + stepWidth * (step + 0.5);
      const y = startY + (replica * spaceBetweenNodes) + spaceBetweenNodes / 2;
      data.push({ x, y, step, replica });
    }
  }
  
  return data;
};

const generateLines = (data, numSteps) => {
  const xCoords = {};
  const yCoords = {};
  
  data.forEach(point => {
    if (!xCoords[point.step]) xCoords[point.step] = [];
    if (!yCoords[point.replica]) yCoords[point.replica] = [];
    xCoords[point.step].push(point);
    yCoords[point.replica].push(point);
  });
  
  const verticalLines = Object.values(xCoords);
  const horizontalLines = Object.values(yCoords);
  
  return { xCoords, yCoords, verticalLines, horizontalLines };
};

const generateLabels = (xCoords, yCoords, activeReplicaIds) => {
  const labelsX = [];
  const labelsY = [];
  
  // Position phase labels between the vertical lines
  const steps = Object.keys(xCoords).map(Number).sort((a, b) => a - b);
  for (let i = 0; i < steps.length - 1; i++) {
    const currentStep = steps[i];
    const nextStep = steps[i + 1];
    const currentPoints = xCoords[currentStep];
    const nextPoints = xCoords[nextStep];
    
    if (currentPoints.length > 0 && nextPoints.length > 0) {
      const minY = Math.min(...currentPoints.map(p => p.y));
      const midX = (currentPoints[0].x + nextPoints[0].x) / 2;
      
      labelsX.push({
        x: midX,
        y: minY - 40,
        title: ACTION_TYPE_VIEW_CHANGE[i] || `Phase ${i}`
      });
    }
  }
  
  Object.entries(yCoords).forEach(([replicaIndex, points]) => {
    if (points.length > 0) {
      const replicaIdx = parseInt(replicaIndex);
      const actualReplicaId = activeReplicaIds[replicaIdx];
      let label = `R${actualReplicaId}`;
      
      labelsY.push({
        x: points[0].x - 60,
        y: points[0].y,
        title: label
      });
    }
  });
  
  return { labelsX, labelsY };
};

const ViewChange = () => {
  const { theme } = useContext(ThemeContext);
  const [width, height] = useWindowSize();
  
  const [displayData, setDisplayData] = useState(null);
  const [playing, setPlaying] = useState(true);
  const [clear, setClear] = useState(false);
  const [speed, setSpeed] = useState('1x');
  
  const graphRef = useRef(null);
  const lineRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const colorMode = !theme ? 'black' : "#c4c4c4";
  const pointColorMode = theme ? '#edf0f5' : '#464747';
  
  const {
    TRANSDURATION,
    VIEWCHANGE_BUFFER,
    NEWVIEW_BUFFER
  } = VIEW_CHANGE_ANIMATION_SPEEDS[speed];

  // Fetch data from endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const useStatic = params.get('static') === 'true';
        const url = `${BPF_AGENT_URL}/bpf/viewchange${useStatic ? '?static=true' : ''}`;
        const response = await fetch(url);
        
        if (response.ok) {
          const data = await response.json();
          setDisplayData(data);
        }
      } catch (error) {
        console.error('Error fetching viewchange data:', error);
      }
    };

    fetchData();
  }, []);

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = throttle(() => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({ width: clientWidth, height: clientHeight });
      }
    }, 200);

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
      updateDimensions.cancel();
    };
  }, []);

  // Handle scroll-to-hash functionality
  useEffect(() => {
    const scrollToViewChange = () => {
      const hash = window.location.hash;
      // Only scroll if hash is exactly #viewchange or starts with #viewchange?
      if (hash === '#viewchange' || hash === '#view-change' || hash.startsWith('#viewchange?') || hash.startsWith('#view-change?')) {
        const element = document.getElementById('view-change');
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }, 100);
        }
      }
    };

    // Handle initial load
    scrollToViewChange();

    // Handle hash changes
    const handleHashChange = () => {
      scrollToViewChange();
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const clearBaseGraph = () => {
    d3.select(graphRef.current).selectAll("*").remove();
  };

  const clearAnimationLayers = () => {
    d3.select(lineRef.current).selectAll("*").remove();
  };

  const debouncedRender = useCallback(() => {
    clearBaseGraph();

    const { width, height } = dimensions;

    // Extract active replica IDs from displayData (for filtering animations)
    const activeReplicaIds = displayData?.replicas ? Object.keys(displayData.replicas).map(Number).sort((a, b) => a - b) : [1, 2, 3, 4];

    // Always render 4 replicas in the UI, but filter animations to active ones
    const data = generatePoints(
      width,
      height,
      0,
      Math.floor(height / 4),
      4,
      NUMBER_OF_STEPS_VIEW_CHANGE
    );

    const { xCoords, yCoords, verticalLines, horizontalLines } = generateLines(
      data,
      NUMBER_OF_STEPS_VIEW_CHANGE
    );

    const { labelsX, labelsY } = generateLabels(xCoords, yCoords, [1, 2, 3, 4]);

    const svg = d3
      .select(graphRef.current)
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
      .attr("r", '1.5')
      .attr("fill", `${!theme ? "black" : "white"}`);

    const lineGen = line()
      .x((d) => d.x)
      .y((d) => d.y);

    // ARROW HEAD
    ACTION_TYPE_VIEW_CHANGE.forEach((action, index) =>
      svg
        .append("defs")
        .append("marker")
        .attr("id", `arrow-${action}`)
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 10)
        .attr("refY", 5)
        .attr("markerWidth", 5)
        .attr("markerHeight", 5)
        .attr("orient", "auto-start-reverse")
        .append("path")
        .attr("fill", `${COLORS_VIEW_CHANGE[index]}`)
        .attr("d", "M 0 0 L 10 5 L 0 10 z")
    );

    // VERTICAL DOTTED LINES
    verticalLines.forEach((line, _) =>
      svg
        .append("path")
        .attr("d", lineGen(line))
        .attr("stroke", colorMode)
        .attr("fill", "none")
        .attr("stroke-width", 0.2)
        .attr("stroke-dasharray", "5,10")
    );

    // HORIZONTAL DOTTED LINES
    horizontalLines.forEach((line, _) =>
      svg
        .append("path")
        .attr("d", lineGen(line))
        .attr("stroke", colorMode)
        .attr("fill", "none")
        .attr("stroke-width", 0.2)
        .attr("stroke-dasharray", "5,10")
    );

    if (clear) {
      clearAnimationLayers();
    }

    if (playing && !clear) {
      const lineSVG = d3
        .select(lineRef.current)
        .attr("width", width)
        .attr("height", height)
        .classed("flex", true)
        .classed("justify-center", true)
        .classed("items-center", true);

      // ViewChange: All-to-all (quadratic pattern) - ANIMATED
      let delayIndex = 0;
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          // Only animate if both replicas are active
          const replicaI = i + 1;
          const replicaJ = j + 1;
          if (i !== j && activeReplicaIds.includes(replicaI) && activeReplicaIds.includes(replicaJ) && xCoords[0] && xCoords[1]) {
            const startPoint = xCoords[0].find(p => p.replica === i);
            const endPoint = xCoords[1].find(p => p.replica === j);
            
            if (startPoint && endPoint) {
              connectionRender(
                [startPoint, endPoint],
                COLORS_VIEW_CHANGE[0],
                pointColorMode,
                TRANSDURATION,
                delayIndex * VIEWCHANGE_BUFFER,
                lineGen,
                lineSVG,
                'viewchange'
              );
              delayIndex++;
            }
          }
        }
      }

      // NewView: One-to-all (primary to replicas) - ANIMATED
      const newPrimaryId = displayData?.replicas ? Object.values(displayData.replicas)[0]?.new_primary_id : null;
      const primaryIdx = newPrimaryId !== null ? newPrimaryId - 1 : 0;
      let newViewDelay = delayIndex * VIEWCHANGE_BUFFER + NEWVIEW_BUFFER;
      for (let j = 0; j < 4; j++) {
        // Only animate if the receiving replica is active
        const replicaJ = j + 1;
        if (j !== primaryIdx && activeReplicaIds.includes(replicaJ) && xCoords[1] && xCoords[2]) {
          const startPoint = xCoords[1].find(p => p.replica === primaryIdx);
          const endPoint = xCoords[2].find(p => p.replica === j);
          
          if (startPoint && endPoint) {
            connectionRender(
              [startPoint, endPoint],
              COLORS_VIEW_CHANGE[1],
              pointColorMode,
              TRANSDURATION,
              newViewDelay + (j * NEWVIEW_BUFFER),
              lineGen,
              lineSVG,
              'newview'
            );
          }
        }
      }
    }

    const relativeLabelFont = Math.floor((height + width) / 120);
    const relativeLabelYPos = Math.floor(relativeLabelFont / 2);
    const relativeLabelXPos = relativeLabelYPos - 4;

    // LABELS FOR EACH ACTION - RENDERED ON TOP
    labelsX.forEach((label) =>
      svg
        .append("text")
        .attr("transform", "translate(" + label.x + " ," + (label.y + relativeLabelYPos - 3) + ")")
        .attr("fill", colorMode)
        .attr("font-size", relativeLabelFont)
        .style("text-anchor", "middle")
        .text(`${label.title}`)
    );

    // LABELS FOR EACH NODE - RENDERED ON TOP
    labelsY.forEach((label, _) => {
      svg
        .append("text")
        .attr("transform", "translate(" + (label.x + relativeLabelXPos + 10) + " ," + label.y + ")")
        .attr("font-size", relativeLabelFont)
        .style("text-anchor", "middle")
        .text(`${label.title}`)
        .attr("fill", colorMode);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, dimensions, colorMode, pointColorMode, clear, playing, speed, displayData]);

  useEffect(() => {
    debouncedRender();
  }, [debouncedRender]);

  useEffect(() => {
    setClear(true);
    setTimeout(() => {
      setClear(false);
    }, 500);
  }, [speed, height, width]);

  const onClear = () => {
    setClear(true);
    setPlaying(false);
  };

  const onPlay = () => {
    setClear(false);
    setPlaying(true);
  };

  const onPause = () => {
    setPlaying(false);
  };

  const onTogglePlayPause = () => {
    if (playing) {
      onPause();
    } else {
      onPlay();
    }
  };

  const animationSpeedChange = (value) => setSpeed(value);

  const color = theme && clear ? 'gray' : theme && !clear ? 'white' : !theme && clear ? 'gray' : 'black';
  const viewNumber = displayData?.view ?? '-';
  const titleWithView = `Leader Replacement - View ${viewNumber}`;

  return (
    <div id="view-change" className="scroll-mt-20">
      <GraphContainer title={titleWithView} heightBig>
        <div className="flex justify-around w-full flex-row mt-8 mb-4">
          <div className="basis-1/4" />
          <div className="flex items-center justify-center gap-x-16 basis-1/2">
            <IconButtons title={playing ? 'Pause' : 'Play'} onClick={onTogglePlayPause} disabled={clear}>
              <Icon path={playing ? pauseIcon : playIcon} viewBox={'0 0 384 512'} height={'11px'} fill={color} />
            </IconButtons>
            {playing && (
              <DropDownButtons selected={speed} elements={['1x', '0.5x', '2x']} onClick={animationSpeedChange} />
            )}
            <IconButtons title={'Clear'} onClick={() => onClear()} disabled={clear}>
              <Icon path={cancelIcon} viewBox={'0 0 384 512'} height={'12px'} fill={color} />
            </IconButtons>
          </div>
          <div className="basis-1/4" />
        </div>
        <div ref={containerRef} className='relative w-full h-full'>
          <svg id={'svg-view-change'} ref={graphRef} className='absolute inset-0'></svg>
          {!clear && (
            <svg ref={lineRef} className='absolute inset-0'></svg>
          )}
        </div>
      </GraphContainer>
    </div>
  );
};

const index = () => {
  return (
    <ViewChange />
  );
};

export default index;
