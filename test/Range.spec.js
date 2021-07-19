import React from 'react'
import { shallow } from 'enzyme'
import { Range } from '../src/Range'

describe('Arc', () => {
    it('renders correct clockwise small', () => {
        const component = shallow(
            <Range
                percentageFrom={0.2}
                percentageTo={0.5}
                angleOffset={0}
                angleRange={360}
                arcWidth={5}
                center={0}
                radius={50}
                color="lime"
                background="red"
            />
        )
        expect(component).toMatchSnapshot()
    })
    it('renders correct clockwise large', () => {
        const component = shallow(
            <Range
                percentageFrom={0.2}
                percentageTo={0.8}
                angleOffset={0}
                angleRange={360}
                arcWidth={5}
                center={0}
                radius={50}
                color="lime"
                background="red"
            />
        )
        expect(component).toMatchSnapshot()
    })
    it('renders correct anticlockwise small', () => {
        const component = shallow(
            <Range
                percentageFrom={0.2}
                percentageTo={0.5}
                angleOffset={0}
                angleRange={-360}
                arcWidth={5}
                center={0}
                radius={50}
                color="lime"
                background="red"
            />
        )
        expect(component).toMatchSnapshot()
    })
    it('renders correct anticlockwise large', () => {
        const component = shallow(
            <Range
                percentageFrom={0.2}
                percentageTo={0.8}
                angleOffset={0}
                angleRange={-360}
                arcWidth={5}
                center={0}
                radius={50}
                color="lime"
                background="red"
            />
        )
        expect(component).toMatchSnapshot()
    })
})
