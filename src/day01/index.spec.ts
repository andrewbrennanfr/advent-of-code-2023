import { part01, part02 } from "@/day01"
import { example01, example02 } from "@/day01/example"
import { input01 } from "@/day01/input"
import { describe, expect, test } from "bun:test"

describe("day01", () => {
    describe("part01", () => {
        test("example01", () => expect(part01(example01)).toEqual("142"))

        test("input01", () => expect(part01(input01)).toEqual("56506"))
    })

    describe("part02", () => {
        test("example02", () => expect(part02(example02)).toEqual("281"))

        test("input01", () => expect(part02(input01)).toEqual("56017"))
    })
})
