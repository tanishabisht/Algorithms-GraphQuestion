import { alphaToNum } from './helper'

import {
    routeDistance,
    noOfRoutesNStops, noOfRoutesMaxNStops,
    shortestDistance, noOfRoutesMaxNDistance
} from './algorithms'

import {
    route1,
    route2,
    route3,
    route4,
    route5
} from './variables/config'

import {
    adjacencyMatrix,
    adjacencyMatrixNoWeights
} from './variables/graphRepresentations'


// PART 1 :: FIND ROUTE DISTANCE
console.log('Output #1: ' + routeDistance(adjacencyMatrix, route1))
console.log('Output #2: ' + routeDistance(adjacencyMatrix, route2))
console.log('Output #3: ' + routeDistance(adjacencyMatrix, route3))
console.log('Output #4: ' + routeDistance(adjacencyMatrix, route4))
console.log('Output #5: ' + routeDistance(adjacencyMatrix, route5))


// PART 2 :: FIND NUMBER OF PATHS FROM ONE NODE TO ANOTHER GIVEN STOPS
console.log('Output #6: ' + noOfRoutesMaxNStops(adjacencyMatrixNoWeights, alphaToNum('c'), alphaToNum('c'), 3))
console.log('Output #7: ' + noOfRoutesNStops(adjacencyMatrixNoWeights, alphaToNum('a'), alphaToNum('c'), 4))


// PART 3 :: FIND SHORTEST DISTANCE
console.log('Output #8: ' + shortestDistance(adjacencyMatrix, 'A', 'C'))
console.log('Output #9: ' + shortestDistance(adjacencyMatrix, 'B', 'B'))


// PART 4 :: NUMBER OF ROUTES FROM ONE NODE TO ANOTHER WITHIN SPECIFIED DISTANCE
const pathsNum = noOfRoutesMaxNDistance([], alphaToNum('C'), alphaToNum('C'), 30)
console.log('Output #10: ' + pathsNum)