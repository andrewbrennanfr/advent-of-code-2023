export const part01 = (input: string): string => {
    const blocks = input.trim().split("\n\n")

    const [[, seeds = ""] = [], ...chunks] = blocks.map((block) =>
        block.split(":").map((chunk) => chunk.trim())
    )

    const maps = chunks.reduce<Record<string, (number: number) => number>>(
        (maps, [name = "", numbers = ""]) => {
            const lines = numbers
                .split("\n")
                .map((line) => line.trim().split(" ").map(Number))

            return {
                ...maps,
                [name.replace(" map", "")]: (number): number => {
                    const range = lines.find(
                        ([, source = Infinity, size = Infinity]) =>
                            number >= source && number <= source + size - 1
                    )

                    if (range) {
                        const [destination = Infinity, source = Infinity] =
                            range

                        const difference = number - source

                        return destination + difference
                    }

                    return number
                },
            }
        },
        {}
    )

    const transform = (seed: number): number | undefined =>
        [
            "seed-to-soil",
            "soil-to-fertilizer",
            "fertilizer-to-water",
            "water-to-light",
            "light-to-temperature",
            "temperature-to-humidity",
            "humidity-to-location",
        ].reduce((result, key) => Number(maps[key]?.(result)), seed)

    const seedResults = seeds.split(" ").map(Number).map(transform).map(Number)

    return String(Math.min(...seedResults))
}

export const part02 = (input: string): string => input
