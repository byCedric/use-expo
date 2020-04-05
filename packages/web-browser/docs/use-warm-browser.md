<div align="center">
    <h1>useWarmBrowser</h1>
    <p>Warm up and cool down and android browser <a href="https://docs.expo.io/versions/latest/sdk/webbrowser/"><code>WebBrowser</code></a></p>
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
    <pre>yarn add @use-expo/web-browser expo-web-browser</pre>
    <br />
</div>

## Usage

```jsx
// full hook
useWarmBrowser('com.android.chrome');
```


## Example

```jsx
import { useBrowsers, useWarmBrowser } from '@use-expo/web-browser';
import { Text, View } from 'react-native';

function App() {
  const browsers = useBrowsers();
  useWarmBrowser(browsers?.[0]);

  return <View />;
}
```


## API

```ts
function useWarmBrowser(browser: string): void;
```

<div align="center">
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
</div>
