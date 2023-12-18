import { part01, part02 } from "@/day17"
import { example01, example02 } from "@/day17/example"
import { input01 } from "@/day17/input"
import { describe, expect, test } from "bun:test"

describe("day17", () => {
    describe("part01", () => {
        test("example01", () => expect(part01(example01)).toEqual("102"))

        test("input01", () => expect(part01(input01)).toEqual("845"))
    })

    describe("part02", () => {
        test("example01", () => expect(part02(example01)).toEqual("94"))

        test("example02", () => expect(part02(example02)).toEqual("71"))

        test("input01", () => expect(part02(input01)).toEqual("993"))
    })
})
