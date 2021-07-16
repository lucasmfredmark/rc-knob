import { clamp, caclulatePercentage, findClosest } from '../src/utils'

describe('utils', () => {
    it('clamp value', () => {
        expect(clamp(0, 10, 5)).toBe(5)
        expect(clamp(0, 10, -1)).toBe(0)
        expect(clamp(0, 10, 11)).toBe(10)
    })

    describe('caclulatePercentage', () => {
        it('when the angle is inside the range ', () => {
            const result = caclulatePercentage({
                centerX: 0,
                centerY: 0,
                clientX: 0,
                clientY: 10,
                angleOffset: 0,
                angleRange: 360,
            })
            expect(result).toBe(0.5)
        })
        it('when the angle is larger then the range ', () => {
            const result = caclulatePercentage({
                centerX: 0,
                centerY: 0,
                clientX: 0,
                clientY: 10,
                angleOffset: 0,
                angleRange: 90,
            })
            expect(result).toBe(1)
        })
    })

    describe('findClosest', () => {
        it('Value part of the list', () => {
            const result = findClosest([0,1,2,3], 2)
            expect(result).toBe(2)
        })
        it('Value not part of the list', () => {
            const result = findClosest([0,1,2,3], 1.1)
            expect(result).toBe(1)
        })
        it('List is empty', () => {
            const result = findClosest([], 1.1)
            expect(result).toBe(undefined)
        })
    })
})
