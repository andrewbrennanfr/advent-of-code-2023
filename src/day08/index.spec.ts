import { part01, part02 } from "@/day08"
import { example01, example02 } from "@/day08/example"
import { input01 } from "@/day08/input"
import { describe, expect, test } from "bun:test"

describe("day08", () => {
    describe("part01", () => {
        test("example01", () => expect(part01(example01)).toEqual("2"))

        test("example02", () => expect(part01(example02)).toEqual("6"))

        test("input01", () => expect(part01(input01)).toEqual("13019"))
    })

    describe("part02", () => {
        test.skip("example01", () => expect(part02(example01)).toEqual(""))

        test.skip("input01", () => expect(part02(input01)).toEqual(""))
    })
})
