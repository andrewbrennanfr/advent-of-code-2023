import { part01, part02 } from "@/day18"
import { example01 } from "@/day18/example"
import { input01 } from "@/day18/input"
import { describe, expect, test } from "bun:test"

describe("day18", () => {
    describe("part01", () => {
        test("example01", () => expect(part01(example01)).toEqual("62"))

        test("input01", () => expect(part01(input01)).toEqual(""))
    })

    describe("part02", () => {
        test.skip("example01", () => expect(part02(example01)).toEqual(""))

        test.skip("input01", () => expect(part02(input01)).toEqual(""))
    })
})
