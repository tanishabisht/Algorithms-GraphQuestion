import assert from 'assert';

import { alphaToNum } from '../src/helper'

import {
    routeDistance,
    noOfRoutesNStops, noOfRoutesMaxNStops,
    shortestDistance, noOfRoutesMaxNDistance
} from '../src/algorithms'

import {
    route1,
    route2,
    route3,
    route4,
    route5
} from '../src/variables/config'

import {
    adjacencyMatrix,
    adjacencyMatrixNoWeights
} from '../src/variables/graphRepresentations'


describe('Testing Outputs', () => {

    // TYPE 1
    describe('Return distance of the given route', () => {
        it('Should be the sum of the weights of all the edges in the route or NO SUCH ROUTE if there is none', () => {
            assert.equal(routeDistance(adjacencyMatrix, route1), 9);
            assert.equal(routeDistance(adjacencyMatrix, route2), 5);
            assert.equal(routeDistance(adjacencyMatrix, route3), 13);
            assert.equal(routeDistance(adjacencyMatrix, route4), 22);
            assert.equal(routeDistance(adjacencyMatrix, route5), 'NO SUCH ROUTE');
        });
    });

    // TYPE 2.1
    describe('Number of routes starting and ending at the same place with at Max N stops', () => {
        it('Should be finite and fixed amount of routes', () => {
            assert.equal(noOfRoutesMaxNStops(adjacencyMatrixNoWeights, alphaToNum('c'), alphaToNum('c'), 3), 2);
        });
    });

    // TYPE 2.2
    describe('Calculating the number of trips starting and ending at the same place with at least N stops', () => {
        it('Should be only a fixed amount of routes', () => {
            assert.equal(noOfRoutesNStops(adjacencyMatrixNoWeights, alphaToNum('a'), alphaToNum('c'), 4), 3);
        });
    });

    // TYPE 3
    describe('Testing the shortest distance algorithm :: dijkstra', () => {
        it('Should return second shortest distance if the src and dst node is same', () => {
            assert.equal(shortestDistance(adjacencyMatrix, 'A', 'C'), 9);
            assert.equal(shortestDistance(adjacencyMatrix, 'B', 'B'), 9);
        });
    });

    // TYPE 4
    describe('Number of routes with distance less than N', () => {
        it('Should the number of routes with distance less than N', () => {
            assert.equal(noOfRoutesMaxNDistance([], alphaToNum('C'), alphaToNum('C'), 30), 7);
        });
    });

});