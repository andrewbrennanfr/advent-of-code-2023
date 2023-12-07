import { part01, part02 } from "@/day07"
import { example01 } from "@/day07/example"
import { input01 } from "@/day07/input"
import { describe, expect, test } from "bun:test"

describe("day07", () => {
    describe("part01", () => {
        test("example01", () => expect(part01(example01)).toEqual("6440"))

        test("input01", () => expect(part01(input01)).toEqual("253638586"))
    })

    describe("part02", () => {
        test("example01", () => expect(part02(example01)).toEqual("5905"))

        test("input01", () => expect(part02(input01)).toEqual("253253225"))
    })
})
