import { part01, part02 } from "@/day13"
import { example01 } from "@/day13/example"
import { input01 } from "@/day13/input"
import { describe, expect, test } from "bun:test"

describe("day13", () => {
    describe("part01", () => {
        test("example01", () => expect(part01(example01)).toEqual("405"))

        test("input01", () => expect(part01(input01)).toEqual("33122"))
    })

    describe("part02", () => {
        test("example01", () => expect(part02(example01)).toEqual("400"))

        test("input01", () => expect(part02(input01)).toEqual("32312"))
    })
})
