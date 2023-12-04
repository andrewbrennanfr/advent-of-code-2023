const getWinningNumbers = (
    numbers: string[],
    winningNumbers: string[]
): string[] => numbers.filter((number) => winningNumbers.includes(number))

const parse = (input: string): [[string, string], string[], string[]][] =>
    input
        .trim()
        .split("\n")
        .map((line) =>
            line
                .split(/:|\|/)
                .map((chunk) => chunk.trim().split(" ").filter(Boolean))
        ) as [[string, string], string[], string[]][]

export const part01 = (input: string): string => {
    const cards = parse(input)

    const results = cards
        .map(
            ([, winningNumbers, numbers]) =>
                [winningNumbers ?? [], numbers ?? []] as const
        )
        .map(
            ([winningNumbers, numbers]) =>
                getWinningNumbers(numbers, winningNumbers).length
        )
        .filter(Boolean)

    return String(
        results
            .map((number) =>
                Array.from(Array(number), (_, x) => x + 1).reduce(
                    (total, number, i) => (!i ? number : total * 2)
                )
            )
            .reduce((sum, number) => sum + number)
    )
}

export const part02 = (input: string): string => {
    const cards = parse(input)

    const totals = cards.reduce(
        (totals, [[, id], winningNumbers, numbers], i) => {
            const totalWinning = getWinningNumbers(
                numbers,
                winningNumbers
            ).length

            if (!totalWinning) return totals

            const toUpdate = Array.from(
                Array(totalWinning),
                (_, x) => i + 1 + (x + 1)
            ).map(String)

            const totalForCurrentCard = totals.get(id) ?? 0

            const newTotals = toUpdate.reduce(
                (newTotals, id) =>
                    newTotals.set(
                        id,
                        (totals.get(id) ?? 0) + totalForCurrentCard
                    ),
                totals
            )

            return newTotals
        },
        new Map<string, number>(cards.map(([[, id]]) => [id, 1]))
    )

    return String(
        [...totals.values()].reduce((total, number) => total + number)
    )
}
