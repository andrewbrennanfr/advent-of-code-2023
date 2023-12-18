import FastPriorityQueue from "fastpriorityqueue"

const key = (rc: { r: number; c: number }, d: string, t: number): string =>
    `${rc.r}_${rc.c}_${d}_${t}`

const parse = (input: string): number[][] =>
    input
        .trim()
        .split("\n")
        .map((row) => row.split("").map(Number))

const siblings = (rc: {
    r: number
    c: number
}): Record<"N" | "E" | "S" | "W", { r: number; c: number }> => ({
    N: { r: rc.r - 1, c: rc.c },
    E: { r: rc.r, c: rc.c + 1 },
    S: { r: rc.r + 1, c: rc.c },
    W: { r: rc.r, c: rc.c - 1 },
})

export const part01 = (input: string): string => {
    const grid = parse(input)

    const height = grid.length
    const width = grid[0].length
    const start = { r: 0, c: 0 }
    const end = { r: height - 1, c: width - 1 }

    const opposite = { E: "W", N: "S", S: "N", W: "E" }

    const weights: Record<string, number> = {
        [key(start, "", 0)]: 0,
        [key(start, "E", 0)]: 0,
        [key(start, "S", 0)]: 0,
    }
    const getWeight = (key: string): number => weights[key] ?? Infinity

    const visited = new Set<string>()
    // const queue: [{ r: number; c: number }, string, number][] = [[start, "", 0]]

    const prioQueye = new FastPriorityQueue((a, b) => {
        return getWeight(key(...a)) < getWeight(key(...b))
    })

    prioQueye.add([start, "", 0])

    while (!prioQueye.isEmpty()) {
        const [current, direction, times] = prioQueye.poll()

        const currentKey = key(current, direction, times)

        if (visited.has(currentKey)) continue

        visited.add(currentKey)

        Object.entries(siblings(current)).forEach(([d, sibling]) => {
            if (grid[sibling.r]?.[sibling.c] === undefined) return

            if (d === opposite[direction]) return

            if (d === direction && times >= 3) return

            const newTimes = d === direction ? times + 1 : 1
            const siblingKey = key(sibling, d, newTimes)

            const siblingWeight = getWeight(siblingKey)
            const currentWeight = getWeight(currentKey)

            const possibleWeight = currentWeight + grid[sibling.r][sibling.c]

            if (possibleWeight < siblingWeight) {
                weights[siblingKey] = possibleWeight

                prioQueye.add([sibling, d, newTimes])

                // const insert = queue.findIndex(
                //     (item) => getWeight(key(...item)) >= possibleWeight
                // )

                // queue.splice(insert === -1 ? queue.length : insert, 0, [
                //     sibling,
                //     d,
                //     newTimes,
                // ])
            }
        })

        if (current.r === end.r && current.c === end.c) {
            break
        }
    }

    const options = Object.entries(weights)
        .filter(([key]) => key.startsWith(`${end.r}_${end.c}_`))
        .map(([, weight]) => weight)

    console.warn(options)

    return String(Math.min(...options))
}

export const part02 = (input: string): string => input
