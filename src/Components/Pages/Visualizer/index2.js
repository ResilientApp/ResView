import React, { useEffect, useState } from "react";
import { DATA_TABLE_DELAY, VISUALIZER_PAGE_SUBTITLE } from "../../../Constants";
import { anglesRightIcon, eyeIcon } from "../../../Resources/Icons";
import { WebSocket } from '../../../Socket';
import { LinkButton } from '../../Shared/Buttons';
import HRline from '../../Shared/HRline';
import { Icon } from '../../Shared/Icon';
import Title, { FontVarTitle, Subtitle } from '../../Shared/Title';
import { VisualizerWrapper } from "../../Shared/Wrapper";
import Mvt from './Graphs/MVT';
import PBFT from './Graphs/PBFT';
import Input from './Input';
import GraphContainer from './Graphs/GraphContainer';
import TransInfo from './TransInfo';
import Footer from "../../Shared/Footer";
import DataTable from './DataTable'


const Visualizer = () => {
    const [messageHistory, setMessageHistory] = useState({});
    const [currentTransaction, setCurrentTransaction] = useState(17);
    const [replicaStatus, setReplicaStatus] = useState([false, false, false, false])


    const onMessage = (newData, txn_number) => {
        setMessageHistory(JSON.parse(JSON.stringify(newData)));
        setCurrentTransaction(txn_number);
    };

    function fetchWithTimeout(url, options, timeout = 5000) {
        return Promise.race([
            fetch(url, options),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Timeout')), timeout)
            )
        ]);
    }

    function fetchReplicaStatuses() {
        let promises = [];
        let results = [false, false, false, false];

        for (let i = 0; i < 4; i++) {
            //let port= parseInt(process.env.REACT_APP_DEFAULT_LOCAL_PORT)+i
            //let url = process.env.REACT_APP_DEFAULT_LOCAL + String(port) + process.env.REACT_APP_REPLICA_STATUS_EP
            let port = parseInt(18501) + i
            let url = "http://localhost:" + String(port) + "/get_status"
            let promise = fetchWithTimeout(url)
                .then(response => {
                    return response.text();
                })
                .then(body => {
                    if (body === 'Not Faulty') {
                        results[i] = true;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });

            promises.push(promise);
        }

        Promise.all(promises)
            .then(() => {
                setReplicaStatus(results);
            });
    }
    useEffect(() => {
        const interval = setInterval(() => {
            fetchReplicaStatuses();
        }, 3000); // 3000 milliseconds = 3 seconds

        return () => clearInterval(interval);
    }, []);


    return (
        <div className="py-6 h-full">
            <TransInfo 
                messageHistory={messageHistory} 
                transactionNumber={currentTransaction} 
                status={replicaStatus} 
            />
            <div className="ml-[220px] px-8 pt-6 h-full">
                <div className="grid grid-cols-3f-1f gap-x-6 w-full h-full">
                    <GraphContainer title={'Practical Byzantine Fault Tolerance'} heightBig>
                        {/* <PBFT
                        messageHistory={messageHistory}
                        realTransactionNumber={currentTransaction}
                    /> */}
                    </GraphContainer>
                    <GraphContainer title={'Transactions Overview'} heightBig disableExpand>
                        {/* <Input chooseTransaction={setCurrentTransaction} /> */}
                        
                    </GraphContainer>
                </div>
                <div className="my-8 px-24 w-full">
                    <HRline />
                </div>
                <div className="">
                    <Mvt
                        messageHistory={messageHistory}
                        currentTransaction={currentTransaction}
                    />
                </div>
                <div className="my-10 px-24 w-full">
                    <HRline />
                </div>
                <div className="px-24">
                    <DataTable 
                        messageHistory={messageHistory} 
                        delay={DATA_TABLE_DELAY}
                    />
                </div>
                <div className="mt-10 mb-24 px-24 w-full">
                    <HRline />
                </div>
                <div className="mb-[-2em]">
                    <Footer />
                </div>
            </div>
        </div>
    )
}


const index = () => {
    return (
        <>
            <Visualizer />
        </>
    );
}


export default index



