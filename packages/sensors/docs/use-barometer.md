<div align="center">
    <h1>
        <br />
        <code>useBarometer</code>
        <br />
        <br />
    </h1>
    tracks changes in air pressure with <a href="https://docs.expo.io/versions/latest/sdk/barometer/"><code>Barometer</code></a>
    <br />
</div>

## Examples

```jsx
useBarometer();
useBarometer({ updateInterval: 1000 });
useBarometer({ initialData: { pressure: 0 } });
useBarometer({ getAvailability: false });
```

With the `useBarometer` hook we can simplify the [Barometer example for the Expo docs](https://docs.expo.io/versions/latest/sdk/barometer/#example-basic-subscription).

```jsx
function BarometerSensor() {
    const [data, isAvailable] = useBarometer({ initialData: { pressure: 0 } });

    return (
        <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
            <Text>Barometer:</Text>
            {(isAvailable && data)
                ? <Text>{data.pressure * 100} Pa</Text>
                : <Text>unavailable</Text>
            }
        </View>
    );
}
```

## API

```ts
import { BarometerMeasurement } from 'expo-sensors';

function useBarometer(options?: BarometerOptions): [
    BarometerMeasurement | undefined,
    boolean | undefined,
];

interface BarometerOptions {
	/** The initial data to use before the first update. */
    initialData?: BarometerMeasurement;
    /** If it should check the availability of the sensor, defaults to `true`. */
	getAvailability?: boolean;
	/**
	 * The interval, in ms, to update the barometer data.
	 * Note, this is set globally through `Barometer.setUpdateInterval`.
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
