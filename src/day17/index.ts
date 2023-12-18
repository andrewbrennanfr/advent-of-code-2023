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

    const queue: Record<number, [{ r: number; c: number }, string, number][]> =
        {
            "0": [[start, "", 0]],
        }

    while (Object.keys(queue).length) {
        const keys = Object.keys(queue)
        const minKey = Math.min(...keys.map(Number))

        const [current, direction, times] = queue[minKey].shift()

        if (!queue[minKey].length) {
            delete queue[minKey]
        }

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

                if (!queue[possibleWeight]) {
                    queue[possibleWeight] = []
                }

                queue[possibleWeight].push([sibling, d, newTimes])
            }
        })

        if (current.r === end.r && current.c === end.c) {
            break
        }
    }

    const options = Object.entries(weights)
        .filter(([key]) => key.startsWith(`${end.r}_${end.c}_`))
        .map(([, weight]) => weight)

    return String(Math.min(...options))
}

export const part02 = (input: string): string => {
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
    const queue: Record<number, [{ r: number; c: number }, string, number][]> =
        {
            "0": [[start, "", 0]],
        }

    while (Object.keys(queue).length) {
        const keys = Object.keys(queue)
        const minKey = Math.min(...keys.map(Number))

        const [current, direction, times] = queue[minKey].shift()

        if (!queue[minKey].length) {
            delete queue[minKey]
        }

        const currentKey = key(current, direction, times)

        if (visited.has(currentKey)) continue

        visited.add(currentKey)

        Object.entries(siblings(current)).forEach(([d, sibling]) => {
            if (grid[sibling.r]?.[sibling.c] === undefined) return

            if (d === opposite[direction]) return

            if (d === direction && times >= 10) return

            if (d !== direction && direction && times < 4) return

            if (d !== direction && direction) {
                const nextSib = siblings(sibling)[d] // 2 moves
                const nextNextSib = siblings(nextSib)[d] // 3 moves
                const nextNextNextSib = siblings(nextNextSib)[d] // 4 moves

                if (!grid[nextNextNextSib.r]?.[nextNextNextSib.c]) {
                    return
                }
            }

            // if (sibling.r === end.r && sibling.c === end.c) {
            //     console.warn({ current, end })
            // }

            const newTimes = d === direction ? times + 1 : 1
            const siblingKey = key(sibling, d, newTimes)

            const siblingWeight = getWeight(siblingKey)
            const currentWeight = getWeight(currentKey)

            const possibleWeight = currentWeight + grid[sibling.r][sibling.c]

            if (possibleWeight <= siblingWeight) {
                weights[siblingKey] = possibleWeight

                if (!queue[possibleWeight]) {
                    queue[possibleWeight] = []
                }

                queue[possibleWeight].push([sibling, d, newTimes])
            }
        })

        if (current.r === end.r && current.c === end.c) {
            break
        }
    }

    const options = Object.entries(weights)
        .filter(([key]) => key.startsWith(`${end.r}_${end.c}_`))
        .map(([, weight]) => weight)

    return String(Math.min(...options))
}
