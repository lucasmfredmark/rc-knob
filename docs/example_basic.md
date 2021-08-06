### Arc & pointer

```js
import React from 'react';
import { Knob, Arc, Pointer } from '../lib/index';
import colors from './assets/colors.js';

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
  />
  <Pointer 
    width={5}
    height={40}
    radius={10}
    type="rect"
    color={colors.primary}
  />
</Knob>;
```

### Arc & pointer & value

```js
import React from 'react';
import { Knob, Arc, Pointer, Value } from '../lib/index';
import colors from './assets/colors.js';

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
    width={5}
    radius={40}
    type="circle"
    color={colors.secondary}
  />
  <Value 
    marginBottom={40} 
    className="value2" 
  />
</Knob>;
```

```css
.value2 {
  font-family: 'Work Sans', sans-serif;
  fill: #fc5a96;
  font-size: 30px;
}
```

### Arc & pointer

```js
import React from 'react';
import { Knob, Scale, Pointer } from '../lib/index';
import colors from './assets/colors.js';

<Knob 
  size={100}  
  angleOffset={220} 
  angleRange={280}
  steps={10}
  snap={true}
  min={0}
  max={100}
  onChange={value => console.log(value)}
>
  <Scale 
    tickWidth={2} 
    tickHeight={2} 
    radius={45} 
  />
  <circle
    r="35"
    cx="50"
    cy="50"
    fill={colors.primary}
  />
  <Pointer 
    width={2} 
    height={35} 
    radius={10}
    type="rect"
    color={colors.primary}
  />
</Knob>;
```

### Scale & pointer

```js
import React from 'react';
import { Knob, Scale, Pointer } from '../lib/index';
import colors from './assets/colors.js';

<Knob 
  size={100}  
  angleOffset={220} 
  angleRange={280}
  steps={10}
  snap={true}
  min={0}
  max={100}
  onChange={value => console.log(value)}
>
  <Scale
    steps={10}
    tickWidth={1}
    tickHeight={5}
    radius={45}
    color={colors.primary}
  />
  <Scale 
    tickWidth={1}
    tickHeight={2}
    radius={45} 
    color={colors.primary}
  />
  <Pointer
    width={1}
    height={5}
    radius={40}
    type="rect"
    color={colors.secondary}
  />
</Knob>;
```

### Range and needle

```jsx
import React from 'react';
import { Knob, Range, Pointer, Scale } from '../lib/index';


<Knob
  size={100}
  angleOffset={220}
  angleRange={280}
  min={0}
  max={100}
  value={10}
  >
    <Range
      arcWidth={20}
      color="#e44b02"
      percentageFrom={0.0}
      percentageTo={0.5}
      />
    <Range
      arcWidth={20}
      color="#ffc90e"
      percentageFrom={0.5}
      percentageTo={0.75}
      />
    <Range
      arcWidth={20}
      color="#6caa03"
      percentageFrom={0.75}
      percentageTo={1.0}
      />
    <Scale
      steps={20}
      tickWidth={1}
      tickHeight={5}
      radius={49}
      color="#303030"
      />
    <circle
      r="3.5"
      cx="50"
      cy="50"
      fill="black"
      />
    <Pointer
      width={5}
      height={45}
      radius={2}
      type="triangle"
      color="black"
    />
</Knob>;
```

### Value and triangle

```jsx
import React from 'react';
import { Knob, Range, Pointer, Scale, Value } from '../lib/index';


<Knob
  size={100}
  angleOffset={220}
  angleRange={280}
  min={0}
  max={100}
  value={10}
  >
    <Range
      arcWidth={20}
      color="#65bbf2"
      percentageFrom={-0.04}
      percentageTo={1.04}
      />
    <Pointer
      width={25}
      height={-20}
      radius={55}
      type="triangle"
      color="white"
    />
    <Scale
      steps={20}
      tickWidth={1}
      tickHeight={5}
      radius={49}
      color="#303030"
      />
    <Value
      marginBottom={40}
      className="value3"
      />
</Knob>;
```
