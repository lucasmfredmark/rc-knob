import React from "react";
import Example from "../Example";
import { Knob, Pointer } from "../lib";

const example = `
<Knob
  size={100}
  angleOffset={220}
  angleRange={280}
  min={0}
  max={100}
  useMouseWheel={false}
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

export default () => (
  <Example
    title="No wheel events"
    example={example}
    widget={
      <Knob
        value={0}
        size={100}
        angleOffset={220}
        angleRange={280}
        min={0}
        max={100}
        useMouseWheel={false}
      >
        <circle r="40" cx="50" cy="50" fill="#fc5a96" />
        <Pointer width={3} height={30} radius={10} type="rect" color="#fff" />
      </Knob>
    }
  />
);
