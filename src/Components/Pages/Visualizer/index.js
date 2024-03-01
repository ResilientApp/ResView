import axios from 'axios';
import { Resizable } from "re-resizable";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { GraphResizerContext, GraphViewContext } from "../../../Context/graph";
import { anglesRightIcon } from "../../../Resources/Icons";
import { WebSocketDemo } from '../../../Socket';
import { Icon } from "../../Shared/Icon";
import Wrapper from "../../Shared/Wrapper";
import ButtonRow from "./Components/Ancillary/Buttons";
import TypeSelector from "./Components/Ancillary/TypeSelector";
import TransactionForm from "./Components/Graphs/Form";
import MvT, { MvTGraphManipulator } from "./Components/Graphs/MvT";
import PbftGraph from "./Components/Graphs/PbftGraph";


const colorList = ["hsl(148, 70%, 50%)", "hsl(200, 70%, 50%)", "hsl(171, 70%, 50%)", "hsl(313, 70%, 50%)"];

const mvtTitles = {
  1: "Prepare Messages vs Time Graph",
  2: "Commit Messages vs Time Graph",
};



const Visualizer = () => {
  const { graph, mvtGraphNo } = useContext(GraphViewContext);
  const { boxValues, setBoxValues, setResizing } =
    useContext(GraphResizerContext);

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

  const toggleLine = (label) => {
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

  const toggleFaulty= (label) => {
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

    // console.log(messageHistory, 'MESSAGE HISTORY');
  };

  useEffect(() => {
    if(!(currentTransaction in messageHistory) || messageHistory[currentTransaction].current_time<0){
      setMessageChartData([[],[]])
      // console.log(currentTransaction, " Not in messageHistory")
    }
    else{
      const transactionData = messageHistory[currentTransaction];
      console.log("TRANSACTION",transactionData)
      let startTime=0;
      let firstPrepareTime=0;
      let pre_prepare_times=[];
      let prepare_times=[];
      let all_prepare_times=[];
      let all_commit_times=[];
      let label_list=[];

      Object.keys(transactionData).forEach((key) => {
        if(transactionData[key].commit_time<0){
          return;
        }
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
      for(const element of all_prepare_times){
        let lineData=[{x:0, y:0}];
        for(let j=0; j<element.length; j++){
          lineData.push({x: element[j]-startTime, y: j});
          lineData.push({x: element[j]-startTime, y: j+1});
        }
        prepareChartData.push(lineData);
      }
      for(const element of all_commit_times){
        let lineData=[{x:0, y:0}];
        for(let j=0; j<element.length; j++){
          lineData.push({x: element[j]-firstPrepareTime, y: j});
          lineData.push({x: element[j]-firstPrepareTime, y: j+1});
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
      // console.log("Get response: ", response.data);
    }
    catch(error){
      // console.error("Error: ", error);
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
      // console.log("Get response: ", response.data);
    }
    catch(error){
      // console.error("Error: ", error);
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
      PBFT: <PbftGraph messageHistory={messageHistory} transactionNumber={currentTransaction}/>,
      MvT: <MvT points={messageChartData[mvtGraphNo]} />,
      Form: (
        <TransactionForm
          selectTransaction={setCurrentTransaction}
          sendSet={sendPost}
          sendGet={sendGet}
        />
      ),
    }),
    [messageChartData, mvtGraphNo, messageHistory]
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
        </div>
      )}
      <div
        className='my-18p mx-5p text-24p text-blue-190'
        data-aos='fade-in'
        data-aos-delay={200}
      >
        {graphToTitle[graph]}
      </div>
      <Resizable
        className='py-3 px-2 shadow-md flex justify-center items-center rounded-md bg-white my-[2em] dark:border-1p dark:border-solid dark:border-gray-50 dark:bg-blue-300 relative'
        data-aos='fade-in'
        data-aos-delay={300}
        size={{ width: boxValues.width, height: boxValues.height }}
        onResizeStop={(e, direction, ref, d) => {
          setResizing(false);
          setBoxValues({
            width: boxValues.width + d.width,
            height: boxValues.height + d.height,
          });
        }}
        onResizeStart={(e, d, r) => setResizing(true)}
      >
        {GRAPH_CHANGE[graph]}
        <div className='absolute bottom-0 right-0 rotate-45'>
          <Icon path={anglesRightIcon} fill={"gray"} height={"0.8em"} />
        </div>
      </Resizable>
      {graph === "MvT" && (
        <div className='mt-4 mb-4'>
          <MvTGraphManipulator
            toggleFaulty={toggleFaulty}
            toggleLine={toggleLine}
            labelToggleFaulty={labelToggleFaulty}
            labelToggle={labelToggle}
          />
        </div>
      )}
    </Wrapper>
  );
};



export default Visualizer;
