import { part01, part02 } from "@/day05"
import { example01 } from "@/day05/example"
import { input01 } from "@/day05/input"
import { describe, expect, test } from "bun:test"

describe("day05", () => {
    describe("part01", () => {
        test("example01", () => expect(part01(example01)).toEqual("35"))

        test("input01", () => expect(part01(input01)).toEqual("910845529"))
    })

    describe("part02", () => {
        test.skip("example01", () => expect(part02(example01)).toEqual(""))

        test.skip("input01", () => expect(part02(input01)).toEqual(""))
    })
})
