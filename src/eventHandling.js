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
        if (e.pointerType == "mouse" && e.button != 0) {
            return
        }
        e.preventDefault()
        e.stopPropagation()
        if (window.PointerEvent) {
            events.capturedPointerId = e.pointerId
            div.setPointerCapture(events.capturedPointerId)
            div.addEventListener('pointermove', onMove)
            div.addEventListener('pointerup', onStop)
            div.addEventListener('pointercancel', onStop)
        } else {
            // fallback with mouse event
            window.addEventListener('mousemove', onMove)
            window.addEventListener('mouseup', onStop)
            events.capturedWindow = true
        }
        div.addEventListener('contextmenu', onContextMenu)
        events.capturedContextMenu = true
        dispatch({ clientX: e.clientX, clientY: e.clientY, type: 'START' })
    }
    const clearCapture = () => {
        if (events.capturedPointerId !== undefined) {
            div.releasePointerCapture(events.capturedPointerId)
            div.removeEventListener('pointermove', onMove)
            div.removeEventListener('pointerup', onStop)
            div.removeEventListener('pointercancel', onStop)
            events.capturedPointerId = undefined
        }
        if (events.capturedWindow) {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseup', onStop)
            events.capturedWindow = false
        }
        if (events.capturedContextMenu) {
            div.removeEventListener('contextmenu', onContextMenu)
            events.capturedContextMenu = false
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
    const onContextMenu = e => {
        e.preventDefault()
        e.stopPropagation()
        clearCapture()
        dispatch({ type: 'CANCEL' })
        return false
    }
    const onWheel = useMouseWheel ? onScroll(dispatch) : null

    const eventdown = window.PointerEvent ? "pointerdown" : "mousedown"
    div.addEventListener(eventdown, onStart)
    if (onWheel) {
        div.addEventListener("wheel", onWheel)
    }

    return () => {
        clearCapture()
        div.removeEventListener(eventdown, onStart)
        if (onWheel) {
            div.removeEventListener("wheel", onWheel)
        }
    }
}
