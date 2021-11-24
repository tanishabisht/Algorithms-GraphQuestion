import { alphaToNum } from '..'

// input = 'AB5,BC4,CD8,DC8,DE6,AD5,CE2,EB3,AE7'
const stringToEdgelist = (input) => {
    const inputArr = input.split(',')
    const edgeList = []
    for (let edge of inputArr) {
        const [from, to, len] = edge
        edgeList.push([alphaToNum(from), alphaToNum(to), parseInt(len)])
    }
    return edgeList
}

export default stringToEdgelist