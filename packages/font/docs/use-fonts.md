<div align="center">
    <h1>
        <br />
        <code>useFonts</code>
        <br />
        <br />
    </h1>
    load a map of fonts with <a href="https://docs.expo.io/versions/latest/sdk/font/"><code>Font</code></a>
    <br />
</div>

## Examples

```jsx
// full hook
const [isLoaded] = useFonts({ ... });
```

With the `useFonts` hook we can simplify the [Font example from the Expo docs](https://docs.expo.io/versions/v33.0.0/latest/font/#example).

```jsx
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
import { Asset } from 'expo-asset';

function useFonts(map: FontMap): [boolean];

interface FontMap {
    [name: string]: string | number | Asset;
}
```

<div align="center">
    <br />
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
    <br />
</div>
