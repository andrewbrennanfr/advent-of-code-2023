const parse = (input: string): string[][] =>
    input
        .trim()
        .split("\n")
        .map((line) => line.split(""))

const tiltNorth = (grid: string[][]): string[][] => {
    for (let i = 0; i < grid.length; i++) {
        const row = grid[i]

        for (let j = 0; j < row.length; j++) {
            const cell = row[j]

            if (cell === "O") {
                const cellAbove = grid[i - 1]?.[j]

                if (cellAbove === ".") {
                    const cellsAbove = grid.slice(0, i).map((r) => r[j])

                    const lastHash = cellsAbove.lastIndexOf("#")
                    const lastRock = cellsAbove.lastIndexOf("O")

                    const lastBlock = Math.max(lastHash, lastRock)
                    const lastDot = lastBlock + 1

                    grid[lastDot][j] = "O"
                    grid[i][j] = "."
                }
            }
        }
    }

    return grid
}

const calculateLoad = (grid: string[][]): string => {
    const roundRocks = grid
        .map((row, r) =>
            row
                .map((col, c) => (col === "O" ? [r, c] : []))
                .filter((rc) => rc.length)
        )
        .flat()

    const distancedFromBottom = roundRocks.map(([r]) => grid.length - r)

    return String(distancedFromBottom.reduce((sum, number) => sum + number))
}

const rotateGrid = (grid: string[][]): string[][] =>
    grid[0].map((_, index) => grid.map((row) => row[index]).reverse())

const performCycle = (grid: string[][]): string[][] => {
    const tiltedNorth = tiltNorth(grid)
    const tiltedWest = tiltNorth(rotateGrid(tiltedNorth))
    const tiltedSouth = tiltNorth(rotateGrid(tiltedWest))
    const tiltedEast = tiltNorth(rotateGrid(tiltedSouth))

    return rotateGrid(tiltedEast)
}

export const part01 = (input: string): string => {
    const grid = parse(input)

    const titledGrid = tiltNorth(grid)

    return calculateLoad(titledGrid)
}

export const part02 = (input: string): string => {
    const grid = parse(input)

    const visited: string[] = []
    let count = 0
    let currentGrid = grid

    while (!visited.includes(JSON.stringify(currentGrid))) {
        visited.push(JSON.stringify(currentGrid))

        currentGrid = performCycle(currentGrid)
        count++
    }

    const loopsUntilNexStart =
        count - visited.indexOf(JSON.stringify(currentGrid))

    const initialLoopsToStart = visited.indexOf(JSON.stringify(currentGrid))

    const remainingLoops =
        (1000000000 - initialLoopsToStart) % loopsUntilNexStart

    for (let i = 0; i < remainingLoops; i++) {
        currentGrid = performCycle(currentGrid)
    }

    return calculateLoad(currentGrid)
}
