import { useReducer, useEffect, useRef } from 'react'
import {
    calculatePositionFromMouseAngle,
    calculateMouseAngle,
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

const onStart = (state, action, callbacks) => {
    const center = getClientCenter(state)
    const mouseAngle = calculateMouseAngle({...center, ...action})
    const position = calculatePositionFromMouseAngle({
        previousMouseAngle: null,
        previousPercentage: null,
        ...state,
        ...action,
        mouseAngle,
    })
    return {
        ...state,
        isActive: true,
        ...position,
        ...center,
    }
}


const onMove = (state, action, callbacks) => {
    const mouseAngle = calculateMouseAngle({...state, ...action})
    const position = calculatePositionFromMouseAngle({
        previousMouseAngle: state.mouseAngle,
        previousPercentage: state.percentage,
        ...state,
        ...action,
        mouseAngle,
    })
    const value = getValueFromPercentage({ ...state, ...position })
    callbacks.onChange(value)
    return {
        ...state,
        ...position,
        value,
    }
}

const onChangeByStep = (state, action, callbacks) => {
    const value = clamp(
        state.min,
        state.max,
        state.value + 1 * action.direction
    )
    callbacks.onChange(value)
    return {
        ...state,
        value,
        percentage: getPercentageFromValue({ ...state, value }),
    }
}

const reducer = (callbacks) => (state, action) => {
    switch (action.type) {
        case 'START':
            callbacks.onMouseDown()
            return onStart(state, action, callbacks)
        case 'MOVE':
            return onMove(state, action, callbacks)
        case 'STOP':
            callbacks.onMouseUp()
            return { ...state, isActive: false, value: state.value }
        case 'STEPS':
            return onChangeByStep(state, action, callbacks)
        default:
            return { ...state, isActive: false, value: state.value }
    }
}

export default ({
    min,
    max,
    multiRotation,
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
        reducer({ onChange, onMouseDown, onMouseUp }),
        {
            isActive: false,
            min,
            max,
            multiRotation,
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
