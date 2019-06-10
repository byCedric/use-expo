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
usePedometer({ initialData: { steps: 5 } });
```

With the `usePedometer` hook we can create a component based on the [Pedometer example for the Expo docs](https://docs.expo.io/versions/latest/sdk/pedometer/#usage).

```jsx
function PedometerSensor() {
    const data = usePedometer();

    return (
        <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
            <Text>Pedometer:</Text>
            <Text>{data.steps} steps</Text>
        </View>
    );
}
```

## API

```ts
function usePedometer(options?: PedometerOptions): PedometerMeasurement | undefined;

interface PedometerMeasurement {
	/** The amount of steps made */
	steps: number;
}

interface PedometerOptions {
	/** The initial data to use before the first update. */
	initialData?: PedometerMeasurement;
}
```

<div align="center">
    <br />
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
    <br />
</div>
