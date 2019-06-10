<div align="center">
    <h1>
        <br />
        <code>useGyroscope</code>
        <br />
        <br />
    </h1>
    tracks changes in rotation with <a href="https://docs.expo.io/versions/latest/sdk/gyroscope/"><code>Gyroscope</code></a>
    <br />
</div>

## Examples

```jsx
useGyroscope();
useGyroscope({ updateInterval: 1000 });
useGyroscope({ initialData: { x: 1, y: 1, z: 1 } });
useGyroscope({ getAvailability: false });
```

With the `useGyroscope` hook we can simplify the [Gyroscope example for the Expo docs](https://docs.expo.io/versions/latest/sdk/gyroscope/#example-basic-subscription).

```jsx
function GyroscopeSensor() {
    const [data, isAvailable] = useGyroscope({ updateInterval: 100 });

    return (
        <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
            <Text>Gyroscope:</Text>
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

function useGyroscope(options?: GyroscopeOptions): [
    ThreeAxisMeasurement | undefined,
    boolean | undefined,
];

interface GyroscopeOptions {
	/** The initial data to use before the first update. */
    initialData?: ThreeAxisMeasurement;
    /** If it should check the availability of the sensor, defaults to `true`. */
	getAvailability?: boolean;
	/**
	 * The interval, in ms, to update the gyroscope data.
	 * Note, this is set globally through `Gyroscope.setUpdateInterval`.
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
