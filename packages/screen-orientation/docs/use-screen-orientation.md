<div align="center">
    <h1>useScreenOrientation</h1>
    <p>Track changes in screen orientation with <a href="https://docs.expo.io/versions/latest/sdk/screen-orientation/"><code>ScreenOrientation</code></a></p>
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
    <pre>expo install @use-expo/screen-orientation</pre>
    <br />
</div>

## Usage

```jsx
// full hook
const [orientation, getOrientation] = useScreenOrientation();

// other options
useScreenOrientation({ get: false, listen: false });
```


## Example

```jsx
import { useScreenOrientation } from '@use-expo/screen-orientation';
import { Text, View } from 'react-native';

function ScreenOrientationExample() {
    const [orientation] = useScreenOrientation();
    const sizeClass = !orientation ? undefined : {
        horizontal: orientation.horizontalSizeClass,
        vertical: orientation.verticalSizeClass,
    };

    return (
        <View>
            <Text>Screen orientation:</Text>
            <Text>{orientation?.orientation}</Text>
            <Text>Screen size class: (only available on iOS)</Text>
            {!!sizeClass && (
                <Text>{JSON.stringify(sizeClass, null, 2)}</Text>
            )}
        </View>
    );
}
```


## API

```ts
import * as ScreenOrientation from 'expo-screen-orientation';

function useScreenOrientation(options?: Options): Result;

interface Options {
    /** If it should fetch the screen orientation when mounted, defaults to `true` */
    get?: boolean;
    /** If it should listen to screen orientation changes, defaults to `true` */
	listen?: boolean;
}

type Result = [
    /** The current orientation of the screen */
    ScreenOrientation.ScreenOrientationInfo | undefined,
    /** Callback to manually get the screen orientation */
    () => Promise<ScreenOrientation.Orientation>,
];
```

<div align="center">
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
</div>
