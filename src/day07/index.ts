const count = <T>(
    array: T[],
    compare: (item: T, i: number, array: T[]) => boolean
): number => array.filter(compare).length

export const part01 = (input: string): string => {
    const hands = input
        .trim()
        .split("\n")
        .map((line) => line.split(" "))
        .map(([cards, bid]) => [cards, Number(bid)] as const)

    const getHandType = (hand: string[]): string => {
        if (new Set(hand).size === 1) {
            return "five_of_a_kind"
        }

        if (
            new Set(hand).size === 2 &&
            hand.some((card) => count(hand, (c) => c === card) === 4)
        ) {
            return "four_of_a_kind"
        }

        if (
            new Set(hand).size === 2 &&
            hand.some((card) => count(hand, (c) => c === card) === 3) &&
            hand.some((card) => count(hand, (c) => c === card) === 2)
        ) {
            return "full_house"
        }

        if (
            new Set(hand).size === 3 &&
            hand.some((card) => count(hand, (c) => c === card) === 3)
        ) {
            return "three_of_a_kind"
        }

        if (
            new Set(hand).size === 3 &&
            count(hand, (card) => count(hand, (c) => c === card) === 2) === 4
        ) {
            return "two_pair"
        }

        if (
            new Set(hand).size === 4 &&
            count(hand, (card) => count(hand, (c) => c === card) === 2) === 2
        ) {
            return "one_pair"
        }

        return "high_card"
    }

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

    const sortedHands = [...hands].sort(([handA], [handB]) =>
        isHandLarger(handB, handA) ? -1 : isHandLarger(handA, handB) ? 1 : 0
    )

    const sortedBids = sortedHands.map(([, bid]) => bid)

    const sortedResults = sortedBids.map((bid, i) => bid * (i + 1))

    return String(sortedResults.reduce((total, number) => total + number, 0))
}

export const part02 = (input: string): string => input
