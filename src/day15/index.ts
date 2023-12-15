const parse = (input: string): string[][] =>
    input
        .trim()
        .split(",")
        .map((s) => s.split(""))

const hash = (string: string[]): number =>
    string.reduce((output, character) => {
        const ascii = character.charCodeAt(0)

        const added = output + ascii
        const multiplied = added * 17
        const remainder = multiplied % 256

        return remainder
    }, 0)

export const part01 = (input: string): string => {
    const steps = parse(input)

    const results = steps.map(hash)

    const sum = results.reduce((sum, number) => sum + number, 0)

    return String(sum)
}

export const part02 = (input: string): string => input
