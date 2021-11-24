// find shortest distance from a Node to all other nodes
const dijkstraAlgorithm = function (graph, start) {

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

export default dijkstraAlgorithm