import { alphaToNum } from '../../helper'
import { dijkstraAlgorithm } from '..'

// graph => adjacencyMatrix
const shortestDistance = (graph, src, dst) => {
    const shortestDistance = dijkstraAlgorithm(graph, alphaToNum(src))
    return shortestDistance[alphaToNum(dst)]
}

export default shortestDistance