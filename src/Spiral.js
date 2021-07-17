import React from 'react'

const pointOnCircle = (center, radius, angle) => ({
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle),
})

const degTorad = deg => (Math.PI * deg) / 180

function ordered(v1, p1, v2, p2) {
    if (v1 <= v2) {
        return [v1, p1, v2, p2]
    } else {
        return [v2, p2, v1, p1]
    }
}

const calcPath = ({
    percentageFrom,
    percentageTo,
    angleOffset,
    angleRange,
    arcWidth,
    outerRadiusFrom,
    outerRadiusTo,
    center,
}) => {
    const [percentageMin, outerRadiusMin, percentageMax, outerRadiusMax] = 
		ordered(percentageFrom, outerRadiusFrom, percentageTo, outerRadiusTo)
    const angle = angleRange * (percentageMax - percentageMin)
    const startAngle = angleOffset - 90 + angleRange * percentageMin
    const startAngleRad = degTorad(startAngle)
    const endAngleRad = degTorad(startAngle + angle)

	const nb = Math.ceil(percentageMax - percentageMin) * 4
	let forth = ""
	let start = ""
	let back = ""
	let link = ""
	for (let i = 0; i <= nb; i++) {
        const coef = i / nb
        const outerRadius = outerRadiusMin + (outerRadiusMax - outerRadiusMin) * coef
        const innerRadius = outerRadius - arcWidth
        const angleRad = startAngleRad + (endAngleRad - startAngleRad) * coef
        const angleDeg = angleRad * 180 / Math.PI * coef
        const po = pointOnCircle(center, outerRadius, angleRad)
        const pi = pointOnCircle(center, innerRadius, angleRad)
        if (i === 0) {
            start = `${po.x},${po.y} `
        } else {
            forth += `${outerRadius},${outerRadius} ${angleDeg} 0 1 ${po.x},${po.y} `
        }
        if (i === nb) {
            link = `${pi.x},${pi.y} `
        } else {
            back = `${innerRadius},${innerRadius} ${angleDeg} 0 0 ${pi.x},${pi.y} ` + back
        }
	}
    return `M ${start}A ${forth}L ${link}A ${back}z`
}

export const Spiral = ({
    color,
    percentage=null,
    percentageFrom=null,
    radiusFrom=null,
    percentageTo=null,
    radiusTo=null,
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
    const d = calcPath({
		percentageFrom: pfrom,
		percentageTo: pto,
		outerRadiusFrom: radiusFrom,
		outerRadiusTo: radiusTo,
		...props
	})
    return (<g>
        <path d={d} style={{ fill: color }} />
    </g>)
}
