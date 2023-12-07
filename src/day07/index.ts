import { memoize } from "@/day03"

const count = <T>(
    array: T[],
    compare: (item: T, i: number, array: T[]) => boolean
): number => array.filter(compare).length

const getHands = (input: string): [string, number][] =>
    input
        .trim()
        .split("\n")
        .map((line) => line.split(" "))
        .map(([cards, bid]) => [cards, Number(bid)])

const getHandType = memoize((hand: string[]): string => {
    const set = new Set(hand)

    if (set.size === 1) {
        return "five_of_a_kind"
    }

    const hasFourMatches = hand.some(
        (card) => count(hand, (c) => c === card) === 4
    )

    if (set.size === 2 && hasFourMatches) {
        return "four_of_a_kind"
    }

    const hasThreeMatches = hand.some(
        (card) => count(hand, (c) => c === card) === 3
    )

    if (
        set.size === 2 &&
        hasThreeMatches &&
        hand.some((card) => count(hand, (c) => c === card) === 2)
    ) {
        return "full_house"
    }

    if (set.size === 3 && hasThreeMatches) {
        return "three_of_a_kind"
    }

    const twoMatchCount = count(
        hand,
        (card) => count(hand, (c) => c === card) === 2
    )

    if (set.size === 3 && twoMatchCount === 4) {
        return "two_pair"
    }

    if (set.size === 4 && twoMatchCount === 2) {
        return "one_pair"
    }

    return "high_card"
})

const getHandRank = (handType: string): number =>
    [
        "high_card",
        "one_pair",
        "two_pair",
        "three_of_a_kind",
        "full_house",
        "four_of_a_kind",
        "five_of_a_kind",
    ].indexOf(handType)

const getSortedHands = (
    hands: [string, number][],
    isHandLarger: (cardA: string, cardB: string) => boolean
) =>
    [...hands].sort(([handA], [handB]) =>
        isHandLarger(handB, handA) ? -1 : isHandLarger(handA, handB) ? 1 : 0
    )

const getTotalWinnings = (sortedHands: [string, number][]): number => {
    const sortedBids = sortedHands.map(([, bid]) => bid)

    const sortedWinnings = sortedBids.map((bid, i) => bid * (i + 1))

    return sortedWinnings.reduce((total, number) => total + number, 0)
}

export const part01 = (input: string): string => {
    const hands = getHands(input)

    const isCardLarger = (cardA: string, cardB: string): boolean => {
        const ranks = [
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "T",
            "J",
            "Q",
            "K",
            "A",
        ]

        const rankA = ranks.indexOf(cardA)
        const rankB = ranks.indexOf(cardB)

        if (rankA === -1 || rankB === -1) {
            throw "no card rank"
        }

        return rankA > rankB
    }

    const isHandLarger = (handA: string, handB: string): boolean => {
        const splitHandA = handA.split("")
        const splitHandB = handB.split("")

        const handAType = getHandType(splitHandA)
        const handBType = getHandType(splitHandB)

        if (handAType !== handBType) {
            return getHandRank(handAType) > getHandRank(handBType)
        }

        const firstDifferentIndex = splitHandA.findIndex(
            (card, i) => card !== splitHandB[i]
        )

        const differentCardA = splitHandA[firstDifferentIndex]
        const differentCardB = splitHandB[firstDifferentIndex]

        return isCardLarger(differentCardA, differentCardB)
    }

    const sortedHands = getSortedHands(hands, isHandLarger)

    return String(getTotalWinnings(sortedHands))
}

export const part02 = (input: string): string => {
    const hands = getHands(input)

    const ranks = [
        "J",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "T",
        "Q",
        "K",
        "A",
    ]

    const isCardLarger = (cardA: string, cardB: string): boolean => {
        const rankA = ranks.indexOf(cardA)
        const rankB = ranks.indexOf(cardB)

        if (rankA === -1 || rankB === -1) {
            throw "no card rank"
        }

        return rankA > rankB
    }

    const memoizedGetSortedHands = memoize(
        (
            hands: [string, number][],
            isHandLarger: (cardA: string, cardB: string) => boolean
        ) => getSortedHands(hands, isHandLarger),
        ([hands]) => String(hands.map(([hand]) => hand))
    )

    const upgradeHand = memoize((hand: string[]): string[] => {
        if (!hand.includes("J")) return hand

        const possibleUpgradedHands = ranks
            .slice(1)
            .map((rank) => hand.join("").replaceAll("J", rank))

        const sortedUpgradedHands = memoizedGetSortedHands(
            possibleUpgradedHands.map((hand) => [hand, Infinity]),
            isHandLarger
        ).map(([hand]) => hand)

        const strongestHand =
            sortedUpgradedHands[sortedUpgradedHands.length - 1]

        return strongestHand.split("")
    })

    const isHandLarger = memoize((handA: string, handB: string): boolean => {
        const splitHandA = handA.split("")
        const splitHandB = handB.split("")

        if (splitHandA.includes("J") || splitHandB.includes("J")) {
            const upgradedSplitHandA = upgradeHand(splitHandA)
            const upgradedSplitHandB = upgradeHand(splitHandB)

            const handAType = getHandType(upgradedSplitHandA)
            const handBType = getHandType(upgradedSplitHandB)

            if (handAType !== handBType) {
                return getHandRank(handAType) > getHandRank(handBType)
            }

            const firstDifferentIndex = splitHandA.findIndex(
                (card, i) => card !== splitHandB[i]
            )

            const differentCardA = splitHandA[firstDifferentIndex]
            const differentCardB = splitHandB[firstDifferentIndex]

            return isCardLarger(differentCardA, differentCardB)
        }

        const handAType = getHandType(splitHandA)
        const handBType = getHandType(splitHandB)

        if (handAType !== handBType) {
            return getHandRank(handAType) > getHandRank(handBType)
        }

        const firstDifferentIndex = splitHandA.findIndex(
            (card, i) => card !== splitHandB[i]
        )

        const differentCardA = splitHandA[firstDifferentIndex]
        const differentCardB = splitHandB[firstDifferentIndex]

        return isCardLarger(differentCardA, differentCardB)
    })

    const sortedHands = getSortedHands(hands, isHandLarger)

    return String(getTotalWinnings(sortedHands))
}
