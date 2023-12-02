import { lines, matches, nth, sum } from "@/day01"

/* -------------------------------------------------------------------------- */

export const max = (numbers: number[]): number => Math.max(...numbers)

export const min = (numbers: number[]): number => Math.min(...numbers)

export const negate =
    <T extends (...args: any[]) => boolean>(
        func: T
    ): ((...args: Parameters<T>) => boolean) =>
    (...args) =>
        !func(...args)

export const prop =
    <T extends object, U extends keyof T>(string: U): ((object: T) => T[U]) =>
    (object) =>
        object[string]

export const reject = <T>(
    array: T[],
    predicate: (item: T, i: number, array: T[]) => boolean
) => array.filter(negate(predicate))

/* -------------------------------------------------------------------------- */

export const part01 = (
    input: string,
    transformation = (
        games: { id: number; blue: number; green: number; red: number }[]
    ): number[] =>
        reject(
            games,
            ({ blue, green, red }) => blue > 14 || green > 13 || red > 12
        ).map(prop("id"))
): string =>
    String(
        sum(
            transformation(
                lines(input)
                    .map((line) => matches(line, /^Game (\d+): (.+)$/g))
                    .map(nth(0))
                    .map((match) => match ?? [])
                    .map(([, id, rounds]) => ({
                        id: Number(id),
                        rounds: String(rounds),
                    }))
                    .map(({ rounds, ...game }) => ({
                        ...game,
                        blue: matches(rounds, /([0-9]+) blue/g)
                            .map(nth(1))
                            .map(Number),
                        green: matches(rounds, /([0-9]+) green/g)
                            .map(nth(1))
                            .map(Number),
                        red: matches(rounds, /([0-9]+) red/g)
                            .map(nth(1))
                            .map(Number),
                    }))
                    .map(({ blue, green, red, ...game }) => ({
                        ...game,
                        blue: max(blue),
                        green: max(green),
                        red: max(red),
                    }))
            )
        )
    )

export const part02 = (input: string): string => input
