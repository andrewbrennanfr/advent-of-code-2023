import { part01, part02 } from "@/day09"
import { example01 } from "@/day09/example"
import { input01 } from "@/day09/input"
import { describe, expect, test } from "bun:test"

describe("day09", () => {
    describe("part01", () => {
        test("example01", () => expect(part01(example01)).toEqual("114"))

        test("input01", () => expect(part01(input01)).toEqual("1992273652"))
    })

    describe("part02", () => {
        test("example01", () => expect(part02(example01)).toEqual("2"))

        test("input01", () => expect(part02(input01)).toEqual("1012"))
    })
})
