import { alphaToNum } from '..'

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