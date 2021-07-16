import { useReducer, useEffect, useRef } from 'react'
import {
    caclulateStateFromMousePosition,
    findClosest,
    getClientCenter,
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

const onStart = (state, action) => {
    const center = getClientCenter(state)
    const position = caclulateStateFromMousePosition({
        previousMouseAngle: null,
        previousPercentage: null,
        ...center, ...state, ...action
    })
    return {
        ...state,
        isActive: true,
        ...position,
        ...center,
    }
}


const onMove = ({ state, action, onChange }) => {
    const position = caclulateStateFromMousePosition({
        previousMouseAngle: state.mouseAngle,
        previousPercentage: state.percentage,
        ...state,
        ...action,
    })
    const value = getValueFromPercentage({ ...state, ...position })

    onChange(value)
    return {
        ...state,
        ...position,
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
            return onStart(state, action)
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
            mouseAngle: null,
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
