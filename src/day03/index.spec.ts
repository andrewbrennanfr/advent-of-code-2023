import { part01, part02 } from "@/day03"
import { example01 } from "@/day03/example"
import { input01 } from "@/day03/input"
import { describe, expect, test } from "bun:test"

describe("day03", () => {
    describe("part01", () => {
        test("example01", () => expect(part01(example01)).toEqual("4361"))

        test("input01", () => expect(part01(input01)).toEqual("536202"))
    })

    describe("part02", () => {
        test("example01", () => expect(part02(example01)).toEqual("467835"))

        test("input01", () => expect(part02(input01)).toEqual("78272573"))
    })
})
