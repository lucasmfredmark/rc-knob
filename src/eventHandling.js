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

const getClientCenter = (elem) => {
    const rect = elem.getBoundingClientRect()
    return {
        centerX: rect.x + elem.clientWidth / 2,
        centerY: rect.y + elem.clientHeight / 2,
    }
}

/**
 * Compute mouse position relative to the elem center
 * and a polar position with angle in degree and radius
 */
const getMousePosition = (elem, e) => {
    const {centerX, centerY} = getClientCenter(elem)

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    const degree = (Math.atan2(mouseY, mouseX) * 180) / Math.PI + 90
    const mouseAngle = degree < 0 ? degree + 360 : degree
    const mouseRadius = Math.sqrt(mouseX * mouseX + mouseY * mouseY)
    return {
        mouseX: mouseX,
        mouseY: mouseY,
        mouseRadius: mouseRadius,
        mouseAngle: mouseAngle,
    }
}

export const handleEventListener = ({ container, dispatch, useMouseWheel, interactiveHook }) => () => {
    const div = container.current
    const events = Object()

    const getInteractiveConfig = (mousePosition, e) => {
        let userConfig = {}
        if (interactiveHook) {
            const event = {
                ctrlKey: e.ctrlKey,
                altKey: e.altKey,
                metaKey: e.metaKey,
                shiftKey: e.shiftKey,
                ...mousePosition
            }
            userConfig = interactiveHook(event)
        }
        return userConfig
    }

    const onStart = e => {
        if (e.pointerType == "mouse" && e.button != 0) {
            return
        }
        const mousePosition = getMousePosition(div, e)
        const userConfig = getInteractiveConfig(mousePosition, e)
        if (userConfig.readOnly) {
            return
        }
        e.preventDefault()
        e.stopPropagation()
        if (window.PointerEvent) {
            events.capturedPointerId = e.pointerId
            div.setPointerCapture(events.capturedPointerId)
            div.addEventListener('pointermove', onMove)
            div.addEventListener('pointerup', onStop)
            div.addEventListener('pointercancel', onCancel)
        } else {
            // fallback with mouse event
            window.addEventListener('mousemove', onMove)
            window.addEventListener('mouseup', onStop)
            events.capturedWindow = true
        }
        div.addEventListener('contextmenu', onContextMenu)
        events.capturedContextMenu = true
        dispatch({ type: 'START', ...mousePosition, ...userConfig })
    }
    const clearCapture = () => {
        if (events.capturedPointerId !== undefined) {
            div.releasePointerCapture(events.capturedPointerId)
            div.removeEventListener('pointermove', onMove)
            div.removeEventListener('pointerup', onStop)
            div.removeEventListener('pointercancel', onCancel)
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
        const mousePosition = getMousePosition(div, e)
        const userConfig = getInteractiveConfig(mousePosition, e)
        if (userConfig.readOnly) {
            return
        }
        dispatch({ type: 'MOVE', ...mousePosition, ...userConfig })
    }
    const onStop = () => {
        clearCapture()
        dispatch({ type: 'STOP' })
    }
    const onCancel = () => {
        clearCapture()
        dispatch({ type: 'CANCEL' })
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
