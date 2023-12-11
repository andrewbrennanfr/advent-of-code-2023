const getNextSiblings = (
    grid: string[][],
    r: number,
    c: number
): { r: number; c: number }[] => {
    const siblings = getSiblings(r, c)
    const currentCharacter = getCharacter(grid, r, c)

    const siblingCharacters = Object.entries(siblings).map(([D, { r, c }]) => [
        D,
        getCharacter(grid, r, c),
    ])

    const nextSiblings = siblingCharacters.filter(([D, character]) => {
        if (currentCharacter === "S") {
            const possibleEntries = {
                N: ["|", "7", "F"],
                E: ["-", "J", "7"],
                S: ["|", "J", "L"],
                W: ["-", "L", "F"],
            }

            return possibleEntries[D].includes(character)
        }

        if (currentCharacter === "|") {
            const possibleEntries = {
                N: ["|", "7", "F"],
                E: [],
                S: ["|", "J", "L"],
                W: [],
            }

            return possibleEntries[D].includes(character)
        }

        if (currentCharacter === "-") {
            const possibleEntries = {
                N: [],
                E: ["-", "J", "7"],
                S: [],
                W: ["-", "L", "F"],
            }

            return possibleEntries[D].includes(character)
        }

        if (currentCharacter === "L") {
            const possibleEntries = {
                N: ["|", "7", "F"],
                E: ["-", "J", "7"],
                S: [],
                W: [],
            }

            return possibleEntries[D].includes(character)
        }

        if (currentCharacter === "J") {
            const possibleEntries = {
                N: ["|", "7", "F"],
                E: [],
                S: [],
                W: ["-", "L", "F"],
            }

            return possibleEntries[D].includes(character)
        }

        if (currentCharacter === "7") {
            const possibleEntries = {
                N: [],
                E: [],
                S: ["|", "J", "L"],
                W: ["-", "L", "F"],
            }

            return possibleEntries[D].includes(character)
        }

        if (currentCharacter === "F") {
            const possibleEntries = {
                N: [],
                E: ["-", "J", "7"],
                S: ["|", "J", "L"],
                W: [],
            }

            return possibleEntries[D].includes(character)
        }

        return false
    })

    return nextSiblings.map((nextSibling) => siblings[nextSibling[0]])
}

const getSiblings = (
    r: number,
    c: number
): Record<"N" | "E" | "S" | "W", { r: number; c: number }> => ({
    N: { r: r - 1, c },
    E: { r, c: c + 1 },
    S: { r: r + 1, c },
    W: { r, c: c - 1 },
})

const getCharacter = (
    grid: string[][],
    r: number,
    c: number
): string | undefined => grid[r]?.[c]

export const part01 = (input: string): string => {
    const grid = input
        .trim()
        .split("\n")
        .map((row) => row.split(""))

    const startR = grid.findIndex((row) => row.includes("S"))
    const startC = grid[startR].indexOf("S")
    const start = { r: startR, c: startC }
    const startSiblings = getNextSiblings(grid, start.r, start.c)

    const loop = new Set<string>()
    let nextSibling = startSiblings[0]

    while (!loop.has(`${nextSibling.r}_${nextSibling.c}`)) {
        loop.add(`${nextSibling.r}_${nextSibling.c}`)

        const current = nextSibling

        const siblings = getNextSiblings(grid, current.r, current.c)

        const unvisitedSibling = siblings.find(
            (sibling) => !loop.has(`${sibling.r}_${sibling.c}`)
        )

        if (!unvisitedSibling) {
            break
        }

        nextSibling = unvisitedSibling
    }

    return String(Math.floor((loop.size + 1) / 2))
}

export const part02 = (input: string): string => input
