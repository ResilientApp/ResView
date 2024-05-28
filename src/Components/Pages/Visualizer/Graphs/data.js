export const data = [
    {
        "id": "Serie 1",
        "data": [
            {
                "x": 2000,
                "y": 1
            },
            {
                "x": 2000,
                "y": 2
            },
            {
                "x": 2000,
                "y": 3
            },
            {
                "x": 2000,
                "y": 4
            }
        ]
    },
];

export const ccData = [
    {
        id: "Replica 1",
        color: "hsl(148, 70%, 50%)",
        data: [
            {
                x: 0,
                y: 33,
            },
            {
                x: 1,
                y: 152,
            },
            {
                x: 2,
                y: 168,
            },
            {
                x: 3,
                y: 40,
            },
            {
                x: 4,
                y: 152,
            },
            {
                x: 5,
                y: 298,
            },
            {
                x: 6,
                y: 1,
            },
            {
                x: 7,
                y: 216,
            },
            {
                x: 8,
                y: 172,
            },
            {
                x: 9,
                y: 12,
            },
            {
                x: 10,
                y: 203,
            },
            {
                x: 11,
                y: 50,
            },
        ],
    },
    {
        id: "Replica 2",
        color: "hsl(200, 70%, 50%)",
        data: [
            {
                x: 0,
                y: 209,
            },
            {
                x: 1,
                y: 45,
            },
            {
                x: 2,
                y: 290,
            },
            {
                x: 3,
                y: 60,
            },
            {
                x: 4,
                y: 154,
            },
            {
                x: 5,
                y: 154,
            },
            {
                x: 6,
                y: 48,
            },
            {
                x: 7,
                y: 294,
            },
            {
                x: 8,
                y: 269,
            },
            {
                x: 9,
                y: 232,
            },
            {
                x: 10,
                y: 128,
            },
            {
                x: 11,
                y: 118,
            },
        ],
    },
    {
        id: "Replica 3",
        color: "hsl(171, 70%, 50%)",
        data: [
            {
                x: 0,
                y: 132,
            },
            {
                x: 1,
                y: 293,
            },
            {
                x: 2,
                y: 7,
            },
            {
                x: 3,
                y: 294,
            },
            {
                x: 4,
                y: 86,
            },
            {
                x: 5,
                y: 252,
            },
            {
                x: 6,
                y: 257,
            },
            {
                x: 7,
                y: 31,
            },
            {
                x: 8,
                y: 282,
            },
            {
                x: 9,
                y: 22,
            },
            {
                x: 10,
                y: 36,
            },
            {
                x: 11,
                y: 13,
            },
        ],
    },
    {
        id: "Replica 4",
        color: "hsl(313, 70%, 50%)",
        data: [
            {
                x: 0,
                y: 77,
            },
            {
                x: 1,
                y: 262,
            },
            {
                x: 2,
                y: 260,
            },
            {
                x: 3,
                y: 47,
            },
            {
                x: 4,
                y: 6,
            },
            {
                x: 5,
                y: 96,
            },
            {
                x: 6,
                y: 192,
            },
            {
                x: 7,
                y: 251,
            },
            {
                x: 8,
                y: 151,
            },
            {
                x: 9,
                y: 139,
            },
            {
                x: 10,
                y: 167,
            },
            {
                x: 11,
                y: 30,
            },
        ],
    },
    {
        id: "Replica 5",
        color: "hsl(285, 70%, 50%)",
        data: [
            {
                x: 0,
                y: 183,
            },
            {
                x: 1,
                y: 204,
            },
            {
                x: 2,
                y: 184,
            },
            {
                x: 3,
                y: 141,
            },
            {
                x: 4,
                y: 233,
            },
            {
                x: 5,
                y: 121,
            },
            {
                x: 6,
                y: 194,
            },
            {
                x: 7,
                y: 152,
            },
            {
                x: 8,
                y: 214,
            },
            {
                x: 9,
                y: 260,
            },
            {
                x: 10,
                y: 118,
            },
            {
                x: 11,
                y: 14,
            },
        ],
    },
];

