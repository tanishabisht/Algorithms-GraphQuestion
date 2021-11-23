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








const inputString = 'AB5,BC4,CD8,DC8,DE6,AD5,CE2,EB3,AE7'

const edgeList = stringInput_to_edgeList(inputString)
const adjacencyList = edgeList_to_adjacencyList(edgeList)
const adjacencyMatrix = edgeList_to_adjacencyMatrix(edgeList)


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


// PART 2 :: FIND NUMBER OF PATHS WITH X NUMBER OF STOPS


// PART 3 :: FIND SHORTEST DISTANCE
const dist_ac = findShortestDistance_to_and_from(adjacencyMatrix, 'A', 'C')
const dist_bb = findShortestDistance_to_and_from(adjacencyMatrix, 'B', 'B')
console.log(dist_ac, dist_bb)



// PART 4 :: FIND NUMBER OF PATHS WITH TOTAL DISTANCE LESS THAN GIVEN X