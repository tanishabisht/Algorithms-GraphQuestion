const adjacencymatrixNoWeights = (adjacencyMatrix) => {
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

export default adjacencymatrixNoWeights