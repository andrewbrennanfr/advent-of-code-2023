const calculate = (grid: {
    cols: string[]
    grid: string[][]
    rows: string[]
}): number[] => {
    /* ---------------------------------------------------------- */

    const firstRow = grid.rows[0]
    const lastFirstRows = grid.rows
        .map((row, i) => [row, i])
        .filter(([row, i]) => i !== 0 && row === firstRow)
        .map(([, i]) => i)
        .map(Number)

    let toReturn = []

    if (lastFirstRows.length) {
        const filteredLastFirstRows = [...lastFirstRows]
            .reverse()
            .filter((row) => {
                const reflection = grid.rows.slice(0, row + 1)

                if (reflection.length % 2) {
                    return false
                }

                if (String([...reflection].reverse()) === String(reflection)) {
                    return true
                }
            })

        if (filteredLastFirstRows.length > 1) {
            throw "multiple filtredLastFirstRows options??"
        }

        const lastFirstRow = filteredLastFirstRows[0]

        if (lastFirstRow !== undefined) {
            const size = lastFirstRow + 1

            // if (toReturn) {
            //     throw "reassigned 1"
            // }

            toReturn.push((size / 2) * 100)
        }
    }

    /* ---------------------------------------------------------- */

    const lastRow = grid.rows[grid.rows.length - 1]
    const firstLastRows = grid.rows
        .map((row, i) => [row, i])
        .filter(([row, i]) => i !== grid.rows.length - 1 && row === lastRow)
        .map(([, i]) => i)
        .map(Number)

    if (firstLastRows.length) {
        const filteredFirstLastRows = firstLastRows.filter((row) => {
            const reflection = grid.rows.slice(row)

            if (reflection.length % 2) {
                return false
            }

            if (String([...reflection].reverse()) === String(reflection)) {
                return true
            }
        })

        if (filteredFirstLastRows.length > 1) {
            throw "multiple filteredFirstLastRows options??"
        }

        const firstLastRow = filteredFirstLastRows[0]

        if (firstLastRow !== undefined) {
            const size = grid.rows.length - firstLastRow

            // if (toReturn) {
            //     throw "reassigned 2"
            // }

            toReturn.push((grid.rows.length - size / 2) * 100)
        }
    }

    /* ---------------------------------------------------------- */

    const firstCol = grid.cols[0]
    const lastFirstCols = grid.cols
        .map((col, i) => [col, i])
        .filter(([col, i]) => i !== 0 && col === firstCol)
        .map(([, i]) => i)
        .map(Number)

    if (lastFirstCols.length) {
        const filteredLastFirstCol = [...lastFirstCols]
            .reverse()
            .filter((col) => {
                const reflection = grid.cols.slice(0, col + 1)

                if (reflection.length % 2) {
                    return false
                }

                if (String([...reflection].reverse()) === String(reflection)) {
                    return true
                }
            })

        if (filteredLastFirstCol.length > 1) {
            throw "multiple filteredLastFirstCol options??"
        }

        const lastFirstCol = filteredLastFirstCol[0]

        if (lastFirstCol !== undefined) {
            const size = lastFirstCol + 1

            // if (toReturn) {
            //     throw "reassigned 3"
            // }

            toReturn.push(size / 2)
        }
    }

    /* ---------------------------------------------------------- */

    const lastCol = grid.cols[grid.cols.length - 1]
    const firstLastCols = grid.cols
        .map((cols, i) => [cols, i])
        .filter(([col, i]) => i !== grid.cols.length - 1 && col === lastCol)
        .map(([, i]) => i)
        .map(Number)

    if (firstLastCols.length) {
        const filteredFirstLastCol = firstLastCols.filter((col) => {
            const reflection = grid.cols.slice(col)

            if (reflection.length % 2) {
                return false
            }

            if (String([...reflection].reverse()) === String(reflection)) {
                return true
            }
        })

        if (filteredFirstLastCol.length > 1) {
            throw "multiple filteredFirstLastCol options??"
        }

        const firstLastCol = filteredFirstLastCol[0]

        if (firstLastCol !== undefined) {
            const size = grid.cols.length - firstLastCol

            // if (toReturn) {
            //     throw "reassigned 4"
            // }

            toReturn.push(grid.cols.length - size / 2)
        }
    }

    /* ---------------------------------------------------------- */

    // console.warn(grid)
    // throw "We have no fold in this grid!!"

    return toReturn
}

