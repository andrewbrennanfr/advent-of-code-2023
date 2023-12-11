const determineStart = (grid: string[][], r: number, c: number): string => {
    const siblings = getSiblings(r, c)

    const nextSiblings = getNextSiblings(grid, r, c)

    const nextSiblingCharacters = nextSiblings.map((nextSibling) =>
        getCharacter(grid, nextSibling.r, nextSibling.c)
    )

    const nextSiblingDirections = Object.fromEntries(
        Object.entries(siblings)
            .filter(([, sibling]) =>
                nextSiblings.find(
                    (nextSibling) =>
                        nextSibling.r === sibling.r &&
                        nextSibling.c === sibling.c
                )
            )
            .map(([D], i) => [D, nextSiblingCharacters[i]])
    )

    if (nextSiblingDirections["N"]) {
        if (nextSiblingDirections["E"]) {
            return "L"
        }

        if (nextSiblingDirections["W"]) {
            return "J"
        }

        if (nextSiblingDirections["S"]) {
            return "|"
        }
    }

    if (nextSiblingDirections["S"]) {
        if (nextSiblingDirections["E"]) {
            return "F"
        }

        if (nextSiblingDirections["W"]) {
            return "7"
        }
    }

    if (nextSiblingDirections["E"]) {
        if (nextSiblingDirections["W"]) {
            return "-"
        }
    }

    throw "No start found"
}

const getCharacter = (
    grid: string[][],
    r: number,
    c: number
): string | undefined => grid[r]?.[c]

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

/* -------------------------------------------------------------------------- */

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

        if (!unvisitedSibling) break

        nextSibling = unvisitedSibling
    }

    return String(Math.floor((loop.size + 1) / 2))
}

export const part02 = (input: string): string => {
    const grid = input
        .trim()
        .split("\n")
        .map((row) => row.split(""))

    const startR = grid.findIndex((row) => row.includes("S"))
    const startC = grid[startR].indexOf("S")
    const start = { r: startR, c: startC }
    const startSiblings = getNextSiblings(grid, start.r, start.c)

    const loop = new Set<string>([`${start.r}_${start.c}`])
    let nextSibling = startSiblings[0]

    while (!loop.has(`${nextSibling.r}_${nextSibling.c}`)) {
        loop.add(`${nextSibling.r}_${nextSibling.c}`)

        const current = nextSibling

        const siblings = getNextSiblings(grid, current.r, current.c)

        const unvisitedSibling = siblings.find(
            (sibling) => !loop.has(`${sibling.r}_${sibling.c}`)
        )

        if (!unvisitedSibling) break

        nextSibling = unvisitedSibling
    }

    grid.forEach((row, r) => {
        row.forEach((_, c) => {
            if (!loop.has(`${r}_${c}`)) {
                grid[r][c] = "."
            }
        })
    })

    const doubleGridMapping: Record<string, { r: number; c: number }> = {}

    let doubleGrid: typeof grid = []
    grid.forEach((row, r) => {
        const secondLastRow = []
        const lastRow = []

        doubleGrid.push(secondLastRow)
        doubleGrid.push(lastRow)

        row.forEach((cell, c) => {
            const character = cell === "S" ? determineStart(grid, r, c) : cell

            secondLastRow.push(character)

            doubleGridMapping[`${r}_${c}`] = {
                r: doubleGrid.length - 2,
                c: secondLastRow.length - 1,
            }

            if (character === "-" || character === "F" || character === "L") {
                secondLastRow.push("-")
            }

            if (
                character === "." ||
                character === "|" ||
                character === "J" ||
                character === "7"
            ) {
                secondLastRow.push(".")
            }

            /* -------------------------------------------------------------- */

            if (character === ".") {
                lastRow.push(".")
                lastRow.push(".")
            }

            if (character === "-") {
                lastRow.push(".")
                lastRow.push(".")
            }

            if (character === "|") {
                lastRow.push("|")
                lastRow.push(".")
            }

            if (character === "J") {
                lastRow.push(".")
                lastRow.push(".")
            }

            if (character === "L") {
                lastRow.push(".")
                lastRow.push(".")
            }

            if (character === "F") {
                lastRow.push("|")
                lastRow.push(".")
            }

            if (character === "7") {
                lastRow.push("|")
                lastRow.push(".")
            }

            return character
        })
    })

    const gridDots = grid
        .map((row, r) => row.map((_, c) => ({ r, c })))
        .flat()
        .filter(({ r, c }) => grid[r][c] === ".")

    const doubleGridDots = doubleGrid
        .map((row, r) => row.map((_, c) => ({ r, c })))
        .flat()
        .filter(({ r, c }) => doubleGrid[r][c] === ".")

    const hasDirectLine = (r: number, c: number): boolean => {
        const northernSize = r + 1

        for (let i = 0; i < northernSize; i++) {
            const northernR = r - i
            const northernCharacter = getCharacter(doubleGrid, northernR - 1, c)

            if (!northernCharacter) {
                return true
            }

            if (northernCharacter === "O") {
                return true
            }

            if (["|", "-", "F", "L", "J", "7"].includes(northernCharacter)) {
                break
            }
        }

        /* ------------------------------------------------------------------ */

        const southernSize = doubleGrid.length - r

        for (let i = 0; i < southernSize; i++) {
            const southernR = r + i
            const southernCharacter = getCharacter(doubleGrid, southernR + 1, c)

            if (!southernCharacter) {
                return true
            }

            if (southernCharacter === "O") {
                return true
            }

            if (["|", "-", "F", "L", "J", "7"].includes(southernCharacter)) {
                break
            }
        }

        /* ------------------------------------------------------------------ */

        const easternSize = doubleGrid[0].length - c

        for (let i = 0; i < easternSize; i++) {
            const easternC = c + i

            const easternCharacter = getCharacter(doubleGrid, r, easternC + 1)

            if (!easternCharacter) {
                return true
            }

            if (easternCharacter === "O") {
                return true
            }

            if (["|", "-", "F", "L", "J", "7"].includes(easternCharacter)) {
                break
            }
        }

        /* ------------------------------------------------------------------ */

        const westernSize = c

        for (let i = 0; i < westernSize; i++) {
            const westernC = c - i

            const westernCharacter = getCharacter(doubleGrid, r, westernC - 1)

            if (!westernCharacter) {
                return true
            }

            if (westernCharacter === "O") {
                return true
            }

            if (["|", "-", "F", "L", "J", "7"].includes(westernCharacter)) {
                break
            }
        }

        /* ------------------------------------------------------------------ */

        return false
    }

    let hasAppliedChange = true

    while (hasAppliedChange) {
        hasAppliedChange = false

        doubleGridDots.forEach(({ r, c }) => {
            if (doubleGrid[r][c] !== ".") return

            if (hasDirectLine(r, c)) {
                doubleGrid[r][c] = "O"
                hasAppliedChange = true
            }
        })
    }

    const outsideDots = gridDots.filter(({ r, c }) => {
        const doubleGridCell = doubleGridMapping[`${r}_${c}`]

        return (
            getCharacter(doubleGrid, doubleGridCell.r, doubleGridCell.c) === "O"
        )
    })

    return String(gridDots.length - outsideDots.length)
}
