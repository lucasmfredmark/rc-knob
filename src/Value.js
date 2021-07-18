import React from 'react'

export const Value = ({
    value,
    size,
    decimalPlace = 0,
    className,
    marginBottom = 0,
}) => {
    if (value === null || value === undefined) {
        return null
    }
    let label = value.toFixed(decimalPlace)
    // make sure no negative zero is displayed
    if (label.startsWith("-") && label == 0) {
        label = label.slice(1)
    }
    return (
        <text
            style={{ userSelect: 'none' }}
            x="50%"
            textAnchor="middle"
            className={className}
            y={size - marginBottom}
        >
            {label}
        </text>
    )
}
