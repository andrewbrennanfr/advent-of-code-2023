const parse = (input: string): string[] => input.trim().split(",")

const hash = (string: string): number =>
    string.split("").reduce((output, character) => {
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

export const part02 = (input: string): string => {
    const steps = parse(input)
        .map((step) => {
            if (step.includes("-")) {
                return step.split("-").map((s, i) => (!i ? s : "-"))
            }

            if (step.includes("=")) {
                return step.split("=").flatMap((s, i) => (i ? s : [s, "="]))
            }

            throw new Error("No - or = found!")
        })
        .map(([label, operation, focal]) => ({
            box: hash(label),
            focal: focal || null,
            label,
            operation,
        }))

    const boxes: { focal: string; label: string }[][] = []

    steps.forEach(({ box: b, focal, label, operation }) => {
        if (!boxes[b]) {
            boxes[b] = []
        }

        if (operation === "=") {
            const box = boxes[b]

            const boxLabelIndex = box.findIndex((item) => {
                return item.label === label
            })

            if (boxLabelIndex !== -1) {
                boxes[b] = box.map((item, i) =>
                    i === boxLabelIndex ? { focal, label } : item
                )
            } else {
                boxes[b].push({ focal, label })
            }
        } else if (operation === "-") {
            const box = boxes[b]

            const boxLabelIndex = box.findIndex((item) => {
                return item.label === label
            })

            if (boxLabelIndex !== -1) {
                boxes[b] = box.filter((_, i) => i !== boxLabelIndex)
            }
        } else {
            throw new Error("No valid operation found!!")
        }
    })

    const focusingPower = boxes.reduce((power, box, i) => {
        if (!box || !box.length) {
            return power
        }

        const boxNumber = 1 + i

        const boxPowers = box.map(({ focal }, j) => {
            const slotNumber = 1 + j

            return boxNumber * slotNumber * Number(focal)
        })

        return power + boxPowers.reduce((a, b) => a + b, 0)
    }, 0)

    return String(focusingPower)
}
