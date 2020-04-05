<div align="center">
    <h1>useSystemBrightness</h1>
    <p>Change or track the system screen brightness with <a href="https://docs.expo.io/versions/latest/sdk/brightness/"><code>Brightness</code></a></p>
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
    <pre>expo install @use-expo/brightness expo-brightness</pre>
    <br />
</div>

## Usage

```jsx
// full hook
const [brightness, setBrightness, getBrightness] = useSystemBrightness();

// other options
useSystemBrightness({ get: false });
```


## Example

```jsx
import { useSystemBrightness } from '@use-expo/brightness';
import { usePermissions } from '@use-expo/permissions';
import * as Permissions from 'expo-permissions';
import { Button, Linking, Slider, Text, View } from 'react-native';

function SystemBrightnessExample() {
    const [permission, askPermission] = usePermissions(Permissions.SYSTEM_BRIGHTNESS);
    const [brightness, setBrightness] = useSystemBrightness();

    if (permission?.status !== 'granted') {
        return (
            <View>
                <Text>We require permissions to set the system brightness</Text>
                {permission?.canAskAgain
                    ? <Button onPress={askPermission} title='Give permission' />
                    : <Button onPress={Linking.openSettings} title='Open app settings' />
                }
            </View>
        );
    }

    return (
        <View>
            <Text>System brightness:</Text>
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
function useSystemBrightness(options?: Options): Result;

interface Options {
    /** If it should fetch the brightness when mounted, defaults to `true` */
    get?: boolean;
}

type Result = [
    /** The current system brightness */
    number | undefined,
    /** Callback to change the system brightness */
    (brightness: number) => Promise<void>,
    /** Callback to manually get the system brightness */
    () => Promise<void>,
];
```

<div align="center">
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
</div>
