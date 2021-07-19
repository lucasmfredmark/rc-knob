import React from 'react'
import { H1, Grid, Description } from './styled'
import InfiniteExample from "./examples/InfiniteExample";


export default () => {
    return (
        <div>
            <H1>React Knob</H1>
            <Description>
                Few test example
            </Description>
            <Grid>
                <InfiniteExample
                    title="Normal"
                    />
                <InfiniteExample
                    title="Disabled"
                    disabled={true}
                    />
                <InfiniteExample
                    title="Anti clockwise"
                    direction="anticlockwise"
                    />
            </Grid>
        </div>
    )
}
