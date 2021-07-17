const DIRECTIONS = {
    37: -1,
    38: 1,
    39: 1,
    40: -1,
}

export const onKeyDown = dispatch => e => {
    const direction = DIRECTIONS[e.keyCode]
    if (!direction) {
        return
    } else {
        e.preventDefault()
        dispatch({
            type: 'STEPS',
            direction,
        })
    }
}

export const onScroll = dispatch => e => {
    const direction =
        e.deltaX < 0 || e.deltaY > 0 ? 1 : e.deltaX > 0 || e.deltaY < 0 ? -1 : 0

    e.preventDefault()
    dispatch({
        type: 'STEPS',
        direction,
    })
}


export const handleEventListener = ({ container, dispatch, useMouseWheel }) => () => {
    const div = container.current
    const events = Object()
    const onStart = e => {
        e.preventDefault()
        e.stopPropagation()
        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseup', onStop)
        events.capturedWindow = true
        dispatch({ clientX: e.clientX, clientY: e.clientY, type: 'START' })
    }
    const clearCapture = () => {
        if (events.capturedWindow) {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseup', onStop)
            events.capturedWindow = false
        }
    }
    const onMove = e => {
        e.preventDefault()
        e.stopPropagation()
        dispatch({ clientX: e.clientX, clientY: e.clientY, type: 'MOVE' })
    }
    const onStop = () => {
        clearCapture()
        dispatch({ type: 'STOP' })
    }
    const onWheel = useMouseWheel ? onScroll(dispatch) : null

    div.addEventListener("mousedown", onStart)
    if (onWheel) {
        div.addEventListener("wheel", onWheel)
    }

    return () => {
        clearCapture()
        div.removeEventListener("mousedown", onStart)
        if (onWheel) {
            div.removeEventListener("wheel", onWheel)
        }
    }
}
