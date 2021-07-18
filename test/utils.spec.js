import { clamp, findClosest, snapPercentage, calculatePositionFromMouseAngle } from '../src/utils'

describe('utils', () => {
    it('clamp value', () => {
        expect(clamp(0, 10, 5)).toBe(5)
        expect(clamp(0, 10, -1)).toBe(0)
        expect(clamp(0, 10, 11)).toBe(10)
    })

    describe('calculatePositionFromMouseAngle', () => {
        it('when the new pos is inside the range ', () => {
            const result = calculatePositionFromMouseAngle({
                mouseAngle: 45,
                angleOffset: 0,
                angleRange: 360,
                previousPercentage: 0,
                previousMouseAngle: 0,
            })
            expect(result).toEqual({updated:true, percentage: 0.125, mouseAngle: 45})
        })
        it('when the new pos is inside outside range', () => {
            const result = calculatePositionFromMouseAngle({
                mouseAngle: 135,
                angleOffset: 0,
                angleRange: 360,
                previousPercentage: 0,
                previousMouseAngle: 0,
            })
            expect(result).toEqual({updated:false, percentage: 0, mouseAngle: 0})
        })
        it('when the new pos is on the other side with big angleOffset', () => {
            const result = calculatePositionFromMouseAngle({
                mouseAngle: 90,
                angleOffset: 270,
                angleRange: 180,
                previousPercentage: 0,
                previousMouseAngle: null,
            })
            expect(result).toEqual({updated:true, percentage: 1, mouseAngle: 90})
        })
        it('when the new pos is far away from the previous angle ', () => {
            const result = calculatePositionFromMouseAngle({
                mouseAngle: 0,
                angleOffset: 0,
                angleRange: 360,
                previousPercentage: 0,
                previousMouseAngle: 180,
            })
            expect(result).toEqual({updated: false, percentage: 0, mouseAngle: 180})
        })
        it('when the position is closed but outside of the range', () => {
            const result = calculatePositionFromMouseAngle({
                mouseAngle: 315,
                angleOffset: 0,
                angleRange: 360,
                previousPercentage: 0.125,
                previousMouseAngle: 45,
            })
            expect(result).toEqual({updated: true, percentage: 0.0, mouseAngle: 0})
        })
        it('when the position is negative with a click on the positive side', () => {
            const result = calculatePositionFromMouseAngle({
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
            const result = calculatePositionFromMouseAngle({
                mouseAngle: 315,
                angleOffset: 0,
                angleRange: 360,
                percentage: 0.875,
                previousMouseAngle: null,
            })
            expect(result).toEqual({updated: true, percentage: 0.875, mouseAngle: 315})
        })
    })

    describe('snapPercentage', () => {
        it('first value', () => {
            const result = snapPercentage(0, 4)
            expect(result).toEqual(0)
        })
    })
    describe('snapPercentage', () => {
        it('last value', () => {
            const result = snapPercentage(1, 4)
            expect(result).toEqual(1)
        })
    })
    describe('snapPercentage', () => {
        it('lower than a value', () => {
            const result = snapPercentage(0.25 - 0.001, 4)
            expect(result).toEqual(0.25)
        })
    })
    describe('snapPercentage', () => {
        it('bigger than a value', () => {
            const result = snapPercentage(0.25 + 0.001, 4)
            expect(result).toEqual(0.25)
        })
    })
    describe('snapPercentage', () => {
        it('negative value', () => {
            const result = snapPercentage(-0.5 + 0.001, 4)
            expect(result).toEqual(-0.5)
        })
    })
})
