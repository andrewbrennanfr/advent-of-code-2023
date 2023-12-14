const parse = (input: string): string[][] =>
    input
        .trim()
        .split("\n")
        .map((line) => line.split(""))

export const part01 = (input: string): string => {
    const grid = parse(input)

    const squareRocks = grid
        .map((row, r) =>
            row
                .map((col, c) => (col === "#" ? [r, c] : []))
                .filter((rc) => rc.length)
        )
        .flat()

    const roundRocks = grid.map((row, r) =>
        row
            .map((col, c) => (col === "O" ? [r, c] : []))
            .filter((rc) => rc.length)
    )

    const tiltedRoundRocks = roundRocks
        .reduce<number[][]>((tiltedRoundRocks, row, i) => {
            const newRow = row.map(([r, c]) => {
                const tiltedRoundRocksAbove = tiltedRoundRocks.filter(
                    (rc) => rc[0] < r && c === rc[1]
                )

                const tiltedRoundRockAbove = tiltedRoundRocksAbove.sort(
                    (rcA, rcB) => rcA[0] - rcB[0]
                )[tiltedRoundRocksAbove.length - 1]

                const squareRocksAbove = squareRocks.filter(
                    (rc) => c === rc[1] && rc[0] <= r
                )

                const squareRockAbove = squareRocksAbove.sort(
                    (rcA, rcB) => rcA[0] - rcB[0]
                )[squareRocksAbove.length - 1]

                if (!tiltedRoundRockAbove && !squareRockAbove) {
                    return [0, c]
                }

                if (squareRockAbove && !tiltedRoundRockAbove) {
                    return [squareRockAbove[0] + 1, c]
                }

                if (!squareRockAbove && tiltedRoundRockAbove) {
                    return [tiltedRoundRockAbove[0] + 1, c]
                }

                if (tiltedRoundRockAbove[0] > squareRockAbove[0]) {
                    return [tiltedRoundRockAbove[0] + 1, c]
                }

                if (squareRockAbove[0] > tiltedRoundRockAbove[0]) {
                    return [squareRockAbove[0] + 1, c]
                }

                throw new Error("There is nothing above me?")
            })

            return [...tiltedRoundRocks, ...newRow]
        }, [])
        .sort((rcA, rcB) => {
            if (rcA[0] !== rcB[0]) {
                return rcA[0] - rcB[0]
            }

            return rcA[1] - rcB[1]
        })

    const distancedFromBottom = tiltedRoundRocks.map(([r]) => grid.length - r)

    return String(distancedFromBottom.reduce((sum, number) => sum + number))
}

export const part02 = (input: string): string => input
