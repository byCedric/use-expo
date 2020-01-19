<div align="center">
    <h1>useScreenOrientationLock</h1>
    <p>Lock the screen to an orientation with <a href="https://docs.expo.io/versions/latest/sdk/screen-orientation/"><code>ScreenOrientation</code></a></p>
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
    <pre>yarn add @use-expo/screen-orientation</pre>
    <br />
</div>

## Usage

```jsx
// full hook
useScreenOrientationLock(OrientationLock.LANDSCAPE_LEFT);
```


## Example

```jsx
import { useScreenOrientationLock } from '@use-expo/screen-orientation';
import { Text, View } from 'react-native';

function ScreenOrientationLockExample() {
    useScreenOrientationLock(OrientationLock.PORTRAIT_UP);

    return (
        <View>
            <Text>This screen is now locked to portrait mode</Text>
        </View>
    );
}
```


## API

```ts
import { ScreenOrientation } from 'expo';

function useScreenOrientationLock(orientation: ScreenOrientation.OrientationLock): void;
```

<div align="center">
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
</div>
