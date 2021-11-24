# Graph Exercise

The local passenger railway serves a number of cities. For financial reasons, all train lines follow only one direction. That is a route from city X to city Y, it does not mean that there is a route from city Y to city X and even if this route exists there would be a different railway line that could have a greater distance.

The purpose of this challenge is to help the railroad provide its customers with information about the routes. In particular, you will calculate the distance along a given route, the number of different routes between two cities and the shortest route between two cities.

1. The distance of the route A-B-C.
2. The distance of the route A-D.
3. The distance of the route A-D-C.
4. The distance of the route A-E-B-C-D.
5. The distance of the route A-E-D.
6. The number of trips starting at C and ending at C with a maximum of 3 stops. In the sample data below, there are two such trips: C-D-C (2 stops) and C-E-B-C (3 stops).
7. The number of trips starting at A and ending at C with exactly 4 stops. In the sample data below, there are three such trips: A to C (via B,C,D); A to C (via D,C,D); and A to C (via D,E,B).
8. The length of the shortest route (in terms of distance to travel) from A to C.
9. The length of the shortest route (in terms of distance to travel) from B to B.
10. The number of different routes from C to C with a distance of less than 30. In the sample data, the trips are: CDC, CEBC, CEBCDC, CDCEBC, CDEBC, CEBCEBC, CEBCEBCEBC.

# Input
A directed graph where a node represents a city and an edge represents a route between two cities. The edge weighting represents the distance between the two cities. A certain route will never appear more than once for a particular trip, the starting and ending city will not be the same city.
```
AB5,BC4,CD8,DC8,DE6,AD5,CE2,EB3,AE7
```

# Output
For values from 1 to 5, if there is no such route, show something like "NO SUCH ROUTE". Otherwise, follow the indicated route and do not make any extra stops! For example, the value 1 to 5 means that the trip will start in city A, then the trip will continue directly to city B (at a distance of 5), then directly to city C (at a distance of 4).
```
Output # 1: 9
Output # 2: 5
Output # 3: 13
Output # 4: 22
Output # 5: NO SUCH ROUTE
Output # 6: 2
Output # 7: 3
Output # 8: 9
Output # 9: 9
Output # 10: 7
```

# Positive Testing Result
```
  Testing Outputs
    Return distance of the given route
      √ Should be the sum of the weights of all the edges in the route or NO SUCH ROUTE if there is none
    Number of routes starting and ending at the same place with at Max N stops
      √ Should be finite and fixed amount of routes
    Calculating the number of trips starting and ending at the same place with at least N stops
      √ Should be only a fixed amount of routes
    Testing the shortest distance algorithm :: dijkstra
      √ Should return second shortest distance if the src and dst node is same
    Number of routes with distance less than N
      √ Should the number of routes with distance less than N
```


# Instructions to run
- `npm install`: Install all the dependencies
- `npm start`: will display the required output
- `npm test`: will run tests
- The input string can be changed [here](src/variables/config/index.js)

# Tech Used
`javascript` `mocha`

# References and my learning journey
1. Different ways to represent graph: Refer [this](https://www.khanacademy.org/computing/computer-science/algorithms/graph-representation/a/representing-graphs)
    - Edge list
    - Adjacency Matrix
    - Adjacency List
2. Quick Introduction to Graphs, refer [this](https://www.youtube.com/watch?v=tWVWeAqZ0WU&t=3787s)
3. Different algorithms to find the shortest path between two nodes in a graph. Refer [this](https://www.youtube.com/watch?v=09_LlHjoEiY&t=2s)
    - Dijkstra's Algorithm : `O(v^2)` : Uses Greedy Algorithm. Does not work with negative weights. Works on both directed and undirected graph.
    - Bellman Ford : `O(ve)` : Uses DP, works even with negative weights
    - Floyd Warshall Algorithm : `O(v^3)` : Finds the shortest path for all pairs


# Approach
1. Route Distance
    - it is the sum of all edges in a route
    - return `NO SUCH ROUTES` if the routes does not exist
2. Number of Routes with N stops
    - N stops is the same as N number of edges
    - It is a recursive function that terminates when
        - number of edges < 0 => 0
        - number of edges is 1 and there exist a route between source and destination
    - otherwise loop through the row of the src and if route is found, recursively call the function again (this time with 1 less number of edges)
3. Number of Routes with max N stops
    - Iteratively call `2nd function`
4. Shortest Route Algorithm
    - I went ahead with `Dijkstra's Algorithm` as it has less time complexity (compared to Floyd Warshall Algorithm) and the weights can't be negative as the distance between two places cant be negative.
5. Number of Routes with max N distance
    - It is a recursive function that terminates when
        - distance travelled so far > distance allowed to travel => 0
    - Otherwise it increments 1 to the counter if the src equals destination