<div align="center">
    <h1>useBattery</h1>
    <p>Get the battery level, state and power mode with <a href="https://docs.expo.io/versions/latest/sdk/battery/"><code>Battery</code></a></p>
    <sup>
        <a href="https://github.com/bycedric/use-expo/releases">
            <img src="https://img.shields.io/github/release/byCedric/use-expo/all.svg?style=flat-square" alt="releases" />
        </a>
        <a href="https://github.com/bycedric/use-expo/actions">
            <img src="https://img.shields.io/github/workflow/status/byCedric/use-expo/Packages/master.svg?style=flat-square" alt="builds" />
        </a>
        <a href="https://exp.host/@bycedric/use-expo">
            <img src="https://img.shields.io/badge/demo-expo.io-lightgrey.svg?style=flat-square" alt="demo" />
        </a>
    </sup>
    <br />
    <p align="center">
        <a href="https://github.com/byCedric/use-expo#readme"><b>Other hooks</b></a>
        &nbsp;&nbsp;&mdash;&nbsp;&nbsp;
        <a href="https://github.com/byCedric/use-expo#usage"><b>Usage</b></a>
        &nbsp;&nbsp;&mdash;&nbsp;&nbsp;
        <a href="https://github.com/byCedric/use-expo/blob/master/CHANGELOG.md"><b>Changelog</b></a>
    </p>
    <br />
    <pre>expo install @use-expo/battery expo-battery</pre>
    <br />
</div>

## Usage

```jsx
// full hook
const [battery, getBattery] = useBattery();

// other options
useBattery({ get: false });
```


## Example

```jsx
import { useBattery } from '@use-expo/battery';
import { Text, View } from 'react-native';

function BatteryExample() {
    const [battery] = useBattery();

    return (
        <View>
            <Text>Battery:</Text>
            {!!battery && (
                <View>
                    <Text>level: {percentage(battery.batteryLevel)}</Text>
                    <Text>state: {battery.batteryState}</Text>
                    <Text>low power: {battery.lowPowerMode ? 'enabled' : 'disabled'}</Text>
                </View>
            )}
        </View>
    );
}

function percentage(level = 0) {
    return `${Math.floor(level * 1000) / 10}%`;
}
```


## API

```ts
import { PowerState } from 'expo-battery';

function useBattery(options?: Options): Result;

interface Options {
    /** If it should fetch the battery power state when mounted, defaults to `true` */
    get?: boolean;
}

type Result = [
    /** The current power state */
    PowerState | undefined,
    /** Callback to manually get the power state data */
    () => Promise<void>,
];
```

<div align="center">
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
</div>
