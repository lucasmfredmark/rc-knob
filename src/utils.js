export const clamp = (min, max, value) => Math.max(min, Math.min(max, value))

export const caclulateMouseAngle = ({
    centerX,
    centerY,
    clientX,
    clientY,
}) => {
    const x = clientX - centerX
    const y = clientY - centerY
    const degree = (Math.atan2(y, x) * 180) / Math.PI + 90
    const angle = degree < 0 ? degree + 360 : degree
    return angle
}

export const caclulatePercentageFromMouseAngle = ({
    mouseAngle,
    angleOffset,
    angleRange,
}) => {
    const angle = mouseAngle - angleOffset
    if (angle <= angleRange) {
        return clamp(0, 1, angle / angleRange)
    } else {
        return +(angle - angleRange < (360 - angleRange) / 2)
    }
}

export const caclulateStateFromMousePosition = ({
    centerX,
    centerY,
    clientX,
    clientY,
    angleOffset,
    angleRange,
    previousPercentage,
    previousMouseAngle,
}) => {
    const mouseAngle = caclulateMouseAngle({
        centerX,
        centerY,
        clientX,
        clientY})

    if (previousMouseAngle !== null) {
        // normalize and cancel the interaction if the delta angle is too big
        const deltaAngle = (mouseAngle - previousMouseAngle) % 360
        const validDeltaAngle = (deltaAngle > 180) ? -(360 - deltaAngle) : ((deltaAngle < -180) ? ((360 + deltaAngle)) : deltaAngle)
        if (validDeltaAngle >= 120 || validDeltaAngle <= -120) {
            return {
                updated: false,
                mouseAngle: previousMouseAngle,
                percentage: previousPercentage,
            }
        }

        // clamp the percentage
        const percentage = previousPercentage + validDeltaAngle / angleRange
        if (percentage < 0 || percentage > 1) {
            const clampedPercentage = (percentage < 0) ? 0 : 1
            const theoricalMouseAngle = (percentage < 0) ? angleOffset : angleOffset + angleRange
            return {
                updated: true,
                mouseAngle: theoricalMouseAngle,
                percentage: clampedPercentage,
            }
        }
        return {
            updated: true,
            mouseAngle,
            percentage: percentage,
        }
    } else {
        const percentage = caclulatePercentageFromMouseAngle({
            angleOffset,
            angleRange,
            mouseAngle,
        })
        return {
            updated: true,
            mouseAngle,
            percentage: percentage,
        }
    }
}

export const caclulatePercentage = ({
    centerX,
    centerY,
    clientX,
    clientY,
    angleOffset,
    angleRange,
}) => {
    const mouseAngle = caclulateMouseAngle({
        centerX,
        centerY,
        clientX,
        clientY})
    return caclulatePercentageFromMouseAngle({
        mouseAngle,
        angleOffset,
        angleRange,
    })
}

export const findClosest = (values, value) => {
    let result
    let lastDelta = Infinity
    values.forEach(item => {
        const delta = Math.abs(value - item)
        if (delta < lastDelta) {
            result = item
            lastDelta = delta
        }
    })
    return result
}

export const getValueFromPercentage = ({ min, max, percentage }) =>
    min + (max - min) * percentage

export const getPercentageFromValue = ({ min, max, value }) =>
    (value - min) / (max - min)

export const getClientCenter = ({ container, size }) => {
    const rect = container.current.getBoundingClientRect();
    return {
        centerX: rect.x + size / 2,
        centerY: rect.y + size / 2,
    }
}
