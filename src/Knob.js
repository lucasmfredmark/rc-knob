import React from 'react'
import useUpdate from './useUpdate'
import { Arc } from './Arc'
import { Pointer } from './Pointer'
import { Scale } from './Scale'
import { Value } from './Value'
import { Range } from './Range'
import { Spiral } from './Spiral'

const isInternalComponent = ({ type }) =>
    type === Arc || type === Pointer || type === Scale || type === Value || type === Range || type === Spiral

export const Knob = ({
    min,
    max,
    value: initialValue,
    multiRotation = false,
    angleOffset = 0,
    angleRange = 360,
    size,
    onChange = () => {},
    onInteractiveChange = () => {},
    onStart = () => {},
    onEnd = () => {},
    children,
    steps,
    snap = false,
    tracking = true,
    readOnly = false,
    useMouseWheel = true,
    ariaValueText,
    ariaLabelledBy,
    className,
}) => {
    const {
        percentage,
        value,
        svg,
        container,
        onKeyDown,
    } = useUpdate({
        min,
        max,
        multiRotation,
        initialValue,
        angleOffset,
        angleRange,
        size,
        steps: snap ? steps : undefined,
        onChange,
        onInteractiveChange,
        useMouseWheel,
        readOnly,
        tracking,
        onStart,
        onEnd,
    })

    return (
        <div
            ref={container}
            tabIndex="0"
            style={{ outline: 'none', width: size, height: size }}
            aria-valuemax={max}
            aria-valuemin={min}
            aria-valuenow={value}
            aria-valuetext={ariaValueText}
            aria-labelledby={ariaLabelledBy}
            onKeyDown={readOnly ? null : onKeyDown}
            className={className}
        >
            <svg width={size} height={size} ref={svg}>
                {React.Children.map(children, child =>
                    isInternalComponent(child)
                        ? React.cloneElement(child, {
                              percentage,
                              size,
                              value,
                              angleOffset,
                              angleRange,
                              radius: size / 2,
                              center: size / 2,
                              steps,
                              ...child.props,
                          })
                        : child
                )}
            </svg>
        </div>
    )
}
