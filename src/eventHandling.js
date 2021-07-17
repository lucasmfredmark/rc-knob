const DIRECTIONS = {
    37: -1,
    38: 1,
    39: 1,
    40: -1,
}

export const onMouseMoveStart = dispatch => e => {
    e.preventDefault()
    e.stopPropagation()
    dispatch({ clientX: e.clientX, clientY: e.clientY, type: 'START' })
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

export const handleEventListener = ({ dispatch, isActive }) => () => {
    const onMove = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch({ clientX: e.clientX, clientY: e.clientY, type: 'MOVE' })
    }
    const onStop = () => dispatch({ type: 'STOP' })
    if (isActive) {
        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseup', onStop)
        return () => {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseup', onStop)
        }
    }
}
