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
        
        // Update URL with seq parameter, preserving hash
        if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            url.searchParams.set('seq', value);
            const newUrl = url.pathname + url.search + url.hash;
            window.history.pushState({}, '', newUrl);
            setUrlSearch(url.search);
        }
        
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

    const [urlSearch, setUrlSearch] = useState(
        typeof window !== 'undefined' ? window.location.search : ''
    );

    useEffect(() => {
        const handlePopState = () => {
            setUrlSearch(window.location.search);
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Check query string first (normal format: ?seq=153#timeline)
            let searchParams = new URLSearchParams(window.location.search);
            let seqParam = searchParams.get('seq');
            
            // If not in query string, check hash fragment (format: #timeline?seq=153)
            if (seqParam === null && window.location.hash) {
                const hashParts = window.location.hash.split('?');
                if (hashParts.length > 1) {
                    searchParams = new URLSearchParams(hashParts[1]);
                    seqParam = searchParams.get('seq');
                }
            }
            
            if (seqParam !== null) {
                const seqNumber = parseInt(seqParam, 10);
                if (!isNaN(seqNumber) && seqNumber >= 0 && seqNumber !== currentTransaction) {
                    setCurrentTransaction(seqNumber);
                }
            }
        }
    }, [urlSearch, currentTransaction]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const currentSearch = window.location.search;
            if (currentSearch !== urlSearch) {
                setUrlSearch(currentSearch);
            }
        }

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
    }, [currentTransaction, messageHistory, urlSearch])

    useEffect(() => {
        // Check query string first (normal format: ?seq=153#timeline)
        let searchParams = new URLSearchParams(window.location.search);
        let seqParam = searchParams.get('seq');
        
        // If not in query string, check hash fragment (format: #timeline?seq=153)
        if (seqParam === null && window.location.hash) {
            const hashParts = window.location.hash.split('?');
            if (hashParts.length > 1) {
                searchParams = new URLSearchParams(hashParts[1]);
                seqParam = searchParams.get('seq');
            }
        }
        
        const hasSeqParam = seqParam !== null && seqParam !== '';
        const seqNumber = hasSeqParam ? parseInt(seqParam, 10) : null;
        const isValidSeq = hasSeqParam && !isNaN(seqNumber) && seqNumber >= 0;

        const fetchSingleTransaction = async (replicaPort, seq) => {
            try {
                const replicaNumber = replicaPort + 1;
                const response = await fetch(`https://dev-replica-${replicaNumber}-stats.resilientdb.com/consensus_data/${seq}`);
                
                if (response.status === 404) {
                    return null;
                }
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const newData = await response.json();
                if (newData !== null && typeof newData === 'object' && String(seq) in newData) {
                    return newData[String(seq)];
                }
                return null;
            } catch (error) {
                console.error(`Error fetching data from replica ${replicaPort + 1}:`, error);
                return null;
            }
        };

        const fetchAllTransactions = async (replicaPort) => {
            try {
                const replicaNumber = replicaPort + 1;
                const response = await fetch(`https://dev-replica-${replicaNumber}-stats.resilientdb.com/consensus_data`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const newData = await response.json();
                if (newData !== null && typeof newData === 'object') {
                    return newData;
                }
                return null;
            } catch (error) {
                console.error(`Error fetching data from replica ${replicaPort + 1}:`, error);
                return null;
            }
        };

        const updateStatus = async () => {
            setLoading(true);
            const fetchStartTime = Date.now();
            
            try {
                let newMessageHistory = {};
                let hasData = false;

                if (isValidSeq) {
                    const fetchPromises = [];
                    for (let i = 0; i < 4; i++) {
                        fetchPromises.push(fetchSingleTransaction(i, seqNumber));
                    }

                    const results = await Promise.all(fetchPromises);
                    
                    results.forEach((message, replicaIndex) => {
                        if (message !== null && message !== undefined) {
                            hasData = true;
                            const replicaId = replicaIndex + 1;
                            const txnNumber = String(message.txn_number || seqNumber);
                            
                            if (!newMessageHistory[txnNumber]) {
                                newMessageHistory[txnNumber] = {};
                            }
                            newMessageHistory[txnNumber][String(replicaId)] = message;
                        }
                    });

                    if (hasData) {
                        setMessageHistory(newMessageHistory);
                        setCurrentTransaction(seqNumber);
                    } else {
                        setMessageHistory({});
                        setData({});
                        setTruncatedData({});
                    }
                } else {
                    const fetchPromises = [];
                    for (let i = 0; i < 4; i++) {
                        fetchPromises.push(fetchAllTransactions(i));
                    }

                    const allData = await Promise.all(fetchPromises);
                    
                    allData.forEach((replicaData, replicaIndex) => {
                        if (replicaData !== null && typeof replicaData === 'object') {
                            hasData = true;
                            
                            Object.keys(replicaData).forEach((key) => {
                                const uniqueKey = `${replicaIndex}_${key}`;
                                if (!keyList.current[replicaIndex].includes(uniqueKey)) {
                                    keyList.current[replicaIndex].push(uniqueKey);
                                    addMessage(replicaData[key]);
                                }
                            });
                        }
                    });

                    // Update messageHistory using the original onMessage approach (merges with existing)
                    if (hasData && Object.keys(allMessages.current).length > 0) {
                        onMessage(allMessages.current);
                    }
                }

                // For "fetch all" case, maintain the original timing behavior
                if (!isValidSeq) {
                    const elapsedTime = Date.now() - fetchStartTime;
                    const remainingTime = 1000 - elapsedTime;
                    if (remainingTime > 0) {
                        await new Promise((resolve) => setTimeout(resolve, remainingTime));
                    }
                }
            } catch (error) {
                console.error("Error updating status:", error);
                setMessageHistory({});
                setData({});
                setTruncatedData({});
            } finally {
                setLoading(false);
            }
        };

        updateStatus();
        const interval = setInterval(updateStatus, 20000);

        return () => clearInterval(interval);
    }, [urlSearch]);


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