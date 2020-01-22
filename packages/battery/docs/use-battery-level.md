<div align="center">
    <h1>useBatteryLevel</h1>
    <p>Get or track the battery level or percentage remaining with <a href="https://docs.expo.io/versions/latest/sdk/battery/"><code>Battery</code></a></p>
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
const [batteryLevel, getBatteryLevel] = useBatteryLevel();

// other options
useBatteryLevel({ get: false, listen: false });
```


## Example

```jsx
import { useBatteryLevel } from '@use-expo/battery';
import { Text, View } from 'react-native';

function BatteryLevelExample() {
    const [level] = useBatteryLevel();

    return (
        <View>
            <Text>Battery level:</Text>
            <Text>{percentage(level)}</Text>
        </View>
    );
}

function percentage(level = 0) {
    return `${Math.floor(level * 1000) / 10}%`;
}
```


## API

```ts
function useBatteryLevel(options?: Options): Result;

interface Options {
    /** If it should fetch the battery level when mounted, defaults to `true` */
    get?: boolean;
    /** If it should listen to any change in battery level, defaults to `true` */
    listen?: boolean;
}

type Result = [
    /** The current battery level */
    number | undefined,
    /** Callback to fetch the battery level */
    () => Promise<void>,
];
```

<div align="center">
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
</div>
