<div align="center">
    <h1>
        <br />
        <code>useBatteryState</code>
        <br />
        <br />
    </h1>
    get and/or listen to the battery state with <a href="https://docs.expo.io/versions/latest/sdk/battery/"><code>Battery</code></a>
    <br />
</div>

## Examples

```jsx
// full hook
const [batteryState, getBatteryState] = useBatteryState();

// other options
useBatteryState({ get: false, listen: false });
```

With the `useBatteryState` hook we can create a simple example.

```jsx
const states = {
    [BatteryState.UNKNOWN]: 'unkown',
    [BatteryState.UNPLUGGED]: 'unplugged',
    [BatteryState.CHARGING]: 'charging',
    [BatteryState.FULL]: 'full',
}

function BatteryStateExample() {
    const [batteryState] = useBatteryState();

    return (
        <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
            <Text>Battery state:</Text>
            <Text>{states[batteryState] || ''}</Text>
        </View>
    );
}
```

## API

```ts
import { BatteryState } from 'expo-battery';

function useBatteryState(options?: BatteryStateOptions): [
    BatteryState | undefined,
    () => Promise<void>,
];

interface BatteryStateOptions {
    /** If it should fetch the battery state when mounted, defaults to `true` */
    get?: boolean;
    /** If it should listen to any change in battery state, defaults to `true` */
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
