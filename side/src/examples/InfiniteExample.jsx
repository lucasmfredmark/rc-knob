import React from 'react'
import {MockMotor} from './MockMotor'
import InfiniteKnob360 from './InfiniteKnob360'
import { H3, Cell } from '../styled'

export default ({title, disabled=false, direction="clockwise"}) => {

    const initialPosition = 45
    const [position, setPosition] = React.useState(initialPosition)
    const [target, setTarget] = React.useState(null)

    function onKnobChange(position) {
        setTarget(position)
    }

    function onMotorChange(position) {
        if (position === target) {
            setTarget(null)
        }
        setPosition(position)
    }

    return (
	    <Cell>
	        <H3>{title}</H3>
            <InfiniteKnob360
                disabled={disabled}
                size={150}
                target={target}
                origin="up"
                min={-9999}
                max={9999}
                direction={direction}
                value={position}
                onChange={onKnobChange}
                />
            <MockMotor
                initialPosition={initialPosition}
                onChange={onMotorChange}
                velocity={30}
                target={target}
                />
	    </Cell>
    )
}
