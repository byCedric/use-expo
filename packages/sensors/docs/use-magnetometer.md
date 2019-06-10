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
useMagnetometer({ getAvailability: false });

// or use the raw data with:
useMagnetometerUncalibrated();
useMagnetometerUncalibrated({ updateInterval: 1000 });
useMagnetometerUncalibrated({ initialData: { x: 1, y: 1, z: 1 } });
useMagnetometerUncalibrated({ getAvailability: false });
```

With the `useMagnetometer` hook we can simplify the [Magnetometer example for the Expo docs](https://docs.expo.io/versions/latest/sdk/magnetometer/#example-basic-subscription).

```jsx
function MagnetometerSensor() {
    const [data, isAvailable] = useMagnetometer({ updateInterval: 100 });

    return (
        <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
            <Text>Magnetometer:</Text>
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

function useMagnetometer(options?: MagnetometerOptions): [
    ThreeAxisMeasurement | undefined,
    boolean | undefined,
];

interface MagnetometerOptions {
	/** The initial data to use before the first update. */
    initialData?: ThreeAxisMeasurement;
    /** If it should check the availability of the sensor, defaults to `true`. */
	getAvailability?: boolean;
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
