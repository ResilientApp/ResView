import React, { createContext, useState } from "react";

export const GraphResizerContext = createContext({
  width: 1200,
  height: 800,
  resizing: false
});

export const GraphResizerProvider = ({ children }) => {
  const { Provider } = GraphResizerContext;
  const [height, setHeight] = useState(1200)
  const [width, setWidth] = useState(800)

  const [boxValues, setBoxValues] = useState({
    width: height ?? 1200,
    height: width ?? 800,
  });
  const [resizing, setResizing] = useState(false);

  return (
    <Provider value={{ boxValues, setBoxValues, resizing, setResizing, setHeight, setWidth }}>
      {children}
    </Provider>
  );
};

// CONTEXT FOR THE GRAPH VIEW
export const GraphViewContext = createContext({
  graph: "MvT",
  mvtGraphNo: 1,
  toggleGraphChange: () => {},
  toggleMvtGraphNoChange: () => {},
});


// CONTEXT FOR PBFT GRAPH ANIMATION SPEEDS 
export const PbftAnimationSpeedContext = createContext({
  speed: '1x',
});

export const PbftAnimationSpeedProvider = ({ children }) => {
  const { Provider } = PbftAnimationSpeedContext;
  const [speed, setSpeed] = useState('1x')

  const changeSpeed = (value) => setSpeed(value);

  return (
    <Provider value={{ speed, changeSpeed }}>
      {children}
    </Provider>
  );
};

// CONTEXT FOR PBFT GRAPH CLEARING
export const PbftGraphClearContext = createContext({
  clear: false,
});

export const PbftGraphClearProvider = ({ children }) => {
  const { Provider } = PbftGraphClearContext;
  const [clear, setClear] = useState(false)

  const changeClear = (value) => setClear(value);

  return (
    <Provider value={{ clear, changeClear }}>
      {children}
    </Provider>
  );
};