const parse = (
    input: string
): { cols: string[]; grid: string[][]; rows: string[] }[] =>
    input
        .trim()
        .split("\n\n")
        .map((grid) => grid.split("\n").map((row) => row.split("")))
        .map((grid) => {
            const cols = grid[0].map((_, c) =>
                grid
                    .map((row) => row[c])
                    .map((char, r) => [char, r])
                    .filter(([char]) => char === "#")
                    .map(([, r]) => r)
                    .join("_")
            )

            const rows = grid.map((row) =>
                row
                    .map((char, c) => [char, c])
                    .filter(([char]) => char === "#")
                    .map(([, c]) => c)
                    .join("_")
            )

            return {
                cols,
                grid,
                rows,
            }
        })

/* -------------------------------------------------------------------------- */

export const part01 = (input: string): string =>
    String(
        parse(input)
            .map((grid) => calculate(grid)[0])
            .reduce((sum, number) => sum + number, 0)
    )

export const part02 = (input: string): string =>
    String(
        parse(input)
            .map((grid) => {
                /* ---------------------------------------------------------- */

                const similarCols = [
                    ...new Set(
                        grid.grid[0]
                            .map((_, i) => grid.grid.map((row) => row[i]))
                            .map((col, i, cols) => {
                                const similarCols = cols
                                    .map((otherCol, j) => [otherCol, j])
                                    .filter(
                                        ([otherCol, j]) =>
                                            j !== i &&
                                            col.filter(
                                                (c, i) => c !== otherCol[i]
                                            ).length === 1
                                    )
                                    .map(([, j]) => j)
                                    .map(Number)

                                return [i, similarCols] as const
                            })
                            .filter(([, similarCols]) => similarCols.length)
                            .flatMap(([col, similarCols]) =>
                                similarCols.map((similarCol) =>
                                    [col, similarCol]
                                        .sort((a, b) => a - b)
                                        .join("_")
                                )
                            )
                    ),
                ].map((pair) => pair.split("_").map(Number))

                const similarRows = [
                    ...new Set(
                        grid.grid
                            .map((row, i) => {
                                const similarRows = grid.grid
                                    .map((otherRow, j) => [otherRow, j])
                                    .filter(
                                        ([otherRow, j]) =>
                                            j !== i &&
                                            row.filter(
                                                (c, i) => c !== otherRow[i]
                                            ).length === 1
                                    )
                                    .map(([, j]) => j)
                                    .map(Number)

                                return [i, similarRows] as const
                            })
                            .filter(([, similarRows]) => similarRows.length)
                            .flatMap(([row, similarRows]) =>
                                similarRows.map((similarRow) =>
                                    [row, similarRow]
                                        .sort((a, b) => a - b)
                                        .join("_")
                                )
                            )
                    ),
                ].map((pair) => pair.split("_").map(Number))

                /* ---------------------------------------------------------- */

                const similarColGrids = similarCols.flatMap(([i, j]) => {
                    const clonedGridA = {
                        ...grid,
                        cols: [...grid.cols],
                        rows: [],
                    }
                    clonedGridA.cols[i] = clonedGridA.cols[j]

                    const clonedGridB = {
                        ...grid,
                        cols: [...grid.cols],
                        rows: [],
                    }
                    clonedGridB.cols[j] = clonedGridB.cols[i]

                    return [clonedGridA, clonedGridB]
                })

                const similarRowGrids = similarRows.flatMap(([i, j]) => {
                    const clonedGridA = {
                        ...grid,
                        rows: [...grid.rows],
                        cols: [],
                    }
                    clonedGridA.rows[i] = clonedGridA.rows[j]

                    const clonedGridB = {
                        ...grid,
                        rows: [...grid.rows],
                        cols: [],
                    }
                    clonedGridB.rows[j] = clonedGridB.rows[i]

                    return [clonedGridA, clonedGridB]
                })

                const similarGrids = [...similarRowGrids, ...similarColGrids]

                /* ---------------------------------------------------------- */

                const amounts = similarGrids
                    .flatMap((similarGrid) => calculate(similarGrid))
                    .filter((amount) => amount !== calculate(grid)[0])
                    .filter(Boolean)

                return amounts[0]
            })
            .reduce((sum, number) => sum + number, 0)
    )
