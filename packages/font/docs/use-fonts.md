<div align="center">
    <h1>useFonts</h1>
    <p>Load a map of fonts with <a href="https://docs.expo.io/versions/latest/sdk/font/"><code>Font</code></a></p>
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
    <pre>yarn add @use-expo/font expo-font</pre>
    <br />
</div>

## Usage

```jsx
// full hook
const [isLoaded] = useFonts({ ... });
```


## Example

```jsx
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import { Text, View } from 'react-native';

const customFonts = {
    'OpenSans-Regular': require('./assets/fonts/open-sans-regular.ttf'),
};

function FontExample() {
    const [isLoaded] = useFonts(customFonts);

    if (!isLoaded) {
        return <AppLoading />;
    }

    return (
        <View>
            <Text style={{ fontFamily: 'OpenSans-Regular' }}>Custom font</Text>
        </View>
    );
}
```


## API

```ts
import { FontSource } from 'expo-font';

function useFonts(map: FontMap): Result;

interface FontMap {
    /** All fonts, by name, to load */
    [name: string]: FontSource;
}

type Result = [
    /** If the fonts are loaded or not */
    boolean,
];
```

<div align="center">
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
</div>
