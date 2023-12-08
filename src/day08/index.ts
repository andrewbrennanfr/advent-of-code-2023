export const part01 = (input: string): string => {
    const [firstLine, _, ...remainingLines] = input.trim().split("\n")

    const leftRight = firstLine.split("")

    const network = remainingLines.reduce<
        Record<string, { L: string; R: string }>
    >((network, line) => {
        const [key, leftRight] = line.split(" = ")
        const [L, R] = leftRight.slice(1, -1).split(", ")

        network[key] = { L, R }

        return network
    }, {})

    let currentNode = "AAA"
    let i = 0

    while (currentNode !== "ZZZ") {
        const direction =
            leftRight[
                ((i % leftRight.length) + leftRight.length) % leftRight.length
            ]

        const node = network[currentNode]

        if (!node) {
            throw "No node found"
        }

        currentNode = node[direction]
        i++
    }

    return String(i)
}

export const part02 = (input: string): string => input
