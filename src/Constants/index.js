export const URL_HOME_PAGE = '/pages/home'
export const URL_TEAM_PAGE = '/pages/team'
export const URL_VISUALIZER_PAGE = '/pages/visualizer'
export const URL_REROUTE_PAGE = '/pages/home'

export const LOGO_DARK = 'https://i.postimg.cc/jd6PkhDs/Res-View-Logo-Dark.png'
export const LOGO_LIGHT = 'https://i.postimg.cc/Y0dMy9mf/Copy-of-Untitled-Design-removebg-preview.png'

export const DEFAULT_IMAGE = 'https://i.postimg.cc/8PTkJPpQ/default-ui-image-placeholder-wireframes-600nw-1037719192-ezgif-com-webp-to-jpg-converter.jpg';

export const PBFT_IMAGE = 'https://i.postimg.cc/66PwqccZ/PBFTGraph.png';

export const PBFT_GRAPH_HOME = 'https://i.postimg.cc/ZYHh1y9x/Screenshot-2024-04-02-055528.png'
export const COMMIT_GRAPH_HOME = 'https://i.postimg.cc/zfNV8Tfx/Screenshot-2024-04-02-055147.png'
export const PREPARE_GRAPH_HOME = 'https://i.postimg.cc/bwks7mqG/Screenshot-2024-04-02-055208.png'
export const TOGGLE_CHANGE_HOME = 'https://i.postimg.cc/vHpMzwgJ/Screenshot-2024-04-02-055739.png'

export const BLOG_LINK = 'https://medium.com/@aunsh/resview-a-pbft-visualizer-based-on-the-resilientdb-blockchain-fabric-3ffaeb2aaee5'

export const AUNSH_PORTFOLIO_LINK = 'https://deploy-preview-5--helpful-hamster-a151d8.netlify.app/'

export const SP_PORTFOLIO_LINK = 'https://github.com/Saipranav-Kotamreddy'

export const REPO_LINK = 'https://github.com/ResilientApp/ResView'

export const RELEASE_NOTES_LINK = 'https://github.com/ResilientApp/ResView/releases/tag/stable_release'

export const RESDB_LINK = 'https://resilientdb.incubator.apache.org/'

export const EXPOLAB_LINK = 'https://expolab.org'

export const APACHE_LINK = 'https://incubator.apache.org/'

export const UCDAVS_LINK = 'https://ucdavis.edu'

export const RELEASE_VERSION = 'v3.2.5'

export const CARD_BG_GRAD = 'border-3p border-gray-170 dark:bg-gradient-to-r dark:from-blue-600 dark:via-blue dark:to-blue-550 dark:border-none';


export const COLORS_PBFT_GRAPH = [
    "#2196F3",
    "#9C27B0",
    "#FFC107",
    "#00BCD4",
    "#4CAF50",
    "#795548"
];

export const COLORS_PBFT_GRAPH_LIGHT = [
    "#086ebf",
    "#820896",
    "#9c7503",
    "#0594a6",
    "#039609",
    "#b33204"
];

export const COLORS_MVT_GRAPH = ["hsl(148, 70%, 50%)", "hsl(200, 70%, 50%)", "hsl(171, 70%, 50%)", "hsl(313, 70%, 50%)"];


export const ACTION_TYPE_PBFT_GRAPH = ["request", "prePrepare", "prepare", "commit", "reply"];

export const TITLES_PBFT_GRAPH = ["REQUEST", "PRE-PREPARE", "PREPARE", "COMMIT", "REPLY"];

export const NODES_PBFT_GRAPH = ["CLIENT", "REPLICA 1", "REPLICA 2", "REPLICA 3", "REPLICA 4"];

export const PBFT_ANIMATION_SPEEDS = {
    '1x': {
        TRANSDURATION: 1500,
        REQUEST_BUFFER: 1000,
        PREPREPARE_BUFFER: 1500,
        PREPARE_BUFFER: 3000,
        COMMIT_BUFFER: 4500,
        REPLY_BUFFER: 6000
    },
    '2x': {
        TRANSDURATION: 750,
        REQUEST_BUFFER: 500,
        PREPREPARE_BUFFER: 750,
        PREPARE_BUFFER: 1500,
        COMMIT_BUFFER: 2250,
        REPLY_BUFFER: 3000
    },
    '0.5x': {
        TRANSDURATION: 3000,
        REQUEST_BUFFER: 2000,
        PREPREPARE_BUFFER: 3000,
        PREPARE_BUFFER: 6000,
        COMMIT_BUFFER: 9000,
        REPLY_BUFFER: 12000
    },
}

