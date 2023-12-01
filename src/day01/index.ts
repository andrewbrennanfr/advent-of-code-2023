export const lines = (input: string): string[] => input.trim().split("\n")

export const log = <T>(value: T, ...args: unknown[]): T =>
    !Boolean(console.log(value, ...args)) ? value : value

export const matches = (string: string, regex: RegExp): RegExpMatchArray[] => [
    ...string.matchAll(regex),
]

export const nth =
    <T>(number: number): ((array: T[]) => T | undefined) =>
    (array) =>
        array[number]

export const sum = (numbers: number[]): number =>
    numbers.reduce((sum, number) => sum + number, 0)

/* -------------------------------------------------------------------------- */

const WORDS = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
]

/* -------------------------------------------------------------------------- */

export const part01 = (
    input: string,
    digits = (line: string): string[] =>
        matches(line, /\d/g).map(nth(0)).map(String)
): string =>
    String(
        sum(
            lines(input)
                .map(digits)
                .map((digits) => `${digits.at(0)}${digits.at(-1)}`)
                .map(Number)
        )
    )

export const part02 = (input: string): string =>
    part01(input, (line) =>
        matches(line, new RegExp(`(?=(${["\\d", ...WORDS].join("|")}))`, "g"))
            .map(nth(1))
            .map(String)
            .map((match) => WORDS.indexOf(match) + 1 || match)
            .map(String)
    )
