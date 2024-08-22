import classNames from "classnames";
import React, { useContext } from "react";
import { ThemeContext } from "../../../Context/theme";
import { anglesDownIcon, eyeIcon, tableIcon, transactionsIcon } from "../../../Resources/Icons";
import Footer from "../../Shared/Footer";
import HRline from '../../Shared/HRline';
import { Icon } from "../../Shared/Icon";
import { FontVarTitle } from "../../Shared/Title";
import DataTable from './Table';
import TransInfo from './TransComps';
import TransAnalyticsItem from "./TransComps/Components/AnalyticsItem";
import { WebSocket } from "../../../Socket";
import Pbft from "./Graphs/Pbft";
import { DATA_TABLE_DELAY } from "../../../Constants";
import Mvt from "./Graphs/Mvt";
import { VizDataHistoryContext } from "../../../Context/visualizer";


const Visualizer = () => {
    const { theme } = useContext(ThemeContext);
    const { totalPercentFaulty, totalHistoryLength, noPrimaryCount } = useContext(VizDataHistoryContext)

    const goToElement = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        }
    };

    return (
        <div className="py-6 h-full">
            <TransInfo />
            <WebSocket />
            <div className="ml-[220px] px-8 pt-6 h-full">
                <div className="grid grid-cols-3f-1f gap-x-6 w-full h-full" id="pbft-graph">
                    <Pbft />
                    <div className="grid grid-rows-2 gap-y-4">
                        <div className={classNames('flex flex-col justify-between items-center rounded-md border-3p bg-blue-10 border-solid border-gray-700 dark:border-gray-50 dark:bg-blue-450 w-full')}>
                            <div className="flex items-center justify-center gap-x-2 w-full border-b-2p border-solid border-gray-700 dark:border-gray-50 h-50p">
                                <div>
                                    <Icon
                                        fill={theme ? "rgb(209,213,219)" : "black"}
                                        height={'1.2em'}
                                        path={eyeIcon}
                                        viewBox={'0 0 576 512'}
                                    />
                                </div>
                                <FontVarTitle title={'Overview'} />
                            </div>
                            <div>

                            </div>
                            <div className='w-full h-50p flex items-center justify-center gap-x-4 border-t-3p border-solid border-gray-700 dark:border-gray-50 cursor-pointer hover:dark:bg-green-80' onClick={() => goToElement("transaction-table")}>
                                <Icon path={anglesDownIcon} fill={theme ? "rgb(209,213,219)" : "black"} height={"1.1em"} />
                                <div className="dark:text-gray-300 text-gray-700 font-bold text-center text-14p">
                                    All Transactions
                                </div>
                            </div>
                        </div>
                        <div className={classNames('flex flex-col rounded-md bg-blue-10 border-3p border-solid border-gray-700 dark:border-gray-50 dark:bg-blue-450 relative w-full')}>
                            <div className="flex items-center justify-center gap-x-2 w-full border-b-2p border-solid border-gray-700 dark:border-gray-50 h-60p">
                                <div>
                                    <Icon
                                        fill={theme ? "rgb(209,213,219)" : "black"}
                                        height={'1.2em'}
                                        path={transactionsIcon}
                                        viewBox={'0 0 448 512'}
                                    />
                                </div>
                                <FontVarTitle title={' Analytics'} />
                            </div>
                            <div className="grid grid-rows-2 h-full w-full">
                                <div className="flex items-center justify-center w-full border-b-2p border-solid border-gray-700 dark:border-gray-50">
                                    <TransAnalyticsItem key={index} value={totalHistoryLength} title={'Total Transactions'} />
                                </div>
                                <div className="grid grid-cols-2 flex-items-center-justify-center w-full">
                                    <div className="border-r-2p border-solid border-gray-700 dark:border-gray-50 flex items-center justify-center">
                                        <TransAnalyticsItem key={index} title={'Avg. Faultiness'} value={`${totalPercentFaulty * 100}%`} />
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <TransAnalyticsItem key={index} title={'No Primary'} value={noPrimaryCount} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-8 px-24 w-full">
                    <HRline />
                </div>
                <Mvt />
                <div className="my-10 px-24 w-full">
                    <HRline />
                </div>
                <div className="px-24" id="transaction-table">
                    <DataTable goToPbftGraph={() => goToElement('pbft-graph')} delay={DATA_TABLE_DELAY} />
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
        <Visualizer />
    );
}


export default index