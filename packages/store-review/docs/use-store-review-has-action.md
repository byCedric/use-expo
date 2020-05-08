<div align="center">
    <h1>useStoreReviewHasAction</h1>
    <p>Determines if the store review can perform any action with <a href="https://docs.expo.io/versions/latest/sdk/storereview/"><code>StoreReview</code></a></p>
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
const [hasAction, getHasAction] = useStoreReviewHasAction();

// other options
useStoreReviewHasAction({ get: false });
```

## Example

```jsx
import { useStoreReviewHasAction } from '@use-expo/store-review';  
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';  

function StoreReviewHasActionExample() {  
  const [hasAction] = useStoreReviewHasAction(); 

  useEffect(() => {
    if (hasAction) {
      console.log('StoreReview has an action');
    }
  }, [hasAction]);

  return (
    <View>
      <Text>Hello StoreReview</Text>
    </View>
  );
}
```

## API

```ts    
function useStoreReviewHasAction(options?: Options): Result;

interface Options {  
  /** If it should fetch the store review has action when mounted, defaults to `true` */
  get?: boolean;
}

type Result = [  
  /** The current store review has action */
  boolean | undefined,
  /** Callback to manually get the store review has action */
  () => Promise<void>,
];
```

<div align="center">
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
</div>
