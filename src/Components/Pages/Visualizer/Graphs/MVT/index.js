import { useContext, useEffect, useState } from "react";
import { VizDataHistoryContext } from "../../../../../Context/visualizer";
import { mvtGraphComputation } from "../../Ancilliary/Computation/MVT";
import ResizableContainer from "../Components/GraphContainer";
import MvtGraph from "./Components/Graph";
import Manipulator from "./Components/Manipulator";
import Form from "./Components/Form";

const LABEL_TOGGLES = { "Replica 1": true, "Replica 2": true, "Replica 3": true, "Replica 4": true };
const FAULT_TOGGLES = { "Replica 1": false, "Replica 2": false, "Replica 3": false, "Replica 4": false };

const updateLabelToggles = (status) => {
    let updatedLabel = {};
    status.forEach((value, index) => {
        let str = `Replica ${index + 1}`;
        updatedLabel = {
            ...updatedLabel,
            [str]: value
        };
    });
    return updatedLabel;
}

const updateFaultToggles = (status) => {
    let updatedFaultToggles = {};
    status.forEach((value, index) => {
        let str = `Replica ${index + 1}`;
        updatedFaultToggles = {
            ...updatedFaultToggles,
            [str]: !value
        };
    });
    return updatedFaultToggles;
}

const Mvt = () => {
    const { messageHistory, currentTransaction, replicaStatus } = useContext(VizDataHistoryContext);
    const [messageChartData, setMessageChartData] = useState([]);
    const [chartMaxData, setChartMaxData] = useState({});
    const [labelToggle, setLabelToggle] = useState(LABEL_TOGGLES);
    const [labelToggleFaulty, setLabelToggleFaulty] = useState(FAULT_TOGGLES);
    const [resetGraph, setResetGraph] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const updateGraph = () => {
        let value = resetGraph;
        value = value + 1;
        setResetGraph(value);
    };

    const toggleFaulty = (label) => {
        setLabelToggleFaulty((prevLabels) => {
            const updatedLabels = { ...prevLabels };
            updatedLabels[label] = !updatedLabels[label];
            return updatedLabels;
        });

        const setFaulty = async (label) => {
            try {
                let response = await fetch(`${process.env.REACT_APP_DEFAULT_LOCAL}1850${String(label.charAt(label.length - 1))}/make_faulty`);
                console.log(await response.text());
            } catch (error) {
                console.error('Error toggling faulty:', error);
            }
        };

        setFaulty(label);
        updateGraph();
    };

    const toggleLine = (label) => {
        setLabelToggle((prevLabels) => {
            const updatedLabels = { ...prevLabels };
            updatedLabels[label] = !updatedLabels[label];
            return updatedLabels;
        });
    };

    useEffect(() => {
        // Get transaction data - use first available if currentTransaction is -1
        let transactionKey = currentTransaction === -1 ? null : String(currentTransaction);
        if (!transactionKey && Object.keys(messageHistory).length > 0) {
            transactionKey = Object.keys(messageHistory).sort((a, b) => parseInt(a) - parseInt(b))[0];
        }
        
        const transactionData = transactionKey ? messageHistory[transactionKey] : null;
        const updatedLabelToggles = updateLabelToggles(replicaStatus);
        const updatedFaultToggles = updateFaultToggles(replicaStatus);

        setLabelToggle(updatedLabelToggles);
        setLabelToggleFaulty(updatedFaultToggles);

        if (transactionData && typeof transactionData === 'object' && Object.keys(transactionData).length > 0) {
            const { pointData, maxPointData } = mvtGraphComputation(transactionData, updatedLabelToggles);
            setChartMaxData(maxPointData);
            setMessageChartData(pointData);
        } else {
            setChartMaxData({ 1: 0, 2: 0 });
            setMessageChartData({ 1: [], 2: [] });
        }
    }, [messageHistory, currentTransaction, replicaStatus]);

    const filteredChartData = {
        1: messageChartData[1]?.filter(item => labelToggle[item.id]) || [],
        2: messageChartData[2]?.filter(item => labelToggle[item.id]) || []
    };

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-x-6 w-full">
                <ResizableContainer title={'Prepare Messages v Time'} >
                    <div className='relative w-full h-full pl-4 pr-2 pb-6'>
                        {isLoading ? (
                            <div className='loader'>
                                <div>MVT</div>
                                <div className='inner' />
                            </div>
                        ) : (
                            <MvtGraph chartData={filteredChartData} chartMaxData={chartMaxData} mvtGraphNo={1} />
                        )}
                    </div>
                </ResizableContainer>
                <ResizableContainer title={'Commit Messages v Time'}>
                    <div className='relative w-full h-full pl-4 pr-2 pb-6'>
                        {isLoading ? (
                            <div className='loader'>
                                <div>MVT</div>
                                <div className='inner' />
                            </div>
                        ) : (
                            <MvtGraph chartData={filteredChartData} chartMaxData={chartMaxData} mvtGraphNo={2} />
                        )}
                    </div>
                </ResizableContainer>
            </div>
            <div className='mt-12 mb-4 flex items-center justify-center gap-x-16'>
                <div className="">
                    <Form />
                </div>
                <div className="">
                    <Manipulator
                        toggleFaulty={toggleFaulty}
                        toggleLine={toggleLine}
                        labelToggleFaulty={labelToggleFaulty}
                        labelToggle={labelToggle}
                    />
                </div>
            </div>
        </div>
    );
};

export default Mvt;