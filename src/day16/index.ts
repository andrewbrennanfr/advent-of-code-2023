const calculate = (
    grid: string[][],
    { r, c }: { r: number; c: number },
    facing: string,
    visited: Set<string>,
    energized: Set<string>
): void => {
    const cell = grid[r][c]
    const key = `${r}_${c}_${facing}`

    if (!cell) {
        throw new Error("Non-existent cell!")
    }

    if (visited.has(key)) {
        return
    }

    visited.add(key)
    energized.add(`${r}_${c}`)

    if (
        cell === "." ||
        (cell === "|" && (facing === "N" || facing === "S")) ||
        (cell === "-" && (facing === "E" || facing === "W"))
    ) {
        const nextR = facing === "S" ? r + 1 : facing === "N" ? r - 1 : r
        const nextC = facing === "E" ? c + 1 : facing === "W" ? c - 1 : c
        const nextFacing = facing

        const nextCell = grid[nextR]?.[nextC]

        if (!nextCell) {
            return
        }

        return calculate(
            grid,
            { r: nextR, c: nextC },
            nextFacing,
            visited,
            energized
        )
    }

    if (cell === "/") {
        const nextR = facing === "E" ? r - 1 : facing === "W" ? r + 1 : r
        const nextC = facing === "N" ? c + 1 : facing === "S" ? c - 1 : c
        const nextFacing =
            facing === "N"
                ? "E"
                : facing === "E"
                ? "N"
                : facing === "S"
                ? "W"
                : "S"

        const nextCell = grid[nextR]?.[nextC]

        if (!nextCell) {
            return
        }

        return calculate(
            grid,
            { r: nextR, c: nextC },
            nextFacing,
            visited,
            energized
        )
    }

    if (cell === "\\") {
        const nextR = facing === "E" ? r + 1 : facing === "W" ? r - 1 : r
        const nextC = facing === "N" ? c - 1 : facing === "S" ? c + 1 : c
        const nextFacing =
            facing === "N"
                ? "W"
                : facing === "E"
                ? "S"
                : facing === "S"
                ? "E"
                : "N"

        const nextCell = grid[nextR]?.[nextC]

        if (!nextCell) {
            return
        }

        return calculate(
            grid,
            { r: nextR, c: nextC },
            nextFacing,
            visited,
            energized
        )
    }

    if (cell === "|") {
        const northRC = { r: r - 1, c }
        const nextCellNorth = grid[northRC.r]?.[northRC.c]

        if (nextCellNorth) {
            calculate(grid, northRC, "N", visited, energized)
        }

        const southRC = { r: r + 1, c }
        const nextCellSouth = grid[southRC.r]?.[southRC.c]

        if (nextCellSouth) {
            calculate(grid, southRC, "S", visited, energized)
        }

        return
    }

    if (cell === "-") {
        const westRC = { r, c: c - 1 }
        const nextCellWest = grid[westRC.r]?.[westRC.c]

        if (nextCellWest) {
            calculate(grid, westRC, "W", visited, energized)
        }

        const eastRC = { r, c: c + 1 }
        const nextCellEast = grid[eastRC.r]?.[eastRC.c]

        if (nextCellEast) {
            calculate(grid, eastRC, "E", visited, energized)
        }

        return
    }

    throw new Error("Why am I here?")
}

const parse = (input: string): string[][] =>
    input
        .trim()
        .split("\n")
        .map((row) => row.split(""))

export const part01 = (input: string): string => {
    const grid = parse(input)

    const energized = new Set<string>()

    calculate(grid, { r: 0, c: 0 }, "E", new Set(), energized)

    return String(energized.size)
}

export const part02 = (input: string): string => {
    const grid = parse(input)

    const firstRow = grid[0].map((_, c) => ({
        r: 0,
        c,
        facing: "S",
    }))

    const lastRow = grid[0].map((_, c) => ({
        r: grid.length - 1,
        c,
        facing: "N",
    }))

    const firstCol = grid.map((_, r) => ({
        r,
        c: 0,
        facing: "E",
    }))

    const lastCol = grid.map((_, r) => ({
        r,
        c: grid[0].length - 1,
        facing: "W",
    }))

    const entries = [...firstRow, ...lastRow, ...firstCol, ...lastCol]

    const calculations = entries.map(({ r, c, facing }) => {
        const energized = new Set<string>()

        calculate(grid, { r, c }, facing, new Set(), energized)

        return energized.size
    })

    return String(Math.max(...calculations))
}
