import { ACTION_TYPE_PBFT_GRAPH, COLORS_PBFT_GRAPH, COLORS_PBFT_GRAPH_LIGHT, NODES_PBFT_GRAPH, TITLES_PBFT_GRAPH } from "../../../../Constants";
import { dummyData } from "../Graphs/data";

const primaryIndexToPoint = {
    1: 2,
    2: 8,
    3: 14,
    4: 20
}

export const computeDataDetails = (data) => {
    let transactions = new Set();
    let primaryInd = -1;

    for (const property in data) {
        transactions.add(parseInt(property));
    }

    for (const [key, value] of Object.entries(data)) {
        if (value.primary_id === value.replica_id) {
            primaryInd = key;
        }
    }

    let primaryIndex = parseInt(primaryInd);

    return { primaryIndex, transactions };
};


export const generateConnections = (
    data,
    numberOfSteps,
    xCoords,
    yCoords,
    messageHistory,
    transactionNumber = 17,
    theme
) => {
    let points = {};

    let currentData = messageHistory[transactionNumber];
    //If no data, using dummy data to avoid crash
    if (!currentData) {
        currentData = dummyData[17];
    }

    const lineColors = theme ? COLORS_PBFT_GRAPH : COLORS_PBFT_GRAPH_LIGHT;

    const { primaryIndex, transactions } =
        computeDataDetails(currentData);

    ACTION_TYPE_PBFT_GRAPH.forEach(
        (action, index) =>
        (points = {
            ...points,
            [action]: {
                color: `${lineColors[index]}`,
                start: [],
                end: [],
            },
        })
    );

    // REQUEST OBJECT
    points.request.start.push({
        flag: true,
        points: data[0],
    });

    let yCoordToReplicas = {};

    // CONDITION WHERE PRIMARY EXISTS AND DOES EXIST
    if (primaryIndex === -1) {

        let reqEndPoints = [];

        for (const [_, value] of Object.entries(primaryIndexToPoint)) {
            reqEndPoints.push(data[numberOfSteps + value])
        }

        points.request.end.push({
            flag: true,
            points: reqEndPoints,
        });

        // PRE-PREPARE OBJECT
        for (let i = 0; i < points.request.end[0].points.length; i++){
            points.prePrepare.start.push(points.request.end[0].points[i])
        }

        for (const element of points.prePrepare.start) points.prePrepare.end.push([]);

        for (let i = 0; i < points.prePrepare.start.length; i++) {
            for (let j = 1; j < yCoords.length; j++) {
                if (points.prePrepare.start[i].y !== yCoords[j]) {
                    points.prePrepare.end[i].push({
                        flag: true,
                        points: {
                            x: xCoords[2],
                            y: yCoords[j],
                        },
                    });
                }
            }
        }

        for (let i = 1; i < yCoords.length; i++) {
            yCoordToReplicas = {
                ...yCoordToReplicas,
                [yCoords[i]]: i,
            };
        }

        // PREPARE OBJECT 
        let xVal = points.prePrepare.end[0][0].points.x;
        let currentPreparePoints = new Set();
        
        points.prePrepare.end.forEach((element, index) => {
            element.length > 0 && element.map((singlePoint, index) => {
                let replicaDoesExist = yCoordToReplicas[singlePoint.points.y]
                if (transactions.has(replicaDoesExist) && !currentPreparePoints.has(replicaDoesExist)) {
                    currentPreparePoints.add(replicaDoesExist)
                    points.prepare.start.push({ x: xVal, y: singlePoint.points.y});
                }
            })
        });

        for (const element of points.prepare.start) points.prepare.end.push([]);


        for (let i = 0; i < points.prepare.start.length; i++) {
            for (let j = 1; j < yCoords.length; j++) {
                if (points.prepare.start[i].y !== yCoords[j]) {
                    points.prepare.end[i].push({
                        flag: true,
                        points: {
                            x: xCoords[3],
                            y: yCoords[j],
                        },
                    });
                }
            }
        }

    } else {
        let currentPrimaryPointIndex = primaryIndexToPoint[primaryIndex]

        points.request.end.push({
            flag: true,
            points: data[numberOfSteps + currentPrimaryPointIndex],
        });

        // PRE-PREPARE OBJECT
        points.prePrepare.start.push({
            flag: true,
            points: points.request.end[0].points,
        });

        for (let i = 1; i < yCoords.length; i++) {
            if (primaryIndex === i) continue;
            points.prePrepare.end.push({
                flag: true,
                points: {
                    x: xCoords[2],
                    y: yCoords[i],
                },
            });
        }

        for (let i = 1; i < yCoords.length; i++) {
            yCoordToReplicas = {
                ...yCoordToReplicas,
                [yCoords[i]]: i,
            };
        }

        // PREPARE OBJECT
        points.prePrepare.end.forEach((element, index) => {
            if (transactions.has(yCoordToReplicas[element.points.y])) {
                points.prepare.start.push(element.points);
            }
        });

        for (const element of points.prepare.start) points.prepare.end.push([]);

        for (let i = 0; i < points.prepare.start.length; i++) {
            for (let j = 1; j < yCoords.length; j++) {
                if (points.prepare.start[i].y !== yCoords[j]) {
                    points.prepare.end[i].push({
                        flag: true,
                        points: {
                            x: xCoords[3],
                            y: yCoords[j],
                        },
                    });
                }
            }
        }
    }

    // COMMIT OBJECT
    for (let i = 1; i < yCoords.length; i++) {
        if (transactions.has(i)) {
            points.commit.start.push({
                x: xCoords[3],
                y: yCoords[i],
            });
        }
    }

    for (const element of points.commit.start) points.commit.end.push([]);

    for (let i = 0; i < points.commit.start.length; i++) {
        for (let j = 1; j < yCoords.length; j++) {
            if (points.commit.start[i].y !== yCoords[j]) {
                points.commit.end[i].push({
                    flag: true,
                    points: {
                        x: xCoords[4],
                        y: yCoords[j],
                    },
                });
            }
        }
    }

    // REPLY OBJECT
    points.reply.end.push({
        flag: true,
        points: data[numberOfSteps],
    });

    for (let i = 1; i < yCoords.length; i++) {
        if (transactions.has(i)) {
            points.reply.start.push({
                flag: true,
                points: {
                    x: xCoords[4],
                    y: yCoords[i],
                },
            });
        }
    }

    return { points, primaryIndex, yCoordToReplicas, transactions };
};

