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
    onKeyDown,
    handleEventListener,
} from './eventHandling'

const reduceOnStart = (state, action, callbacks) => {
    const center = getClientCenter(state)
    const mouseAngle = calculateMouseAngle({...center, ...action})
    const position = calculatePositionFromMouseAngle({
        previousMouseAngle: null,
        previousPercentage: null,
        ...state,
        ...action,
        mouseAngle,
    })
    const value = getValueFromPercentage({ ...state, ...position })
    callbacks.onStart()
    callbacks.onInteractiveChange(value)
    if (state.tracking) {
        callbacks.onChange(value)
    }
    return {
        ...state,
        isActive: true,
        ...position,
        ...center,
        startPercentage: state.percentage,
        startValue: state.value,
        value
    }
}


const reduceOnMove = (state, action, callbacks) => {
    const mouseAngle = calculateMouseAngle({...state, ...action})
    const position = calculatePositionFromMouseAngle({
        previousMouseAngle: state.mouseAngle,
        previousPercentage: state.percentage,
        ...state,
        ...action,
        mouseAngle,
    })
    const value = getValueFromPercentage({ ...state, ...position })
    callbacks.onInteractiveChange(value)
    if (state.tracking) {
        callbacks.onChange(value)
    }
    return {
        ...state,
        ...position,
        value,
    }
}

const reduceOnStop = (state, action, callbacks) => {
    if (!state.tracking) {
        callbacks.onChange(state.value)
    }
    callbacks.onEnd()
    return {
        ...state, isActive: false,
        value: state.value,
        percentage: state.percentage,
        startPercentage: undefined,
        startValue: undefined,
    }
}

const reduceOnCancel = (state, action, callbacks) => {
    const percentage = state.startPercentage
    const value = state.startValue
    callbacks.onEnd()
    if (state.tracking) {
        callbacks.onChange(value)
    }
    return {
        ...state, isActive: false, value, percentage,
        startPercentage: undefined,
        startValue: undefined,
    }
}

const reduceOnSteps = (state, action, callbacks) => {
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
            return reduceOnStart(state, action, callbacks)
        case 'MOVE':
            return reduceOnMove(state, action, callbacks)
        case 'STOP':
            return reduceOnStop(state, action, callbacks)
        case 'CANCEL':
            return reduceOnCancel(state, action, callbacks)
        case 'STEPS':
            return reduceOnSteps(state, action, callbacks)
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
    onInteractiveChange,
    onStart,
    onEnd,
    readOnly,
    tracking,
    useMouseWheel,
}) => {
    const svg = useRef()
    const container = useRef()
    const [{ percentage, value, angle, isActive }, dispatch] = useReducer(
        reducer({ onChange, onInteractiveChange, onStart, onEnd }),
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
            tracking,
            container,
            size,
        }
    )

    if (!readOnly) {
        useEffect(handleEventListener(
            { container, dispatch, useMouseWheel }),
            [useMouseWheel]
        )
    }

    return {
        svg,
        container,
        percentage: steps ? findClosest(steps, percentage) : percentage,
        value,
        onKeyDown: onKeyDown(dispatch),
    }
}
