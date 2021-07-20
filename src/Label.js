import React from 'react'

const pointOnCircle = (center, radius, angle) => {
    const rad = angle * Math.PI / 180
    return {
        x: center + radius * Math.cos(rad),
        y: center + radius * Math.sin(rad),
    }
}

export const Label = ({
    label,
    angleRange,
    angleOffset,
    percentage,
    center,
    radius = 0,
    className,
    style = {},
    userSelect = "none",
}) => {
    if (!label) {
        return null
    }
    const angle = angleOffset + 90 + angleRange * percentage
    const p = pointOnCircle(center, radius, angle)
    return (
        <g transform={`translate( ${center - p.x} ${center - p.y})`}
        >
            <text
                style={{ userSelect, ...style }}
                x="50%"
                y="50%"
                textAnchor="middle"
                className={className}
                dominantBaseline="middle"
                textAnchor="middle"
            >
                {label}
            </text>
        </g>
    )
}