export const generateLabels = (xCoords, yCoords) => {
    let labelsX = [], labelsY = [];

    if (xCoords.length < 2 || yCoords.length < 2) return labelsX;

    for (let i = 0; i < xCoords.length - 1; i++) {
        let obj = {
            x: Math.floor((xCoords[i] + xCoords[i + 1]) / 2),
            y: yCoords[0] - 20,
            title: `${TITLES_PBFT_GRAPH[i]}`,
        };
        labelsX.push(obj)
    }

    for (let i = 0; i < yCoords.length; i++) {
        let obj = {
            x: xCoords[0] - 50,
            y: yCoords[i] + 5,
            title: `${NODES_PBFT_GRAPH[i]}`,
        };
        labelsY.push(obj);
    }

    return { labelsX, labelsY };
};

export const generateLines = (data, numberOfSteps) => {
    let verticalLines = [],
        horizontalLines = [];

    let xCoords = [];
    let yCoords = [];

    for (let i = 0; i <= numberOfSteps; i++) {
        xCoords.push(data[i].x);
    }

    for (let i = 0; i < data.length; i += (numberOfSteps + 1)) {
        yCoords.push(data[i].y);
    }

    for (const eleX of xCoords) {
        let arr = [];
        for (const eleY of yCoords) {
            arr.push({
                x: eleX,
                y: eleY,
            });
        }
        verticalLines.push(arr);
    }

    for (const eleY of yCoords) {
        let arr = [];
        for (const eleX of xCoords) {
            arr.push({
                x: eleX,
                y: eleY,
            });
        }
        horizontalLines.push(arr);
    }

    return { verticalLines, horizontalLines, xCoords, yCoords };
};

export const generatePoints = (
    width,
    height,
    margin = 0,
    padding = 0,
    numberOfReplicas = 4,
    numberOfSteps = 5
) => {
    const xStart = Math.floor(margin / 2) + Math.floor(padding / 2);
    const yStart = Math.floor(margin / 2) + Math.floor(padding / 2);

    const numberOfTotalSteps = numberOfSteps + 1;

    const cummulativeH = height - (padding + margin);
    const cummulativeW = width - (padding + margin);

    const distX = Math.floor(cummulativeW / numberOfSteps);
    const distY = Math.floor(cummulativeH / numberOfReplicas);

    let data = new Array((numberOfReplicas + 1) * numberOfTotalSteps).fill({
        x: 0,
        y: 0,
    });

    let changeX = xStart,
        changeY = yStart;
    let newData = [];

    for (let i = 0; i < data.length; i++) {
        if (i !== 0) {
            if (i < numberOfSteps && i % numberOfSteps === 0) {
                changeY += distY;
                changeX = xStart;
            } else if (i % (numberOfSteps + 1) === 0) {
                changeY += distY;
                changeX = xStart;
            }
        }
        data[i].x = changeX;
        data[i].y = changeY;
        changeX += distX;
        newData.push({ x: data[i].x, y: data[i].y });
    }
    return newData;
};

export const generateTransactionIds = (data) => {
    let transactionIds = [];

    for (const property in data) {
        transactionIds.push(parseInt(property));
    }

    return { transactionIds };
};
