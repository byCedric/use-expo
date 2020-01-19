<div align="center">
    <h1>useBrightness</h1>
    <p>Change or track the screen brightness with <a href="https://docs.expo.io/versions/latest/sdk/brightness/"><code>Brightness</code></a></p>
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
    <pre>yarn add @use-expo/brightness expo-brightness</pre>
    <br />
</div>

## Usage

```jsx
// full hook
const [brightness, setBrightness, getBrightness] = useBrightness();

// other options
useBrightness({ get: false });
```


## Example

```jsx
import { useBrightness } from '@use-expo/brightness';
import { Slider, Text, View } from 'react-native';

function BrightnessExample() {
    const [brightness, setBrightness] = useBrightness();

    return (
        <View>
            <Text>Brightness:</Text>
            <Text>{percentage(brightness)}</Text>
            <Slider
                value={brightness}
                onValueChange={setBrightness}
                step={0.001}
                minimumValue={0.001}
                maximumValue={1}
            />
        </View>
    );
}

function percentage(level = 0) {
    return `${Math.floor(level * 1000) / 10}%`;
}
```


## API

```ts
function useBrightness(options?: Options): Result;

interface Options {
    /** If it should fetch the brightness when mounted, defaults to `true` */
    get?: boolean;
}

type Result = [
    /** The current brightness */
    number | undefined,
    /** Callback to change the brightness */
    (brightness: number) => Promise<void>,
    /** Callback to manually get the brightness */
    () => Promise<void>,
];
```

<div align="center">
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
</div>