export const PBFT_ANIMATION_SPEEDS_NO_PRIMARY = {
    '1x': {
        TRANSDURATION_NP: 1500,
        REQUEST_BUFFER_NP: 1000,
        PREPREPARE_BUFFER_NP: 4500,
        PREPARE_BUFFER_NP: 6000,
        COMMIT_BUFFER_NP: 7500,
        REPLY_BUFFER_NP: 9000
    },
    '2x': {
        TRANSDURATION_NP: 750,
        REQUEST_BUFFER_NP: 500,
        PREPREPARE_BUFFER_NP: 2250,
        PREPARE_BUFFER_NP: 3000,
        COMMIT_BUFFER_NP: 3750,
        REPLY_BUFFER_NP: 4500
    },
    '0.5x': {
        TRANSDURATION_NP: 2000,
        REQUEST_BUFFER_NP: 2000,
        PREPREPARE_BUFFER_NP: 8000,
        PREPARE_BUFFER_NP: 10000,
        COMMIT_BUFFER_NP: 12000,
        REPLY_BUFFER_NP: 14000
    },
}

export const NUMBER_OF_STEPS_PBFT_GRAPH = 5;

export const WHAT_IST_PBFT_SUBTITLE = 'Practical Byzantine Fault Tolerance (PBFT) is a consensus algorithm in distributed systems to reach an agreement among nodes on a single, consistent order of transactions, even in the presence of faulty or malicious nodes.'

export const WHAT_IS_RESVIEW = 'ResView provides a detailed understanding of consensus operations, replica comparisons during transactions, and transaction statistics by visualizing the architecture of ResDB.'

export const DATA_TABLE_NO_PRIMARY_EXISTS = 'No Primary Selected'
export const DATA_TABLE_DELAY = 3000
export const TOTAL_NUMBER_OF_REPLICAS = 4;

export const ICON_DEFAULT_COLOR = '#8f9299';
export const COLOR_LIGHT = '#26D8C4';
export const SUN_COLOR = '#fdb813';

export const MVT_GRAPH_LABELS = ['Replica 1', 'Replica 2', 'Replica 3', 'Replica 4']

