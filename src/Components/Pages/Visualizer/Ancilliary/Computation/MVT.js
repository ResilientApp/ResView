import { COLORS_MVT_GRAPH } from "../../../../../Constants";

export const mvtGraphComputation = (transactionData, labelToggle = {}) => {
    // Return empty data if transactionData is null, undefined, or empty
    if (!transactionData || typeof transactionData !== 'object' || Object.keys(transactionData).length === 0) {
        return { 
            pointData: { 1: [], 2: [] }, 
            maxPointData: { 1: 0, 2: 0 } 
        };
    }

    let startTime = 0;
    let firstPrepareTime = 0;
    let prePrepareTimes = [];
    let prepareTimes = [];
    let allPrepareTimes = [];
    let allCommitTimes = [];
    let labelList = [];

    Object.keys(transactionData).forEach((key) => {
        const replicaData = transactionData[key];
        if (!replicaData) return;

        labelList.push("Replica " + key);
        
        if (replicaData.primary_id !== undefined && replicaData.replica_id !== undefined && 
            replicaData.primary_id !== replicaData.replica_id && 
            replicaData.propose_pre_prepare_time !== undefined) {
            prePrepareTimes.push(Math.floor(replicaData.propose_pre_prepare_time / 10000));
        }

        if (replicaData.prepare_time !== undefined) {
            prepareTimes.push(Math.floor(replicaData.prepare_time / 10000));
        }

        let replicaPrepareTS = [];
        let replicaCommitTS = [];

        if (replicaData.prepare_message_timestamps && Array.isArray(replicaData.prepare_message_timestamps)) {
            replicaData.prepare_message_timestamps.forEach((time) => {
                if (time !== undefined && time !== null) {
                    replicaPrepareTS.push(Math.floor(time / 10000));
                }
            });
        }

        if (replicaData.commit_message_timestamps && Array.isArray(replicaData.commit_message_timestamps)) {
            replicaData.commit_message_timestamps.forEach((time) => {
                if (time !== undefined && time !== null) {
                    replicaCommitTS.push(Math.floor(time / 10000));
                }
            });
        }

        allPrepareTimes.push(replicaPrepareTS);
        allCommitTimes.push(replicaCommitTS);
    });

    startTime = prePrepareTimes.length > 0 ? Math.min(...prePrepareTimes) : 0;
    firstPrepareTime = prepareTimes.length > 0 ? Math.min(...prepareTimes) : 0;

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
    let commitPoints = [];

    for (let i = 0; i < labelList.length; i++) {
        const label = labelList[i];
        const isEnabled = labelToggle.hasOwnProperty(label) ? labelToggle[label] : true;

        if (isEnabled) {
            preparePoints.push({
                id: label,
                color: COLORS_MVT_GRAPH[i],
                data: prepareChartData[i],
            });

            commitPoints.push({
                id: label,
                color: COLORS_MVT_GRAPH[i],
                data: commitChartData[i],
            });
        }
    }

    let pointData = { 1: preparePoints, 2: commitPoints };
    let maxPointData = { 1: maxPrepareTS, 2: maxCommitTS };

    return { pointData, maxPointData };
};