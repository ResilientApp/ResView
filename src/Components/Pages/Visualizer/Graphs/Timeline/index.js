import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { VizDataHistoryContext } from "../../../../../Context/visualizer";
import { ThemeContext } from "../../../../../Context/theme";

const Timeline = () => {
    const { currentTransaction } = useContext(VizDataHistoryContext);
    const { theme } = useContext(ThemeContext);
    const [timelineData, setTimelineData] = useState({});
    const [consensusData, setConsensusData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedReplica, setSelectedReplica] = useState(1);
    const [hasTimelineData, setHasTimelineData] = useState(false);

    useEffect(() => {
        const fetchAllTimelineData = async () => {
            if (currentTransaction < 0) {
                setTimelineData({});
                setConsensusData({});
                setHasTimelineData(false);
                return;
            }

            setLoading(true);
            setError(null);

            const replicas = [1, 2, 3, 4];
            const dataByReplica = {};
            const consensusDataByReplica = {};
            let hasTimeline = false;
            let hasConsensus = false;

            // First, try to fetch timeline data
            await Promise.all(
                replicas.map(async (replicaNum) => {
                    try {
                        const response = await fetch(
                            `https://dev-replica-${replicaNum}-stats.resilientdb.com/transaction_timeline/${currentTransaction}`
                        );

                        if (response.ok) {
                            const data = await response.json();
                            // Check if timeline array exists and has data
                            if (data.timeline && Array.isArray(data.timeline) && data.timeline.length > 0) {
                                dataByReplica[replicaNum] = data;
                                hasTimeline = true;
                            }
                        }
                    } catch (err) {
                        // Silently skip failed replicas
                    }
                })
            );

            // If no timeline data, fall back to consensus_data endpoint
            if (!hasTimeline) {
                await Promise.all(
                    replicas.map(async (replicaNum) => {
                        try {
                            const response = await fetch(
                                `https://dev-replica-${replicaNum}-stats.resilientdb.com/consensus_data/${currentTransaction}`
                            );

                            if (response.ok) {
                                const data = await response.json();
                                // Handle both formats:
                                // 1. Direct data object (when seq is in URL path)
                                // 2. Nested object with sequence number as key (when fetching all)
                                let txnData = null;
                                const txnKey = String(currentTransaction);
                                
                                if (data && typeof data === 'object') {
                                    // Check if it's direct data (has timeline_events or txn_number)
                                    if (data.timeline_events || data.txn_number === currentTransaction) {
                                        txnData = data;
                                    } 
                                    // Check if it's nested format
                                    else if (txnKey in data) {
                                        txnData = data[txnKey];
                                    }
                                }
                                
                                if (txnData && txnData.timeline_events && Array.isArray(txnData.timeline_events) && txnData.timeline_events.length > 0) {
                                    // Transform new format to old format for compatibility
                                    const transformedData = {
                                        timeline: txnData.timeline_events.map(event => ({
                                            timestamp: event.timestamp,
                                            phase: event.phase,
                                            sender_id: event.sender_id
                                        })),
                                        transaction_details: {
                                            txn_number: txnData.txn_number,
                                            txn_commands: txnData.txn_commands,
                                            txn_keys: txnData.txn_keys,
                                            txn_values: txnData.txn_values,
                                            propose_pre_prepare_time: txnData.propose_pre_prepare_time,
                                            prepare_time: txnData.prepare_time,
                                            commit_time: txnData.commit_time,
                                            execution_time: txnData.execution_time
                                        },
                                        txn_number: txnData.txn_number
                                    };
                                    dataByReplica[replicaNum] = transformedData;
                                    hasTimeline = true;
                                } else if (txnData) {
                                    consensusDataByReplica[replicaNum] = txnData;
                                    hasConsensus = true;
                                }
                            }
                        } catch (err) {
                            // Silently skip failed replicas
                        }
                    })
                );
            }

            if (!hasTimeline && !hasConsensus) {
                setError("No data found for this transaction");
            }

            setTimelineData(dataByReplica);
            setConsensusData(consensusDataByReplica);
            setHasTimelineData(hasTimeline);
            
            // Set first available replica as selected
            const availableReplicas = hasTimeline 
                ? Object.keys(dataByReplica).map(Number).sort((a, b) => a - b)
                : Object.keys(consensusDataByReplica).map(Number).sort((a, b) => a - b);
            if (availableReplicas.length > 0 && !availableReplicas.includes(selectedReplica)) {
                setSelectedReplica(availableReplicas[0]);
            }
            
            setLoading(false);
        };

        fetchAllTimelineData();
    }, [currentTransaction]);

    useEffect(() => {
        const scrollToTimeline = () => {
            const hash = window.location.hash;
            // Handle both #timeline and #timeline?seq=153 formats
            if (hash === '#timeline' || hash.startsWith('#timeline')) {
                const element = document.getElementById('timeline');
                if (element) {
                    setTimeout(() => {
                        element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                        });
                    }, 100);
                }
            }
        };

        // Handle initial load
        scrollToTimeline();

        // Handle hash changes
        const handleHashChange = () => {
            scrollToTimeline();
        };

        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    const formatTimestamp = (ts, startTime) => {
        const relativeTime = ((ts - startTime) / 1_000_000).toFixed(2);
        return `${relativeTime}ms`;
    };

    const calculateDuration = (startTs, endTs) => {
        return ((endTs - startTs) / 1_000).toFixed(0) + "μs";
    };

    const renderTimeline = (data) => {
        if (!data || !data.timeline || data.timeline.length === 0) {
            return (
                <div className="flex items-center justify-center h-64">
                    <div className="text-gray-500 dark:text-gray-400">No timeline data available</div>
                </div>
            );
        }

        const { timeline, transaction_details } = data;
        const startTime = timeline[0].timestamp;
        const endTime = timeline[timeline.length - 1].timestamp;
        const totalDuration = endTime - startTime;

        const preparePhase = timeline.filter((e) => e.phase === "prepare_recv");
        const commitPhase = timeline.filter((e) => e.phase === "commit_recv");
        const executeStart = timeline.find((e) => e.phase === "execute_start");
        const executeEnd = timeline.find((e) => e.phase === "execute_end");
        const responseSent = timeline.find((e) => e.phase === "response_sent");

        const colorMode = theme ? "text-gray-300" : "text-gray-700";
        const borderColor = theme ? "border-gray-50" : "border-gray-700";
        const bgColor = theme ? "bg-blue-450" : "bg-blue-10";
        const cardBg = theme ? "bg-gray-800" : "bg-white";

        return (
            <div className="space-y-6">
                <div className="flex items-end justify-between">
                    <div className="space-y-1">
                        <h1 className={classNames("text-3xl font-bold", colorMode)}>
                            PBFT Consensus Timeline
                        </h1>
                        <p className={classNames("text-sm", colorMode)}>
                            Transaction #{data.txn_number || currentTransaction}
                        </p>
                    </div>
                    <div className="text-right">
                        <div className={classNames("text-sm", colorMode)}>Total Duration</div>
                        <div className={classNames("text-2xl font-bold", colorMode)}>
                            {(totalDuration / 1_000_000).toFixed(2)}ms
                        </div>
                    </div>
                </div>

                <div className={classNames("rounded-lg border-3p p-6", borderColor, bgColor)}>
                    <div className={classNames("mb-4 text-xl font-semibold", colorMode)}>
                        Consensus Flow
                    </div>
                    {transaction_details && (
                        <div className={classNames("mb-6 text-sm", colorMode)}>
                            {transaction_details.txn_commands?.[0] || "Operation"} on key "
                            {transaction_details.txn_keys?.[0] || "N/A"}"
                        </div>
                    )}

                    <div className="space-y-2">
                        {/* Pre-Prepare Phase */}
                        {transaction_details?.propose_pre_prepare_time && (
                            <div className="flex gap-4">
                                <div className="flex w-32 shrink-0 flex-col items-end pr-4 pt-1">
                                    <div className={classNames("text-sm font-semibold", colorMode)}>
                                        Pre-Prepare
                                    </div>
                                    <div className={classNames("font-mono text-xs", colorMode)}>
                                        {formatTimestamp(
                                            transaction_details.propose_pre_prepare_time,
                                            startTime
                                        )}
                                    </div>
                                </div>
                                <div className="relative flex-1">
                                    <div className={classNames("absolute left-2 top-0 h-full w-px", borderColor)} />
                                    <div className="relative flex items-start gap-3 pb-6">
                                        <div
                                            className={classNames(
                                                "z-10 mt-1 h-4 w-4 shrink-0 rounded-full bg-purple-500 ring-4",
                                                theme ? "ring-blue-450" : "ring-white"
                                            )}
                                        />
                                        <div className="min-w-0 flex-1 pt-0.5">
                                            <div className={classNames("rounded-lg border p-3", borderColor, cardBg)}>
                                                <div className={classNames("text-sm font-medium", colorMode)}>
                                                    Primary proposes transaction
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Prepare Phase */}
                        {preparePhase.length > 0 && (
                            <div className="flex gap-4">
                                <div className="flex w-32 shrink-0 flex-col items-end pr-4 pt-1">
                                    <div className={classNames("text-sm font-semibold", colorMode)}>Prepare</div>
                                    <div className={classNames("font-mono text-xs", colorMode)}>
                                        {calculateDuration(
                                            preparePhase[0].timestamp,
                                            preparePhase[preparePhase.length - 1].timestamp
                                        )}
                                    </div>
                                </div>
                                <div className="relative flex-1">
                                    <div className={classNames("absolute left-2 top-0 h-full w-px", borderColor)} />
                                    <div className="space-y-3 pb-6">
                                        {preparePhase.map((event, idx) => (
                                            <div key={idx} className="relative flex items-start gap-3">
                                                <div
                                                    className={classNames(
                                                        "z-10 mt-1 h-4 w-4 shrink-0 rounded-full bg-blue-500 ring-4",
                                                        theme ? "ring-blue-450" : "ring-white"
                                                    )}
                                                />
                                                <div className="min-w-0 flex-1 pt-0.5">
                                                    <div
                                                        className={classNames(
                                                            "flex items-center justify-between gap-4 rounded-lg border p-3",
                                                            borderColor,
                                                            cardBg
                                                        )}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <span
                                                                className={classNames(
                                                                    "rounded px-2 py-1 text-xs font-mono",
                                                                    theme
                                                                        ? "bg-gray-700 text-gray-300"
                                                                        : "bg-gray-200 text-gray-700"
                                                                )}
                                                            >
                                                                Node {event.sender_id}
                                                            </span>
                                                            <span className={classNames("text-sm", colorMode)}>
                                                                sent prepare message
                                                            </span>
                                                        </div>
                                                        <div
                                                            className={classNames(
                                                                "shrink-0 font-mono text-xs",
                                                                colorMode
                                                            )}
                                                        >
                                                            {formatTimestamp(event.timestamp, startTime)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Commit Phase */}
                        {commitPhase.length > 0 && (
                            <div className="flex gap-4">
                                <div className="flex w-32 shrink-0 flex-col items-end pr-4 pt-1">
                                    <div className={classNames("text-sm font-semibold", colorMode)}>Commit</div>
                                    <div className={classNames("font-mono text-xs", colorMode)}>
                                        {calculateDuration(
                                            commitPhase[0].timestamp,
                                            commitPhase[commitPhase.length - 1].timestamp
                                        )}
                                    </div>
                                </div>
                                <div className="relative flex-1">
                                    <div className={classNames("absolute left-2 top-0 h-full w-px", borderColor)} />
                                    <div className="space-y-3 pb-6">
                                        {commitPhase.map((event, idx) => (
                                            <div key={idx} className="relative flex items-start gap-3">
                                                <div
                                                    className={classNames(
                                                        "z-10 mt-1 h-4 w-4 shrink-0 rounded-full bg-cyan-500 ring-4",
                                                        theme ? "ring-blue-450" : "ring-white"
                                                    )}
                                                />
                                                <div className="min-w-0 flex-1 pt-0.5">
                                                    <div
                                                        className={classNames(
                                                            "flex items-center justify-between gap-4 rounded-lg border p-3",
                                                            borderColor,
                                                            cardBg
                                                        )}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <span
                                                                className={classNames(
                                                                    "rounded px-2 py-1 text-xs font-mono",
                                                                    theme
                                                                        ? "bg-gray-700 text-gray-300"
                                                                        : "bg-gray-200 text-gray-700"
                                                                )}
                                                            >
                                                                Node {event.sender_id}
                                                            </span>
                                                            <span className={classNames("text-sm", colorMode)}>
                                                                sent commit message
                                                            </span>
                                                        </div>
                                                        <div
                                                            className={classNames(
                                                                "shrink-0 font-mono text-xs",
                                                                colorMode
                                                            )}
                                                        >
                                                            {formatTimestamp(event.timestamp, startTime)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Execute Phase */}
                        {executeStart && executeEnd && (
                            <div className="flex gap-4">
                                <div className="flex w-32 shrink-0 flex-col items-end pr-4 pt-1">
                                    <div className={classNames("text-sm font-semibold", colorMode)}>Execute</div>
                                    <div className={classNames("font-mono text-xs", colorMode)}>
                                        {calculateDuration(executeStart.timestamp, executeEnd.timestamp)}
                                    </div>
                                </div>
                                <div className="relative flex-1">
                                    <div className={classNames("absolute left-2 top-0 h-full w-px", borderColor)} />
                                    <div className="space-y-3 pb-6">
                                        <div className="relative flex items-start gap-3">
                                            <div
                                                className={classNames(
                                                    "z-10 mt-1 h-4 w-4 shrink-0 rounded-full bg-emerald-500 ring-4",
                                                    theme ? "ring-blue-450" : "ring-white"
                                                )}
                                            />
                                            <div className="min-w-0 flex-1 pt-0.5">
                                                <div
                                                    className={classNames(
                                                        "flex items-center justify-between gap-4 rounded-lg border p-3",
                                                        borderColor,
                                                        cardBg
                                                    )}
                                                >
                                                    <div className={classNames("text-sm", colorMode)}>
                                                        Transaction execution started
                                                    </div>
                                                    <div className={classNames("shrink-0 font-mono text-xs", colorMode)}>
                                                        {formatTimestamp(executeStart.timestamp, startTime)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative flex items-start gap-3">
                                            <div
                                                className={classNames(
                                                    "z-10 mt-1 h-4 w-4 shrink-0 rounded-full bg-emerald-600 ring-4",
                                                    theme ? "ring-blue-450" : "ring-white"
                                                )}
                                            />
                                            <div className="min-w-0 flex-1 pt-0.5">
                                                <div
                                                    className={classNames(
                                                        "flex items-center justify-between gap-4 rounded-lg border p-3",
                                                        borderColor,
                                                        cardBg
                                                    )}
                                                >
                                                    <div className={classNames("text-sm", colorMode)}>
                                                        Transaction execution completed
                                                    </div>
                                                    <div className={classNames("shrink-0 font-mono text-xs", colorMode)}>
                                                        {formatTimestamp(executeEnd.timestamp, startTime)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Response Phase */}
                        {responseSent && (
                            <div className="flex gap-4">
                                <div className="flex w-32 shrink-0 flex-col items-end pr-4 pt-1">
                                    <div className={classNames("text-sm font-semibold", colorMode)}>Response</div>
                                </div>
                                <div className="relative flex-1">
                                    <div className="relative flex items-start gap-3">
                                        <div
                                            className={classNames(
                                                "z-10 mt-1 h-4 w-4 shrink-0 rounded-full bg-green-500 ring-4",
                                                theme ? "ring-blue-450" : "ring-white"
                                            )}
                                        />
                                        <div className="min-w-0 flex-1 pt-0.5">
                                            <div
                                                className={classNames(
                                                    "flex items-center justify-between gap-4 rounded-lg border p-3",
                                                    borderColor,
                                                    cardBg
                                                )}
                                            >
                                                <div className={classNames("text-sm", colorMode)}>
                                                    Response sent to client
                                                </div>
                                                <div className={classNames("shrink-0 font-mono text-xs", colorMode)}>
                                                    {formatTimestamp(responseSent.timestamp, startTime)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats Cards */}
                {transaction_details && (
                    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                        {transaction_details.prepare_time && (
                            <div className={classNames("rounded-lg border p-4", borderColor, bgColor)}>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                                    <div className={classNames("text-xs", colorMode)}>Prepare Complete</div>
                                </div>
                                <div className={classNames("font-mono text-lg font-semibold", colorMode)}>
                                    {formatTimestamp(transaction_details.prepare_time, startTime)}
                                </div>
                            </div>
                        )}
                        {transaction_details.commit_time && (
                            <div className={classNames("rounded-lg border p-4", borderColor, bgColor)}>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="h-2 w-2 rounded-full bg-cyan-500" />
                                    <div className={classNames("text-xs", colorMode)}>Commit Complete</div>
                                </div>
                                <div className={classNames("font-mono text-lg font-semibold", colorMode)}>
                                    {formatTimestamp(transaction_details.commit_time, startTime)}
                                </div>
                            </div>
                        )}
                        {executeStart && executeEnd && (
                            <div className={classNames("rounded-lg border p-4", borderColor, bgColor)}>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                    <div className={classNames("text-xs", colorMode)}>Execution Time</div>
                                </div>
                                <div className={classNames("font-mono text-lg font-semibold", colorMode)}>
                                    {calculateDuration(executeStart.timestamp, executeEnd.timestamp)}
                                </div>
                            </div>
                        )}
                        <div className={classNames("rounded-lg border p-4", borderColor, bgColor)}>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                <div className={classNames("text-xs", colorMode)}>Total Time</div>
                            </div>
                            <div className={classNames("font-mono text-lg font-semibold", colorMode)}>
                                {(totalDuration / 1_000_000).toFixed(2)}ms
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const availableReplicas = hasTimelineData 
        ? Object.keys(timelineData).map(Number).sort((a, b) => a - b)
        : [];
    const currentData = timelineData[selectedReplica];

    // Don't render timeline component if no timeline data exists (even if consensus_data exists)
    if (!hasTimelineData && !loading) {
        return null;
    }

    const color = theme && loading ? "gray" : theme && !loading ? "white" : !theme && loading ? "gray" : "black";
    const borderColor = theme ? "border-gray-50" : "border-gray-700";
    const bgColor = theme ? "bg-blue-450" : "bg-blue-10";

    return (
        <div id="timeline" className="w-full scroll-mt-20">
            <div className={classNames("py-2 px-1 flex flex-col rounded-md border-3p bg-blue-10 border-solid border-gray-700 dark:border-gray-50 dark:bg-blue-450 relative w-full mb-6")}>
                <div className={classNames("text-center mb-4", theme ? "text-gray-300" : "text-gray-700")}>
                    <h2 className="text-xl font-bold">Transaction Timeline</h2>
                </div>
                <div className="relative w-full p-6" style={{ minHeight: '50vh' }}>
                {loading && (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-gray-500 dark:text-gray-400">
                            Loading timeline data from all replicas...
                        </div>
                    </div>
                )}
                {error && (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-red-500 dark:text-red-400">Error: {error}</div>
                    </div>
                )}
                {!loading && !error && availableReplicas.length === 0 && (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-gray-500 dark:text-gray-400">
                            {currentTransaction < 0
                                ? "Select a transaction to view timeline"
                                : "No timeline data available"}
                        </div>
                    </div>
                )}
                {!loading && !error && availableReplicas.length > 0 && (
                    <div className="flex flex-col">
                        {/* Tab Group */}
                        <div className="mb-6 flex gap-2">
                            {availableReplicas.map((replicaNum) => (
                                <button
                                    key={replicaNum}
                                    onClick={() => setSelectedReplica(replicaNum)}
                                    className={classNames(
                                        "px-4 py-2 rounded-md font-semibold transition-all text-white",
                                        selectedReplica === replicaNum
                                            ? theme
                                                ? "bg-blue-600"
                                                : "bg-blue-190"
                                            : classNames(
                                                  "border-2p",
                                                  borderColor,
                                                  bgColor,
                                                  "opacity-80 hover:opacity-100"
                                              )
                                    )}
                                >
                                    Replica {replicaNum}
                                </button>
                            ))}
                        </div>

                        {/* Timeline Content */}
                        {currentData && renderTimeline(currentData)}
                    </div>
                )}
                </div>
            </div>
        </div>
    );
};

const index = () => {
    return <Timeline />;
};

export default index;
