import { useReducer, useEffect, useRef } from 'react'
import {
    calculatePositionFromMouseAngle,
    getValueFromPercentage,
    clamp,
    getPercentageFromValue,
    snapPosition,
} from './utils'
import {
    onKeyDown,
    handleEventListener,
} from './eventHandling'

const reduceOnStart = (state, action, callbacks) => {
    const position = calculatePositionFromMouseAngle({
        previousMouseAngle: null,
        previousPercentage: null,
        ...state,
        ...action,
    })
    const steps = action.steps || state.steps
    const position2 = snapPosition(position, state, steps)
    const value = getValueFromPercentage({ ...state, ...position2 })
    callbacks.onStart()
    callbacks.onInteractiveChange(value)
    if (state.tracking) {
        callbacks.onChange(value)
    }
    return {
        ...state,
        isActive: true,
        ...position2,
        startPercentage: state.percentage,
        startValue: state.value,
        value
    }
}


const reduceOnMove = (state, action, callbacks) => {
    const position = calculatePositionFromMouseAngle({
        previousMouseAngle: state.mouseAngle,
        previousPercentage: state.percentage,
        ...state,
        ...action,
    })
    const steps = action.steps || state.steps
    const position2 = snapPosition(position, state, steps)
    const value = getValueFromPercentage({ ...state, ...position2 })
    callbacks.onInteractiveChange(value)
    if (state.tracking) {
        callbacks.onChange(value)
    }
    return {
        ...state,
        ...position2,
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
    interactiveHook,
    onStart,
    onEnd,
    readOnly,
    tracking,
    useMouseWheel,
}) => {
    const svg = useRef()
    const container = useRef()
    const callbacks = {
	    onChange,
        onInteractiveChange,
        onStart,
        onEnd,
    }
    const [{ percentage, value }, dispatch] = useReducer(
        reducer(callbacks),
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
            steps,
        }
    )

    if (!readOnly) {
        useEffect(handleEventListener(
            { container, dispatch, useMouseWheel, interactiveHook }),
            [useMouseWheel]
        )
    }

    return {
        svg,
        container,
        percentage: percentage,
        value: value,
        onKeyDown: onKeyDown(dispatch),
    }
}
