<div align="center">
    <h1>
        <br />
        <code>useAccelerometer</code>
        <br />
        <br />
    </h1>
    tracks changes in acceleration with <a href="https://docs.expo.io/versions/latest/sdk/accelerometer/"><code>Accelerometer</code></a>
    <br />
</div>

## Examples

```jsx
// full hook
const [data, isAvailable] = useAccelerometer();

// other options
useAccelerometer({ interval: 1000 });
useAccelerometer({ initial: { x: 1, y: 1, z: 1 } });
useAccelerometer({ availability: false });
```

With the `useAccelerometer` hook we can simplify the [Accelerometer example for the Expo docs](https://docs.expo.io/versions/latest/sdk/accelerometer/#example-basic-subscription).

```jsx
function AccelerometerSensor() {
    const [data, isAvailable] = useAccelerometer({ interval: 100 });

    return (
        <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
            <Text>Accelerometer:</Text>
            {(isAvailable && data)
                ? <Text>x: {round(data.x)} y: {round(data.y)} z: {round(data.z)}</Text>
                : <Text>unavailable</Text>
            }
        </View>
    );
}

function round(n) {
    if (!n) {
        return 0;
    }

    return Math.floor(n * 100) / 100;
}
```

## API

```ts
import { ThreeAxisMeasurement } from 'expo-sensors';

function useAccelerometer(options?: AccelerometerOptions): [
    ThreeAxisMeasurement | undefined,
    boolean | undefined,
];

interface AccelerometerOptions {
    /** The initial data to use before the first update. */
    initial?: ThreeAxisMeasurement;
    /** If it should check the availability of the sensor, defaults to `true`. */
    availability?: boolean;
    /**
     * The interval, in ms, to update the accelerometer data.
     * Note, this is set globally through `Accelerometer.setUpdateInterval`.
     * When used in 2 or more components, only the last rendered component's interval will be used for all.
     */
    interval?: number;
}
```

<div align="center">
    <br />
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
    <br />
</div>
