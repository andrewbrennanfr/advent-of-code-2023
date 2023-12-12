export const part01 = (input: string): string => {
    const rows = input
        .trim()
        .split("\n")
        .map((row) => row.split(" "))
        .map(([start, end]) => [start.split(""), end.split(",")])

    const countArrangements = (springs: string[], sizes: number[]): number => {
        const questionIndexes = springs
            .map((character, i) => [character, i])
            .filter(([character]) => character === "?")
            .map(([, i]) => i)
            .map(Number)

        const possibleCombinations = questionIndexes.reduce<string[][]>(
            (possibleCombinations, questionIndex, i) => {
                if (i === 0) {
                    const untilThisIndex = springs.slice(0, questionIndex)
                    const dotCombination = untilThisIndex.concat(".")
                    const hashCombination = untilThisIndex.concat("#")

                    possibleCombinations.push(dotCombination)
                    possibleCombinations.push(hashCombination)

                    return possibleCombinations
                }

                const untilThisIndex = springs.slice(
                    questionIndexes[i - 1] + 1,
                    questionIndex
                )
                const dotCombination = untilThisIndex.concat(".")
                const hashCombination = untilThisIndex.concat("#")

                const newPossibleCombinations: typeof possibleCombinations = []

                possibleCombinations.forEach((possibleCombination) => {
                    newPossibleCombinations.push(
                        possibleCombination.concat(dotCombination)
                    )
                    newPossibleCombinations.push(
                        possibleCombination.concat(hashCombination)
                    )
                })

                return newPossibleCombinations
            },
            []
        )

        const fullPossibleCombinations = possibleCombinations.map(
            (possibleCombination) =>
                possibleCombination.concat(
                    springs.slice(
                        questionIndexes[questionIndexes.length - 1] + 1
                    )
                )
        )

        const totalHashes = sizes.reduce((a, b) => a + b)

        return fullPossibleCombinations.filter((combination) => {
            if (
                combination.filter((character) => character === "#").length !==
                totalHashes
            ) {
                return false
            }

            const hashGroups = combination.reduce<string[][]>(
                (hashGroups, character, i) => {
                    if (character === "#") {
                        if (combination[i - 1] === "#") {
                            hashGroups[hashGroups.length - 1].push(character)
                        } else {
                            hashGroups.push([character])
                        }
                    }

                    return hashGroups
                },
                []
            )

            if (hashGroups.length !== sizes.length) {
                return false
            }

            if (
                hashGroups.some((hashGroup, i) => hashGroup.length !== sizes[i])
            ) {
                return false
            }

            return true
        }).length
    }

    const arrangementTotals = rows.map(([springs, sizes]) =>
        countArrangements(springs, sizes.map(Number))
    )

    const arrangementSum = arrangementTotals.reduce((a, b) => a + b)

    return String(arrangementSum)
}

export const part02 = (input: string): string => {
    const newInput = input
        .trim()
        .split("\n")
        .map((row) => row.split(" "))
        .map(([start, end]) =>
            [Array(5).fill(start).join("?"), Array(5).fill(end).join(",")].join(
                " "
            )
        )
        .join("\n")

    return part01(newInput)
}
