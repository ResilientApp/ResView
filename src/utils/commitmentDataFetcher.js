/**
 * Commitment Data Fetcher
 * 
 * Handles fetching PBFT commitment data from either:
 * 1. Unified BPF Trace Agent endpoint (when BPF_TRACE_AGENT is enabled)
 * 2. Individual replica endpoints (legacy fallback method)
 */

console.log(process.env.REACT_APP_BPF_TRACE_AGENT)
const BPF_TRACE_AGENT_ENABLED = process.env.REACT_APP_BPF_TRACE_AGENT === 'true';
const BPF_AGENT_URL = process.env.REACT_APP_BPF_TRACE_AGENT_URL || 'https://dev-bpf-agent.resilientdb.com';

/**
 * Fetch commitment data from the unified BPF Trace Agent endpoint
 * Returns data with all replicas in a single response
 * 
 * @param {number|undefined} seq - Transaction sequence number. If undefined, fetches the latest sequence.
 * @returns {Promise<Object>} Object with replica data keyed by replica_id
 */
export const fetchFromBpfAgent = async (seq) => {
  try {
    // Build URL: with seq for specific transaction, without for latest
    // Treat NaN, undefined, and null the same way (fetch latest)
    const isValidSeq = seq !== undefined && seq !== null && !Number.isNaN(seq);
    const url = isValidSeq 
      ? `${BPF_AGENT_URL}/bpf/commitment/${seq}`
      : `${BPF_AGENT_URL}/bpf/commitment`;
    
    const response = await fetch(url);

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // The BPF endpoint returns data in format: { seq: number, replicas: { "1": {...}, "2": {...}, ... } }
    // Transform it to match the expected format: { "1": {...}, "2": {...}, ... }
    if (data && data.replicas && typeof data.replicas === 'object') {
      return data.replicas;
    }

    return data;
  } catch (error) {
    // Provide helpful error messages for common issues
    const errorMsg = error?.message || String(error);
    const isCorsError = errorMsg.includes('CORS') || errorMsg.includes('Access-Control');
    
    if (isCorsError) {
      console.warn(
        `CORS Error accessing BPF Agent at ${BPF_AGENT_URL}. ` +
        `The BPF server needs to send CORS headers. ` +
        `Falling back to individual replicas. ` +
        `Details: ${errorMsg}`
      );
    } else {
      const isValidSeq = seq !== undefined && seq !== null && !Number.isNaN(seq);
      const seqInfo = isValidSeq ? ` for seq ${seq}` : ` for latest sequence`;
      console.error(`Error fetching data from BPF Agent${seqInfo}:`, error);
    }
    
    return null;
  }
};

/**
 * Fetch commitment data from individual replica endpoints (legacy method)
 * 
 * @param {number} replicaPort - Replica port offset (0-3 for replicas 1-4)
 * @param {number} seq - Transaction sequence number
 * @returns {Promise<Object>} Replica data
 */
