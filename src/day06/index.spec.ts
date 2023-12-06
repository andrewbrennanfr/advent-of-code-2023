import { part01, part02 } from "@/day06"
import { example01 } from "@/day06/example"
import { input01 } from "@/day06/input"
import { describe, expect, test } from "bun:test"

describe("day06", () => {
    describe("part01", () => {
        test("example01", () => expect(part01(example01)).toEqual("288"))

        test("input01", () => expect(part01(input01)).toEqual("32076"))
    })

    describe("part02", () => {
        test("example01", () => expect(part02(example01)).toEqual("71503"))

        test("input01", () => expect(part02(input01)).toEqual("34278221"))
    })
})
