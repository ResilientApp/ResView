import { DATA_TABLE_NO_PRIMARY_EXISTS } from "../../../../Constants";
import { dummyData } from "../Graphs/data";
import { computeDataDetails } from "./CompPbft";

let FAULTY_REPLICAS_DEFAULT = [false, false, false, false]

const TOTAL_NUMBER_OF_REPLICAS = 4;


const generateReplicaStatus = (data, defaultResult) => {
    for (let [key, _] of Object.entries(data)) {
        defaultResult[key - 1] = true;
    }
    return defaultResult;
};

let REPLICA_STATUS = [false, false, false, false];

export const computeTransInfo = (messageHistory, transactionNumber=17, status) => {
    let currentStatus = status;
    let currentData = messageHistory[transactionNumber];

    if (!currentData) {
        currentData = dummyData[17];
        currentStatus = generateReplicaStatus(currentData, FAULTY_REPLICAS_DEFAULT);
    }

    const { primaryIndex, transactions } =
        computeDataDetails(currentData);

    const faultReplicas = Math.abs(TOTAL_NUMBER_OF_REPLICAS - transactions.size)

    return { primaryIndex, transactions, currentStatus, currentData, faultReplicas };
};

export const computeTableData = (messageHistory) => {
    let data = {}
    Object.entries(messageHistory).forEach(([key, value]) => {
        const { primaryIndex, faultReplicas } = computeTransInfo(messageHistory, key, REPLICA_STATUS)

        let primary = primaryIndex === -1 ? DATA_TABLE_NO_PRIMARY_EXISTS : `Replica ${primaryIndex}`

        data[key] = {
            transactionNumber: key, 
            primary,
            faultReplicas: `${faultReplicas}`,
            replicaDetails: {}
        }

        for (let replicaId in messageHistory[key]){
            const entry = messageHistory[key][replicaId];
                data[key].replicaDetails[replicaId] = {
                    commitTime: entry.commit_time,
                    execTime: entry.execution_time,
                    prepTime: entry.prepare_time,
                };
        }
    });

    return { data };
};
