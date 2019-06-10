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
useDeviceMotion();
useDeviceMotion({ updateInterval: 1000 });
useDeviceMotion({ initialData: { ... } });
```

With the `useDeviceMotion` hook we can create a simple component.

```jsx
function DeviceMotionSensor() {
    const data = useDeviceMotion({ updateInterval: 100 });

    return (
        <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
            <Text>DeviceMotion:</Text>
            <Text>{JSON.stringify(data, null, 2)}</Text>
        </View>
    );
}
```

## API

```ts
import { DeviceMotionMeasurement } from 'expo-sensors';

function useDeviceMotion(options?: DeviceMotionOptions): DeviceMotionMeasurement | undefined;

interface DeviceMotionOptions {
	/** The initial data to use before the first update. */
	initialData?: DeviceMotionMeasurement;
	/**
	 * The interval, in ms, to update the device motion data.
	 * Note, this is set globally through `DeviceMotion.setUpdateInterval`.
	 */
	updateInterval?: number;
}
```

<div align="center">
    <br />
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
    <br />
</div>
