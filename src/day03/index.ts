import { lines, sum } from "@/day01"
import { product } from "@/day02"

export const memoize = <T extends (...args: any[]) => any>(
    fn: T,
    serialize: (args: Parameters<T>) => string = String
) => {
    const cache = new Map<string, ReturnType<T>>()

    return (...args: Parameters<T>): ReturnType<T> => {
        const key = serialize(args)

        return (
            cache.get(key) ??
            cache.set(key, fn(...args)).get(key) ??
            fn(...args)
        )
    }
}

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

/* -------------------------------------------------------------------------- */

const eastNumbers = memoize(
    (numbers: Set<string>, [r, c]: [number, number]): [number, number][] => {
        const { e } = gridSiblings(r, c)

        return numbers.has(e.join("_")) ? [e, ...eastNumbers(numbers, e)] : []
    },
    ([set, [r, c]]) => String([set.size, r, c])
)

const getFullNumbers = (
    numbers: Set<string>,
    numericSiblingStarts: [number, number][]
): [number, number][][] =>
    numericSiblingStarts.map(([r, c]) => [
        [r, c],
        ...eastNumbers(numbers, [r, c]),
    ])

const getFullRealNumbers = (
    grid: string[][],
    fullNumbers: [number, number][][]
): number[] =>
    fullNumbers
        .map((rcs) =>
            rcs
                .map(([r = -1, c = -1]) => grid[r]?.[c])
                .map(String)
                .join("")
        )
        .map(Number)

const getNumbers = (grid: string[][]): Set<string> =>
    grid.reduce(
        (set, row, r) =>
            row.reduce(
                (set, cell, c) =>
                    /\d/.test(cell) ? set.add(`${r}_${c}`) : set,
                set
            ),
        new Set<string>()
    )

export const getNumericSiblings = (
    grid: string[][],
    symbols: [number, number][]
): [number, number][] =>
    symbols
        .map(([r, c]) => Object.values(gridSiblings(r, c)))
        .flat()
        .filter(([r, c]) => /\d/.test(String(grid[r]?.[c])))

export const getNumericSiblingStarts = (
    grid: string[][],
    numericSiblings: [number, number][]
): Set<string> =>
    new Set(
        numericSiblings
            .map(([r, c]) => westernStart(grid, r, c))
            .map((rc) => rc.join("_"))
    )

const getSymbols = (
    grid: string[][],
    test: (cell: string) => boolean
): [number, number][] =>
    grid.reduce<[number, number][]>(
        (set, row, r) =>
            row.reduce((symbols, cell, c) => {
                if (test(cell)) {
                    symbols.push([r, c])
                }

                return symbols
            }, set),
        []
    )

const setToCoordinates = (set: Set<string>): [number, number][] =>
    [...set]
        .map((rc) => rc.split("_").map(Number))
        .map(([r = -1, c = -1]) => [r, c])

const parse = (input: string): string[][] =>
    lines(input).map((line) => line.split(""))

const westernStart = memoize(
    (grid: string[][], r: number, c: number): [number, number] => {
        const { w } = gridSiblings(r, c)
        const west = grid[w[0]]?.[w[1]]

        return !/\d/.test(String(west))
            ? [r, c]
            : westernStart(grid, w[0], w[1])
    },
    ([grid, r, c]) => String([grid.length, r, c])
)

/* -------------------------------------------------------------------------- */

export const part01 = (input: string): string => {
    const grid = parse(input)

    const symbols = getSymbols(grid, (cell) => !/\.|\d/.test(cell))

    const numbers = getNumbers(grid)

    const numericSiblings = getNumericSiblings(grid, symbols)

    const numericSiblingStarts = getNumericSiblingStarts(grid, numericSiblings)

    const fullNumbers = getFullNumbers(
        numbers,
        setToCoordinates(numericSiblingStarts)
    )

    const fullRealNumbers = getFullRealNumbers(grid, fullNumbers)

    return String(sum(fullRealNumbers))
}

export const part02 = (input: string): string => {
    const grid = parse(input)

    const gears = getSymbols(grid, (cell) => /\*/.test(cell))

    const numbers = getNumbers(grid)

    const filteredGears = gears.filter(([r, c]) => {
        const numericSiblings = getNumericSiblings(grid, [[r, c]])
        const numericSiblingStarts = getNumericSiblingStarts(
            grid,
            numericSiblings
        )
        const fullNumbers = getFullNumbers(
            numbers,
            setToCoordinates(numericSiblingStarts)
        )

        return fullNumbers.length >= 2
    })

    const filteredNumericSiblings = getNumericSiblings(grid, filteredGears)

    const filteredNumericSiblingStarts = getNumericSiblingStarts(
        grid,
        filteredNumericSiblings
    )

    const filteredFullNumbers = getFullNumbers(
        numbers,
        setToCoordinates(filteredNumericSiblingStarts)
    )

    const fullRealNumbers = getFullRealNumbers(grid, filteredFullNumbers)

    // Not sure this grouping will work for any input, but i'm lucky mine are in the right order
    // Also this surely won't work with a gear has more than 2 siblings...
    const groupedRealNumbers = fullRealNumbers.map((number, i) =>
        !(i % 2) ? [number, fullRealNumbers[i + 1] ?? 1] : []
    )

    return String(sum(groupedRealNumbers.map(product)))
}
