import React from 'react'
import { Example } from '../Example'
import { Knob, Label } from "../lib";


const example = `
<Knob 
  size={100}  
  angleOffset={220} 
  angleRange={280}
  min={0}
  max={100}
  onChange={value => console.log(value)}
>
<Label percentage={0.0} radius={40} label="0%"   style={{fontSize: "50%"}} />
<Label percentage={0.25} radius={40} label="25%"  style={{fontSize: "50%"}} />
<Label percentage={0.5} radius={40} label="50%"  style={{fontSize: "50%"}} />
<Label percentage={0.75} radius={40} label="75%"  style={{fontSize: "50%"}} />
<Label percentage={1.0} radius={40} label="100%" style={{fontSize: "50%"}} />
</Knob>
`

export default () => (
  <Example
    title="Label"
    example={example}>
    <Knob 
      size={100}  
      angleOffset={220} 
      angleRange={280}
      min={0}
      max={100}
      onChange={value => console.log(value)}
    >
    <Label percentage={0.0} radius={40} label="0%"   style={{fontSize: "50%"}} />
    <Label percentage={0.25} radius={40} label="25%"  style={{fontSize: "50%"}} />
    <Label percentage={0.5} radius={40} label="50%"  style={{fontSize: "50%"}} />
    <Label percentage={0.75} radius={40} label="75%"  style={{fontSize: "50%"}} />
    <Label percentage={1.0} radius={40} label="100%" style={{fontSize: "50%"}} />
    </Knob>
  </Example>
)
