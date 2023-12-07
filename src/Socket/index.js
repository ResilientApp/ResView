import React, { useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";

export const WebSocketDemo = ({onMessage}) => {
  //Public API that will echo messages sent to it back to the client
  const socketUrls = [
    'ws://localhost:21001',
    'ws://localhost:21002',
    'ws://localhost:21003',
    'ws://localhost:21004',
  ];
  const transactionCount = useRef(0);
  //Stores all messages from ResDB
  const allMessages = useRef({});
    //For Websocket functionality, boot up start_service.sh on backend first, then
  //load websocket. If console says "Websocket Open" for all 4, functionality works
  let updatedMessageList;

  const useCreateWebSocket = (url, onMessage) => {
    const {lastJsonMessage, readyState, sendMessage, disconnect} = useWebSocket(url, {
      shouldReconnect: () => true,
    });

    const updateSocketData = () => {
      addMessage(lastJsonMessage);
      onMessage(allMessages.current);
    };

    useEffect(() => {
      if(readyState===WebSocket.OPEN){
        console.log("OPEN");
      }
      updateSocketData();
    }, [lastJsonMessage, readyState, disconnect]);

  };

  const connectionList = [useCreateWebSocket(socketUrls[0], onMessage),
  useCreateWebSocket(socketUrls[1], onMessage),
  useCreateWebSocket(socketUrls[2], onMessage),
  useCreateWebSocket(socketUrls[3], onMessage)];


  const addMessage = (receivedMessage) => {
    if(receivedMessage===null){
      return;
    }
    console.log(receivedMessage);
    const reply= new Date().getTime();
    let newMessage = {
      ...receivedMessage,
      reply_time: reply,
    }
    const txn_number = String(newMessage.txn_number);
    const replica_number = String(newMessage.replica_id);
    updatedMessageList = allMessages.current;
    if(txn_number in updatedMessageList){
      let txn_messages = updatedMessageList[txn_number];
      txn_messages = {
        ...txn_messages,
        [replica_number]: newMessage,
      };
      updatedMessageList[txn_number]= txn_messages;
      console.log("Received Message: ", updatedMessageList)
      allMessages.current=updatedMessageList;
    }
    else{
      let txn_messages = {
        [replica_number]: newMessage,
      }
      updatedMessageList[txn_number]= txn_messages;
      console.log("Received Message: ", updatedMessageList)
      allMessages.current=updatedMessageList;
      transactionCount.current = transactionCount.current+1;
    }
    console.log(allMessages.current);
  }

  return (
    <div>
    </div>
  );
};