export const CONSENSUS_DATA =  {
    "1": {
        "commit_time": 1762909391665320258,
        "execution_time": 1762909391665848279,
        "ext_cache_hit_ratio": 0.0,
        "ip": "127.0.0.1",
        "port": 10002,
        "prepare_time": 1762909391653181974,
        "primary_id": 1,
        "propose_pre_prepare_time": 1762909391638808174,
        "replica_id": 2,
        "txn_commands": [
            "GET"
        ],
        "txn_keys": [
            "user_1"
        ],
        "txn_number": 1,
        "txn_values": [
            ""
        ]
    },
    "10": {
        "commit_time": 1763101838963798067,
        "execution_time": 1763101838964181032,
        "ext_cache_hit_ratio": 0.0,
        "ip": "127.0.0.1",
        "port": 10002,
        "prepare_time": 1763101838953585029,
        "primary_id": 1,
        "propose_pre_prepare_time": 1763101838943521780,
        "replica_id": 2,
        "txn_commands": [
            "SET"
        ],
        "txn_keys": [
            "key328"
        ],
        "txn_number": 10,
        "txn_values": [
            "value362"
        ]
    },
    "100": {
        "commit_time": 1763101849090577765,
        "execution_time": 1763101849091068137,
        "ext_cache_hit_ratio": 0.0,
        "ip": "127.0.0.1",
        "port": 10002,
        "prepare_time": 1763101849080252566,
        "primary_id": 1,
        "propose_pre_prepare_time": 1763101849070203486,
        "replica_id": 2,
        "txn_commands": [
            "SET"
        ],
        "txn_keys": [
            "key229"
        ],
        "txn_number": 100,
        "txn_values": [
            "value120"
        ]
    },
    "1000": {
        "commit_time": 1763428127772525667,
        "execution_time": 1763428127772971705,
        "ext_cache_hit_ratio": 0.5,
        "ip": "127.0.0.1",
        "port": 10002,
        "prepare_time": 1763428127762916348,
        "primary_id": 1,
        "propose_pre_prepare_time": 1763428127754158053,
        "replica_id": 2,
        "txn_commands": [
            "SET"
        ],
        "txn_keys": [
            "a7e209cabdadfa694063520b8d2e9c3f610f185d0f5eaa28de5f2029db3963e8"
        ],
        "txn_number": 1000,
        "txn_values": [
            "{\"inputs\": [{\"owners_before\": [\"FbUGKzKnSgh6bKRw8sxdzaCq1NMjGT6FVeAWLot5bCa1\"], \"fulfills\": null, \"fulfillment\": \"pGSAINjYMTlLb86MXrVorny4r6NabfKGOW4GuQwO2XOxAFZ2gUAFZwO3Cy4S3yC9QeDQUtIZikCv2bjjkWQ11QpsGGJawm1J8xRu_Z7_3ahATKBrsCHb_xIpgfyTl3EXT8OEgHMC\"}], \"outputs\": [{\"public_keys\": [\"FbUGKzKnSgh6bKRw8sxdzaCq1NMjGT6FVeAWLot5bCa1\"], \"condition\": {\"details\": {\"type\": \"ed25519-sha-256\", \"public_key\": \"FbUGKzKnSgh6bKRw8sxdzaCq1NMjGT6FVeAWLot5bCa1\"}, \"uri\": \"ni:///sha-256;4jR5esa43gbHeiViMhgyEGMbHI1uTZVrnsnwoGVfMH4?fpt=ed25519-sha-256&cost=131072\"}, \"amount\": \"1\"}], \"operation\": \"CREATE\", \"metadata\": null, \"asset\": {\"data\": {\"roomId\": \"68e591fb589d78ec5b35183f\", \"type\": \"public\", \"stroke\": {\"drawingId\": \"drawing_1763428125201_01nzd2491\", \"color\": \"#000000\", \"lineWidth\": 5, \"pathData\": [{\"x\": 814, \"y\": 347.81666564941406}, {\"x\": 818, \"y\": 347.81666564941406}, {\"x\": 822, \"y\": 347.81666564941406}, {\"x\": 824, \"y\": 347.81666564941406}, {\"x\": 827, \"y\": 347.81666564941406}, {\"x\": 830, \"y\": 347.81666564941406}, {\"x\": 832, \"y\": 347.81666564941406}, {\"x\": 836, \"y\": 347.81666564941406}, {\"x\": 844, \"y\": 349.81666564941406}, {\"x\": 850, \"y\": 350.81666564941406}, {\"x\": 857, \"y\": 351.81666564941406}], \"timestamp\": 1763428125201, \"user\": \"testuser_2\", \"roomId\": \"68e591fb589d78ec5b35183f\", \"skipUndoStack\": false, \"brushStyle\": \"round\", \"brushType\": \"wacky\", \"brushParams\": {}, \"drawingType\": \"stroke\", \"stampData\": null, \"stampSettings\": null, \"filterType\": null, \"filterParams\": {}, \"metadata\": {\"brushStyle\": \"round\", \"brushType\": \"wacky\", \"brushParams\": {}, \"drawingType\": \"stroke\", \"stampData\": null, \"stampSettings\": null, \"filterType\": null, \"filterParams\": {}, \"isPending\": false, \"opacity\": 1}, \"ts\": 1763428127508, \"id\": \"drawing_1763428125201_01nzd2491\"}}}, \"version\": \"2.0\", \"id\": \"a7e209cabdadfa694063520b8d2e9c3f610f185d0f5eaa28de5f2029db3963e8\"}"
        ]
    },
    "1001": {
        "commit_time": 1763428134137731621,
        "execution_time": 1763428134138257540,
        "ext_cache_hit_ratio": 0.5,
        "ip": "127.0.0.1",
        "port": 10002,
        "prepare_time": 1763428134127782957,
        "primary_id": 1,
        "propose_pre_prepare_time": 1763428134117190989,
        "replica_id": 2,
        "txn_commands": [
            "SET"
        ],
        "txn_keys": [
            "956132d297d4341891efaf86bffd54af3c55e46c031d8808b3af4c7f9928fbbb"
        ],
        "txn_number": 1001,
        "txn_values": ["{\"inputs\": [{\"owners_before\": [\"FbUGKzKnSgh6bKRw8sxdzaCq1NMjGT6FVeAWLot5bCa1\"], \"fulfills\": null, \"fulfillment\": \"pGSAINjYMTlLb86MXrVorny4r6NabfKGOW4GuQwO2XOxAFZ2gUDnHbvQWKEEpl_GsW9gT060eJ_tN2wuNz8xyELO6GaKY17K_fROFB_zXn3rYCNWgPlbZYnbLcFhLn7BzGqH5rwF\"}], \"outputs\": [{\"public_keys\": [\"FbUGKzKnSgh6bKRw8sxdzaCq1NMjGT6FVeAWLot5bCa1\"], \"condition\": {\"details\": {\"type\": \"ed25519-sha-256\", \"public_key\": \"FbUGKzKnSgh6bKRw8sxdzaCq1NMjGT6FVeAWLot5bCa1\"}, \"uri\": \"ni:///sha-256;4jR5esa43gbHeiViMhgyEGMbHI1uTZVrnsnwoGVfMH4?fpt=ed25519-sha-256&cost=131072\"}, \"amount\": \"1\"}], \"operation\": \"CREATE\", \"metadata\": null, \"asset\": {\"data\": {\"roomId\": \"68e591fb589d78ec5b35183f\", \"type\": \"public\", \"stroke\": {\"drawingId\": \"drawing_1763428132722_186yo\", \"color\": \"#000000\", \"lineWidth\": 5, \"pathData\": [{\"x\": 626, \"y\": 407.81666564941406}], \"timestamp\": 1763428132722, \"user\": \"testuser_2\", \"roomId\": \"68e591fb589d78ec5b35183f\", \"skipUndoStack\": false, \"brushStyle\": \"round\", \"brushType\": \"normal\", \"brushParams\": {}, \"drawingType\": \"stamp\", \"stampData\": {\"id\": \"flower\", \"emoji\": \"\�\�\", \"name\": \"Flower\", \"category\": \"nature\"}, \"stampSettings\": {\"size\": 50, \"rotation\": 0, \"opacity\": 100}, \"filterType\": null, \"filterParams\": {}, \"metadata\": {\"brushStyle\": \"round\", \"brushType\": \"normal\", \"brushParams\": {}, \"drawingType\": \"stamp\", \"stampData\": {\"id\": \"flower\", \"emoji\": \"\�\�\", \"name\": \"Flower\", \"category\": \"nature\"}, \"stampSettings\": {\"size\": 50, \"rotation\": 0, \"opacity\": 100}, \"filterType\": null, \"filterParams\": {}, \"isPending\": false, \"opacity\": 1}, \"ts\": 1763428133851, \"id\": \"drawing_1763428132722_186yo\"}}}, \"version\": \"2.0\", \"id\": \"956132d297d4341891efaf86bffd54af3c55e46c031d8808b3af4c7f9928fbbb\"}"
        ]
    },
    "1002": {
        "commit_time": 1763428135738609676,
        "execution_time": 1763428135739213987,
        "ext_cache_hit_ratio": 0.5,
        "ip": "127.0.0.1",
        "port": 10002,
        "prepare_time": 1763428135728226769,
        "primary_id": 1,
        "propose_pre_prepare_time": 1763428135717960367,
        "replica_id": 2,
        "txn_commands": [
            "SET"
        ],
        "txn_keys": [
            "e7ec14bbe481f83b1f055869778dcbe9a3cc631f80d6c9fa047ed47579f4fc11"
        ],
        "txn_number": 1002,
        "txn_values": [
            "{\"inputs\": [{\"owners_before\": [\"FbUGKzKnSgh6bKRw8sxdzaCq1NMjGT6FVeAWLot5bCa1\"], \"fulfills\": null, \"fulfillment\": \"pGSAINjYMTlLb86MXrVorny4r6NabfKGOW4GuQwO2XOxAFZ2gUAoI1CeeKOJMrvB_xh_hdsWiS8LjZu5zgYRFHLbpWr4m8dH-hMwIpvkHfY_pNsxT-3LehPEP_AtRfrqLraVmuoH\"}], \"outputs\": [{\"public_keys\": [\"FbUGKzKnSgh6bKRw8sxdzaCq1NMjGT6FVeAWLot5bCa1\"], \"condition\": {\"details\": {\"type\": \"ed25519-sha-256\", \"public_key\": \"FbUGKzKnSgh6bKRw8sxdzaCq1NMjGT6FVeAWLot5bCa1\"}, \"uri\": \"ni:///sha-256;4jR5esa43gbHeiViMhgyEGMbHI1uTZVrnsnwoGVfMH4?fpt=ed25519-sha-256&cost=131072\"}, \"amount\": \"1\"}], \"operation\": \"CREATE\", \"metadata\": null, \"asset\": {\"data\": {\"roomId\": \"68e591fb589d78ec5b35183f\", \"type\": \"public\", \"stroke\": {\"drawingId\": \"drawing_1763428134714_6tdvxqaye\", \"color\": \"#000000\", \"lineWidth\": 5, \"pathData\": [{\"x\": 515, \"y\": 442.81666564941406}, {\"x\": 515, \"y\": 443.81666564941406}, {\"x\": 515, \"y\": 444.81666564941406}, {\"x\": 515, \"y\": 445.81666564941406}, {\"x\": 515, \"y\": 446.81666564941406}, {\"x\": 515, \"y\": 447.81666564941406}, {\"x\": 516, \"y\": 448.81666564941406}, {\"x\": 517, \"y\": 451.81666564941406}, {\"x\": 519, \"y\": 454.81666564941406}, {\"x\": 521, \"y\": 458.81666564941406}, {\"x\": 524, \"y\": 460.81666564941406}, {\"x\": 526, \"y\": 463.81666564941406}, {\"x\": 530, \"y\": 465.81666564941406}, {\"x\": 532, \"y\": 467.81666564941406}, {\"x\": 533, \"y\": 468.81666564941406}, {\"x\": 534, \"y\": 470.81666564941406}, {\"x\": 535, \"y\": 470.81666564941406}], \"timestamp\": 1763428134714, \"user\": \"testuser_2\", \"roomId\": \"68e591fb589d78ec5b35183f\", \"skipUndoStack\": false, \"brushStyle\": \"round\", \"brushType\": \"wacky\", \"brushParams\": {}, \"drawingType\": \"stroke\", \"stampData\": null, \"stampSettings\": null, \"filterType\": null, \"filterParams\": {}, \"metadata\": {\"brushStyle\": \"round\", \"brushType\": \"wacky\", \"brushParams\": {}, \"drawingType\": \"stroke\", \"stampData\": null, \"stampSettings\": null, \"filterType\": null, \"filterParams\": {}, \"isPending\": false, \"opacity\": 1}, \"ts\": 1763428135443, \"id\": \"drawing_1763428134714_6tdvxqaye\"}}}, \"version\": \"2.0\", \"id\": \"e7ec14bbe481f83b1f055869778dcbe9a3cc631f80d6c9fa047ed47579f4fc11\"}"
        ]
    },
    "1003": {
        "commit_time": 1763428149706996848,
        "execution_time": 1763428149707484087,
        "ext_cache_hit_ratio": 0.5,
        "ip": "127.0.0.1",
        "port": 10002,
        "prepare_time": 1763428149696581345,
        "primary_id": 1,
        "propose_pre_prepare_time": 1763428149686606008,
        "replica_id": 2,
        "txn_commands": [
            "SET"
        ],
        "txn_keys": [
            "6757d6ebe6a9aa738f5cff9f316f764b53b74584d7cf6ed7c496303f1a05c115"
        ],
        "txn_number": 1003,
        "txn_values": [
            "{\"inputs\": [{\"owners_before\": [\"FbUGKzKnSgh6bKRw8sxdzaCq1NMjGT6FVeAWLot5bCa1\"], \"fulfills\": null, \"fulfillment\": \"pGSAINjYMTlLb86MXrVorny4r6NabfKGOW4GuQwO2XOxAFZ2gUCJlJhEYMgYZrrbsQ0Ma_XxJE1V10mh5075LDHZ7D1ZsUKFhKvVzkHZBClgJCJqSbC9kMlZtIv6wL0nC78vDOIJ\"}], \"outputs\": [{\"public_keys\": [\"FbUGKzKnSgh6bKRw8sxdzaCq1NMjGT6FVeAWLot5bCa1\"], \"condition\": {\"details\": {\"type\": \"ed25519-sha-256\", \"public_key\": \"FbUGKzKnSgh6bKRw8sxdzaCq1NMjGT6FVeAWLot5bCa1\"}, \"uri\": \"ni:///sha-256;4jR5esa43gbHeiViMhgyEGMbHI1uTZVrnsnwoGVfMH4?fpt=ed25519-sha-256&cost=131072\"}, \"amount\": \"1\"}], \"operation\": \"CREATE\", \"metadata\": null, \"asset\": {\"data\": {\"health_check\": true, \"ts\": 1763428149566}}, \"version\": \"2.0\", \"id\": \"6757d6ebe6a9aa738f5cff9f316f764b53b74584d7cf6ed7c496303f1a05c115\"}"
        ]
    },
    "1004": {
        "commit_time": 1763428209691281653,
        "execution_time": 1763428209691801236,
        "ext_cache_hit_ratio": 0.5,
        "ip": "127.0.0.1",
        "port": 10002,
        "prepare_time": 1763428209680666957,
        "primary_id": 1,
        "propose_pre_prepare_time": 1763428209670191995,
        "replica_id": 2,
        "txn_commands": [
            "SET"
        ],
        "txn_keys": [
            "2deb3c23b9f927e0321fd4cbcf1c8270f6aa1c6a6a2584667d36063e3002133d"
        ],
        "txn_number": 1004,
        "txn_values": [
            "{\"inputs\": [{\"owners_before\": [\"FbUGKzKnSgh6bKRw8sxdzaCq1NMjGT6FVeAWLot5bCa1\"], \"fulfills\": null, \"fulfillment\": \"pGSAINjYMTlLb86MXrVorny4r6NabfKGOW4GuQwO2XOxAFZ2gUBVE3rPSFbWYMVoFUPmrXJlqd35jIZg_vGiiWJgrX_2ZAo1hT8egGidFWJdwKjHYYxnR6sd3LoLRtynAa1K-3EC\"}], \"outputs\": [{\"public_keys\": [\"FbUGKzKnSgh6bKRw8sxdzaCq1NMjGT6FVeAWLot5bCa1\"], \"condition\": {\"details\": {\"type\": \"ed25519-sha-256\", \"public_key\": \"FbUGKzKnSgh6bKRw8sxdzaCq1NMjGT6FVeAWLot5bCa1\"}, \"uri\": \"ni:///sha-256;4jR5esa43gbHeiViMhgyEGMbHI1uTZVrnsnwoGVfMH4?fpt=ed25519-sha-256&cost=131072\"}, \"amount\": \"1\"}], \"operation\": \"CREATE\", \"metadata\": null, \"asset\": {\"data\": {\"health_check\": true, \"ts\": 1763428209555}}, \"version\": \"2.0\", \"id\": \"2deb3c23b9f927e0321fd4cbcf1c8270f6aa1c6a6a2584667d36063e3002133d\"}"
        ]
    },
    "1005": {
        "commit_time": 1763428269670949772,
        "execution_time": 1763428269671681636,
        "ext_cache_hit_ratio": 0.5,
        "ip": "127.0.0.1",
        "port": 10002,
        "prepare_time": 1763428269660207894,
        "primary_id": 1,
        "propose_pre_prepare_time": 1763428269649761042,
        "replica_id": 2,
        "txn_commands": [
            "SET"
        ],
        "txn_keys": [
            "12a6d67794650c31f8c58b7d75c63ca20ac067e9352b960759f12ed0fa2fcdda"
        ],
        "txn_number": 1005,
        "txn_values": [
            "{\"inputs\": [{\"owners_before\": [\"FbUGKzKnSgh6bKRw8sxdzaCq1NMjGT6FVeAWLot5bCa1\"], \"fulfills\": null, \"fulfillment\": \"pGSAINjYMTlLb86MXrVorny4r6NabfKGOW4GuQwO2XOxAFZ2gUB_FxPgtUSDWHa8L98b5TYFs3NJbeb4q3oilyFrxG4Tzy3165lgQ2FwzxdjcUkTYhveHooSVOZFY9qck0XpUq8M\"}], \"outputs\": [{\"public_keys\": [\"FbUGKzKnSgh6bKRw8sxdzaCq1NMjGT6FVeAWLot5bCa1\"], \"condition\": {\"details\": {\"type\": \"ed25519-sha-256\", \"public_key\": \"FbUGKzKnSgh6bKRw8sxdzaCq1NMjGT6FVeAWLot5bCa1\"}, \"uri\": \"ni:///sha-256;4jR5esa43gbHeiViMhgyEGMbHI1uTZVrnsnwoGVfMH4?fpt=ed25519-sha-256&cost=131072\"}, \"amount\": \"1\"}], \"operation\": \"CREATE\", \"metadata\": null, \"asset\": {\"data\": {\"health_check\": true, \"ts\": 1763428269525}}, \"version\": \"2.0\", \"id\": \"12a6d67794650c31f8c58b7d75c63ca20ac067e9352b960759f12ed0fa2fcdda\"}"
        ]
    },
    "1006": {
        "commit_time": 1763428329702207990,
        "execution_time": 1763428329702726693,
        "ext_cache_hit_ratio": 0.5,
        "ip": "127.0.0.1",
        "port": 10002,
        "prepare_time": 1763428329691825083,
        "primary_id": 1,
        "propose_pre_prepare_time": 1763428329681226955,
        "replica_id": 2,
        "txn_commands": [
            "SET"
        ],
        "txn_keys": [
            "078006555e891882aef0751e6a7b6a0f24bd0348d2eaa7ac1e7b0228e4229461"
        ],
        "txn_number": 1006,
        "txn_values": [
            "{\"inputs\": [{\"owners_before\": [\"FbUGKzKnSgh6bKRw8sxdzaCq1NMjGT6FVeAWLot5bCa1\"], \"fulfills\": null, \"fulfillment\": \"pGSAINjYMTlLb86MXrVorny4r6NabfKGOW4GuQwO2XOxAFZ2gUDkz9la7M8BjLopd8JlvU2edfJRCLT1LTVVL7DJZUL0aMiClQ1FEqUXEuJd3YLXpJZLkx4Gi-xqY3bfZJWzDHUE\"}], \"outputs\": [{\"public_keys\": [\"FbUGKzKnSgh6bKRw8sxdzaCq1NMjGT6FVeAWLot5bCa1\"], \"condition\": {\"details\": {\"type\": \"ed25519-sha-256\", \"public_key\": \"FbUGKzKnSgh6bKRw8sxdzaCq1NMjGT6FVeAWLot5bCa1\"}, \"uri\": \"ni:///sha-256;4jR5esa43gbHeiViMhgyEGMbHI1uTZVrnsnwoGVfMH4?fpt=ed25519-sha-256&cost=131072\"}, \"amount\": \"1\"}], \"operation\": \"CREATE\", \"metadata\": null, \"asset\": {\"data\": {\"health_check\": true, \"ts\": 1763428329560}}, \"version\": \"2.0\", \"id\": \"078006555e891882aef0751e6a7b6a0f24bd0348d2eaa7ac1e7b0228e4229461\"}"
        ]
    },
    "1007": {
        "commit_time": 1763428389685494454,
        "execution_time": 1763428389686157140,
        "ext_cache_hit_ratio": 0.5,
        "ip": "127.0.0.1",
        "port": 10002,
        "prepare_time": 1763428389675053524,
        "primary_id": 1,
        "propose_pre_prepare_time": 1763428389664441236,
        "replica_id": 2,
        "txn_commands": [
            "SET"
        ],
        "txn_keys": [
            "a24732d9587ee21d47461777d513ec0d2a0ece283968264566be2b59285dd0f7"
        ],
        "txn_number": 1007,
        "txn_values": [
            "{\"inputs\": [{\"owners_before\": [\"FbUGKzKnSgh6bKRw8sxdzaCq1NMjGT6FVeAWLot5bCa1\"], \"fulfills\": null, \"fulfillment\": \"pGSAINjYMTlLb86MXrVorny4r6NabfKGOW4GuQwO2XOxAFZ2gUCmfGQFXzcdE8nZE4EFXyJMmnXyQkIKw209xvm4kIt07eI61uCvilGfOQoA965cyAOdyrD4wM0ObnwMHmg4EjYI\"}], \"outputs\": [{\"public_keys\": [\"FbUGKzKnSgh6bKRw8sxdzaCq1NMjGT6FVeAWLot5bCa1\"], \"condition\": {\"details\": {\"type\": \"ed25519-sha-256\", \"public_key\": \"FbUGKzKnSgh6bKRw8sxdzaCq1NMjGT6FVeAWLot5bCa1\"}, \"uri\": \"ni:///sha-256;4jR5esa43gbHeiViMhgyEGMbHI1uTZVrnsnwoGVfMH4?fpt=ed25519-sha-256&cost=131072\"}, \"amount\": \"1\"}], \"operation\": \"CREATE\", \"metadata\": null, \"asset\": {\"data\": {\"health_check\": true, \"ts\": 1763428389548}}, \"version\": \"2.0\", \"id\": \"a24732d9587ee21d47461777d513ec0d2a0ece283968264566be2b59285dd0f7\"}"
        ]
    },
    "1008": {
        "commit_time": 1763428449713835542,
        "execution_time": 1763428449714623581,
        "ext_cache_hit_ratio": 0.5,
        "ip": "127.0.0.1",
        "port": 10002,
        "prepare_time": 1763428449703244639,
        "primary_id": 1,
        "propose_pre_prepare_time": 1763428449693027770,
        "replica_id": 2,
        "txn_commands": [
            "SET"
        ],
        "txn_keys": [
            "8d06b436ca84720923319a0b819227662b6c00466941f6ea9bd4bf4bf5dc6466"
        ],
        "txn_number": 1008,
        "txn_values": [
            "{\"inputs\": [{\"owners_before\": [\"FbUGKzKnSgh6bKRw8sxdzaCq1NMjGT6FVeAWLot5bCa1\"], \"fulfills\": null, \"fulfillment\": \"pGSAINjYMTlLb86MXrVorny4r6NabfKGOW4GuQwO2XOxAFZ2gUCTGvdhnc1OPP53vavQ3WjVavRjJWp3xDuhRI_pnxTv5CO7yas10-mpk47-t5dZ8GWLF25BXvyHa_4XNWM4DPEM\"}], \"outputs\": [{\"public_keys\": [\"FbUGKzKnSgh6bKRw8sxdzaCq1NMjGT6FVeAWLot5bCa1\"], \"condition\": {\"details\": {\"type\": \"ed25519-sha-256\", \"public_key\": \"FbUGKzKnSgh6bKRw8sxdzaCq1NMjGT6FVeAWLot5bCa1\"}, \"uri\": \"ni:///sha-256;4jR5esa43gbHeiViMhgyEGMbHI1uTZVrnsnwoGVfMH4?fpt=ed25519-sha-256&cost=131072\"}, \"amount\": \"1\"}], \"operation\": \"CREATE\", \"metadata\": null, \"asset\": {\"data\": {\"health_check\": true, \"ts\": 1763428449549}}, \"version\": \"2.0\", \"id\": \"8d06b436ca84720923319a0b819227662b6c00466941f6ea9bd4bf4bf5dc6466\"}"
        ]
    },
    "1009": {
        "commit_time": 1763431280037768716,
        "execution_time": 1763431280038296882,
        "ext_cache_hit_ratio": 0.5,
        "ip": "127.0.0.1",
        "port": 10002,
        "prepare_time": 1763431280027099782,
        "primary_id": 1,
        "propose_pre_prepare_time": 1763431280016696105,
        "replica_id": 2,
        "txn_commands": [
            "SET"
        ],
        "txn_keys": [
            "0b002ce14e30e887cec3303025a1009cb5fb39cd2f99fbf4848b23c0297b04fe"
        ],
        "txn_number": 1009,
        "txn_values": [
            "{\"inputs\": [{\"owners_before\": [\"FbUGKzKnSgh6bKRw8sxdzaCq1NMjGT6FVeAWLot5bCa1\"], \"fulfills\": null, \"fulfillment\": \"pGSAINjYMTlLb86MXrVorny4r6NabfKGOW4GuQwO2XOxAFZ2gUCWmKuACrjh6fr8F80rxex-9itmunGf_wzLf5KmwdmlRrBDz3yB1dSTkBBHJlP-t7qxhYPhHbC2gLE7P3EYV6QG\"}], \"outputs\": [{\"public_keys\": [\"FbUGKzKnSgh6bKRw8sxdzaCq1NMjGT6FVeAWLot5bCa1\"], \"condition\": {\"details\": {\"type\": \"ed25519-sha-256\", \"public_key\": \"FbUGKzKnSgh6bKRw8sxdzaCq1NMjGT6FVeAWLot5bCa1\"}, \"uri\": \"ni:///sha-256;4jR5esa43gbHeiViMhgyEGMbHI1uTZVrnsnwoGVfMH4?fpt=ed25519-sha-256&cost=131072\"}, \"amount\": \"1\"}], \"operation\": \"CREATE\", \"metadata\": null, \"asset\": {\"data\": {\"health_check\": true, \"ts\": 1763431279855}}, \"version\": \"2.0\", \"id\": \"0b002ce14e30e887cec3303025a1009cb5fb39cd2f99fbf4848b23c0297b04fe\"}"
        ]
    }
}