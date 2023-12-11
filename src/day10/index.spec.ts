import { part01, part02 } from "@/day10"
import {
    example01,
    example02,
    example03,
    example04,
    example05,
    example06,
} from "@/day10/example"
import { input01 } from "@/day10/input"
import { describe, expect, test } from "bun:test"

describe("day10", () => {
    describe("part01", () => {
        test("example01", () => expect(part01(example01)).toEqual("4"))

        test("example02", () => expect(part01(example02)).toEqual("8"))

        test("input01", () => expect(part01(input01)).toEqual("6890"))
    })

    describe("part02", () => {
        test("example03", () => expect(part02(example03)).toEqual("4"))

        test("example04", () => expect(part02(example04)).toEqual("4"))

        test("example05", () => expect(part02(example05)).toEqual("8"))

        test("example06", () => expect(part02(example06)).toEqual("10"))

        test("input01", () => expect(part02(input01)).toEqual("453"))
    })
})
