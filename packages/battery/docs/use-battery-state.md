<div align="center">
    <h1>useBatteryState</h1>
    <p>Get or track the battery (charging) state <a href="https://docs.expo.io/versions/latest/sdk/battery/"><code>Battery</code></a></p>
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
const [batteryState, getBatteryState] = useBatteryState();

// other options
useBatteryState({ get: false, listen: false });
```


## Example

```jsx
import { useBatteryState } from '@use-expo/battery';
import { Text, View } from 'react-native';
import { BatteryState } from 'expo-battery';

function BatteryStateExample() {
    const [batteryState] = useBatteryState();

    return (
        <View>
            <Text>Battery (charging) state:</Text>
            <Text>{states[batteryState] || ''}</Text>
        </View>
    );
}

const states = {
    [BatteryState.UNKNOWN]: 'unkown',
    [BatteryState.UNPLUGGED]: 'unplugged',
    [BatteryState.CHARGING]: 'charging',
    [BatteryState.FULL]: 'full',
};
```


## API

```ts
import { BatteryState } from 'expo-battery';

function useBatteryState(options?: Options): Result;

interface Options {
    /** If it should fetch the battery state when mounted, defaults to `true` */
    get?: boolean;
    /** If it should listen to any change in battery state, defaults to `true` */
    listen?: boolean;
}

type Result = [
    /** The current battery (charging) state */
    BatteryState | undefined,
    /** Callback to manually get the battery state */
    () => Promise<void>,
];
```

<div align="center">
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
</div>
