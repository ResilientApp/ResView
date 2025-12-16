import React, { createContext, useEffect, useRef, useState } from "react";
import { computeTableData, computeTransInfo, truncData } from "../Components/Pages/Visualizer/Ancilliary/Computation/TransInfo";

export const VizDataHistoryContext = createContext({
    messageHistory: {},
    changeMessageHistory: (newHistory) => { },
    currentTransaction: -1,
    changeCurrentTransaction: (transactionNumber) => { },
    replicaStatus: [false, false, false, false],
    primaryIndexVal: -1,
    data: {},
    truncatedData: {},
    totalPercentFaulty: 0,
    totalHistoryLength: 0,
    noPrimaryCount: 0,
    loading: false,
});

export const VizDataHistoryProvider = ({ children }) => {
    const { Provider } = VizDataHistoryContext;
    const [messageHistory, setMessageHistory] = useState({});
    const [currentTransaction, setCurrentTransaction] = useState(-1);
    const [replicaStatus, setReplicaStatus] = useState([false, false, false, false])
    const [primaryIndexVal, setPrimaryIndexVal] = useState(-1)
    const [data, setData] = useState({});    
    const [truncatedData, setTruncatedData] = useState({});    
    const [totalPercentFaulty, setTotalPercentFaulty] = useState(0);
    const [totalHistoryLength, setTotalHistoryLength] = useState(0);
    const [noPrimaryCount, setNoPrimaryCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const transactionCount = useRef(0);
    const allMessages = useRef({});
    const keyList = useRef([[], [], [], []]);
    let updatedMessageList;


    const changeMessageHistory = (value) => {
        setMessageHistory(value)
    }

    const changeCurrentTransaction = (value) => {
        setLoading(true);
        setCurrentTransaction(value)
        const smallData = truncData(data, value);
        setTruncatedData(smallData)
        setLoading(false);
    }   

    const onMessage = (newData, txn_number) => {
        if (messageHistory) {
            let incomingData = JSON.parse(JSON.stringify(newData))
            changeMessageHistory({
                ...messageHistory,
                ...incomingData
            })
        } else {
            changeMessageHistory(JSON.parse(JSON.stringify(newData)));
        }
    };

    const addMessage = (receivedMessage) => {
        if (receivedMessage === null) {
            return;
        }
        const reply = new Date().getTime();
        let newMessage = {
            ...receivedMessage,
            reply_time: reply,
        }
        const txn_number = String(newMessage.txn_number);
        const replica_number = String(newMessage.replica_id);
        updatedMessageList = allMessages.current;
        if (txn_number in updatedMessageList) {
            let txn_messages = updatedMessageList[txn_number];
            txn_messages = {
                ...txn_messages,
                [replica_number]: newMessage,
            };
            updatedMessageList[txn_number] = txn_messages;
            allMessages.current = updatedMessageList;
        }
        else {
            let txn_messages = {
                [replica_number]: newMessage,
            }
            updatedMessageList[txn_number] = txn_messages;
            allMessages.current = updatedMessageList;
            transactionCount.current = transactionCount.current + 1;
        }
    }

    useEffect(() => {
        // Auto-select first transaction if currentTransaction is -1 and we have data
        if (currentTransaction === -1 && Object.keys(messageHistory).length > 0) {
            const firstTransaction = Object.keys(messageHistory).sort((a, b) => parseInt(a) - parseInt(b))[0];
            setCurrentTransaction(parseInt(firstTransaction));
            return;
        }
        
        setLoading(true);
        let results = [false, false, false, false];
        const { primaryIndex, currentStatus } = computeTransInfo(messageHistory, currentTransaction, results)

        setReplicaStatus(currentStatus)
        setPrimaryIndexVal(primaryIndex)

        const { data, totalPctFaulty, totalHistLength, noPrimaryCnt } = computeTableData(messageHistory);

        const smallData = truncData(data, currentTransaction);

        setData(data);
        setTotalPercentFaulty(totalPctFaulty)
        setTotalHistoryLength(totalHistLength)
        setNoPrimaryCount(noPrimaryCnt);
        setTruncatedData(smallData)

        setLoading(false);
    }, [currentTransaction, messageHistory])

    useEffect(() => {
        const fetchData = async (replicaPort) => {
            try {
                // replicaPort is 0-indexed (0, 1, 2, 3) → replica numbers (1, 2, 3, 4)
                // Ports: replica-1 = 18501, replica-2 = 18502, replica-3 = 18503, replica-4 = 18504
                const replicaNumber = replicaPort + 1;
                const port = 18501 + replicaPort;
                
                const response = await fetch(`https://dev-replica-${replicaNumber}-stats.resilientdb.com/consensus_data`);
                //const response = await fetch(process.env.REACT_APP_DEFAULT_LOCAL + String(port) + "/consensus_data");
                const newData = await response.json();
                if(newData !== null && typeof newData === 'object'){
                    Object.keys(newData).forEach((key) => {
                        // Use a unique key per replica to track which messages we've seen
                        const uniqueKey = `${replicaPort}_${key}`;
                        if (!keyList.current[replicaPort].includes(uniqueKey)) {
                            keyList.current[replicaPort].push(uniqueKey);
                            // Add the message to allMessages, grouped by transaction number
                            addMessage(newData[key]);
                        }
                    });
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const updateStatus = async () => {
            setLoading(true);
            const fetchStartTime = Date.now();

            try {
                const fetchPromises = [];
                for (let i = 0; i < 4; i++) {
                    fetchPromises.push(fetchData(i));
                }

                await Promise.all(fetchPromises);
                
                // Update messageHistory once after all fetches complete
                if (Object.keys(allMessages.current).length > 0) {
                    onMessage(allMessages.current);
                }

                const elapsedTime = Date.now() - fetchStartTime;

                const remainingTime = 1000 - elapsedTime;

                if (remainingTime > 0) {
                    await new Promise((resolve) => setTimeout(resolve, remainingTime));
                }
            } finally {
                setLoading(false);
            }
        };

        updateStatus();
        const interval = setInterval(updateStatus, 20000);

        return () => clearInterval(interval);
    }, []);


    return (
        <Provider value={
            {   messageHistory, 
                changeMessageHistory, 
                changeCurrentTransaction, 
                replicaStatus, 
                currentTransaction, 
                primaryIndexVal,
                data, 
                totalPercentFaulty,
                totalHistoryLength,
                noPrimaryCount,
                loading,
                truncatedData
            }
        }>
            {children}
        </Provider>
    )
}