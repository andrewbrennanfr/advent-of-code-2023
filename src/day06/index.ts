export const part01 = (input: string): string => {
    const [firstLine, secondLine] = input.trim().split("\n")

    const times = firstLine
        .split(":")[1]
        .trim()
        .split(" ")
        .filter(Boolean)
        .map((number) => number.trim())
        .map(Number)

    const distances = secondLine
        .split(":")[1]
        .trim()
        .split(" ")
        .filter(Boolean)
        .map((number) => number.trim())
        .map(Number)

    const races = times.map((time, i) => [time, distances[i]] as const)

    const getWinCount = ([time, distance]: [number, number]): number => {
        const possibleWays = Array.from(Array(time), (_, i) => i).filter(
            (i) => i
        )

        const totalDistances = possibleWays.map((i) => {
            const remainingTime = time - i
            return remainingTime * i
        })

        return totalDistances.filter(
            (totalDistance) => totalDistance > distance
        ).length
    }

    return String(races.map(getWinCount).reduce((result, n) => result * n))
}

export const part02 = (input: string): string => {
    const [firstLine, secondLine] = input.trim().split("\n")

    const badTimes = firstLine
        .split(":")[1]
        .trim()
        .split(" ")
        .filter(Boolean)
        .map((number) => number.trim())
        .map(Number)

    const badDistances = secondLine
        .split(":")[1]
        .trim()
        .split(" ")
        .filter(Boolean)
        .map((number) => number.trim())
        .map(Number)

    const times = [Number(badTimes.join(""))]
    const distances = [Number(badDistances.join(""))]

    const races = times.map((time, i) => [time, distances[i]] as const)

    const getWinCount = ([time, distance]: [number, number]): number => {
        const possibleWays = time

        let firstWinIndex = -1

        for (let i = 0; i < possibleWays; i++) {
            const remainingTime = time - i

            if (remainingTime * i > distance) {
                firstWinIndex = i
                break
            }
        }

        return possibleWays - (firstWinIndex - 1) * 2 - 1
    }

    return String(races.map(getWinCount).reduce((result, n) => result * n))
}
