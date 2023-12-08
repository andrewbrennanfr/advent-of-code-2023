const getSequences = (input: string): number[][] =>
    input
        .trim()
        .split("\n")
        .map((line) => line.split(" ").map(Number))

const getSequenceBelow = (sequence: number[]): number[] =>
    sequence
        .map((number, i) =>
            typeof sequence[i + 1] === "number"
                ? sequence[i + 1] - number
                : Infinity
        )
        .filter((number) => number !== Infinity)

const getNextSequenceNumber = (sequence: number[]): number =>
    new Set(sequence).size === 1
        ? sequence[0]
        : sequence[sequence.length - 1] +
          getNextSequenceNumber(getSequenceBelow(sequence))

const getPrevSequenceNumber = (sequence: number[]): number =>
    getNextSequenceNumber([...sequence].reverse())

export const part01 = (input: string): string =>
    String(
        getSequences(input)
            .map(getNextSequenceNumber)
            .reduce((sum, number) => sum + number, 0)
    )

export const part02 = (input: string): string =>
    String(
        getSequences(input)
            .map(getPrevSequenceNumber)
            .reduce((sum, number) => sum + number, 0)
    )
