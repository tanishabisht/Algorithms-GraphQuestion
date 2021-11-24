import {
    stringToEdgelist,
    edgelistToAdjacencylist, edgelistToAdjacencymatrix,
    adjacencylistNoWeights, adjacencymatrixNoWeights
} from '../../helper'

import { inputString } from '../config'


const edgeList = stringToEdgelist(inputString)

const adjacencyList = edgelistToAdjacencylist(edgeList)
const adjacencyMatrix = edgelistToAdjacencymatrix(edgeList)

const adjacencyListNoWeights = adjacencylistNoWeights(adjacencyList)
const adjacencyMatrixNoWeights = adjacencymatrixNoWeights(adjacencyMatrix)


export {
    edgeList,
    adjacencyList,
    adjacencyMatrix,
    adjacencyListNoWeights,
    adjacencyMatrixNoWeights
}