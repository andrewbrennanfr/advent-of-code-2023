import { part01, part02 } from "@/day11"
import { example01 } from "@/day11/example"
import { input01 } from "@/day11/input"
import { describe, expect, test } from "bun:test"

describe("day11", () => {
    describe("part01", () => {
        test("example01", () => expect(part01(example01)).toEqual("374"))

        test("input01", () => expect(part01(input01)).toEqual("10228230"))
    })

    describe("part02", () => {
        test("example01", () => {
            expect(part02(example01, 10)).toEqual("1030")
            expect(part02(example01, 100)).toEqual("8410")
        })

        test("input01", () => expect(part02(input01)).toEqual("447073334102"))
    })
})
