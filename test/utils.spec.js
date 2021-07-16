import { clamp, findClosest, caclulateStateFromMouseAngle } from '../src/utils'

describe('utils', () => {
    it('clamp value', () => {
        expect(clamp(0, 10, 5)).toBe(5)
        expect(clamp(0, 10, -1)).toBe(0)
        expect(clamp(0, 10, 11)).toBe(10)
    })

    describe('caclulateStateFromMouseAngle', () => {
        it('when the new pos is inside the range ', () => {
            const result = caclulateStateFromMouseAngle({
                mouseAngle: 45,
                angleOffset: 0,
                angleRange: 360,
                previousPercentage: 0,
                previousMouseAngle: 0,
            })
            expect(result).toEqual({updated:true, percentage: 0.125, mouseAngle: 45})
        })
        it('when the new pos is inside outside range', () => {
            const result = caclulateStateFromMouseAngle({
                mouseAngle: 135,
                angleOffset: 0,
                angleRange: 360,
                previousPercentage: 0,
                previousMouseAngle: 0,
            })
            expect(result).toEqual({updated:false, percentage: 0, mouseAngle: 0})
        })
        it('when the new pos is far away from the previous angle ', () => {
            const result = caclulateStateFromMouseAngle({
                mouseAngle: 0,
                angleOffset: 0,
                angleRange: 360,
                previousPercentage: 0,
                previousMouseAngle: 180,
            })
            expect(result).toEqual({updated: false, percentage: 0, mouseAngle: 180})
        })
        it('when the position is closed but outside of the range', () => {
            const result = caclulateStateFromMouseAngle({
                mouseAngle: 315,
                angleOffset: 0,
                angleRange: 360,
                previousPercentage: 0.125,
                previousMouseAngle: 45,
            })
            expect(result).toEqual({updated: true, percentage: 0.0, mouseAngle: 0})
        })
        it('when the position is negative with a click on the positive side', () => {
            const result = caclulateStateFromMouseAngle({
                multiRotation: true,
                mouseAngle: 45,
                angleOffset: 0,
                angleRange: 360,
                percentage: -0.125,
                previousMouseAngle: null,
            })
            expect(result).toEqual({updated: true, percentage: 0.125, mouseAngle: 45})
        })
        it('when the position is at start and click on the end', () => {
            const result = caclulateStateFromMouseAngle({
                mouseAngle: 315,
                angleOffset: 0,
                angleRange: 360,
                percentage: 0.875,
                previousMouseAngle: null,
            })
            expect(result).toEqual({updated: true, percentage: 0.875, mouseAngle: 315})
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
