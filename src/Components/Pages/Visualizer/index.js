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
import CandC from "./Components/Graphs/CandC";
import TestingGraph from "./Components/Graphs/TestingGraphs";
import TransactionForm from "./Components/Graphs/Form";
import axios from 'axios';
import { WebSocketDemo } from '../../../Socket'


// TODO: Remove the below Unknown dummy component once the other graphs are built and remove it from GRAPH_CHANGE object
const Dummy = () => {
  return <div className='text-18p my-4 mx-4 text-red-50'>Dummy</div>;
};

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

  const toggle_line = (label) => {
    console.log("Toggling ", labelToggle);
    let labels = labelToggle;
    labels[label]=!(labels[label]);
    setLabelToggle(labels);
    console.log("NEw bool is ", labelToggle);
  };
  const onMessage = (newData)=>{
    setMessageHistory(newData);
    setCurrentTransaction(Object.keys(messageHistory).length);

    console.log(messageHistory, 'MESSAGE HISTORY')
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

      console.log("Pre_prepare time: ", pre_prepare_times);
      console.log("All timestamps: ", all_prepare_times);
      startTime = Math.min(...pre_prepare_times);
      firstPrepareTime = Math.min(...prepare_times);
      console.log(startTime);

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

      console.log("Prepare Chart Data: ", prepareChartData);
      console.log("Commit Chart Data: ", commitChartData);

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
  }, [messageHistory, currentTransaction, labelToggle]);

  const sendGet = async () => {
    let key = 'key1';
    let url = 'http://127.0.0.1:18000/v1/transactions/' + key;
    try{
      const response= await axios.get(url);
      console.log("Get response: ", response.data);
    }
    catch(error){
      console.error("Error: ", error);
    }
  };

  const sendPost = async () => {
    let key = 'key1';
    let value = 'value1';
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
      // PBFT: <PbftGraph />,
      "Form": <TransactionForm />,
      PBFT: <TestingGraph />,
      MvT: <CandC points={messageChartData[mvtGraphNo]}/>,
      // "?" : <FormJS />,
    }),
    [messageChartData, mvtGraphNo]
  );

  return (
    <Wrapper>
      <div>
        <WebSocketDemo onMessage={onMessage} />
      </div>
      {/* <div>
        <button className="bg-white" onClick={sendPost}>Test Set Transaction</button>
        {'\n'}
        <button className="bg-white" onClick={sendGet}>Test Get Transaction</button>
      </div>
      <div>
        <button className="bg-white" onClick={() =>toggle_line("Replica 1")}>Toggle Replica 1 Line</button>
        {'\n'}
        <button className="bg-white" onClick={() =>toggle_line("Replica 2")}>Toggle Replica 2 Line</button>
        {'\n'}
        <button className="bg-white" onClick={() =>toggle_line("Replica 3")}>Toggle Replica 3 Line</button>
        {'\n'}
        <button className="bg-white" onClick={() =>toggle_line("Replica 4")}>Toggle Replica 4 Line</button>
      </div> */}
      <div className='mt-[2em] mb-4 mx-8'>
        <ButtonRow />
      </div>
      {graph === "MvT" && (
        <div className="my-4" data-aos='fade-in' data-aos-delay={100}>
          <TypeSelector />
          <div className='mt-2 bg-white rounded-md shadow-md w-full py-3 px-2 dark:border-1p dark:border-solid dark:border-gray-50 dark:bg-blue-300'>
            <div className="flex gap-x-7 justify-center">
              {/* Set Transaction Button */}
              <button className="text-20p p-2 m-1 border border-2p border-blue-190 text-blue-190 font-sans h-40p w-450p cursor-pointer rounded-md flex items-center justify-center hover:bg-blue-200 hover:text-white hover:border-blue-200" 
              onClick={sendPost}>
                Set Transaction
              </button>

              {/* Get Transaction Button */}
              <button className="text-20p p-2 m-1 border border-2p border-blue-190 text-blue-190 font-sans h-40p w-450p cursor-pointer rounded-md flex items-center justify-center hover:bg-blue-200 hover:text-white hover:border-blue-200" 
              onClick={sendGet}>
                Get Transaction
              </button>
            </div>

            <div className='text-20p text-center text-blue-190 p-2 '>Toggle Line Graph: </div>

            <div className="flex gap-x-7">
              {/* Replica Buttons */}
              <button className="text-20p p-2 m-1 border border-2p border-blue-190 text-blue-190 font-sans h-40p w-450p cursor-pointer rounded-md flex items-center justify-center hover:bg-blue-200 hover:text-white hover:border-blue-200"
              onClick={() =>toggle_line("Replica 1")}>
                Replica 1
              </button>

              <button className="text-20p p-2 m-1 border border-2p border-blue-190 text-blue-190 font-sans h-40p w-450p cursor-pointer rounded-md flex items-center justify-center hover:bg-blue-200 hover:text-white hover:border-blue-200"
              onClick={() =>toggle_line("Replica 2")}>
                Replica 2
              </button>

              <button className="text-20p p-2 m-1 border border-2p border-blue-190 text-blue-190 font-sans h-40p w-450p cursor-pointer rounded-md flex items-center justify-center hover:bg-blue-200 hover:text-white hover:border-blue-200"
              onClick={() =>toggle_line("Replica 3")}>
                Replica 3
              </button>

              <button className="text-20p p-2 m-1 border border-2p border-blue-190 text-blue-190 font-sans h-40p w-450p cursor-pointer rounded-md flex items-center justify-center hover:bg-blue-200 hover:text-white hover:border-blue-200"
              onClick={() =>toggle_line("Replica 4")}>
                Replica 4
              </button>
            </div>
          </div>


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