Few properties can be used to reach and tune the knob with user interaction.

## Mouse callbacks

```js
import React from 'react';
import { Knob, Pointer } from '../lib/index';
import colors from './assets/colors.js';

<Knob
  value={0}
  size={100}
  angleOffset={220}
  angleRange={280}
  min={0}
  max={100}
  onChange={value => console.log(value)}
  onStart={e => console.log("Interaction started")}
  onEnd={e => console.log("Interaction ended")}
>
  <circle r="40" cx="50" cy="50" fill={colors.primary} />
  <Pointer width={3} height={30} radius={10} type="rect" color="#fff" />
</Knob>
```

## Disable user interaction

```js
import React from 'react';
import { Knob, Pointer } from '../lib/index';
import colors from './assets/colors.js';

<Knob
  value={0}
  size={100}
  angleOffset={220}
  angleRange={280}
  min={0}
  max={100}
  onChange={value => console.log(value)}
  onStart={e => console.log("Interaction started")}
  onEnd={e => console.log("Interaction ended")}
  readOnly
>
  <circle r="40" cx="50" cy="50" fill={colors.primary} />
  <Pointer width={3} height={30} radius={10} type="rect" color="#fff" />
</Knob>
```

## Disable mouse wheel

```js
import React from 'react';
import { Knob, Pointer } from '../lib/index';
import colors from './assets/colors.js';

<Knob
  value={0}
  size={100}
  angleOffset={220}
  angleRange={280}
  min={0}
  max={100}
  useMouseWheel={false}
>
  <circle r="40" cx="50" cy="50" fill={colors.primary} />
  <Pointer width={3} height={30} radius={10} type="rect" color="#fff" />
</Knob>
```

## Disable tracking

The mouse tracking during dragging can be disabled with `tracking=false`.
As result `onChange` is only called at the end of the interaction.
And this interaction can be cancelled with mouse right button.

`onInteractiveChange` can still be used to follow the interaction.

```js
import React from 'react';
import { Knob, Pointer } from '../lib/index';
import colors from './assets/colors.js';

<Knob
  value={0}
  size={100}
  angleOffset={220}
  angleRange={280}
  min={0}
  max={100}
  onChange={value => console.log(value)}
  onInteractiveChange={value => console.log("Interactive", value)}
  onStart={e => console.log("Interaction started")}
  onEnd={e => console.log("Interaction ended")}
  tracking={false}
>
  <circle r="40" cx="50" cy="50" fill={colors.primary} />
  <Pointer width={3} height={30} radius={10} type="rect" color="#fff" />
</Knob>
```

## Interaction hook

A hook is provided to change the interaction behaviour during a dragging
interaction.

The following example inhibite the center of the knob, snap 8 location over the
knob and provides free moving outside of the knob.

```js
import React from 'react';
import { Knob, Pointer } from '../lib/index';
import colors from './assets/colors.js';

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

<Knob
  value={0}
  size={100}
  angleOffset={220}
  angleRange={280}
  min={0}
  max={100}
  interactiveHook={interactiveHook}
>
  <circle r="40" cx="50" cy="50" fill={colors.primary} />
  <Pointer width={3} height={30} radius={10} type="rect" color="#fff" />
</Knob>
```
