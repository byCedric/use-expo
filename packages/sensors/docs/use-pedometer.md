<div align="center">
    <h1>
        <br />
        <code>usePedometer</code>
        <br />
        <br />
    </h1>
    tracks user step count with <a href="https://docs.expo.io/versions/latest/sdk/pedometer/"><code>Pedometer</code></a>
    <br />
</div>

## Examples

```jsx
usePedometer();
usePedometer({ initial: { steps: 5 } });
usePedometer({ availability: false });
```

With the `usePedometer` hook we can create a component based on the [Pedometer example for the Expo docs](https://docs.expo.io/versions/latest/sdk/pedometer/#usage).

```jsx
function PedometerSensor() {
    const [data, isAvailable] = usePedometer();

    return (
        <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
            <Text>Pedometer:</Text>
            {(isAvailable && data)
                ? <Text>{data.steps} steps</Text>
                : <Text>unavailable</Text>
            }
        </View>
    );
}
```

## API

```ts
function usePedometer(options?: PedometerOptions): [
    PedometerMeasurement | undefined,
    boolean | undefined,
];

interface PedometerMeasurement {
	/** The amount of steps made */
	steps: number;
}

interface PedometerOptions {
	/** The initial data to use before the first update. */
	initial?: PedometerMeasurement;
	/** If it should check the availability of the sensor, defaults to `true`. */
	availability?: boolean;
}
```

<div align="center">
    <br />
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
    <br />
</div>
