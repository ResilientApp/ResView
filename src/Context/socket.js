import React, { createContext, useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const urls = [ "ws://localhost:21001", "ws://localhost:21002", "ws://localhost:21003", "ws://localhost:21004", ]; 

const addMessage = ( receivedMessage, setTransactionCount, setMessages, messageHistory, messages, setMessageHistory ) => { 
  if (receivedMessage === null) { return; } 
  const reply = new Date().getTime(); 
  let newMessage = { ...receivedMessage, reply_time: reply, }; 
  const txn_number = String(newMessage.txn_number); 
  const replica_number = String(newMessage.replica_id); 
  setMessages(messageHistory); 
  if (txn_number in messages) 
  { let txn_messages = messages[txn_number]; 
    txn_messages = { ...txn_messages, [replica_number]: newMessage, }; 
    messages[txn_number] = txn_messages; } 
    else { 
      let txn_messages = { [replica_number]: newMessage, }; 
      messages[txn_number] = txn_messages; 
      setTransactionCount((transactionCount) => transactionCount + 1); } 
      setMessageHistory(messages); }; 
      const useCreateWebSocket = ( url, messageHistory, setMessageHistory, setTransactionCount, setMessages, messages ) => { const { lastJsonMessage, readyState, disconnect } = useWebSocket(url, { shouldReconnect: () => true, }); useEffect(() => { if (readyState === WebSocket.OPEN) { console.log("OPEN"); } addMessage( lastJsonMessage, setTransactionCount, setMessages, messageHistory, messages, setMessageHistory ); setMessageHistory(messageHistory); }, [lastJsonMessage, readyState, disconnect]); }; export const GraphSocketDataContext = createContext({ messageHistory: {}, transactionCount: 0 }); export const GraphSocketDataProvider = ({ children }) => { const { Provider } = GraphSocketDataContext; const [messageHistory, setMessageHistory] = useState({}); const [transactionCount, setTransactionCount] = useState(0); const [messages, setMessages] = useState([]); const connectionList = [ useCreateWebSocket( urls[0], messageHistory, setMessageHistory, setTransactionCount, setMessages, messages ), useCreateWebSocket( urls[1], messageHistory, setMessageHistory, setTransactionCount, setMessages, messages ), useCreateWebSocket( urls[2], messageHistory, setMessageHistory, setTransactionCount, setMessages, messages ), useCreateWebSocket( urls[3], messageHistory, setMessageHistory, setTransactionCount, setMessages, messages ), ]; return ( <Provider value={{ messageHistory, transactionCount }}>{children}</Provider> ); };
