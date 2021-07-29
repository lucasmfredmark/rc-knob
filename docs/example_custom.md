
### Custom pointer

```js
import React from 'react';
import { Knob, Arc, Pointer } from '../lib/index';
import colors from './assets/colors.js';

function CustomPointer({ width, height, percentage }) {
  return (
    <rect
      width={width}
      height={5 + height * percentage}
      fill={`hsl(${Math.round(360 * percentage)}, 50%, 50%)`}
    />
  )
}

<Knob
  size={100}
  angleOffset={220}
  angleRange={280}
  min={0}
  max={100}
  onChange={value => console.log(value)}
>
  <Arc
    arcWidth={5}
    color={colors.primary}
    radius={47.5}
    />
  <Pointer
    width={3}
    height={40}
    radius={0}
    color={colors.primary}>
    <CustomPointer />
  </Pointer>,
</Knob>;
```

### Custom scale

```js
import React from 'react';
import { Knob, Scale } from '../lib/index';
import colors from './assets/colors.js';

function customScaleTick({
    tickWidth,
    tickHeight,
    translateX,
    translateY,
    angleOffset,
    stepSize,
    center,
    active,
    i,
}) {
  return (
    <rect
      fill={`hsl(${(240 + (40 - i) * 4) % 360},100%, 60%)`}
      stroke="none"
      width={tickWidth}
      height={i === active ? 9 : tickHeight}
      key={i}
      transform={`
        rotate(${angleOffset + stepSize * i} ${center} ${center}) 
        translate( ${translateX} ${translateY})
      `}
    />
  )
}

<Knob
  size={100}
  angleOffset={220}
  angleRange={280}
  min={0}
  max={100}
  onChange={value => console.log(value)}
>
  <Scale
    steps={40}
    tickWidth={1}
    tickHeight={5}
    radius={45}
    fn={customScaleTick}
  />
</Knob>;
```
