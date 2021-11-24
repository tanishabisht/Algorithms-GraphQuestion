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

const edgelistToAdjacencymatrix = (edgeList) => {
    const noOfNodes = 5
    const matrix = create_ndim_matrix(noOfNodes)
    for (let edge of edgeList) {
        const [a,b,l] = edge
        matrix[a][b] = l
    }
    return matrix
}

export default edgelistToAdjacencymatrix