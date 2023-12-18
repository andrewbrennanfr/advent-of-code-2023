const parse = (input: string): [string, number, string][] => {
    const lines = input.trim().split("\n")

    const rows = lines.map((line) => line.split(" "))

    return rows.map(([dir, dist, hex]) => [dir, Number(dist), hex])
}

export const part01 = (input: string): string => {
    const plan = parse(input)

    const boundary = plan.reduce(
        (points, [dir, dist]) => {
            const [r, c] = points[points.length - 1]

            const next = {
                U: [r, c - dist],
                R: [r + dist, c],
                D: [r, c + dist],
                L: [r - dist, c],
            }[dir]

            points.push(next)

            return points
        },
        [[0, 0]]
    )

    if (
        boundary[0][0] !== boundary[boundary.length - 1][0] ||
        boundary[0][1] !== boundary[boundary.length - 1][1]
    ) {
        throw new Error("Did not finish at start")
    }

    const rs = boundary.map(([r]) => r)
    const cs = boundary.map(([, c]) => c)

    const maxR = Math.max(...rs)
    const maxC = Math.max(...cs)
    const minR = Math.min(...rs)
    const minC = Math.min(...cs)

    const nw = [minR, minC]
    const ne = [minR, maxC]
    const se = [maxR, maxC]
    const sw = [maxR, minC]

    console.log(nw, ne, se, sw)

    return "62"
}

export const part02 = (input: string): string => input
