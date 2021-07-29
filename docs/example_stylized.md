### Arc & pointer & style

```js
import React from 'react';
import { Knob, Arc, Pointer } from '../lib/index';

<Knob 
  size={100}  
  angleOffset={220} 
  angleRange={280}
  min={0}
  max={100}
  className="styledKnob"
  onChange={value => console.log(value)}
>
  <Arc 
    arcWidth={1.5}
  />
  <circle r="40" cx="50" cy="50" />
  <Pointer 
    width={2}
    height={35}
    radius={10}
    type="rect"
    color="#fff"
  />
</Knob>;
```

```css
.styledKnob circle,
.styledKnob path {
    fill: #fc5a96;
    opacity: 0.4;
    transition: 
      opacity 100ms, 
      color 100ms 
      ease-in-out;
}

.styledKnob:hover circle,
.styledKnob:hover path,
.styledKnob:focus circle,
.styledKnob:focus path, {
    fill: #180094;
    opacity: 1;
    transition: 
      opacity 450ms, 
      color 450ms 
      ease-in-out;
}
```

### Scale & style

```js
import React from 'react';
import { Knob, Scale } from '../lib/index';

<Knob 
  size={100}  
  angleOffset={220} 
  angleRange={280}
  steps={40}
  min={0}
  max={40}
  onChange={value => console.log(value)}
>
  <Scale 
    tickWidth={2}
    tickHeight={2}
    radius={45}
    type="circle"
    activeClassName="activeScale"
    className="normalScale"
  />
</Knob>
```

```css
.activeScale {
    fill: #FC5A96;
    r: 2px;
    transition: 100ms ease-in-out;
}
.normalScale {
    fill: #180094;
    r: 1px;
    transition: 450ms ease-in-out;
}
```

### Scale & style

```js
import React from 'react';
import { Knob, Scale } from '../lib/index';

<Knob 
  size={100}  
  angleOffset={220} 
  angleRange={280}
  steps={20}
  min={0}
  max={20}
  className="withFilter"
  onChange={value => console.log(value)}
>
  <Scale
    tickWidth={5}
    tickHeight={15}
    radius={45}
    type="circle"
    activeClassName="activeScale"
    className="normalScale"
  />
  <filter id="filter">
    <feGaussianBlur
        in="SourceGraphic"
        stdDeviation="5"
        result="blur"
    />
    <feColorMatrix
        in="blur"
        mode="matrix"
        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -7"
        result="goo"
    />
    <feComposite
        in="SourceGraphic"
        in2="goo"
        operator="arithmetic"
        k1="0.1"
        k2="1"
        k3="0.9"
        k4="-0.4"
    />
  </filter>
</Knob>;
```

```css
.withFilter {
  filter: url('#filter');
}

.withFilter .activeScale {
  fill: #180094;
  r: 2px;
  transition: 100ms ease-in-out;
}
.withFilter .normalScale {
  fill: #fc5a96;
  r: 4px;
  transition: 450ms ease-in-out;
}
.withFilter .pointer {
  fill: rgba(255, 235, 59, 0.8);
  r: 8px;
  transition: 100ms ease-in-out;
}
```
