<div align="center">
    <h1>useSystemBrightnessMode</h1>
    <p>Change or track the system brightness mode with <a href="https://docs.expo.io/versions/latest/sdk/brightness/"><code>Brightness</code></a></p>
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
const [mode, setMode, getMode] = useSystemBrightnessMode();

// other options
useSystemBrightnessMode({ get: false });
```


## Example

```jsx
import { useSystemBrightnessMode } from '@use-expo/brightness';
import { usePermissions } from '@use-expo/permissions';
import * as Permissions from 'expo-permissions';
import { Button, Linking, Text, View } from 'react-native';

function SystemBrightnessMode() {
    const [permission, askPermission] = usePermissions(Permissions.SYSTEM_BRIGHTNESS);
    const [mode, setMode] = useSystemBrightnessMode();

    if (permission?.status !== 'granted') {
        return (
            <View>
                <Text>We need permissions to change the system brightness mode</Text>
                {permission?.canAskAgain
                    ? <Button onPress={askPermission} title='Give permission' />
                    : <Button onPress={Linking.openSettings} title='Open app settings' />
                }
            </View>
        );
    }

    return (
        <View>
            <Text>Change the system brightness mode to:</Text>
            <Button
                title='unknown'
                onPress={() => setMode(Mode.unknown)}
                color={getColor(mode, Mode.unknown)}
            />
            <Button
                title='automatic'
                onPress={() => setMode(Mode.automatic)}
                color={getColor(mode, Mode.automatic)}
            />
            <Button
                title='manual'
                onPress={() => setMode(Mode.manual)}
                color={getColor(mode, Mode.manual)}
            />
        </View>
    );
}

const Mode = {
    unknown: 0,
    automatic: 1,
    manual: 2,
};

function getColor(mode, target) {
    if (mode === target) {
        return '#841584';
    }
}
```


## API

```ts
import { BrightnessMode } from 'expo-brightness';

function useSystemBrightnessMode(options?: Options): Result;

interface Options {
    /** If it should fetch the brightness mode when mounted, defaults to `true` */
    get?: boolean;
}

type Result = [
    /** The current system brightness mode */
    BrightnessMode | undefined,
    /** Callback to change the system brightness mode */
    (mode: BrightnessMode) => Promise<void>,
    /** Callback to manually get the system brightness mode */
    () => Promise<void>,
];
```

<div align="center">
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
</div>
