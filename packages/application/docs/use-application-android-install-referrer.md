<div align="center">  
    <h1>useApplicationAndroidInstallReferrer</h1>  
    <p>Get the referrer URL of the installed app with <a href="https://docs.expo.io/versions/latest/sdk/application/"><code>Application</code></a></p>  
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
    <pre>expo install @use-expo/application expo-application</pre>  
    <br />  
</div>  

## Usage

```jsx
// full hook
const [installReferrer, getInstallReferrer] = useApplicationAndroidInstallReferrer();

// other options
useApplicationAndroidInstallReferrer({ get: false });
```

## Example  
  
```jsx  
import { useApplicationAndroidInstallReferrer } from '@use-expo/application';
import React from 'react';
import { Text, View } from 'react-native';

function ApplicationAndroidInstallReferrerExample() {  
  const [installReferrer] = useApplicationAndroidInstallReferrer();

  return (
    <View>
      <Text>Install referrer: {installReferrer || '-'}</Text>
    </View>
  );
}
```

## API

```ts
function useApplicationAndroidInstallReferrer(options?: Options): Result;

interface Options {
  /** If it should fetch the application install referrer when mounted, defaults to `true` */
  get?: boolean;
}

type Result = [
  /** The current application install referrer */
  string | undefined,
  /** Callback to manually get the application install referrer */
  () => Promise<void>,
];  
```

<div align="center">
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
</div>
