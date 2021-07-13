import React from 'react'
import { shallow } from 'enzyme'
import { Knob } from '../src/Knob'

describe('Knob', () => {
    it('provides the expected mouse API', () => {
        const component = shallow(
            <Knob
                onMouseUp={(e => { })}
                onMouseDown={(e => { })}
                onChange={(e => { })}
            />
        )
    })
})
