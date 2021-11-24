import { noOfRoutesNStops } from '..'

// before :: count_stops_lessthan_given_edge 
const noOfRoutesMaxNStops = (graph, src, dst, noOfEdges) => {
    let counter = 0
    for(let i=1; i<=noOfEdges; i++){
        counter += noOfRoutesNStops(graph, src, dst, i)
    }
    return counter
}

export default noOfRoutesMaxNStops