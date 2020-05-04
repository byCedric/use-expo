<div align="center">
    <h1>useStoreReviewIsAvailable</h1>
    <p>Determines if the platform has the capabilities to use request review with <a href="https://docs.expo.io/versions/latest/sdk/storereview/"><code>StoreReview</code></a></p>
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
    <pre>expo install @use-expo/store-review expo-store-review</pre>
    <br />
</div>

## Usage

```jsx
// full hook
const [isAvailable, getIsAvailable] = useStoreReviewIsAvailable();

// other options
useStoreReviewIsAvailable({ get: false });
```

## Example

```jsx
import { useStoreReviewIsAvailable } from '@use-expo/store-review';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

function StoreReviewIsAvailableExample() {
  const [isAvailable] = useStoreReviewIsAvailable();

  useEffect(() => {
    if (isAvailable) {
      console.log('StoreReview is available');
    }
  }, [isAvailable]);

  return (
    <View>
      <Text>Hello StoreReview</Text>
    </View>
  );
}
```

## API

```ts
function useStoreReviewIsAvailable(options?: Options): Result;

interface Options {
  /** If it should fetch the store review is available when mounted, defaults to `true` */
  get?: boolean;
}

type Result = [
  /** The current store review is available */
  boolean | undefined,
  /** Callback to manually get the store review is available */
  () => Promise<void>,
];
```

<div align="center">
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
</div>
