import { alphaToNum } from '../../helper'

const routeDistance = (adjacencyMatrix, alphaRoute) => {
    const maxNum = Number.MAX_SAFE_INTEGER
    const numRoute = []
    let distance = 0
    for (let node of alphaRoute) numRoute.push(alphaToNum(node))
    for(let i=0; i<numRoute.length-1; i++) {
        const fromNode = numRoute[i]
        const toNode = numRoute[i+1]
        if(adjacencyMatrix[fromNode][toNode] == maxNum) return 'NO SUCH ROUTE'
        distance += adjacencyMatrix[fromNode][toNode]
    }
    return distance
}

export default routeDistance