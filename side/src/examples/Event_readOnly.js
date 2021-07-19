import React from "react";
import Example from "../Example";
import { Knob, Pointer } from "../lib";

const example = `
<Knob
  value={20}
  size={100}
  angleOffset={220}
  angleRange={280}
  min={0}
  max={100}
  onChange={value => console.log(value)}
  onStart={e => console.log("mouse down")}
  onEnd={e => console.log("mouse up")}
  readOnly
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
    title="Read only mode"
    example={example}
    widget={
      <Knob
        value={20}
        size={100}
        angleOffset={220}
        angleRange={280}
        min={0}
        max={100}
        onChange={value => console.log(value)}
        onStart={e => console.log("mouse down")}
        onEnd={e => console.log("mouse up")}
        readOnly
      >
        <circle r="40" cx="50" cy="50" fill="#fc5a96" />
        <Pointer width={3} height={30} radius={10} type="rect" color="#fff" />
      </Knob>
    }
  />
);
