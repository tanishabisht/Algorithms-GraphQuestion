import { edgeList } from '../../variables/graphRepresentations'

const weightOfPath = (map) => {
    let distance = 0
    for (let index = 0; index < map.length - 1; index++) {
        const start = map[index]
        const end = map[index + 1]
        const way = edgeList.find(node => node[0] === start && node[1] === end)
        if (!way) {
            distance = 'NO SUCH ROUTE'
            break
        } else {
            distance += way[2]
        }
    }
    return distance
}

const noOfRoutesMaxNDistance = (trip, src, dst, distanceAllowed) => {
    const soFar = [...trip, src]
    const distanceSoFar = weightOfPath(soFar)
    if (distanceSoFar < distanceAllowed && src === dst && soFar.length > 1) {
        return (
            1 + [...edgeList]
            .filter(node => node[0] === src)
            .reduce((sum, node) => sum + noOfRoutesMaxNDistance(soFar, node[1], dst, distanceAllowed), 0)
        )
    }
    else if (distanceSoFar >= distanceAllowed) return 0
    else return [...edgeList]
            .filter(node => node[0] === src)
            .reduce((sum, node) => sum + noOfRoutesMaxNDistance(soFar, node[1], dst, distanceAllowed), 0)
}

export default noOfRoutesMaxNDistance