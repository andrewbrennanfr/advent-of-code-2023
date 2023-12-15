import { part01, part02 } from "@/day15"
import { example01 } from "@/day15/example"
import { input01 } from "@/day15/input"
import { describe, expect, test } from "bun:test"

describe("day15", () => {
    describe("part01", () => {
        test("example01", () => expect(part01(example01)).toEqual("1320"))

        test("input01", () => expect(part01(input01)).toEqual("512950"))
    })

    describe("part02", () => {
        test("example01", () => expect(part02(example01)).toEqual("145"))

        test("input01", () => expect(part02(input01)).toEqual("247153"))
    })
})
