<div align="center">
    <h1>useBatteryLevel</h1>
    <p>Get or listen to the <a href="https://docs.expo.io/versions/latest/sdk/battery/#batterygetbatterylevelasync">battery level</a></p>
    <sup>
        <a href="https://github.com/bycedric/use-expo/releases">
            <img src="https://img.shields.io/github/release/byCedric/use-expo/all.svg?style=flat-square" alt="releases" />
        </a>
        <a href="https://github.com/bycedric/use-expo/actions?query=workflow%3APackages">
            <img src="https://img.shields.io/github/workflow/status/byCedric/use-expo/Packages.svg?style=flat-square" alt="builds" />
        </a>
        <a href="#">
            <img src="https://img.shields.io/badge/example-snack-lightgrey.svg?style=flat-square" alt="demo" />
        </a>
    </sup>
    <br />
	<br />
    <br />
    <pre>npm i -S @use-expo/battery expo-battery</pre>
</div>

## Hook

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
function useBatteryLevel(options?: Options): Hook;

interface Options {
    /** If it should fetch the battery level when mounted, defaults to `true` */
    get?: boolean;
    /** If it should listen to any change in battery level, defaults to `true` */
    listen?: boolean;
}

type Hook = [
    number | undefined, // the battery level, when resolved ([0..1])
    () => Promise<void>, // callback to fetch the latest info
];
```

<div align="center">
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
</div>
