export const part01 = (input: string): string => {
    const lines = input.trim().split("\n")

    const cards = lines.map((line) =>
        line
            .split(/:|\|/)
            .map((chunk) => chunk.trim().split(" ").filter(Boolean))
    )

    const results = cards
        .map(
            ([, winningNumbers, numbers]) =>
                [winningNumbers ?? [], numbers ?? []] as const
        )
        .map(
            ([winningNumbers, numbers]) =>
                numbers.filter((number) => winningNumbers.includes(number))
                    .length
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

export const part02 = (input: string): string => input
