<div align="center">
    <h1>
        <br />
        <code>usePedometerHistory</code>
        <br />
        <br />
    </h1>
    get historical step count with <a href="https://docs.expo.io/versions/latest/sdk/pedometer/"><code>Pedometer</code></a>
    <br />
</div>

## Examples

```jsx
// full hook
const [data, isAvailable] = usePedometerHistory(start, end);

// other options
usePedometerHistory(start, end, { initial: { steps: 5 } });
usePedometerHistory(start, end, { availability: false });
```

With the `usePedometerHistory` hook we can create a component based on the [Pedometer example for the Expo docs](https://docs.expo.io/versions/latest/sdk/pedometer/#usage).

```jsx
function PedometerHistorySensor() {
    const [data, isAvailable] = usePedometerHistory(
        new Date('2019-07-03T12:00:00+02:00'),
        new Date('2019-07-03T16:00:00+02:00'),
    );

    return (
        <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
            <Text>Pedometer:</Text>
            {(isAvailable && data)
                ? <Text>{data.steps} steps done in 4 hours</Text>
                : <Text>unavailable</Text>
            }
        </View>
    );
}
```

## API

```ts
function usePedometerHistory(options?: PedometerOptions): [
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
