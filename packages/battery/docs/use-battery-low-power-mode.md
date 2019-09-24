<div align="center">
    <h1>
        <br />
        <code>useBatteryLowPowerMode</code>
        <br />
        <br />
    </h1>
    get and/or listen to the battery low power mode with <a href="https://docs.expo.io/versions/latest/sdk/battery/"><code>Battery</code></a>
    <br />
</div>

## Examples

```jsx
// full hook
const [isLowPowerMode, getLowPowerMode] = useBatteryLowPowerMode();

// other options
useBatteryLowPowerMode({ get: false, listen: false });
```

With the `useBatteryLowPowerMode` hook we can create a simple example.

```jsx
function BatteryLowPowerModeExample() {
    const [isLowPowerMode] = useBatteryLowPowerMode();

    return (
        <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
            <Text>Battery low power mode:</Text>
            <Text>{isLowPowerMode ? 'enabled' : 'disabled'}</Text>
        </View>
    );
}
```

## API

```ts
function useBatteryLowPowerMode(options?: BatteryLowPowerModeOptions): [
    boolean | undefined,
    () => Promise<void>,
];

interface BatteryLowPowerModeOptions {
    /** If it should fetch the battery low power mode status when mounted, defaults to `true` */
    get?: boolean;
    /** If it should listen to any change in battery low power mode status, defaults to `true` */
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