// !!!! DO NOT DELETE THE BELOW DUMMY DATA
export const dummyData = {
    17: {
        1: {
            commit_message_timestamps: [
                1701956096777352000, 1701956096782048300, 1701956096786494200,
                1701956096786495200,
            ],
            commit_time: 1701956096786501400,
            execution_time: 1701956096786658600,
            ip: "127.0.0.1",
            port: 10001,
            prepare_message_timestamps: [
                1701956096771379200, 1701956096776308700, 1701956096776386300,
                1701956096777278200,
            ],
            prepare_time: 1701956096776394000,
            primary_id: 1,
            propose_pre_prepare_time: 1701956096769596400,
            replica_id: 2,
            txn_commands: ["GET"],
            txn_keys: ["test"],
            txn_number: 17,
            txn_values: [""],
            reply_time: 1702001829632,
        },
        2: {
            commit_message_timestamps: [
                1701956096777775600, 1701956096781659100, 1701956096788349400,
                1701956096788360400,
            ],
            commit_time: 1701956096788358400,
            execution_time: 1701956096789154300,
            ip: "127.0.0.1",
            port: 10002,
            prepare_message_timestamps: [
                1701956096771574300, 1701956096776823800, 1701956096777767000,
            ],
            prepare_time: 1701956096776841500,
            primary_id: 1,
            propose_pre_prepare_time: 1701956096767388700,
            replica_id: 1,
            txn_commands: ["GET"],
            txn_keys: ["test"],
            txn_number: 17,
            txn_values: [""],
            reply_time: 1702001829629,
        },
        // 3: {
        //     commit_message_timestamps: [
        //         1701956096777398000, 1701956096781702400, 1701956096787757600,
        //         1701956096787947500,
        //     ],
        //     commit_time: 1701956096787769900,
        //     execution_time: 1701956096788227600,
        //     ip: "127.0.0.1",
        //     port: 10003,
        //     prepare_message_timestamps: [
        //         1701956096772535600, 1701956096777049000, 1701956096777068300,
        //         1701956096777263900,
        //     ],
        //     prepare_time: 1701956096777074400,
        //     primary_id: 1,
        //     propose_pre_prepare_time: 1701956096767121700,
        //     replica_id: 3,
        //     txn_commands: ["GET"],
        //     txn_keys: ["test"],
        //     txn_number: 17,
        //     txn_values: [""],
        //     reply_time: 1702001829631,
        // },
        4: {
            commit_message_timestamps: [
                1701956096777512700, 1701956096782015500, 1701956096786524200,
                1701956096786591700,
            ],
            commit_time: 1701956096786530000,
            execution_time: 1701956096786978000,
            ip: "127.0.0.1",
            port: 10004,
            prepare_message_timestamps: [
                1701956096772492300, 1701956096776289500, 1701956096776371200,
                1701956096777435000,
            ],
            prepare_time: 1701956096776375000,
            primary_id: 1,
            propose_pre_prepare_time: 1701956096767122200,
            replica_id: 4,
            txn_commands: ["GET"],
            txn_keys: ["test"],
            txn_number: 17,
            txn_values: [""],
            reply_time: 1702001829630,
        },
    },
    18: {
        1: {
            commit_message_timestamps: [
                1701956096777352000, 1701956096782048300, 1701956096786494200,
                1701956096786495200,
            ],
            commit_time: 1701956096786501400,
            execution_time: 1701956096786658600,
            ip: "127.0.0.1",
            port: 10001,
            prepare_message_timestamps: [
                1701956096771379200, 1701956096776308700, 1701956096776386300,
                1701956096777278200,
            ],
            prepare_time: 1701956096776394000,
            primary_id: 1,
            propose_pre_prepare_time: 1701956096769596400,
            replica_id: 1,
            txn_commands: ["GET"],
            txn_keys: ["test"],
            txn_number: 17,
            txn_values: [""],
            reply_time: 1702001829632,
        },
        2: {
            commit_message_timestamps: [
                1701956096777775600, 1701956096781659100, 1701956096788349400,
                1701956096788360400,
            ],
            commit_time: 1701956096788358400,
            execution_time: 1701956096789154300,
            ip: "127.0.0.1",
            port: 10002,
            prepare_message_timestamps: [
                1701956096771574300, 1701956096776823800, 1701956096777767000,
            ],
            prepare_time: 1701956096776841500,
            primary_id: 1,
            propose_pre_prepare_time: 1701956096767388700,
            replica_id: 2,
            txn_commands: ["GET"],
            txn_keys: ["test"],
            txn_number: 17,
            txn_values: [""],
            reply_time: 1702001829629,
        },
        3: {
            commit_message_timestamps: [
                1701956096777398000, 1701956096781702400, 1701956096787757600,
                1701956096787947500,
            ],
            commit_time: 1701956096787769900,
            execution_time: 1701956096788227600,
            ip: "127.0.0.1",
            port: 10003,
            prepare_message_timestamps: [
                1701956096772535600, 1701956096777049000, 1701956096777068300,
                1701956096777263900,
            ],
            prepare_time: 1701956096777074400,
            primary_id: 1,
            propose_pre_prepare_time: 1701956096767121700,
            replica_id: 3,
            txn_commands: ["GET"],
            txn_keys: ["test"],
            txn_number: 17,
            txn_values: [""],
            reply_time: 1702001829631,
        },
        4: {
            commit_message_timestamps: [
                1701956096777512700, 1701956096782015500, 1701956096786524200,
                1701956096786591700,
            ],
            commit_time: 1701956096786530000,
            execution_time: 1701956096786978000,
            ip: "127.0.0.1",
            port: 10004,
            prepare_message_timestamps: [
                1701956096772492300, 1701956096776289500, 1701956096776371200,
                1701956096777435000,
            ],
            prepare_time: 1701956096776375000,
            primary_id: 1,
            propose_pre_prepare_time: 1701956096767122200,
            replica_id: 4,
            txn_commands: ["GET"],
            txn_keys: ["test"],
            txn_number: 17,
            txn_values: [""],
            reply_time: 1702001829630,
        },
    },
    19: {
        1: {
            commit_message_timestamps: [
                1701956096777352000, 1701956096782048300, 1701956096786494200,
                1701956096786495200,
            ],
            commit_time: 1701956096786501400,
            execution_time: 1701956096786658600,
            ip: "127.0.0.1",
            port: 10001,
            prepare_message_timestamps: [
                1701956096771379200, 1701956096776308700, 1701956096776386300,
                1701956096777278200,
            ],
            prepare_time: 1701956096776394000,
            primary_id: 4,
            propose_pre_prepare_time: 1701956096769596400,
            replica_id: 1,
            txn_commands: ["GET"],
            txn_keys: ["test"],
            txn_number: 17,
            txn_values: [""],
            reply_time: 1702001829632,
        },
        2: {
            commit_message_timestamps: [
                1701956096777775600, 1701956096781659100, 1701956096788349400,
                1701956096788360400,
            ],
            commit_time: 1701956096788358400,
            execution_time: 1701956096789154300,
            ip: "127.0.0.1",
            port: 10002,
            prepare_message_timestamps: [
                1701956096771574300, 1701956096776823800, 1701956096777767000,
            ],
            prepare_time: 1701956096776841500,
            primary_id: 4,
            propose_pre_prepare_time: 1701956096767388700,
            replica_id: 2,
            txn_commands: ["GET"],
            txn_keys: ["test"],
            txn_number: 17,
            txn_values: [""],
            reply_time: 1702001829629,
        },
        3: {
            commit_message_timestamps: [
                1701956096777398000, 1701956096781702400, 1701956096787757600,
                1701956096787947500,
            ],
            commit_time: 1701956096787769900,
            execution_time: 1701956096788227600,
            ip: "127.0.0.1",
            port: 10003,
            prepare_message_timestamps: [
                1701956096772535600, 1701956096777049000, 1701956096777068300,
                1701956096777263900,
            ],
            prepare_time: 1701956096777074400,
            primary_id: 4,
            propose_pre_prepare_time: 1701956096767121700,
            replica_id: 3,
            txn_commands: ["GET"],
            txn_keys: ["test"],
            txn_number: 17,
            txn_values: [""],
            reply_time: 1702001829631,
        },
        4: {
            commit_message_timestamps: [
                1701956096777512700, 1701956096782015500, 1701956096786524200,
                1701956096786591700,
            ],
            commit_time: 1701956096786530000,
            execution_time: 1701956096786978000,
            ip: "127.0.0.1",
            port: 10004,
            prepare_message_timestamps: [
                1701956096772492300, 1701956096776289500, 1701956096776371200,
                1701956096777435000,
            ],
            prepare_time: 1701956096776375000,
            primary_id: 4,
            propose_pre_prepare_time: 1701956096767122200,
            replica_id: 4,
            txn_commands: ["GET"],
            txn_keys: ["test"],
            txn_number: 17,
            txn_values: [""],
            reply_time: 1702001829630,
        },
    },
    20: {
        1: {
            commit_message_timestamps: [
                1701956096777352000, 1701956096782048300, 1701956096786494200,
                1701956096786495200,
            ],
            commit_time: 1701956096786501400,
            execution_time: 1701956096786658600,
            ip: "127.0.0.1",
            port: 10001,
            prepare_message_timestamps: [
                1701956096771379200, 1701956096776308700, 1701956096776386300,
                1701956096777278200,
            ],
            prepare_time: 1701956096776394000,
            primary_id: 2,
            propose_pre_prepare_time: 1701956096769596400,
            replica_id: 1,
            txn_commands: ["GET"],
            txn_keys: ["test"],
            txn_number: 17,
            txn_values: [""],
            reply_time: 1702001829632,
        },
        2: {
            commit_message_timestamps: [
                1701956096777775600, 1701956096781659100, 1701956096788349400,
                1701956096788360400,
            ],
            commit_time: 1701956096788358400,
            execution_time: 1701956096789154300,
            ip: "127.0.0.1",
            port: 10002,
            prepare_message_timestamps: [
                1701956096771574300, 1701956096776823800, 1701956096777767000,
            ],
            prepare_time: 1701956096776841500,
            primary_id: 2,
            propose_pre_prepare_time: 1701956096767388700,
            replica_id: 2,
            txn_commands: ["GET"],
            txn_keys: ["test"],
            txn_number: 17,
            txn_values: [""],
            reply_time: 1702001829629,
        },
        3: {
            commit_message_timestamps: [
                1701956096777398000, 1701956096781702400, 1701956096787757600,
                1701956096787947500,
            ],
            commit_time: 1701956096787769900,
            execution_time: 1701956096788227600,
            ip: "127.0.0.1",
            port: 10003,
            prepare_message_timestamps: [
                1701956096772535600, 1701956096777049000, 1701956096777068300,
                1701956096777263900,
            ],
            prepare_time: 1701956096777074400,
            primary_id: 2,
            propose_pre_prepare_time: 1701956096767121700,
            replica_id: 3,
            txn_commands: ["GET"],
            txn_keys: ["test"],
            txn_number: 17,
            txn_values: [""],
            reply_time: 1702001829631,
        },
        // 4: {
        //     commit_message_timestamps: [
        //         1701956096777512700, 1701956096782015500, 1701956096786524200,
        //         1701956096786591700,
        //     ],
        //     commit_time: 1701956096786530000,
        //     execution_time: 1701956096786978000,
        //     ip: "127.0.0.1",
        //     port: 10004,
        //     prepare_message_timestamps: [
        //         1701956096772492300, 1701956096776289500, 1701956096776371200,
        //         1701956096777435000,
        //     ],
        //     prepare_time: 1701956096776375000,
        //     primary_id: 2,
        //     propose_pre_prepare_time: 1701956096767122200,
        //     replica_id: 4,
        //     txn_commands: ["GET"],
        //     txn_keys: ["test"],
        //     txn_number: 17,
        //     txn_values: [""],
        //     reply_time: 1702001829630,
        // },
    },
    21: {
        1: {
            commit_message_timestamps: [
                1701956096777352000, 1701956096782048300, 1701956096786494200,
                1701956096786495200,
            ],
            commit_time: 1701956096786501400,
            execution_time: 1701956096786658600,
            ip: "127.0.0.1",
            port: 10001,
            prepare_message_timestamps: [
                1701956096771379200, 1701956096776308700, 1701956096776386300,
                1701956096777278200,
            ],
            prepare_time: 1701956096776394000,
            primary_id: 5,
            propose_pre_prepare_time: 1701956096769596400,
            replica_id: 1,
            txn_commands: ["GET"],
            txn_keys: ["test"],
            txn_number: 17,
            txn_values: [""],
            reply_time: 1702001829632,
        },
        2: {
            commit_message_timestamps: [
                1701956096777775600, 1701956096781659100, 1701956096788349400,
                1701956096788360400,
            ],
            commit_time: 1701956096788358400,
            execution_time: 1701956096789154300,
            ip: "127.0.0.1",
            port: 10002,
            prepare_message_timestamps: [
                1701956096771574300, 1701956096776823800, 1701956096777767000,
            ],
            prepare_time: 1701956096776841500,
            primary_id: 5,
            propose_pre_prepare_time: 1701956096767388700,
            replica_id: 2,
            txn_commands: ["GET"],
            txn_keys: ["test"],
            txn_number: 17,
            txn_values: [""],
            reply_time: 1702001829629,
        },
        3: {
            commit_message_timestamps: [
                1701956096777398000, 1701956096781702400, 1701956096787757600,
                1701956096787947500,
            ],
            commit_time: 1701956096787769900,
            execution_time: 1701956096788227600,
            ip: "127.0.0.1",
            port: 10003,
            prepare_message_timestamps: [
                1701956096772535600, 1701956096777049000, 1701956096777068300,
                1701956096777263900,
            ],
            prepare_time: 1701956096777074400,
            primary_id: 5,
            propose_pre_prepare_time: 1701956096767121700,
            replica_id: 3,
            txn_commands: ["GET"],
            txn_keys: ["test"],
            txn_number: 17,
            txn_values: [""],
            reply_time: 1702001829631,
        },
        4: {
            commit_message_timestamps: [
                1701956096777512700, 1701956096782015500, 1701956096786524200,
                1701956096786591700,
            ],
            commit_time: 1701956096786530000,
            execution_time: 1701956096786978000,
            ip: "127.0.0.1",
            port: 10004,
            prepare_message_timestamps: [
                1701956096772492300, 1701956096776289500, 1701956096776371200,
                1701956096777435000,
            ],
            prepare_time: 1701956096776375000,
            primary_id: 5,
            propose_pre_prepare_time: 1701956096767122200,
            replica_id: 4,
            txn_commands: ["GET"],
            txn_keys: ["test"],
            txn_number: 17,
            txn_values: [""],
            reply_time: 1702001829630,
        },
    },
    22: {
        1: {
            commit_message_timestamps: [
                1701956096777352000, 1701956096782048300, 1701956096786494200,
                1701956096786495200,
            ],
            commit_time: 1701956096786501400,
            execution_time: 1701956096786658600,
            ip: "127.0.0.1",
            port: 10001,
            prepare_message_timestamps: [
                1701956096771379200, 1701956096776308700, 1701956096776386300,
                1701956096777278200,
            ],
            prepare_time: 1701956096776394000,
            primary_id: 1,
            propose_pre_prepare_time: 1701956096769596400,
            replica_id: 1,
            txn_commands: ["GET"],
            txn_keys: ["test"],
            txn_number: 17,
            txn_values: [""],
            reply_time: 1702001829632,
        },
        2: {
            commit_message_timestamps: [
                1701956096777775600, 1701956096781659100, 1701956096788349400,
                1701956096788360400,
            ],
            commit_time: 1701956096788358400,
            execution_time: 1701956096789154300,
            ip: "127.0.0.1",
            port: 10002,
            prepare_message_timestamps: [
                1701956096771574300, 1701956096776823800, 1701956096777767000,
            ],
            prepare_time: 1701956096776841500,
            primary_id: 1,
            propose_pre_prepare_time: 1701956096767388700,
            replica_id: 2,
            txn_commands: ["GET"],
            txn_keys: ["test"],
            txn_number: 17,
            txn_values: [""],
            reply_time: 1702001829629,
        },
        // 3: {
        //     commit_message_timestamps: [
        //         1701956096777398000, 1701956096781702400, 1701956096787757600,
        //         1701956096787947500,
        //     ],
        //     commit_time: 1701956096787769900,
        //     execution_time: 1701956096788227600,
        //     ip: "127.0.0.1",
        //     port: 10003,
        //     prepare_message_timestamps: [
        //         1701956096772535600, 1701956096777049000, 1701956096777068300,
        //         1701956096777263900,
        //     ],
        //     prepare_time: 1701956096777074400,
        //     primary_id: 1,
        //     propose_pre_prepare_time: 1701956096767121700,
        //     replica_id: 3,
        //     txn_commands: ["GET"],
        //     txn_keys: ["test"],
        //     txn_number: 17,
        //     txn_values: [""],
        //     reply_time: 1702001829631,
        // },
        4: {
            commit_message_timestamps: [
                1701956096777512700, 1701956096782015500, 1701956096786524200,
                1701956096786591700,
            ],
            commit_time: 1701956096786530000,
            execution_time: 1701956096786978000,
            ip: "127.0.0.1",
            port: 10004,
            prepare_message_timestamps: [
                1701956096772492300, 1701956096776289500, 1701956096776371200,
                1701956096777435000,
            ],
            prepare_time: 1701956096776375000,
            primary_id: 1,
            propose_pre_prepare_time: 1701956096767122200,
            replica_id: 4,
            txn_commands: ["GET"],
            txn_keys: ["test"],
            txn_number: 17,
            txn_values: [""],
            reply_time: 1702001829630,
        },
    },
};

