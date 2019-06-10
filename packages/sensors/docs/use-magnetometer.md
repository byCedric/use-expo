<div align="center">
    <h1>
        <br />
        <code>useMagnetometer</code>
        <br />
        <br />
    </h1>
    tracks changes in the magnetic field with <a href="https://docs.expo.io/versions/latest/sdk/magnetometer/"><code>Magnetometer</code></a>
    <br />
</div>

## Examples

```jsx
useMagnetometer();
useMagnetometer({ updateInterval: 1000 });
useMagnetometer({ initialData: { x: 1, y: 1, z: 1 } });

// or use the raw data with:
useMagnetometerUncalibrated();
useMagnetometerUncalibrated({ updateInterval: 1000 });
useMagnetometerUncalibrated({ initialData: { x: 1, y: 1, z: 1 } });
```

With the `useMagnetometer` hook we can simplify the [Magnetometer example for the Expo docs](https://docs.expo.io/versions/latest/sdk/magnetometer/#example-basic-subscription).

```jsx
function MagnetometerSensor() {
    const data = useMagnetometer({ updateInterval: 100 });

    return (
        <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
            <Text>Magnetometer:</Text>
            <Text>
                x: {round(data.x)} y: {round(data.y)} z: {round(data.z)}
            </Text>
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

function useMagnetometer(options?: MagnetometerOptions): ThreeAxisMeasurement | undefined;

interface MagnetometerOptions {
	/** The initial data to use before the first update. */
	initialData?: ThreeAxisMeasurement;
	/**
	 * The interval, in ms, to update the magnetometer data.
	 * Note, this is set globally through `Magnetometer.setUpdateInterval`.
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
