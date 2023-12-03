import { lines, sum } from "@/day01"

export const gridSiblings = (
    r: number,
    c: number
): Record<
    "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w",
    [number, number]
> => ({
    nw: [r - 1, c - 1],
    n: [r - 1, c],
    ne: [r - 1, c + 1],
    e: [r, c + 1],
    se: [r + 1, c + 1],
    s: [r + 1, c],
    sw: [r + 1, c - 1],
    w: [r, c - 1],
})

export const part01 = (input: string): string => {
    const grid = lines(input).map((line) => line.split(""))

    const symbols = grid.reduce(
        (set, row, r) =>
            row.reduce(
                (set, cell, c) =>
                    !/\.|\d/.test(cell) ? set.add(`${r}_${c}`) : set,
                set
            ),
        new Set<string>()
    )

    const numbers = grid.reduce(
        (set, row, r) =>
            row.reduce(
                (set, cell, c) =>
                    /\d/.test(cell) ? set.add(`${r}_${c}`) : set,
                set
            ),
        new Set<string>()
    )

    const numericSiblings = new Set(
        [...symbols]
            .map((rc) => rc.split("_").map(Number))
            .map(([r = -1, c = -1]) => Object.values(gridSiblings(r, c)))
            .flat()
            .filter(([r, c]) => /\d/.test(String(grid[r]?.[c])))
            .map(([r, c]) => `${r}_${c}`)
    )

    const westernStart = (r: number, c: number): [number, number] => {
        const { w } = gridSiblings(r, c)
        const west = grid[w[0]]?.[w[1]]

        return !/\d/.test(String(west)) ? [r, c] : westernStart(w[0], w[1])
    }

    const numericSiblingStarts = new Set(
        [...numericSiblings]
            .map((rc) => rc.split("_").map(Number))
            .map(([r = -1, c = -1]) => [r, c] as const)
            .map(([r, c]) => westernStart(r, c))
            .map((rc) => rc.join("_"))
    )

    const eastNumbers = ([r, c]: [number, number]): [number, number][] => {
        const { e } = gridSiblings(r, c)

        return numbers.has(e.join("_")) ? [e, ...eastNumbers(e)] : []
    }

    const fullNumbers = [...numericSiblingStarts]
        .map((rc) => rc.split("_").map(Number))
        .map(([r = -1, c = -1]) => [r, c] as const)
        .map(([r, c]) => [[r, c], ...eastNumbers([r, c])])

    return String(
        sum(
            fullNumbers
                .map((rcs) =>
                    rcs
                        .map(([r = -1, c = -1]) => grid[r]?.[c])
                        .map(String)
                        .join("")
                )
                .map(Number)
        )
    )
}

export const part02 = (input: string): string => input
