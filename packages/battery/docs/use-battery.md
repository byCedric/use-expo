<div align="center">
    <h1>
        <br />
        <code>useBattery</code>
        <br />
        <br />
    </h1>
    get the battery level, state and power mode with <a href="https://docs.expo.io/versions/latest/sdk/battery/"><code>Battery</code></a>
    <br />
</div>

## Examples

```jsx
// full hook
const [battery, getBattery] = useBattery();

// other options
useBattery({ get: false });
```

With the `useBattery` hook we can create a simple example.

```jsx
function BatteryExample() {
    const [battery] = useBattery();

    return (
        <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
            <Text>Battery:</Text>
            {!!battery && (
                <View>
                    <Text>level: {percentage(battery.batteryLevel)}</Text>
                    <Text>state: {battery.batteryState}</Text>
                    <Text>low power: {battery.lowPowerMode ? 'true' : 'false'}</Text>
                </View>
            )}
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
import { PowerState } from 'expo-battery';

function useBattery(options?: BatteryOptions): [
    PowerState | undefined,
    () => Promise<void>,
];

interface BatteryOptions {
    /** If it should fetch the battery power state when mounted, defaults to `true` */
    get?: boolean;
}
```

<div align="center">
    <br />
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
    <br />
</div>
