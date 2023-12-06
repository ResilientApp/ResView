import { Resizable } from "re-resizable";
import React, { useContext, useMemo, useState, useEffect } from "react";
import { GraphResizerContext, GraphViewContext } from "../../../Context/graph";
import { anglesRightIcon } from "../../../Resources/Icons";
import { Icon } from "../../Shared/Icon";
import Wrapper from "../../Shared/Wrapper";
import ButtonRow from "./Components/Ancillary/Buttons";
import GraphButtonRow from "./Components/Ancillary/GraphButtons";
import Dropdown from "./Components/Ancillary/Dropdown";
import TypeSelector from "./Components/Ancillary/TypeSelector";
import MvT from "./Components/Graphs/MvT";
import TransactionForm from "./Components/Graphs/Form";
import PbftGraph from "./Components/Graphs/PbftGraph";
import axios from 'axios';
import { WebSocketDemo } from '../../../Socket'


const colorList = ["hsl(148, 70%, 50%)", "hsl(200, 70%, 50%)", "hsl(171, 70%, 50%)", "hsl(313, 70%, 50%)"];

const mvtTitles = {
  1: "Prepare Messages vs Time Graph",
  2: "Commit Messages vs Time Graph",
};



const Visualizer = () => {
  const { graph, mvtGraphNo } = useContext(GraphViewContext);
  const { boxValues, setBoxValues } = useContext(GraphResizerContext);

  const [messageHistory, setMessageHistory]= useState({});
  const [currentTransaction, setCurrentTransaction] = useState(0);
  const [messageChartData, setMessageChartData] = useState([]);
  const [labelToggle, setLabelToggle] = useState({"Replica 1":true, "Replica 2":true, "Replica 3":true, "Replica 4":true});
  const [labelToggleFaulty, setLabelToggleFaulty] = useState({"Replica 1":false, "Replica 2":false, "Replica 3":false, "Replica 4":false});
  const [resetGraph, setResetGraph] = useState(0);

  const updateGraph = () => {
    let value = resetGraph;
    value=value+1;
    setResetGraph(value);
  }

  const toggle_line = (label) => {
    setLabelToggle((prevLabels) => {
      const updatedLabels = { ...prevLabels };
      updatedLabels[label] = !updatedLabels[label];
      return updatedLabels;
    });
    updateGraph();
  };

  const sendMessage = (replicaNumber) => {
    const ws_list = ['22001', '22002', '22003', '22004'];  
    const sendWs = new WebSocket('ws://localhost:'+ws_list[replicaNumber]);
    sendWs.onopen = () => {
      sendWs.send("Message");
    }
  }

  const toggle_faulty= (label) => {
    setLabelToggleFaulty((prevLabels) => {
      const updatedLabels = { ...prevLabels };
      updatedLabels[label] = !updatedLabels[label];
      return updatedLabels;
    });
    sendMessage(parseInt(label.slice(-1)-1));
    updateGraph();
  };
  const onMessage = (newData)=>{
    setMessageHistory(newData);
    setCurrentTransaction(Object.keys(messageHistory).length);

    console.log(messageHistory, 'MESSAGE HISTORY');
  };

  useEffect(() => {
    if(!(currentTransaction in messageHistory)){
      setMessageChartData([[],[]])
      console.log(currentTransaction, " Not in messageHistory")
    }
    else{
      const transactionData = messageHistory[currentTransaction];
      console.log(transactionData)
      let startTime=0;
      let firstPrepareTime=0;
      let pre_prepare_times=[];
      let prepare_times=[];
      let all_prepare_times=[];
      let all_commit_times=[];
      let label_list=[];

      Object.keys(transactionData).map((key) => {
        label_list.push("Replica " + key);
        if(transactionData[key].primary_id!==transactionData[key].replica_id){
          pre_prepare_times.push(Math.floor(transactionData[key].propose_pre_prepare_time/10000));
        }
        prepare_times.push(Math.floor(transactionData[key].prepare_time/10000));
        let replica_prepare_timestamps=[];
        let replica_commit_timestamps=[];
        transactionData[key]["prepare_message_timestamps"].map((time) => {
          replica_prepare_timestamps.push(Math.floor(time/10000));
        });
        transactionData[key]["commit_message_timestamps"].map((time) => {
          replica_commit_timestamps.push(Math.floor(time/10000));
        });
        all_prepare_times.push(replica_prepare_timestamps);
        all_commit_times.push(replica_commit_timestamps);
      });
      startTime = Math.min(...pre_prepare_times);
      firstPrepareTime = Math.min(...prepare_times);

      let prepareChartData=[];
      let commitChartData=[];
      for(let i=0; i<all_prepare_times.length; i++){
        let lineData=[{x:0, y:0}];
        for(let j=0; j<all_prepare_times[i].length; j++){
          lineData.push({x: all_prepare_times[i][j]-startTime, y: j});
          lineData.push({x: all_prepare_times[i][j]-startTime, y: j+1});
        }
        prepareChartData.push(lineData);
      }
      for(let i=0; i<all_commit_times.length; i++){
        let lineData=[{x:0, y:0}];
        for(let j=0; j<all_commit_times[i].length; j++){
          lineData.push({x: all_commit_times[i][j]-firstPrepareTime, y: j});
          lineData.push({x: all_commit_times[i][j]-firstPrepareTime, y: j+1});
        }
        commitChartData.push(lineData);
      }

      let preparePoints = [];
      let data = {};
      for(let i=0; i<label_list.length; i++){
        if(!labelToggle[label_list[i]]){
          data = {
            id: label_list[i],
            color: colorList[i],
            data: [],
          };
        }
        else{
          data = {
            id: label_list[i],
            color: colorList[i],
            data: prepareChartData[i],
          };
        }
        preparePoints.push(data);
      }
      let commitPoints = [];
      for(let i=0; i<label_list.length; i++){
        if(!labelToggle[label_list[i]]){
          data = {
            id: label_list[i],
            color: colorList[i],
            data: [],
          };
        }
        else{
          data = {
            id: label_list[i],
            color: colorList[i],
            data: commitChartData[i],
          };
        }
        commitPoints.push(data);
      }
      let pointData={1:preparePoints, 2:commitPoints};
      console.log("Graph: ", pointData);
      setMessageChartData(pointData);
    }
  }, [messageHistory, currentTransaction, labelToggle, resetGraph]);

  const sendGet = async (key) => {
    let url = 'http://127.0.0.1:18000/v1/transactions/' + key;
    try{
      const response= await axios.get(url);
      console.log("Get response: ", response.data);
    }
    catch(error){
      console.error("Error: ", error);
    }
  };

  const sendPost = async (key, value) => {
    let data = {"id": key, "value": value};
    let url = 'http://127.0.0.1:18000/v1/transactions/commit';
    try{
      const response = await axios.post(
        url,
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      console.log("Get response: ", response.data);
    }
    catch(error){
      console.error("Error: ", error);
    }
  };

  // TODO: Fill the below ? with appropriate title and its full form
  const graphToTitle = useMemo(
    () => ({
      PBFT: "Practical Byzantine Fault Tolerance Graph",
      MvT: mvtTitles[mvtGraphNo],
      "Form": "Transaction Form",
    }),
    [mvtGraphNo]
  );

  const GRAPH_CHANGE = useMemo(
    () => ({
      PBFT: <PbftGraph />,
      MvT: <MvT points={messageChartData[mvtGraphNo]}/>,
      "Form": <TransactionForm selectTransaction={setCurrentTransaction} sendSet={sendPost} sendGet={sendGet}/>,
    }),
    [messageChartData, mvtGraphNo]
  );

  return (
    <Wrapper>
      <div>
        <WebSocketDemo onMessage={onMessage} />
      </div>
      <div className='mt-[2em] mb-4 mx-8'>
        <ButtonRow />
      </div>
      {graph === "MvT" && (
        <div className='my-4' data-aos='fade-in' data-aos-delay={100}>
          <TypeSelector />
          <div className='mt-2 bg-white rounded-md shadow-md w-full py-3 px-2 dark:border-1p dark:border-solid dark:border-gray-50 dark:bg-blue-300'>
          <div className='text-20p text-center text-blue-190 p-2 '>Select Replica To be Faulty: </div>
            <div className="flex gap-x-7 justify-center">
            <button
                className={`text-20p p-2 m-1 border border-2p border-blue-190 font-sans h-40p w-450p cursor-pointer rounded-md flex items-center justify-center ${
                  labelToggleFaulty["Replica 1"] ? "bg-red-500 text-white" : "text-blue-190"
                }`}
                onClick={() => toggle_faulty("Replica 1")}
              >
                Replica 1
              </button>

              <button
                className={`text-20p p-2 m-1 border border-2p border-blue-190 font-sans h-40p w-450p cursor-pointer rounded-md flex items-center justify-center ${
                  labelToggleFaulty["Replica 2"] ? "bg-red-500 text-white" : "text-blue-190"
                }`}
                onClick={() => toggle_faulty("Replica 2")}
              >
                Replica 2
              </button>

              <button
                className={`text-20p p-2 m-1 border border-2p border-blue-190 font-sans h-40p w-450p cursor-pointer rounded-md flex items-center justify-center ${
                  labelToggleFaulty["Replica 3"] ? "bg-red-500 text-white" : "text-blue-190"
                }`}
                onClick={() => toggle_faulty("Replica 3")}
              >
                Replica 3
              </button>

              <button
                className={`text-20p p-2 m-1 border border-2p border-blue-190 font-sans h-40p w-450p cursor-pointer rounded-md flex items-center justify-center ${
                  labelToggleFaulty["Replica 4"] ? "bg-red-500 text-white" : "text-blue-190"
                }`}
                onClick={() => toggle_faulty("Replica 4")}
              >
                Replica 4
              </button>
            </div>

            <div className='text-20p text-center text-blue-190 p-2 '>Toggle Line Graph: </div>

            <div className="flex gap-x-7">
              {/* Replica Buttons */}
              <button
                className={`text-20p p-2 m-1 border border-2p border-blue-190 font-sans h-40p w-450p cursor-pointer rounded-md flex items-center justify-center ${
                  labelToggle["Replica 1"] ? "bg-blue-190 text-white" : "text-blue-190"
                }`}
                onClick={() => toggle_line("Replica 1")}
              >
                Replica 1
              </button>

              <button
                className={`text-20p p-2 m-1 border border-2p border-blue-190 font-sans h-40p w-450p cursor-pointer rounded-md flex items-center justify-center ${
                  labelToggle["Replica 2"] ? "bg-blue-190 text-white" : "text-blue-190"
                }`}
                onClick={() => toggle_line("Replica 2")}
              >
                Replica 2
              </button>


              <button
                className={`text-20p p-2 m-1 border border-2p border-blue-190 font-sans h-40p w-450p cursor-pointer rounded-md flex items-center justify-center ${
                  labelToggle["Replica 3"] ? "bg-blue-190 text-white" : "text-blue-190"
                }`}
                onClick={() => toggle_line("Replica 3")}
              >
                Replica 3
              </button>

              <button
                className={`text-20p p-2 m-1 border border-2p border-blue-190 font-sans h-40p w-450p cursor-pointer rounded-md flex items-center justify-center ${
                  labelToggle["Replica 4"] ? "bg-blue-190 text-white" : "text-blue-190"
                }`}
                onClick={() => toggle_line("Replica 4")}
              >
                Replica 4
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className='my-18p mx-5p text-24p text-blue-190'
        data-aos='fade-in'
        data-aos-delay={200}
      >
        {graphToTitle[graph]}
      </div>
      {/* {graph === "PBFT" && (
        <div className='my-4 mx-8' data-aos='fade-in' data-aos-delay={200}>
          <Dropdown length={4} />
        </div>
      )} */}
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
        {graph !== "PBFT" && (
          <div className='absolute bottom-0 right-0 rotate-45'>
            <Icon path={anglesRightIcon} fill={"gray"} height={"0.8em"} />
          </div>
        )}
      </Resizable>
    </Wrapper>
  );
};

export default Visualizer;