export const fetchSingleTransactionFromReplica = async (replicaPort, seq) => {
  try {
    const replicaNumber = replicaPort + 1;
    const response = await fetch(
      `https://dev-replica-${replicaNumber}-stats.resilientdb.com/consensus_data/${seq}`
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const newData = await response.json();
    
    if (newData !== null && typeof newData === 'object') {
      // Check if it's direct data (has timeline_events or txn_number matching seq)
      if (newData.timeline_events || newData.txn_number === seq) {
        return newData;
      }
      // Check if it's old nested format
      const seqKey = String(seq);
      if (seqKey in newData) {
        return newData[seqKey];
      }
    }
    return null;
  } catch (error) {
    console.error(`Error fetching data from replica ${replicaPort + 1}:`, error);
    return null;
  }
};

/**
 * Fetch transaction data using the configured method
 * Uses BPF Agent if enabled (does NOT fall back to replicas)
 * Uses individual replicas only if BPF Agent is disabled
 * 
 * @param {number|undefined} seq - Transaction sequence number. If undefined and BPF Agent enabled, fetches latest sequence.
 * @returns {Promise<Object>} Object mapping replica IDs to their data
 */
export const fetchCommitmentData = async (seq) => {
  const isValidSeq = seq !== undefined && seq !== null && !Number.isNaN(seq);
  
  if (BPF_TRACE_AGENT_ENABLED) {
    // Use BPF Agent exclusively - do NOT fall back to consensus_data
    // If seq is undefined/null/NaN, the endpoint will fetch the latest sequence
    const bpfData = await fetchFromBpfAgent(seq);
    if (bpfData) {
      return bpfData;
    }
    // BPF Agent failed - return null, do NOT call consensus_data
    const seqInfo = isValidSeq ? ` for seq ${seq}` : ` for latest sequence`;
    console.warn(`BPF Agent fetch failed${seqInfo}. Not falling back to consensus_data since BPF Agent is enabled.`);
    return null;
  }

  // Fetch from individual replicas (legacy method)
  // Only called if BPF is disabled AND we have a valid sequence number
  if (!isValidSeq) {
    console.warn('No valid sequence number provided and BPF Agent is disabled.');
    return null;
  }

  const fetchPromises = [];
  for (let i = 0; i < 4; i++) {
    fetchPromises.push(fetchSingleTransactionFromReplica(i, seq));
  }

  const results = await Promise.all(fetchPromises);
  const replicaData = {};
  
  results.forEach((data, replicaIndex) => {
    if (data !== null && data !== undefined) {
      const replicaId = String(replicaIndex + 1);
      replicaData[replicaId] = data;
    }
  });

  return Object.keys(replicaData).length > 0 ? replicaData : null;
};

/**
 * Fetch all transactions from the configured method
 * 
 * @param {number} replicaPort - Replica port offset (0-3), used only for legacy method
 * @returns {Promise<Object>} All transactions data
 */
export const fetchAllTransactionsFromReplica = async (replicaPort) => {
  try {
    const replicaNumber = replicaPort + 1;
    const response = await fetch(
      `https://dev-replica-${replicaNumber}-stats.resilientdb.com/consensus_data`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const newData = await response.json();
    if (newData !== null && typeof newData === 'object') {
      return newData;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching data from replica ${replicaPort + 1}:`, error);
    return null;
  }
};

/**
 * Fetch view change data from the unified BPF Trace Agent endpoint
 * Returns data with all replicas' view change timeline in a single response
 * 
 * @param {number|undefined} view - View number. If undefined, fetches the latest view change.
 * @returns {Promise<Object>} Object with view change data for each replica, keyed by replica_id
 */
export const fetchViewChangeData = async (view) => {
  try {
    // Build URL: with view for specific view change, without for latest
    const isValidView = view !== undefined && view !== null && !Number.isNaN(view);
    const url = isValidView 
      ? `${BPF_AGENT_URL}/bpf/viewchange/${view}`
      : `${BPF_AGENT_URL}/bpf/viewchange`;
    
    const response = await fetch(url);

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // The BPF endpoint returns data in format: { view: number, replicas: { "1": {...}, "2": {...}, ... } }
    // Transform it to match the expected format: { "1": {...}, "2": {...}, ... }
    if (data && data.replicas && typeof data.replicas === 'object') {
      return data.replicas;
    }

    return data;
  } catch (error) {
    const errorMsg = error?.message || String(error);
    const isCorsError = errorMsg.includes('CORS') || errorMsg.includes('Access-Control');
    
    if (isCorsError) {
      console.warn(
        `CORS Error accessing BPF Agent at ${BPF_AGENT_URL} for view change data. ` +
        `Details: ${errorMsg}`
      );
    } else {
      const isValidView = view !== undefined && view !== null && !Number.isNaN(view);
      const viewInfo = isValidView ? ` for view ${view}` : ` for latest view`;
      console.error(`Error fetching view change data from BPF Agent${viewInfo}:`, error);
    }
    
    return null;
  }
};

/**
 * Get the current configuration status
 * 
 * @returns {Object} Configuration object with enabled status and URL
 */
export const getConfig = () => ({
  bpfAgentEnabled: BPF_TRACE_AGENT_ENABLED,
  bpfAgentUrl: BPF_AGENT_URL,
});
