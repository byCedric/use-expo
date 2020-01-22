<div align="center">
    <h1>useBatteryLowPowerMode</h1>
    <p>Get or track the battery low power mode with <a href="https://docs.expo.io/versions/latest/sdk/battery/"><code>Battery</code></a></p>
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
    <pre>yarn add @use-expo/battery expo-battery</pre>
    <br />
</div>

## Usage

```jsx
// full hook
const [isLowPowerMode, getLowPowerMode] = useBatteryLowPowerMode();

// other options
useBatteryLowPowerMode({ get: false, listen: false });
```


## Example

```jsx
import { useBatteryLowPowerMode } from '@use-expo/battery';
import { Text, View } from 'react-native';

function BatteryLowPowerModeExample() {
    const [isLowPowerMode] = useBatteryLowPowerMode();

    return (
        <View>
            <Text>Battery low power mode:</Text>
            <Text>{isLowPowerMode ? 'enabled' : 'disabled'}</Text>
        </View>
    );
}
```


## API

```ts
function useBatteryLowPowerMode(options?: Options): Result;

interface Options {
    /** If it should fetch the battery low power mode status when mounted, defaults to `true` */
    get?: boolean;
    /** If it should listen to any change in battery low power mode status, defaults to `true` */
    listen?: boolean;
}

type Result = [
    /** If low power mode is enabled */
    boolean | undefined,
    /** Callback to manually check if low power mode is enabled */
    () => Promise<void>,
];
```

<div align="center">
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
</div>
