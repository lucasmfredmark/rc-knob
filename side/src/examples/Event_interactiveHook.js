import React from "react";
import Example from "../Example";
import { Knob, Pointer } from "../lib";

const example = `

function interactiveHook(e) {
  if (e.mouseRadius < 50) {
    // inhibite the center of the knob
    return {readOnly: true}
  }
  if (e.mouseRadius < 100) {
    // snap on steps over the knob
    return {steps: 8}
  }
  if (e.ctrlKey) {
    // always snap when ctrl button is pressed
    return {steps: 8}
  }
  // use the default configuration
  return {}
}

<Knob
  value={20}
  size={100}
  angleOffset={220}
  angleRange={280}
  min={0}
  max={100}
  interactiveHook={interactiveHook}
>
<circle r="40" cx="50" cy="50" fill="#FC5A96" />
<Pointer
    width={5}
    height={30}
    radius={10}
    type="rect"
    color="#fff"
  />
</Knob>
`;

export default () => {
  function interactiveHook(e) {
    if (e.mouseRadius < 20) {
      // inhibite the center of the knob
      return {readOnly: true}
    }
    if (e.mouseRadius < 50) {
      // snap on steps over the knob
      return {steps: 8}
    }
    if (e.ctrlKey) {
      // always snap when ctrl button is pressed
      return {steps: 8}
    }
    // use the default configuration
    return {}
  }
  return (
    <Example
      title="Hook to tune the interaction"
      example={example}
      widget={
        <Knob
          value={20}
          size={100}
          angleOffset={220}
          angleRange={280}
          min={0}
          max={100}
          interactiveHook={interactiveHook}
        >
          <circle r="40" cx="50" cy="50" fill="#fc5a96" />
          <Pointer width={3} height={30} radius={10} type="rect" color="#fff" />
        </Knob>
      }
    />
  )
}
