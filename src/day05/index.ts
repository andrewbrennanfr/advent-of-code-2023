export const part02 = (input: string): string => {
    const [seedsLine, ...remaingingLines] = input.trim().split("\n\n")

    const [, seedsString] = seedsLine.split(": ")
    const seeds = seedsString.split(" ").map(Number)

    const unpluggedMaps = remaingingLines.reduce<
        Record<
            string,
            {
                sourceStart: number
                sourceEnd: number
                destinationStart: number
                destinationEnd: number
                size: number
            }[]
        >
    >((maps, lines) => {
        const [key, ...numberLines] = lines.split("\n")
        const numbers = numberLines
            .map((numberLine) => numberLine.trim().split(" ").map(Number))
            .map(([destinationStart, sourceStart, size]) => ({
                sourceStart,
                sourceEnd: sourceStart + size - 1,
                destinationStart,
                destinationEnd: destinationStart + size - 1,
                size,
            }))
            .sort((a, b) => a.sourceStart - b.sourceStart)

        maps[key.replace(" map:", "")] = numbers

        return maps
    }, {})

    const maps = Object.fromEntries(
        Object.entries(unpluggedMaps).map(([key, map]) => {
            const hasGap = !map.every(
                (mapRange, i) =>
                    !map[i + 1] ||
                    mapRange.sourceEnd === map[i + 1].sourceStart - 1
            )

            if (!hasGap) return [key, map]

            const gapIndex = map.findIndex(
                (mapRange, i) =>
                    !(
                        !map[i + 1] ||
                        mapRange.sourceEnd === map[i + 1].sourceStart - 1
                    )
            )

            const sourceStart = map[gapIndex].sourceEnd + 1
            const sourceEnd = map[gapIndex + 1].sourceStart - 1

            const mapGap = {
                sourceStart,
                sourceEnd,
                destinationStart: sourceStart,
                destinationEnd: sourceEnd,
                size: sourceEnd - sourceStart + 1,
            }

            map.splice(gapIndex + 1, 0, mapGap)

            return [key, map]
        })
    )

    const getRangesAfterMap = (
        key: string,
        range: {
            start: number
            end: number
            size: number
        }
    ): { start: number; end: number; size: number }[] => {
        const map = maps[key]

        const isCompletelyOutside =
            map.every((mapRange) => mapRange.sourceStart > range.end) ||
            map.every((mapRange) => mapRange.sourceEnd < range.start)

        if (isCompletelyOutside) {
            return [range]
        }

        const isComletelyWithin =
            map[0].sourceStart <= range.start &&
            map[map.length - 1].sourceEnd >= range.end

        if (isComletelyWithin) {
            const isCompletelyWithinSingle = map.some(
                (mapRange) =>
                    mapRange.sourceStart <= range.start &&
                    mapRange.sourceEnd >= range.end
            )

            if (isCompletelyWithinSingle) {
                return [range]
            }

            const isGappedRange = !map.every(
                (mapRange, i) =>
                    !map[i + 1] ||
                    mapRange.sourceEnd === map[i + 1].sourceStart - 1
            )

            if (isGappedRange) {
                throw "gapped range found"
            }

            const newerMaps = map
                .map((mapRange) => ({
                    start: mapRange.sourceStart,
                    end: mapRange.sourceEnd,
                    size: mapRange.size,
                }))
                .filter((mapRange) => {
                    return (
                        (range.start <= mapRange.end &&
                            mapRange.end <= range.end) ||
                        (range.start <= mapRange.start &&
                            mapRange.start <= range.end)
                    )
                })

            const firstMapIndex = newerMaps.findIndex(
                (mapRange) =>
                    mapRange.start <= range.start && mapRange.end >= range.start
            )
            const firstMap = newerMaps[firstMapIndex]

            const lastMapIndex = newerMaps.findIndex(
                (mapRange) =>
                    mapRange.start <= range.end && mapRange.end >= range.end
            )
            const lastMap = newerMaps[lastMapIndex]

            const mapsInMiddle = newerMaps
                .slice(firstMapIndex + 1)
                .slice(0, lastMapIndex - 1)

            return [
                {
                    start: range.start,
                    end: firstMap.end,
                    size: firstMap.end - range.start + 1,
                },
                ...mapsInMiddle,
                {
                    start: lastMap.start,
                    end: range.end,
                    size: range.end - lastMap.start + 1,
                },
            ]
        }

        const isSurrounding =
            range.start < map[0].sourceStart &&
            range.end > map[map.length - 1].sourceEnd

        if (isSurrounding) {
            return [
                {
                    start: range.start,
                    end: map[0].sourceStart - 1,
                    size: map[0].sourceStart - range.start,
                },
                ...map.map((mapRange) => ({
                    start: mapRange.sourceStart,
                    end: mapRange.sourceEnd,
                    size: mapRange.size,
                })),
                {
                    start: map[map.length - 1].sourceEnd + 1,
                    end: range.end,
                    size: range.end - map[map.length - 1].sourceEnd,
                },
            ]
        }

        const isAtStart =
            range.start < map[0].sourceStart && range.end >= map[0].sourceStart

        if (isAtStart) {
            const newMap = map
                .map((mapRange) => ({
                    start: mapRange.sourceStart,
                    end: mapRange.sourceEnd,
                    size: mapRange.size,
                }))
                .filter((mapRange) => mapRange.start <= range.end)

            newMap[newMap.length - 1].end = range.end
            newMap[newMap.length - 1].size =
                range.end - newMap[newMap.length - 1].start + 1

            return [
                {
                    start: range.start,
                    end: map[0].sourceStart - 1,
                    size: map[0].sourceStart - range.start,
                },
                ...newMap,
            ]
        }

        const isAtEnd =
            range.start <= map[map.length - 1].sourceEnd &&
            range.end > map[map.length - 1].sourceEnd

        if (isAtEnd) {
            const newMap = map
                .map((mapRange) => ({
                    start: mapRange.sourceStart,
                    end: mapRange.sourceEnd,
                    size: mapRange.size,
                }))
                .filter((mapRange) => mapRange.end >= range.start)

            newMap[0].start = range.start
            newMap[0].size = newMap[0].end - range.start + 1

            return [
                ...newMap,
                {
                    start: map[map.length - 1].sourceEnd + 1,
                    end: range.end,
                    size: range.end - map[map.length - 1].sourceEnd,
                },
            ]
        }

        throw new Error("yooo")

        return []
    }

    const getRangesAfterTransform = (
        key: string,
        ranges: {
            start: number
            end: number
            size: number
        }[]
    ): { start: number; end: number; size: number }[] => {
        const map = maps[key]

        return ranges.map((range) => {
            const isRangeBelow = range.end < map[0].sourceStart

            if (isRangeBelow) {
                return range
            }

            const isRangeAbove = range.start > map[map.length - 1].sourceEnd

            if (isRangeAbove) {
                return range
            }

            const matchingRange = map.find(
                (mapRange) =>
                    range.start >= mapRange.sourceStart &&
                    range.end <= mapRange.sourceEnd
            )

            if (!matchingRange) {
                throw new Error("No matching range")
            }

            const startDiff = range.start - matchingRange.sourceStart
            const endDiff = matchingRange.sourceEnd - range.end
            const start = matchingRange.destinationStart + startDiff
            const end = matchingRange.destinationEnd - endDiff

            return { start, end, size: end - start + 1 }
        })
    }

    const findLowestLocation = (seedRange: {
        start: number
        end: number
        size: number
    }): number => {
        const rangesAfterSeedToSoil = getRangesAfterTransform(
            "seed-to-soil",
            getRangesAfterMap("seed-to-soil", seedRange)
        )

        const rangesAfterSoilToSeed = rangesAfterSeedToSoil.map((ranges) =>
            getRangesAfterTransform(
                "soil-to-fertilizer",
                getRangesAfterMap("soil-to-fertilizer", ranges)
            )
        )

        const rangesAfterFertilizerToWater = rangesAfterSoilToSeed.map(
            (subRanges) =>
                subRanges.map((ranges) =>
                    getRangesAfterTransform(
                        "fertilizer-to-water",
                        getRangesAfterMap("fertilizer-to-water", ranges)
                    )
                )
        )

        const rangesAfterWaterToLight = rangesAfterFertilizerToWater.map(
            (subRanges) =>
                subRanges.map((subSubRanges) =>
                    subSubRanges.map((ranges) =>
                        getRangesAfterTransform(
                            "water-to-light",
                            getRangesAfterMap("water-to-light", ranges)
                        )
                    )
                )
        )

        const rangesAfterLightToTemperature = rangesAfterWaterToLight.map(
            (subRanges) =>
                subRanges.map((subSubRanges) =>
                    subSubRanges.map((subSubSubRanges) =>
                        subSubSubRanges.map((ranges) =>
                            getRangesAfterTransform(
                                "light-to-temperature",
                                getRangesAfterMap(
                                    "light-to-temperature",
                                    ranges
                                )
                            )
                        )
                    )
                )
        )

        const rangesAfterTemperatureToHumidity =
            rangesAfterLightToTemperature.map((subRanges) =>
                subRanges.map((subSubRanges) =>
                    subSubRanges.map((subSubSubRanges) =>
                        subSubSubRanges.map((subSubSubSubRanges) =>
                            subSubSubSubRanges.map((ranges) =>
                                getRangesAfterTransform(
                                    "temperature-to-humidity",
                                    getRangesAfterMap(
                                        "temperature-to-humidity",
                                        ranges
                                    )
                                )
                            )
                        )
                    )
                )
            )

        const rangesAfterHumidityToLocation =
            rangesAfterTemperatureToHumidity.map((subRanges) =>
                subRanges.map((subSubRanges) =>
                    subSubRanges.map((subSubSubRanges) =>
                        subSubSubRanges.map((subSubSubSubRanges) =>
                            subSubSubSubRanges.map((subSubSubSubSubRanges) =>
                                subSubSubSubSubRanges.map((ranges) =>
                                    getRangesAfterTransform(
                                        "humidity-to-location",
                                        getRangesAfterMap(
                                            "humidity-to-location",
                                            ranges
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )

        const starts = rangesAfterHumidityToLocation
            .flat(10)
            .map(({ start }) => start)

        return Math.min(...starts)
    }

    const findLowestLocations = (
        seedRanges: {
            start: number
            end: number
            size: number
        }[]
    ): number => Math.min(...seedRanges.map(findLowestLocation))

    const seedRanges = seeds
        .map((seed, i) => (!(i % 2) ? [seed, seeds[i + 1]] : []))
        .filter((seedsRange) => seedsRange.length)
        .map((seedsRange) => ({
            start: seedsRange[0],
            end: seedsRange[0] + seedsRange[1] - 1,
            size: seedsRange[1],
        }))

    return String(findLowestLocations(seedRanges))
}
