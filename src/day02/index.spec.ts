import { part01, part02 } from "@/day02"
import { example01 } from "@/day02/example"
import { input01 } from "@/day02/input"
import { describe, expect, test } from "bun:test"

describe("day02", () => {
    describe("part01", () => {
        test("example01", () => expect(part01(example01)).toEqual("8"))

        test("input01", () => expect(part01(input01)).toEqual("2162"))
    })

    describe("part02", () => {
        test("example01", () => expect(part02(example01)).toEqual("2286"))

        test("input01", () => expect(part02(input01)).toEqual("72513"))
    })
})
