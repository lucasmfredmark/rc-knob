
The display part of the knob is splitted into the `Pointer`, `Scale`, `Arc`,
`Value` and few others.

## `Pointer`

This component displays the location og the knob.

```js
import React from 'react';
import { Knob, Pointer } from '../lib/index';
import colors from './assets/colors.js';

<Knob
  size={100}
  angleOffset={220}
  angleRange={280}
  min={0}
  max={100}
  >
  <Pointer
    width={3}
    radius={40}
    type="circle"
    color={colors.primary}
    />
</Knob>;
```

## `Arc`

This component displays 2 angular zones.
The foreground one is from the `min` to the knob location.
The background one is from the knob location to `max`.

```js
import React from 'react';
import { Knob, Arc } from '../lib/index';
import colors from './assets/colors.js';

<Knob
  size={100}
  angleOffset={220}
  angleRange={280}
  min={0}
  max={100}
  >
  <Arc 
    arcWidth={5}
    color={colors.primary}
    background={colors.secondary}
    />
</Knob>;
```

## `Scale`

This component draw graduation.

```js
import React from 'react';
import { Knob, Scale } from '../lib/index';
import colors from './assets/colors.js';

<Knob
  size={200}
  angleOffset={220}
  angleRange={280}
  min={0}
  max={100}
  steps={10}
  >
  <Scale 
    tickWidth={3}
    tickHeight={5}
    radius={45}
    color={colors.secondary}
    activeColor={colors.primary}
    />
</Knob>;
```

## `Value`

This component draw the value of the knob.

```jsx
import React from 'react';
import { Knob, Value } from '../lib/index';


<Knob
  size={100}
  angleOffset={220}
  angleRange={280}
  min={0}
  max={100}
  >
  <Value
    marginBottom={10} 
    className="value"
    />
</Knob>;
```

```css
.value {
  font-family: 'Eczar', serif;
  fill: #fc5a96;
  font-size: 50px;
}
```


## `Label`

This component draw a label at a fixed location
using polar coordinates.

```jsx
import React from 'react';
import { Knob, Label } from '../lib/index';


<Knob
  size={100}
  angleOffset={220}
  angleRange={280}
  min={0}
  max={100}
  >
    <Label percentage={0.0}
      radius={40} label="0%"
      style={{fontSize: "50%"}} />
    <Label percentage={0.25}
      radius={40} label="25%"
      style={{fontSize: "50%"}} />
    <Label percentage={0.5}
      radius={40} label="50%"
      style={{fontSize: "50%"}} />
    <Label percentage={0.75}
      radius={40} label="75%"
      style={{fontSize: "50%"}} />
    <Label percentage={1.0}
      radius={40} label="100%"
      style={{fontSize: "50%"}} />
</Knob>;
```

## `Range`

This component draw a range between two values
using polar coordinates.

```jsx
import React from 'react';
import { Knob, Range } from '../lib/index';
import colors from './assets/colors.js';


<Knob
  size={100}
  angleOffset={220}
  angleRange={280}
  min={0}
  max={100}
  >
    <Range
      arcWidth={5}
      color={colors.primary}
      percentageFrom={0.0}
      percentageTo={0.1}
      />
    <Range
      arcWidth={5}
      color={colors.secondary}
      percentageFrom={0.1}
      percentageTo={0.9}
      />
    <Range
      arcWidth={5}
      color={colors.primary}
      percentageFrom={0.9}
      percentageTo={1.0}
      />
</Knob>;
```
