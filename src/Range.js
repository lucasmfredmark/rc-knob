import React from 'react'

const pointOnCircle = (center, radius, angle) => ({
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle),
})
const degTorad = deg => (Math.PI * deg) / 180

function ordered(v1, v2) {
    if (v1 <= v2) {
        return [v1, v2]
    } else {
        return [v2, v1]
    }
}

const calcPath = ({
    percentageFrom,
    percentageTo,
    angleOffset,
    angleRange,
    arcWidth,
    radius: outerRadius,
    center,
}) => {
    const [percentageMin, percentageMax] = ordered(percentageFrom, percentageTo)
    const angle = angleRange * (percentageMax - percentageMin)
    const startAngle = angleOffset - 90 + angleRange * percentageMin
    const innerRadius = outerRadius - arcWidth
    const startAngleRad = degTorad(startAngle)
    const endAngleRad = degTorad(startAngle + angle)
    const largeArcFlag = angle < 180 ? 0 : 1

    const p1 = pointOnCircle(center, outerRadius, endAngleRad)
    const p2 = pointOnCircle(center, outerRadius, startAngleRad)
    const p3 = pointOnCircle(center, innerRadius, startAngleRad)
    const p4 = pointOnCircle(center, innerRadius, endAngleRad)

    return `M${p1.x},${
        p1.y
    } A${outerRadius},${outerRadius} 0 ${largeArcFlag} 0 ${p2.x},${p2.y}L${
        p3.x
    },${p3.y} A${innerRadius},${innerRadius} 0 ${largeArcFlag} 1 ${p4.x},${
        p4.y
    } L${p1.x},${p1.y}`
}

export const Range = ({
    color,
    percentage=null,
    percentageFrom=null,
    percentageTo=null,
    ...props
}) => {
    let pfrom, pto
    if (percentageFrom !== null && percentageTo !== null) {
        pfrom = percentageFrom
        pto = percentageTo
    } else if (percentageFrom !== null) {
        pfrom = percentageFrom
        pto = percentage
    } else if (percentageTo !== null) {
        pfrom = percentage
        pto = percentageTo
    } else {
        pfrom = 0
        pto = percentage
    }
    // Clamp
    if (Math.abs(pto - pfrom) >= 1) {
        pfrom = 0
        pto = 0.9999
    }
    const d = calcPath({percentageFrom:pfrom, percentageTo:pto, ...props})
    return (<g>
        <path d={d} style={{ fill: color }} />
    </g>)
}
