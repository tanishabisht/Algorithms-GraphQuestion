import { alphaVal } from './helpers'

import { 
    stringInput_to_edgeList,
    edgeList_to_adjacencyList,
    edgeList_to_adjacencyMatrix,
    adjacencyList_with_no_weights,
    adjacencyMatrix_with_no_weights
} from './conversions'

import { 
    route_distance,
    findShortestDistance_to_and_from,
    count_stops,
    count_stops_lessthan_given_edge 
} from './logic'



const inputString = 'AB5,BC4,CD8,DC8,DE6,AD5,CE2,EB3,AE7'
export const edgeList = stringInput_to_edgeList(inputString)



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

const path_dist_abc = route_distance(adjacencyMatrix, path_abc)
const path_dist_ad = route_distance(adjacencyMatrix, path_ad)
const path_dist_adc = route_distance(adjacencyMatrix, path_adc)
const path_dist_aebcd = route_distance(adjacencyMatrix, path_aebcd)
const path_dist_aed = route_distance(adjacencyMatrix, path_aed)

console.log('Output #1: ' + path_dist_abc)
console.log('Output #2: ' + path_dist_ad)
console.log('Output #3: ' + path_dist_adc)
console.log('Output #4: ' + path_dist_aebcd)
console.log('Output #5: ' + path_dist_aed)



// PART 2 :: FIND NUMBER OF PATHS FROM ONE NODE TO ANOTHER GIVEN EDGE
const stops_cc_max3 = count_stops_lessthan_given_edge(adjacencyMatrix_no_wts, 2, 2, 3)
const stops_ac_4 = count_stops(adjacencyMatrix_no_wts, 0, 2, 4)
console.log('Output #6: ' + stops_cc_max3)
console.log('Output #7: ' + stops_ac_4)



// PART 3 :: FIND SHORTEST DISTANCE
const dist_ac = findShortestDistance_to_and_from(adjacencyMatrix, 'A', 'C')
const dist_bb = findShortestDistance_to_and_from(adjacencyMatrix, 'B', 'B')
console.log('Output #8: ' + dist_ac)
console.log('Output #9: ' + dist_bb)



// PART 4 :: NUMBER OF ROUTES FROM ONE NODE TO ANOTHER WITHIN SPECIFIED DISTANCE
const pathsNum = measureTrips([], alphaVal('C'), alphaVal('C'), 30)
console.log('Output #10: ' + pathsNum)