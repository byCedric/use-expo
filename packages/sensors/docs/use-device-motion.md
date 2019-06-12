<div align="center">
    <h1>
        <br />
        <code>useDeviceMotion</code>
        <br />
        <br />
    </h1>
    tracks device motion and orientation with <a href="https://docs.expo.io/versions/latest/sdk/devicemotion/"><code>DeviceMotion</code></a>
    <br />
</div>

## Examples

```jsx
// full hook
const [data, isAvailable] = useDeviceMotion();

// other options
useDeviceMotion({ interval: 1000 });
useDeviceMotion({ initial: { ... } });
useDeviceMotion({ availability: false });
```

With the `useDeviceMotion` hook we can create a simple component.

```jsx
function DeviceMotionSensor() {
    const [data, isAvailable] = useDeviceMotion({ interval: 100 });

    return (
        <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
            <Text>DeviceMotion:</Text>
            {(isAvailable && data)
                ? <Text>{JSON.stringify(data, null, 2)}</Text>
                : <Text>unavailable</Text>
            }
        </View>
    );
}
```

## API

```ts
import { DeviceMotionMeasurement } from 'expo-sensors';

function useDeviceMotion(options?: DeviceMotionOptions): [
    DeviceMotionMeasurement | undefined,
    boolean | undefined,
];

interface DeviceMotionOptions {
    /** The initial data to use before the first update. */
    initial?: DeviceMotionMeasurement;
    /** If it should check the availability of the sensor, defaults to `true`. */
    availability?: boolean;
    /**
     * The interval, in ms, to update the device motion data.
     * Note, this is set globally through `DeviceMotion.setUpdateInterval`.
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
