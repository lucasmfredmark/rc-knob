import React from 'react'
import { Example } from '../Example'
import colors from '../colors'
import { Knob, Arc, Pointer } from "../lib";


const example = `
<Knob 
  size={100}
  angleOffset={-220}
  angleRange={-280}
  min={0}
  max={100}
  onChange={value => console.log(value)}
>
  <Arc
    arcWidth={5}
    color="${colors.primary}"
  />
  <Pointer
    width={5}
    height={40}
    radius={10}
    type="rect"
    color="${colors.primary}"
  />
</Knob>
`

export default () => (
    <Example
        title="Anticlockwise"
        example={example}>
        <Knob
          size={100}
          angleOffset={-220}
          angleRange={-280}
          min={0}
          max={100}
          onChange={value => console.log(value)}
        >
          <Arc
            arcWidth={5}
            color={colors.primary}
          />
          <Pointer
            width={5}
            height={40}
            radius={10}
            type="rect"
            color={colors.primary}
          />
        </Knob>
    </Example>
)
