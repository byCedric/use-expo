<div align="center">
    <h1>
        <br />
        <code>useBatteryLevel</code>
        <br />
        <br />
    </h1>
    get and/or listen to the battery level with <a href="https://docs.expo.io/versions/latest/sdk/battery/"><code>Battery</code></a>
    <br />
</div>

## Examples

```jsx
// full hook
const [batteryLevel, getBatteryLevel] = useBatteryLevel();

// other options
useBatteryLevel({ get: false, listen: false });
```

With the `useBatteryLevel` hook we can create a simple example.

```jsx
function BatteryLevelExample() {
    const [batteryLevel] = useBatteryLevel();

    return (
        <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
            <Text>Battery level:</Text>
            <Text>{percentage(batteryLevel)}</Text>
        </View>
    );
}

function percentage(n) {
    if (!n) {
        return '0%';
    }

    return `${Math.floor(n * 1000) / 10}%`;
}
```

## API

```ts
function useBatteryLevel(options?: BatteryLevelOptions): [
    number | undefined,
    () => Promise<void>,
];

interface BatteryLevelOptions {
    /** If it should fetch the battery level when mounted, defaults to `true` */
    get?: boolean;
    /** If it should listen to any change in battery level, defaults to `true` */
    listen?: boolean;
}
```

<div align="center">
    <br />
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
    <br />
</div>
