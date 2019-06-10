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
useAccelerometer();
useAccelerometer({ updateInterval: 1000 });
useAccelerometer({ initialData: { x: 1, y: 1, z: 1 } });
useAccelerometer({ getAvailability: false });
```

With the `useAccelerometer` hook we can simplify the [Accelerometer example for the Expo docs](https://docs.expo.io/versions/latest/sdk/accelerometer/#example-basic-subscription).

```jsx
function AccelerometerSensor() {
    const [data, isAvailable] = useAccelerometer({ updateInterval: 100 });

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
	initialData?: ThreeAxisMeasurement;
	/** If it should check the availability of the sensor, defaults to `true`. */
	getAvailability?: boolean;
	/**
	 * The interval, in ms, to update the accelerometer data.
	 * Note, this is set globally through `Accelerometer.setUpdateInterval`.
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
