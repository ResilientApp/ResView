import { useWindowSize } from "@react-hook/window-size";
import React, { useContext } from "react";
import classNames from "classnames";
import { DATA_TABLE_DELAY } from "../../../Constants";
import { SidebarToggleContext } from "../../../Context/sidebarToggle";
import { VizDataHistoryContext } from "../../../Context/visualizer";
import Footer from "../../Shared/Footer";
import HRline from '../../Shared/HRline';
import Mvt from "./Graphs/MVT";
import Pbft from "./Graphs/PBFT";
import ViewChange from "./Graphs/ViewChange";
import Timeline from "./Graphs/Timeline";
import DataTable from './Table';
import TransInfo from './TransComps';
import Analytics from "./TransComps/Components/AnalyticsItem";
import Overview from "./TransComps/Components/Overview";
import { useSearchParams } from "react-router-dom";


const Visualizer = () => {
    const [_, height] = useWindowSize()
    const { isSidebarOpen } = useContext(SidebarToggleContext);
    const { viewChangeData } = useContext(VizDataHistoryContext);
    const [searchParams] = useSearchParams();

    const displayMvt = (searchParams.get('mvt') === "true") || true
    const displayAnalytics = searchParams.get('analytics') === "true"
    const displayOverview = searchParams.get('overview') === "true"
    const displayDataTable = (searchParams.get('dataTable') === "true") || true
    const displaySidebar = searchParams.get('sidebar') === "true"
    const displayViewChange = (searchParams.get('viewchange') === "false") ? false : true

    let concurrentHeight = Math.floor(height / 2) + 200

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
        <div className="h-full w-screen">
            {displaySidebar && <TransInfo />}
            <div className={classNames(
                "px-8 pt-12 h-full transition-all duration-300 ease-in-out",
                isSidebarOpen ? "ml-[220px]" : "ml-0"
            )}>
                <div className="flex gap-x-6 w-full h-full" id="pbft-graph" >
                    <Pbft />
                    <div
                        className="grid grid-rows-2 gap-y-4"
                        style={{
                            height: concurrentHeight
                        }}
                    >
                        {displayOverview && <Overview goToElement={goToElement} />}
                        {displayAnalytics && <Analytics />}
                    </div>
                </div>
                <div className="my-8 px-24 w-full">
                    <HRline />
                </div>
                <Timeline />
                {displayViewChange && (
                    <>
                        <div className="my-8 px-24 w-full">
                            <HRline />
                        </div>
                        <ViewChange viewChangeData={viewChangeData} />
                    </>
                )}
                {displayMvt && (
                    <>
                        <div className={classNames("px-24 w-full", displayViewChange ? "my-16" : "my-8 mt-32")}>
                            <HRline />
                        </div>
                        <Mvt />
                        <div className="my-10 px-24 w-full">
                            <HRline />
                        </div>
                    </>
                )}

                {displayDataTable && (
                    <>
                        <div className="px-24" id="transaction-table">
                            <DataTable goToPbftGraph={() => goToElement('pbft-graph')} delay={DATA_TABLE_DELAY} />
                        </div>
                        <div className="mt-10 mb-24 px-24 w-full">
                            <HRline />
                        </div>
                    </>
                )}
                <div className="mb-4">
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
