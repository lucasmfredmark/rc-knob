import { useReducer, useEffect, useRef } from 'react'
import {
    caclulatePercentage,
    findClosest,
    getStartXY,
    getValueFromPercentage,
    clamp,
    getPercentageFromValue,
} from './utils'
import {
    onMouseMoveStart,
    onKeyDown,
    handleEventListener,
    onScroll,
} from './eventHandling'

const onStart = state => ({
    ...state,
    isActive: true,
    ...getStartXY(state),
})

const onMove = ({ state, action, onChange }) => {
    const percentage = caclulatePercentage({
        ...state,
        ...action,
    })
    let value = getValueFromPercentage({ ...state, percentage })

    onChange(value)
    return {
        ...state,
        percentage,
        value,
    }
}

const onChangeByStep = ({ state, action, onChange }) => {
    const value = clamp(
        state.min,
        state.max,
        state.value + 1 * action.direction
    )
    onChange(value)
    return {
        ...state,
        value,
        percentage: getPercentageFromValue({ ...state, value }),
    }
}
const reducer = (onChange, onMouseDown, onMouseUp) => (state, action) => {
    switch (action.type) {
        case 'START':
            onMouseDown()
            return onStart(state)
        case 'MOVE':
            return onMove({ state, action, onChange })
        case 'STOP':
            onMouseUp()
            return { ...state, isActive: false, value: state.value }
        case 'STEPS':
            return onChangeByStep({ state, action, onChange })
        default:
            return { ...state, isActive: false, value: state.value }
    }
}

export default ({
    min,
    max,
    initialValue,
    angleOffset = 0,
    angleRange = 360,
    size,
    steps,
    onChange,
    readOnly,
    useMouseWheel,
    onMouseDown,
    onMouseUp,
}) => {
    const svg = useRef()
    const container = useRef()
    const [{ percentage, value, angle, isActive }, dispatch] = useReducer(
        reducer(onChange, onMouseDown, onMouseUp),
        {
            isActive: false,
            min,
            max,
            angleOffset,
            angleRange,
            percentage: initialValue ? (initialValue - min) / (max - min) : 0,
            value: initialValue || 0,
            svg,
            container,
            size,
        }
    )

    if (!readOnly) {
        useEffect(() => {
            const div = container.current
            const onStart = onMouseMoveStart(dispatch)
            const onWheel = useMouseWheel ? onScroll(dispatch) : null
            div.addEventListener("mousedown", onStart)
            if (onWheel) {
                div.addEventListener("wheel", onWheel)
            }
            return () => {
                div.removeEventListener("mousedown", onStart)
                if (onWheel) {
	                div.removeEventListener("wheel", onWheel)
                }
            }
        }, [useMouseWheel])
    }

    useEffect(handleEventListener({ dispatch, isActive }), [isActive])
    return {
        svg,
        container,
        percentage: steps ? findClosest(steps, percentage) : percentage,
        value,
        angle,
        onKeyDown: onKeyDown(dispatch),
    }
}
