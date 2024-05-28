export const URL_HOME_PAGE = '/home'
export const URL_TEAM_PAGE = '/team'
export const URL_VISUALIZER_PAGE = '/visualizer'
export const URL_REROUTE_PAGE = '/home'

export const LOGO_DARK = 'https://i.postimg.cc/jd6PkhDs/Res-View-Logo-Dark.png'
export const LOGO_LIGHT = 'https://i.postimg.cc/Y0dMy9mf/Copy-of-Untitled-Design-removebg-preview.png'

export const DEFAULT_IMAGE = 'https://i.postimg.cc/8PTkJPpQ/default-ui-image-placeholder-wireframes-600nw-1037719192-ezgif-com-webp-to-jpg-converter.jpg';

export const PBFT_IMAGE = 'https://i.postimg.cc/66PwqccZ/PBFTGraph.png';

export const PBFT_GRAPH_HOME = 'https://i.postimg.cc/ZYHh1y9x/Screenshot-2024-04-02-055528.png'
export const COMMIT_GRAPH_HOME = 'https://i.postimg.cc/zfNV8Tfx/Screenshot-2024-04-02-055147.png'
export const PREPARE_GRAPH_HOME = 'https://i.postimg.cc/bwks7mqG/Screenshot-2024-04-02-055208.png'
export const TOGGLE_CHANGE_HOME = 'https://i.postimg.cc/vHpMzwgJ/Screenshot-2024-04-02-055739.png'

export const BLOG_LINK = 'https://medium.com/@aunsh/resview-a-pbft-visualizer-based-on-the-resilientdb-blockchain-fabric-3ffaeb2aaee5'

export const CARD_BG_GRAD = 'border-3p border-gray-170 dark:bg-gradient-to-r dark:from-blue-600 dark:via-blue dark:to-blue-550 dark:border-none';

export const DROPDOWN_OPTS = [
    'Select Transaction',
    'Get Transaction',
    'Set Transaction',
    'Clear All'
]

export const DEFAULT_TRANS_SELECT_STR = 'Select Transaction Action';

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

export const VISUALIZER_PAGE_SUBTITLE = 'Scroll below to check out the bespoke Visualizer for PBFT which has the PBFT simulation graph including sim manipulation toggles and the messages vs time graph along with the transaction information.';

export const WHAT_IST_PBFT_SUBTITLE = 'Practical Byzantine Fault Tolerance (PBFT) is a consensus algorithm in distributed systems to reach an agreement among nodes on a single, consistent order of transactions, even in the presence of faulty or malicious nodes.'

export const WHAT_IS_RESVIEW = 'ResView provides a detailed understanding of consensus operations, replica comparisons during transactions, and transaction statistics by visualizing the architecture of ResDB.'

export const DATA_TABLE_NO_PRIMARY_EXISTS = 'No Primary Selected'
export const DATA_TABLE_DELAY = 3000