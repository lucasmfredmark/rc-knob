import React from 'react'
import { Range } from './Range'

export const Arc = ({ percentage, color, background, ...props }) => (
    <g>
        {background && (
            <Range
                percentageFrom={percentage}
                percentageTo={1}
                color={background}
                { ...props }
            />
        )}
        <Range
            percentageFrom={0}
            percentageTo={percentage}
            color={color}
            { ...props }
        />
    </g>
)
