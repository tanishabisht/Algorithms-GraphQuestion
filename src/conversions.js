import { alphaVal } from './helpers'


export const stringInput_to_edgeList = (input) => {
    const inputArr = input.split(',')
    const edgeList = []
    for (let edge of inputArr) {
        const [from, to, len] = edge
        edgeList.push([alphaVal(from), alphaVal(to), parseInt(len)])
    }
    return edgeList
}
export const edgeList_to_adjacencyList = (edgeList) => {
    const adjacencyList = []
    for (let edge of edgeList) {
        const [a,b,l] = edge
        if(!adjacencyList[a]) adjacencyList[a] = []
        adjacencyList[a].push([b,l])
    }
    return adjacencyList
}


const create_ndim_matrix = n => {
    const maxNum = Number.MAX_SAFE_INTEGER
    const matrix = []
    for (let i=0; i<n; i++) {
        const row = []
        for(let j=0; j<n; j++){
            row.push(maxNum)
        }
        matrix.push(row)
    }
    return matrix
}
export const edgeList_to_adjacencyMatrix = (edgeList) => {
    const noOfNodes = 5
    const matrix = create_ndim_matrix(noOfNodes)
    for (let edge of edgeList) {
        const [a,b,l] = edge
        matrix[a][b] = l
    }
    return matrix
}


export const adjacencyList_with_no_weights = (adjacencyList) => {
    const adjacencyList_no_wts = []
    for (let i in adjacencyList) {
        const neighbour_with_weights = adjacencyList[i]
        const neighbour_without_weights = neighbour_with_weights ? neighbour_with_weights.map(([n,l]) => n) : []
        adjacencyList_no_wts.push(neighbour_without_weights)
    }
    return adjacencyList_no_wts 
}
export const adjacencyMatrix_with_no_weights = (adjacencyMatrix) => {
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