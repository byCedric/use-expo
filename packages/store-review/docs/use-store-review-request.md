<div align="center">
    <h1>useStoreReviewRequest</h1>
    <p>Request a review with <a href="https://docs.expo.io/versions/latest/sdk/storereview/"><code>StoreReview</code></a></p>
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
const requestReview = useStoreReviewRequest();
```

## Example

```jsx
import { useStoreReviewRequest } from '@use-expo/store-review';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

function StoreReviewRequestExample() {
 const requestReview = useStoreReviewRequest();

  useEffect(() => {
    requestReview().then((isRequested) => {
      if (isRequested) {
        console.log('Store review is requested');
      } else {
        console.log('Could not request review (expo web?)');
      }
    });
  }, [requestReview]);

 return (
   <View>
     <Text>Please review our app!</Text>
   </View>
 );
}
```

## API

```ts
function useStoreReviewRequest(): (Result);

/** Function to request a review */
type Result = () => Promise<boolean>;
```

<div align="center">
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
</div>
