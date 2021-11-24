const adjacencylistNoWeights = (adjacencyList) => {
    const adjacencyList_no_wts = []
    for (let i in adjacencyList) {
        const neighbour_with_weights = adjacencyList[i]
        const neighbour_without_weights = neighbour_with_weights ? neighbour_with_weights.map(([n,l]) => n) : []
        adjacencyList_no_wts.push(neighbour_without_weights)
    }
    return adjacencyList_no_wts 
}

export default adjacencylistNoWeights