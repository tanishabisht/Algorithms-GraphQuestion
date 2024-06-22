# Graph Question
This repository contains solutions to a graph-based challenge involving a directed graph representing cities and train routes. The goal is to calculate distances, find routes, and determine the shortest paths between cities.


## Problem Description
The local passenger railway serves several cities, and all train routes follow one direction. This means a route from city X to city Y does not imply a route from city Y to city X.

## Tasks
1. **Route distance**: Calculate the distance of specific routes. Given routes are:
    - A-B-C
    - A-D
    - A-D-C
    - A-E-B-C-D
    - A-E-D
2. **Number of routes between two cities**:
   - Trips starting at C and ending at C with a maximum of 3 stops.
   - Trips starting at A and ending at C with exactly 4 stops.
3. **Shortest Route between two cities**:
   - Shortest route from A to C.
   - Shortest route from B to B.
4. **Routes with Distance Constraint**:
   - Number of different routes from C to C with a distance less than 30.

## Input
A directed graph where nodes represent cities and edges represent routes between cities. The edge weights represent the distance between cities. Each route appears only once, and no route starts and ends at the same city.

```
AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7
```


## Output

1. **Distance of the Given Route**<br>
  Returns the sum of the weights of all edges in the route or "NO SUCH ROUTE" if there is none.<br>

2. **Number of Routes with N Stops**<br>
  Finite and fixed number of routes.<br>

3. **Shortest Distance Algorithm (Dijkstra)** <br>
  Returns the shortest distance, even if the source and destination nodes are the same.<br>

4. **Number of Routes with Distance Less than N** <br>
  Counts the number of routes with a total distance less than the specified value. <br>


## Instructions to Run
1. `npm install`: Install all the dependencies
2. `npm start`: will display the required output
3. `npm test`: will run tests
4. Change the input string in [config/index.js](src/variables/config/index.js) as needed.


## Learning Resources

1. **Graph Representation**: Learn about different ways to represent a graph. Refer [this](https://www.khanacademy.org/computing/computer-science/algorithms/graph-representation/a/representing-graphs).
    - Edge list
    - Adjacency Matrix
    - Adjacency List

2. **Introduction to Graphs**: [YouTube Video](https://www.youtube.com/watch?v=tWVWeAqZ0WU&t=3787s)

3. **Shortest Path Algorithms**: [YouTube Video](https://www.youtube.com/watch?v=09_LlHjoEiY&t=2s)
    - Dijkstra's Algorithm: `O(v^2)`, uses Greedy Algorithm, works on both directed and undirected graphs, and does not handle negative weights.
    - Bellman-Ford Algorithm: `O(ve)`, uses Dynamic Programming, works with negative weights.
    - Floyd-Warshall Algorithm: `O(v^3)`, finds the shortest path for all pairs.

## Approach

1. **Route Distance**: Sum of all edges in a route. Returns "NO SUCH ROUTE" if the route doesn't exist.

2. **Number of Routes with N Stops**: A recursive function that counts the number of routes with exactly N stops.
    - N stops is the same as N number of edges
    - It is a recursive function that terminates when
        - number of edges < 0 --> return 0
        - number of edges is 1 and there exist a route between source and destination
    - otherwise loop through the row of the src and if route is found, recursively call the function again (this time with 1 less number of edges)
    
3. **Number of Routes with Max N Stops**: Iteratively calls the function for routes with N stops.

4. **Shortest Route**: Uses Dijkstra's Algorithm for efficiency, as distances cannot be negative.

5. **Number of Routes with Max N Distance**: A recursive function that counts routes with a total distance less than a specified value.
    - It is a recursive function that terminates when: `distance travelled so far > distance allowed to travel => 0`
    - Otherwise it increments 1 to the counter if the src = destination


## Technologies Used
`JavaScript` `Mocha`