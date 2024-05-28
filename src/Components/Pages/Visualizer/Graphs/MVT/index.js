
import { useContext, useEffect, useState } from "react";
import { GraphResizerContext, GraphViewContext } from "../../../../../Context/graph";
import { anglesRightIcon } from "../../../../../Resources/Icons";
import { MvTSelectButton } from "../../../../Shared/Buttons";
import { Icon } from "../../../../Shared/Icon";
import { FontVarTitle } from "../../../../Shared/Title";
import ResizableContainer from "../GraphContainer";
import Manipulator from "./Manipulator";
import MvtGraph from "./Graph";
import { mvtGraphComputation } from "../../Computation/MVT";
import { dummyData } from "../data";

const LABEL_TOGGLES = { "Replica 1": true, "Replica 2": true, "Replica 3": true, "Replica 4": true }

const FAULT_TOGGLES = { "Replica 1": false, "Replica 2": false, "Replica 3": false, "Replica 4": false }


const Mvt = ({ messageHistory, currentTransaction = 17 }) => {
    const { resizing } = useContext(GraphResizerContext);
    const { toggleMvtGraphNoChange } = useContext(GraphViewContext);

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
    }

    const toggleFaulty = (label) => {
        setLabelToggleFaulty((prevLabels) => {
            const updatedLabels = { ...prevLabels };
            updatedLabels[label] = !updatedLabels[label];
            return updatedLabels;
        });

        const setFaulty = async (label) => {
            console.log(label);
            try {
                let response = await fetch('http://localhost:1850' + String(label.charAt(label.length - 1)) + '/make_faulty');


                console.log(response.body());
            } catch (error) {
                //console.error('Error toggling faulty:', error);
            }
        }

        setFaulty(label);

        updateGraph();
    };

    const toggleLine = (label) => {
        setLabelToggle((prevLabels) => {
            const updatedLabels = { ...prevLabels };
            updatedLabels[label] = !updatedLabels[label];
            return updatedLabels;
        });
        updateGraph();
    };

    const chartMaxDataUpdate = (value) => setChartMaxData(value);
    const messageChartDataUpdate = (value) => setMessageChartData(value);

    useEffect(() => {
        const transactionData = Object.keys(messageHistory).length !== 0 ? messageHistory[currentTransaction] : dummyData[17];

        mvtGraphComputation(transactionData, labelToggle, chartMaxDataUpdate, messageChartDataUpdate)

    }, [messageHistory, currentTransaction, labelToggle, resetGraph]);

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-x-6 w-full">
                <ResizableContainer title={'Prepare Messages v Time'} >
                    <div className='relative w-full h-full pl-4 pr-2 pb-6'>
                        {(resizing || isLoading) ? (
                            <div className='loader'>
                                <div>MVT</div>
                                <div className='inner' />
                            </div>
                        ) : (
                            <MvtGraph chartData={messageChartData} chartMaxData={chartMaxData} mvtGraphNo={1} />
                        )}
                    </div>
                </ResizableContainer>
                <ResizableContainer title={'Commit Messages v Time'}>
                    <div className='relative w-full h-full pl-4 pr-2 pb-6'>
                        {(resizing || isLoading) ? (
                            <div className='loader'>
                                <div>MVT</div>
                                <div className='inner' />
                            </div>
                        ) : (
                            <MvtGraph chartData={messageChartData} chartMaxData={chartMaxData} mvtGraphNo={2} />
                        )}
                    </div>
                </ResizableContainer>
            </div>
            <div className='mt-12 mb-4 flex items-center justify-center'>
                <Manipulator
                    toggleFaulty={toggleFaulty}
                    toggleLine={toggleLine}
                    labelToggleFaulty={labelToggleFaulty}
                    labelToggle={labelToggle}
                />
            </div>
        </div>
    );
};


export default Mvt;
