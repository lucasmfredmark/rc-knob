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
