import { edgeList } from '../../variables/graphRepresentations'

// nodeArr => array of nodes
const weightOfPath = (nodeArr) => {
    let distance = 0
    for (let index = 0; index < nodeArr.length - 1; index++) {
        const src = nodeArr[index]
        const dst = nodeArr[index + 1]
        const way = edgeList.find(node => node[0]===src && node[1]===dst)
        if (!way) {
            distance = 'NO SUCH ROUTE'
            break
        } else {
            distance += way[2]
        }
    }
    return distance
}

// trip => nodes travelled so far
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