import React, { createContext, useEffect, useRef, useState } from "react";
import { computeTableData, computeTransInfo, truncData } from "../Components/Pages/Visualizer/Ancilliary/Computation/TransInfo";
import { 
    fetchCommitmentData, 
    fetchAllTransactionsFromReplica, 
    getConfig 
} from "../utils/commitmentDataFetcher";

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

        // Note: fetchCommitmentData now handles both BPF and legacy modes
        // based on REACT_APP_BPF_TRACE_AGENT flag

        const updateStatus = async () => {
            setLoading(true);
            const fetchStartTime = Date.now();
            const config = getConfig();
            
            try {
                let newMessageHistory = {};
                let hasData = false;

                if (isValidSeq) {
                    const txnKey = String(seqNumber);
                    const existingData = messageHistory[txnKey];
                    
                    if (existingData && Object.keys(existingData).length > 0) {
                        setCurrentTransaction(seqNumber);
                        hasData = true;
                    } else {
                        console.debug(`Fetching commitment data for seq ${seqNumber} (BPF Agent ${config.bpfAgentEnabled ? 'ENABLED' : 'DISABLED'})`);
                        
                        const replicaDataMap = await fetchCommitmentData(seqNumber);
                        
                        if (replicaDataMap) {
                            Object.entries(replicaDataMap).forEach(([replicaId, replicaData]) => {
                                if (replicaData !== null && replicaData !== undefined) {
                                    hasData = true;
                                    const txnNumber = String(replicaData.txn_number || seqNumber);
                                    
                                    if (!newMessageHistory[txnNumber]) {
                                        newMessageHistory[txnNumber] = {};
                                    }
                                    newMessageHistory[txnNumber][String(replicaId)] = replicaData;
                                }
                            });
                        }

                        if (hasData) {
                            setMessageHistory(prev => ({
                                ...prev,
                                ...newMessageHistory
                            }));
                            setCurrentTransaction(seqNumber);
                        } else {
                            setMessageHistory({});
                            setData({});
                            setTruncatedData({});
                        }
                    }
                } else {
                    console.debug(`Fetching latest commitment data (BPF Agent ${config.bpfAgentEnabled ? 'ENABLED' : 'DISABLED'})`);
                    
                    const replicaDataMap = await fetchCommitmentData(undefined);
                    
                    if (replicaDataMap) {
                        Object.entries(replicaDataMap).forEach(([replicaId, replicaData]) => {
                            if (replicaData !== null && replicaData !== undefined) {
                                hasData = true;
                                const txnNumber = String(replicaData.txn_number);
                                
                                if (!newMessageHistory[txnNumber]) {
                                    newMessageHistory[txnNumber] = {};
                                }
                                newMessageHistory[txnNumber][String(replicaId)] = replicaData;
                            }
                        });
                        
                        if (hasData) {
                            setMessageHistory(prev => ({
                                ...prev,
                                ...newMessageHistory
                            }));
                        }
                    } else if (!config.bpfAgentEnabled) {
                        const fetchPromises = [];
                        for (let i = 0; i < 4; i++) {
                            fetchPromises.push(fetchAllTransactionsFromReplica(i));
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

                        if (hasData && Object.keys(allMessages.current).length > 0) {
                            onMessage(allMessages.current);
                        }
                    }
                }

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