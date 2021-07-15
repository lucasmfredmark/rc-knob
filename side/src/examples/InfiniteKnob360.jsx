import React from 'react';
import { Knob, Value, Pointer, Scale, Range } from '../lib';
import PropTypes from 'prop-types';

const Origin = {
  up: 0,
  right: -90,
  down: 180,
  left: 90
}

export default function InfiniteKnob360({
  size,
  value,
  target=null,
  min,
  max,
  disabled = false,
  readOnly = false,
  origin = "up",
  onChange = () => { },
}) {
  const [editedValue, setEditedValue] = React.useState(null)

  function onKnobEnd(e) {
    setEditedValue(null)
  }

  function onKnobInteractiveChange(angle) {
    setEditedValue(angle)
  }

  const tickSize = 8;
  const tickMargin = 5;
  const pointerMargin = 12;
  const outerTickRadius = size * 0.5;
  const outerKnobRadius = outerTickRadius - tickMargin - tickSize;
  const pointerSize = 4;
  const pointerPosRadius = outerKnobRadius - pointerMargin - pointerSize / 2;
  const delta = Origin[origin];
  const editable = !disabled && !readOnly;

  const localTarget = (editedValue !== null) ? editedValue : target

  return (
    <Knob
      size={size}
      value={value}
      angleOffset={delta}
      angleRange={359.99}
      min={0}
      max={360}
      multiRotation={true}
      onChange={onChange}
      onInteractiveChange={onKnobInteractiveChange}
      onEnd={onKnobEnd}
      readOnly={!editable}
      tracking={false}
    >
      <circle
        r={outerKnobRadius}
        cx={size / 2}
        cy={size / 2}
        fill={editable ? '#fff' : '#e9ecef'}
        stroke={editable ? '#ced4da' : '#e9ecef'}
        strokeWidth={1}
      />
      <Scale
        steps={8}
        tickWidth={2}
        tickHeight={tickSize}
        radius={outerTickRadius}
        color="#888"
      />
      <Scale
        steps={32}
        tickWidth={1}
        tickHeight={tickSize / 2}
        radius={outerTickRadius}
        color="#888"
      />
      { localTarget !== null ? (<Range
        percentageFrom={value / 360}
        percentageTo={localTarget / 360}
        radius={pointerPosRadius+ pointerSize * 1.5}
        color="#ff9800"
        arcWidth={pointerSize}
      />) : ""}
      { localTarget !== null ? (<Pointer
        percentage={localTarget / 360}
        width={pointerSize}
        height={pointerSize}
        radius={pointerPosRadius}
        type="circle"
        color="#ff9800"
      />) : ""}
      <Pointer
        percentage={0}
        width={2.5}
        height={tickSize}
        radius={outerTickRadius-tickSize*1.5}
        type="circle"
        color="#000"
      />
      <Pointer
        percentage={value / 360}
        width={pointerSize}
        height={pointerSize}
        radius={pointerPosRadius}
        type="circle"
        color="#000"
      />
      <Value
        value={editedValue !== null ? editedValue : value}
        delta={delta}
        decimalPlace={1}
        marginBottom={size / 2}
        className="knob-text"
      />
    </Knob>
  )
}

InfiniteKnob360.propTypes = {
  size: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number,
  target: PropTypes.number,
  origin: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  onInteractiveChange: PropTypes.func,
}