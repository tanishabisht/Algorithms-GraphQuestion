const edgelistToAdjacencylist = (edgeList) => {
    const adjacencyList = []
    for (let edge of edgeList) {
        const [a,b,l] = edge
        if(!adjacencyList[a]) adjacencyList[a] = []
        adjacencyList[a].push([b,l])
    }
    return adjacencyList
}

export default edgelistToAdjacencylist