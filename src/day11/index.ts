export const part01 = (input: string, factor = 1): string => {
    const universe = input
        .trim()
        .split("\n")
        .map((line) => line.split(""))
        .map((row, r) =>
            row.map((cell, c) => (cell === "#" ? `${r}_${c}` : ""))
        )
        .flat()
        .filter(Boolean)

    const uniqueRows = [
        ...new Set(universe.map((galaxy) => galaxy.split("_")[0])),
    ].sort((a, b) => Number(a) - Number(b))
    const uniqueCols = [
        ...new Set(universe.map((galaxy) => galaxy.split("_")[1])),
    ].sort((a, b) => Number(a) - Number(b))

    const expandedUniverse = universe.map((galaxy) => {
        const [row, col] = galaxy.split("_")

        const rowIndex = uniqueRows.indexOf(row)
        const colIndex = uniqueCols.indexOf(col)

        if (rowIndex === -1 || colIndex === -1) {
            throw "No row or col index found"
        }

        const rowsUntilGalaxy = uniqueRows.slice(0, rowIndex + 1)
        const colUntilGalaxy = uniqueCols.slice(0, colIndex + 1)

        const rowGaps = rowsUntilGalaxy
            .map((row, i) => {
                if (i === 0) return 0

                return Number(row) - Number(rowsUntilGalaxy[i - 1]) - 1
            })
            .filter(Boolean)

        const colGaps = colUntilGalaxy
            .map((col, i) => {
                if (i === 0) return 0

                return Number(col) - Number(colUntilGalaxy[i - 1]) - 1
            })
            .filter(Boolean)

        const rowAdjust = rowGaps.length * (factor - 1 || 1)
        const colAdjust = colGaps.length * (factor - 1 || 1)

        return `${Number(row) + rowAdjust}_${Number(col) + colAdjust}`
    })

    const galaxyPairs = expandedUniverse.reduce<[string, string][]>(
        (galaxyPairs, galaxy, i) => {
            const otherGalaxies = expandedUniverse
                .slice(i)
                .filter((otherGalaxy) => otherGalaxy !== galaxy)

            otherGalaxies.forEach((otherGalaxy) => {
                galaxyPairs.push([galaxy, otherGalaxy])
            })

            return galaxyPairs
        },
        []
    )

    const distances = galaxyPairs.map(([galaxyA, galaxyB]) => {
        const [rowA, colA] = galaxyA.split("_")
        const [rowB, colB] = galaxyB.split("_")

        return (
            Math.abs(Number(rowA) - Number(rowB)) +
            Math.abs(Number(colA) - Number(colB))
        )
    })

    return String(distances.reduce((a, b) => a + b, 0))
}

export const part02 = (input: string, factor = 1000000): string =>
    part01(input, factor)
