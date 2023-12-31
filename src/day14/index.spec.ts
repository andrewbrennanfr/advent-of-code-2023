import { part01, part02 } from "@/day14"
import { example01 } from "@/day14/example"
import { input01 } from "@/day14/input"
import { describe, expect, test } from "bun:test"

describe("day14", () => {
    describe("part01", () => {
        test("example01", () => expect(part01(example01)).toEqual("136"))

        test("input01", () => expect(part01(input01)).toEqual("105623"))
    })

    describe("part02", () => {
        test("example01", () => expect(part02(example01)).toEqual("64"))

        test("input01", () => expect(part02(input01)).toEqual("98029"))
    })
})
