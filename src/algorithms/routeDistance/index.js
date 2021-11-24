import { alphaToNum } from '../../helper'

// graph => adjacencyMatrix
const routeDistance = (graph, alphaRoute) => {
    const maxNum = Number.MAX_SAFE_INTEGER
    const numRoute = []
    let distance = 0
    for (let node of alphaRoute) numRoute.push(alphaToNum(node))
    for(let i=0; i<numRoute.length-1; i++) {
        const src = numRoute[i]
        const dst = numRoute[i+1]
        if(graph[src][dst] == maxNum) return 'NO SUCH ROUTE'
        distance += graph[src][dst]
    }
    return distance
}

export default routeDistance