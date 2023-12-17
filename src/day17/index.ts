const key = ({ r, c }: { r: number; c: number }): string => `${r}_${c}`

const parse = (input: string): number[][] =>
    input
        .trim()
        .split("\n")
        .map((row) => row.split("").map(Number))

const siblings = ({
    r,
    c,
}: {
    r: number
    c: number
}): Record<"N" | "E" | "S" | "W", { r: number; c: number }> => ({
    N: { r: r - 1, c },
    E: { r, c: c + 1 },
    S: { r: r + 1, c },
    W: { r, c: c - 1 },
})

export const part01 = (input: string): string => {
    const grid = parse(input)

    const height = grid.length
    const width = grid[0].length
    const start = { r: 0, c: 0 }
    const end = { r: height - 1, c: width - 1 }

    const weights = Array.from(Array(height), () => Array(width).fill(Infinity))
    weights[start.r][start.c] = 0

    const visited = new Set<string>()
    const queue = [start]

    while (queue.length) {
        const current = queue.shift()

        if (visited.has(key(current))) continue

        visited.add(key(current))

        Object.entries(siblings(current))
            .filter(([, sibling]) => grid[sibling.r]?.[sibling.c] !== undefined)
            .forEach(([, sibling]) => {
                const currentWeight = weights[sibling.r][sibling.c]
                const possibleWeight =
                    weights[current.r][current.c] + grid[sibling.r][sibling.c]

                if (possibleWeight < currentWeight) {
                    weights[sibling.r][sibling.c] = possibleWeight
                    queue.push(sibling)
                }
            })

        queue.sort((rcA, rcB) => weights[rcA.r][rcA.c] - weights[rcB.r][rcB.c])
    }

    // weights.forEach((row) => {
    //     console.warn(row)
    // })

    return String(weights[end.r][end.c])
}

export const part02 = (input: string): string => input
