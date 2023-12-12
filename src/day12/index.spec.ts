import { part01, part02 } from "@/day12"
import { example01 } from "@/day12/example"
import { input01 } from "@/day12/input"
import { describe, expect, test } from "bun:test"

describe("day12", () => {
    describe("part01", () => {
        test("example01", () => expect(part01(example01)).toEqual("21"))

        test("input01", () => expect(part01(input01)).toEqual("7670"))
    })

    describe("part02", () => {
        test.skip("example01", () =>
            expect(part02(example01)).toEqual("525152"))

        test.skip("input01", () => expect(part02(input01)).toEqual(""))
    })
})
