import { alphaToNum } from '../../helper'
import { dijkstraAlgorithm } from '..'

const shortestDistance = (graph, from, to) => {
    const shortestDistance = dijkstraAlgorithm(graph, alphaToNum(from))
    return shortestDistance[alphaToNum(to)]
}

export default shortestDistance