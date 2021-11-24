const alphaVal = (s) => s.toLowerCase().charCodeAt(0) - 97
const stringInput_to_edgeList = (input) => {
    const inputArr = input.split(',')
    const edgeList = []
    for (let edge of inputArr) {
        const [from, to, len] = edge
        edgeList.push([alphaVal(from), alphaVal(to), parseInt(len)])
    }
    return edgeList
}



const edgeList_to_adjacencyList = (edgeList) => {
    const adjacencyList = []
    for (let edge of edgeList) {
        const [a,b,l] = edge
        if(!adjacencyList[a]) adjacencyList[a] = []
        adjacencyList[a].push([b,l])
    }
    return adjacencyList
}



const create_ndim_matrix = (n) => {
    const maxNum = Number.MAX_SAFE_INTEGER
    const matrix = []
    for (let i=0; i<n; i++) {
        row = []
        for(let j=0; j<n; j++){
            row.push(maxNum)
        }
        matrix.push(row)
    }
    return matrix
}
const edgeList_to_adjacencyMatrix = (edgeList) => {
    const noOfNodes = 5
    const matrix = create_ndim_matrix(noOfNodes)
    for (let edge of edgeList) {
        const [a,b,l] = edge
        matrix[a][b] = l
    }
    return matrix
}



// using adjacencyMatrix
const route_distance = (adjacencyMatrix, alphaRoute) => {
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
const findShortestDistance_to_and_from = (graph, from, to) => {
    const shortestDistance = dijkstraAlgo(graph, alphaVal(from))
    return shortestDistance[alphaVal(to)]
}


const adjacencyList_with_no_weights = (adjacencyList) => {
    const adjacencyList_no_wts = []
    for (let i in adjacencyList) {
        const neighbour_with_weights = adjacencyList[i]
        const neighbour_without_weights = neighbour_with_weights ? neighbour_with_weights.map(([n,l]) => n) : []
        adjacencyList_no_wts.push(neighbour_without_weights)
    }
    return adjacencyList_no_wts 
}
const adjacencyMatrix_with_no_weights = (adjacencyMatrix) => {
    const maxNum = Number.MAX_SAFE_INTEGER
    const newMatrix = []
    for(let i of adjacencyMatrix) {
        const row = []
        for(let j of i) {
            if(j==maxNum) row.push(0)
            else row.push(1)
        }
        newMatrix.push(row)
    }
    return newMatrix
}
const count_stops = (graph, src, dst, noOfEdges) => {

    const graphLen = graph.length

    // Base cases
    // if (noOfEdges == 0 && src == dst) return 1;
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
const count_stops_lessthan_given_edge = (graph, src, dst, noOfEdges) => {
    let counter = 0
    for(let i=1; i<=noOfEdges; i++){
        counter += count_stops(graph, src, dst, i)
    }
    return counter
}


const inputString = 'AB5,BC4,CD8,DC8,DE6,AD5,CE2,EB3,AE7'
const edgeList = stringInput_to_edgeList(inputString)

const weightOfPath = (map) => {
    let distance = 0
    for (let index = 0; index < map.length - 1; index++) {
        const start = map[index]
        const end = map[index + 1]
        const way = edgeList.find(node => node[0] === start && node[1] === end)
        if (!way) {
            distance = 'NO SUCH ROUTE'
            break
        } else {
            distance += way[2]
        }
    }
    return distance
}
const measureTrips = (trip, src, dst, distanceAllowed) => {
    const soFar = [...trip, src]
    const distanceSoFar = weightOfPath(soFar)
    if (distanceSoFar < distanceAllowed && src === dst && soFar.length > 1) {
        return (
            1 + [...edgeList]
            .filter(node => node[0] === src)
            .reduce((sum, node) => sum + measureTrips(soFar, node[1], dst, distanceAllowed), 0)
        )
    }
    else if (distanceSoFar >= distanceAllowed) return 0
    else return [...edgeList]
            .filter(node => node[0] === src)
            .reduce((sum, node) => sum + measureTrips(soFar, node[1], dst, distanceAllowed), 0)
}




// const inputString = 'AB5,BC4,CD8,DC8,DE6,AD5,CE2,EB3,AE7'
// const edgeList = stringInput_to_edgeList(inputString)
const adjacencyList = edgeList_to_adjacencyList(edgeList)
const adjacencyList_no_wts = adjacencyList_with_no_weights(adjacencyList)
const adjacencyMatrix = edgeList_to_adjacencyMatrix(edgeList)
const adjacencyMatrix_no_wts = adjacencyMatrix_with_no_weights(adjacencyMatrix)

// PART 1 :: FIND ROUTE DISTANCE
const path_abc = ['A', 'B', 'C']
const path_ad = ['a', 'd']
const path_adc = ['a', 'd', 'c']
const path_aebcd = ['a', 'e', 'b', 'c', 'd']
const path_aed = ['a', 'e', 'd']

const route_dist_abc = route_distance(adjacencyMatrix, path_abc)
const route_dist_ad = route_distance(adjacencyMatrix, path_ad)
const route_dist_adc = route_distance(adjacencyMatrix, path_adc)
const route_dist_aebcd = route_distance(adjacencyMatrix, path_aebcd)
const route_dist_aed = route_distance(adjacencyMatrix, path_aed)

console.log(route_dist_abc, route_dist_ad, route_dist_adc, route_dist_aebcd, route_dist_aed)


// PART 2 :: FIND NUMBER OF PATHS FROM ONE NODE TO ANOTHER GIVEN EDGE
const stops_cc_max3 = count_stops_lessthan_given_edge(adjacencyMatrix_no_wts, 2, 2, 3)
const stops_ac_4 = count_stops(adjacencyMatrix_no_wts, 0, 2, 4)
console.log(stops_cc_max3, stops_ac_4)


// PART 3 :: FIND SHORTEST DISTANCE
const dist_ac = findShortestDistance_to_and_from(adjacencyMatrix, 'A', 'C')
const dist_bb = findShortestDistance_to_and_from(adjacencyMatrix, 'B', 'B')
console.log(dist_ac, dist_bb)


// PART 4 :: NUMBER OF ROUTES FROM ONE NODE TO ANOTHER WITHIN SPECIFIED DISTANCE
const pathsNum = measureTrips([], alphaVal('C'), alphaVal('C'), 30)
console.log(pathsNum)