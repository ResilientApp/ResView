// MVT GRAPH COMPUTATION 

import { COLORS_MVT_GRAPH } from "../../../../Constants";


export const mvtGraphComputation = (transactionData, labelToggle, chartMaxDataUpdate, messageChartDataUpdate) => {

    let startTime = 0;
    let firstPrepareTime = 0;
    let prePrepareTimes = [];
    let prepareTimes = [];
    let allPrepareTimes = [];
    let allCommitTimes = [];
    let labelList = [];

    Object.keys(transactionData).forEach((key) => {

        labelList.push("Replica " + key);
        if (transactionData[key].primary_id !== transactionData[key].replica_id) {
            prePrepareTimes.push(Math.floor(transactionData[key].propose_pre_prepare_time / 10000));
        }

        prepareTimes.push(Math.floor(transactionData[key].prepare_time / 10000));

        let replicaPrepareTS = [];
        let replicaCommitTS = [];

        transactionData[key]["prepare_message_timestamps"].map((time) =>
            replicaPrepareTS.push(Math.floor(time / 10000))
        );

        transactionData[key]["commit_message_timestamps"].map((time) =>
            replicaCommitTS.push(Math.floor(time / 10000))
        );

        allPrepareTimes.push(replicaPrepareTS);
        allCommitTimes.push(replicaCommitTS);
    });

    startTime = Math.min(...prePrepareTimes);
    firstPrepareTime = Math.min(...prepareTimes);

    let prepareChartData = [];
    let commitChartData = [];
    let maxPrepareTS = 0;
    let maxCommitTS = 0;

    for (const element of allPrepareTimes) {
        let lineData = [{ x: 0, y: 0 }];
        for (let j = 0; j < element.length; j++) {
            if (element[j] - startTime > 0) {
                const relativeTime = element[j] - startTime;
                lineData.push({ x: relativeTime, y: j });
                lineData.push({ x: relativeTime, y: j + 1 });
                maxPrepareTS = Math.max(maxPrepareTS, relativeTime);
            }
            else {
                if (j + 1 < element.length) {
                    const relativeTime = element[j + 1] - startTime;
                    lineData.push({ x: relativeTime, y: j });
                    lineData.push({ x: relativeTime, y: j + 1 });
                    maxPrepareTS = Math.max(maxPrepareTS, relativeTime);
                }
            }
        }
        prepareChartData.push(lineData);
    }

    for (const element of allCommitTimes) {
        let lineData = [{ x: 0, y: 0 }];
        for (let j = 0; j < element.length; j++) {
            if (element[j] - firstPrepareTime > 0) {
                const relativeTime = element[j] - firstPrepareTime;
                lineData.push({ x: relativeTime, y: j });
                lineData.push({ x: relativeTime, y: j + 1 });
                maxCommitTS = Math.max(maxCommitTS, relativeTime);
            }
            else {
                if (j + 1 < element.length) {
                    const relativeTime = element[j + 1] - firstPrepareTime;
                    lineData.push({ x: relativeTime, y: j });
                    lineData.push({ x: relativeTime, y: j + 1 });
                    maxCommitTS = Math.max(maxCommitTS, relativeTime);
                }
            }
        }
        commitChartData.push(lineData);
    }

    let preparePoints = [];
    let data = {};

    for (let i = 0; i < labelList.length; i++) {
        if (!labelToggle[labelList[i]]) {
            data = {
                id: labelList[i],
                color: COLORS_MVT_GRAPH[i],
                data: [],
            };
        }
        else {
            data = {
                id: labelList[i],
                color: COLORS_MVT_GRAPH[i],
                data: prepareChartData[i],
            };
        }
        preparePoints.push(data);
    }

    let commitPoints = [];

    for (let i = 0; i < labelList.length; i++) {
        if (!labelToggle[labelList[i]]) {
            data = {
                id: labelList[i],
                color: COLORS_MVT_GRAPH[i],
                data: [],
            };
        }
        else {
            data = {
                id: labelList[i],
                color: COLORS_MVT_GRAPH[i],
                data: commitChartData[i],
            };
        }

        commitPoints.push(data);
    }
    //

    let pointData = { 1: preparePoints, 2: commitPoints };
    let maxPointData = { 1: maxPrepareTS, 2: maxCommitTS };
    chartMaxDataUpdate(maxPointData);
    messageChartDataUpdate(pointData);
};