export const tableDataDummy = {
    "17": {
        "transactionNumber": "17",
        "primary": "Replica 2",
        "faultReplicas": "1",
        "replicaDetails": {
            "1": {
                "commitTime": 1701956096786501400,
                "execTime": 1701956096786658600,
                "prepTime": 1701956096776394000
            },
            "2": {
                "commitTime": 1701956096788358400,
                "execTime": 1701956096789154300,
                "prepTime": 1701956096776841500
            },
            "4": {
                "commitTime": 1701956096786530000,
                "execTime": 1701956096786978000,
                "prepTime": 1701956096776375000
            }
        }
    },
    "18": {
        "transactionNumber": "18",
        "primary": "Replica 1",
        "faultReplicas": "0",
        "replicaDetails": {
            "1": {
                "commitTime": 1701956096786501400,
                "execTime": 1701956096786658600,
                "prepTime": 1701956096776394000
            },
            "2": {
                "commitTime": 1701956096788358400,
                "execTime": 1701956096789154300,
                "prepTime": 1701956096776841500
            },
            "3": {
                "commitTime": 1701956096787769900,
                "execTime": 1701956096788227600,
                "prepTime": 1701956096777074400
            },
            "4": {
                "commitTime": 1701956096786530000,
                "execTime": 1701956096786978000,
                "prepTime": 1701956096776375000
            }
        }
    },
    "19": {
        "transactionNumber": "19",
        "primary": "Replica 4",
        "faultReplicas": "0",
        "replicaDetails": {
            "1": {
                "commitTime": 1701956096786501400,
                "execTime": 1701956096786658600,
                "prepTime": 1701956096776394000
            },
            "2": {
                "commitTime": 1701956096788358400,
                "execTime": 1701956096789154300,
                "prepTime": 1701956096776841500
            },
            "3": {
                "commitTime": 1701956096787769900,
                "execTime": 1701956096788227600,
                "prepTime": 1701956096777074400
            },
            "4": {
                "commitTime": 1701956096786530000,
                "execTime": 1701956096786978000,
                "prepTime": 1701956096776375000
            }
        }
    },
    "20": {
        "transactionNumber": "20",
        "primary": "Replica 2",
        "faultReplicas": "1",
        "replicaDetails": {
            "1": {
                "commitTime": 1701956096786501400,
                "execTime": 1701956096786658600,
                "prepTime": 1701956096776394000
            },
            "2": {
                "commitTime": 1701956096788358400,
                "execTime": 1701956096789154300,
                "prepTime": 1701956096776841500
            },
            "3": {
                "commitTime": 1701956096787769900,
                "execTime": 1701956096788227600,
                "prepTime": 1701956096777074400
            }
        }
    },
    "21": {
        "transactionNumber": "21",
        "primary": "No Primary Selected",
        "faultReplicas": "0",
        "replicaDetails": {
            "1": {
                "commitTime": 1701956096786501400,
                "execTime": 1701956096786658600,
                "prepTime": 1701956096776394000
            },
            "2": {
                "commitTime": 1701956096788358400,
                "execTime": 1701956096789154300,
                "prepTime": 1701956096776841500
            },
            "3": {
                "commitTime": 1701956096787769900,
                "execTime": 1701956096788227600,
                "prepTime": 1701956096777074400
            },
            "4": {
                "commitTime": 1701956096786530000,
                "execTime": 1701956096786978000,
                "prepTime": 1701956096776375000
            }
        }
    },
    "22": {
        "transactionNumber": "22",
        "primary": "Replica 1",
        "faultReplicas": "1",
        "replicaDetails": {
            "1": {
                "commitTime": 1701956096786501400,
                "execTime": 1701956096786658600,
                "prepTime": 1701956096776394000
            },
            "2": {
                "commitTime": 1701956096788358400,
                "execTime": 1701956096789154300,
                "prepTime": 1701956096776841500
            },
            "4": {
                "commitTime": 1701956096786530000,
                "execTime": 1701956096786978000,
                "prepTime": 1701956096776375000
            }
        }
    }
}