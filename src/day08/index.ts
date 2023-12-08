const parse = (
    input: string
): {
    leftRight: string[]
    network: Record<
        string,
        {
            L: string
            R: string
        }
    >
} => {
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

    return { leftRight, network }
}

export const part01 = (input: string): string => {
    const { leftRight, network } = parse(input)

    let currentNode = "AAA"
    let i = 0

    while (currentNode !== "ZZZ") {
        const direction =
            leftRight[
                ((i % leftRight.length) + leftRight.length) % leftRight.length
            ]

        const node = network[currentNode]

        if (!node) throw "No node found"

        currentNode = node[direction]
        i++
    }

    return String(i)
}

export const part02 = (input: string): string => {
    const isEndingNode = (node: string): boolean => node.slice(-1) === "Z"

    const { leftRight, network } = parse(input)

    const startingNodes = Object.keys(network).filter(
        (node) => node.slice(-1) === "A"
    )

    const turnsToEnd = startingNodes.map((startingNode) => {
        let currentNode = startingNode
        let i = 0

        while (!isEndingNode(currentNode)) {
            const direction =
                leftRight[
                    ((i % leftRight.length) + leftRight.length) %
                        leftRight.length
                ]

            const node = network[currentNode]

            if (!node) throw "No node found"

            currentNode = node[direction]
            i++
        }

        return i
    })

    const greatestCommonDenominator = (a: number, b: number): number =>
        a ? greatestCommonDenominator(b % a, a) : b

    return String(
        turnsToEnd.reduce(
            (a: number, b: number): number =>
                (a * b) / greatestCommonDenominator(a, b)
        )
    )
}
