// before count_stops
const noOfRoutesNStops = (graph, src, dst, noOfEdges) => {
    const graphLen = graph.length
    // Base cases
    if (noOfEdges == 1 && graph[src][dst]) return 1;
    if (noOfEdges <= 0) return 0;
    // Initialize result
    var count = 0;
    // Go to all adjacents of u and recur
    for (var i=0; i<graphLen; i++)
        if (graph[src][i] == 1) // Check if is adjacent of src
            count += noOfRoutesNStops(graph, i, dst, noOfEdges - 1);
    return count;
}

export default noOfRoutesNStops