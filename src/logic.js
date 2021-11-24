import { alphaVal } from './helpers'


// using adjacencyMatrix
export const route_distance = (adjacencyMatrix, alphaRoute) => {
    const maxNum = Number.MAX_SAFE_INTEGER
    const numRoute = []
    let distance = 0
    for (let node of alphaRoute) numRoute.push(alphaVal(node))
    for(let i=0; i<numRoute.length-1; i++) {
        const fromNode = numRoute[i]
        const toNode = numRoute[i+1]
        if(adjacencyMatrix[fromNode][toNode] == maxNum) return 'NO SUCH ROUTE'
        distance += adjacencyMatrix[fromNode][toNode]
    }
    return distance
}


// find shortest distance from a Node to all other nodes
const dijkstraAlgo = function (graph, start) {

    const maxNum = Number.MAX_SAFE_INTEGER
    const noOfNodes = graph.length

    var distances = [];
    for (var i=0; i<noOfNodes; i++) distances[i] = maxNum;
    // distances = [∞, ∞, ∞, ∞, ∞]

    var nodeVisited = [];
    for (var i=0; i<noOfNodes; i++) nodeVisited[i] = false;
    // nodeVisited = [false, false, false, false, false]

    // to find the second shortest path from and to the same node
    let counter = 0

    while (true) {
        let shortestDistance
        let shortestDistanceIdx
        if(counter===0) {
            // for the very first loop, initialize as follows, to find second shortest path from and to the same node
            shortestDistanceIdx = start;
            shortestDistance = 0
            counter = counter + 1;
        } else {
            // find the **shortest distance** from the **not visited nodes**
            let shortestDistance_temp = maxNum
            shortestDistanceIdx = -1;    
            for (var i=0; i<noOfNodes; i++) {
                if (distances[i]<=shortestDistance_temp && !nodeVisited[i]) {
                    shortestDistance_temp = distances[i];
                    shortestDistanceIdx = i;
                }
            }
            shortestDistance = distances[shortestDistanceIdx]
            counter = counter + 1;
        }
        if (shortestDistanceIdx === -1) {
            // all nodes are visited
            return distances;
        }
        // for all neighboring nodes, apply relaxation method
        for (var i=0; i<graph[shortestDistanceIdx].length; i++) {
            if (graph[shortestDistanceIdx][i]!==0 && distances[i]>shortestDistance+graph[shortestDistanceIdx][i]) {
                distances[i] = shortestDistance + graph[shortestDistanceIdx][i];
            }
        }
        // we have visited this node
        nodeVisited[shortestDistanceIdx] = true;
    }

    return distances
};
export const findShortestDistance_to_and_from = (graph, from, to) => {
    const shortestDistance = dijkstraAlgo(graph, alphaVal(from))
    return shortestDistance[alphaVal(to)]
}



export const count_stops = (graph, src, dst, noOfEdges) => {
    const graphLen = graph.length
    // Base cases
    if (noOfEdges == 1 && graph[src][dst]) return 1;
    if (noOfEdges <= 0) return 0;
    // Initialize result
    var count = 0;
    // Go to all adjacents of u and recur
    for (var i=0; i<graphLen; i++)
        if (graph[src][i] == 1) // Check if is adjacent of src
            count += count_stops(graph, i, dst, noOfEdges - 1);
    return count;
}
export const count_stops_lessthan_given_edge = (graph, src, dst, noOfEdges) => {
    let counter = 0
    for(let i=1; i<=noOfEdges; i++){
        counter += count_stops(graph, src, dst, i)
    }
    return counter
}






