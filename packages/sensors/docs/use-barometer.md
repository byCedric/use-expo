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
```

With the `useBarometer` hook we can simplify the [Barometer example for the Expo docs](https://docs.expo.io/versions/latest/sdk/barometer/#example-basic-subscription).

```jsx
function BarometerSensor() {
    const data = useBarometer({ initialData: { pressure: 0 } });

    return (
        <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
            <Text>Barometer:</Text>
            <Text>{data.pressure * 100} Pa</Text>
        </View>
    );
}
```

## API

```ts
import { BarometerMeasurement } from 'expo-sensors';

function useBarometer(options?: BarometerOptions): BarometerMeasurement | undefined;

interface BarometerOptions {
	/** The initial data to use before the first update. */
	initialData?: BarometerMeasurement;
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
