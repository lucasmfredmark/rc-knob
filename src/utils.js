export const clamp = (min, max, value) => Math.max(min, Math.min(max, value))

export const caclulatePercentage = ({
    centerX,
    centerY,
    clientX,
    clientY,
    angleOffset,
    angleRange,
}) => {
    const x = clientX - centerX
    const y = clientY - centerY
    const degree = (Math.atan2(y, x) * 180) / Math.PI + 90 - angleOffset
    const angle = degree < 0 ? degree + 360 : degree % 360

    if (angle <= angleRange) {
        return clamp(0, 1, angle / angleRange)
    } else {
        return +(angle - angleRange < (360 - angleRange) / 2)
    }
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
