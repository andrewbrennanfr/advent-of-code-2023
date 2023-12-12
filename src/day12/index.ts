import { memoize } from "@/day03"

export const part01 = (input: string): string => {
    const rows = input
        .trim()
        .split("\n")
        .map((row) => row.split(" "))
        .map(([start, end]) => [start, end.split(",")] as const)

    const countArrangements = memoize(
        (springs: string, sizes: number[], previousSpring: string): number => {
            const nextSpring = springs[0]
            const remainingSprings = springs.slice(1)

            if (nextSpring === ".") {
                if (previousSpring === "#") {
                    if (sizes[0] !== 0) {
                        return 0
                    }

                    return countArrangements(
                        remainingSprings,
                        sizes.slice(1),
                        nextSpring
                    )
                }

                return countArrangements(remainingSprings, sizes, nextSpring)
            }

            if (nextSpring === "?") {
                return (
                    countArrangements(
                        `#${remainingSprings}`,
                        sizes,
                        previousSpring
                    ) +
                    countArrangements(
                        `.${remainingSprings}`,
                        sizes,
                        previousSpring
                    )
                )
            }

            if (nextSpring === "#") {
                const [firstSize, ...remainingSizes] = sizes

                if (!firstSize) {
                    return 0
                }

                const newFirstSize = firstSize - 1

                return countArrangements(
                    remainingSprings,
                    [newFirstSize, ...remainingSizes],
                    nextSpring
                )
            }

            if (sizes.some((size) => size > 0)) {
                return 0
            }

            return 1
        },
        JSON.stringify
    )

    const arrangementTotals = rows.map(([springs, sizes]) =>
        countArrangements(springs, sizes.map(Number), "")
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
