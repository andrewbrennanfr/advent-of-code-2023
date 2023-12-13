export const part01 = (input: string): string => {
    const grids = input
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

    return String(
        grids
            .map((grid) => {
                /* ---------------------------------------------------------- */

                const firstRow = grid.rows[0]
                const lastFirstRows = grid.rows
                    .map((row, i) => [row, i])
                    .filter(([row, i]) => i !== 0 && row === firstRow)
                    .map(([, i]) => i)
                    .map(Number)

                if (lastFirstRows.length) {
                    const lastFirstRow = [...lastFirstRows]
                        .reverse()
                        .find((row) => {
                            const reflection = grid.rows.slice(0, row + 1)

                            if (reflection.length % 2) {
                                return false
                            }

                            if (
                                String([...reflection].reverse()) ===
                                String(reflection)
                            ) {
                                return true
                            }
                        })

                    if (lastFirstRow !== undefined) {
                        const size = lastFirstRow + 1

                        return (size / 2) * 100
                    }
                }

                /* ---------------------------------------------------------- */

                const lastRow = grid.rows[grid.rows.length - 1]
                const firstLastRows = grid.rows
                    .map((row, i) => [row, i])
                    .filter(
                        ([row, i]) =>
                            i !== grid.rows.length - 1 && row === lastRow
                    )
                    .map(([, i]) => i)
                    .map(Number)

                if (firstLastRows.length) {
                    const firstLastRow = firstLastRows.find((row) => {
                        const reflection = grid.rows.slice(row)

                        if (reflection.length % 2) {
                            return false
                        }

                        if (
                            String([...reflection].reverse()) ===
                            String(reflection)
                        ) {
                            return true
                        }
                    })

                    if (firstLastRow !== undefined) {
                        const size = grid.rows.length - firstLastRow

                        return (grid.rows.length - size / 2) * 100
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
                    const lastFirstCol = [...lastFirstCols]
                        .reverse()
                        .find((col) => {
                            const reflection = grid.cols.slice(0, col + 1)

                            if (reflection.length % 2) {
                                return false
                            }

                            if (
                                String([...reflection].reverse()) ===
                                String(reflection)
                            ) {
                                return true
                            }
                        })

                    if (lastFirstCol !== undefined) {
                        const size = lastFirstCol + 1

                        return size / 2
                    }
                }

                /* ---------------------------------------------------------- */

                const lastCol = grid.cols[grid.cols.length - 1]
                const firstLastCols = grid.cols
                    .map((cols, i) => [cols, i])
                    .filter(
                        ([col, i]) =>
                            i !== grid.cols.length - 1 && col === lastCol
                    )
                    .map(([, i]) => i)
                    .map(Number)

                if (firstLastCols.length) {
                    const firstLastCol = firstLastCols.find((col) => {
                        const reflection = grid.cols.slice(col)

                        if (reflection.length % 2) {
                            return false
                        }

                        if (
                            String([...reflection].reverse()) ===
                            String(reflection)
                        ) {
                            return true
                        }
                    })

                    if (firstLastCol !== undefined) {
                        const size = grid.cols.length - firstLastCol

                        return grid.cols.length - size / 2
                    }
                }

                /* ---------------------------------------------------------- */

                throw "Should never be here"
            })
            .reduce((sum, number) => sum + number, 0)
    )
}

export const part02 = (input: string): string => input
