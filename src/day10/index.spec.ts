import { part01 } from "@/day10"
import { example01, example02 } from "@/day10/example"
import { input01 } from "@/day10/input"
import { describe, expect, test } from "bun:test"

describe("day10", () => {
    describe("part01", () => {
        test("example01", () => expect(part01(example01)).toEqual("4"))

        test("example02", () => expect(part01(example02)).toEqual("8"))

        test("input01", () => expect(part01(input01)).toEqual("6890"))
    })

    // describe.skip("part02", () => {
    //     test.skip("example01", () => expect(part02(example01)).toEqual(""))

    //     test.skip("input01", () => expect(part02(input01)).toEqual(""))
    // })
})
