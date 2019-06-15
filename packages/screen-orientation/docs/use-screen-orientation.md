<div align="center">
    <h1>
        <br />
        <code>useScreenOrientation</code>
        <br />
        <br />
    </h1>
    tracks changes in screen orientation with <a href="https://docs.expo.io/versions/latest/sdk/screen-orientation/"><code>ScreenOrientation</code></a>
    <br />
</div>

## Examples

```jsx
// full hook
const [orientation, sizeClass] = useScreenOrientation();

// other options
useScreenOrientation({ get: false });
```

With the `useScreenOrientation` hook we can create a simple example.

```jsx
function ScreenOrientationExample() {
    const [orientation, sizeClass] = useScreenOrientation();

    return (
        <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
            <Text>Screen orientation:</Text>
            <Text>{orientation}</Text>
            <Text>Screen size class: (only available on iOS)</Text>
            <Text>{JSON.stringify(sizeClass, null, 2)}</Text>
        </View>
    );
}
```

## API

```ts
function useScreenOrientation(options?: ScreenOrientationOptions): [
    ScreenOrientation.Orientation | undefined,
    ScreenOrientationSizeClass | undefined,
];

interface ScreenOrientationOptions {
    /** If it should fetch the screen orientation when mounted, defaults to `true` */
    get?: boolean;
}

/** Both the horizontal and vertical size class, only available on iOS */
interface ScreenOrientationSizeClass {
    horizontal: ScreenOrientation.SizeClassIOS;
    vertical: ScreenOrientation.SizeClassIOS;
}
```

<div align="center">
    <br />
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
    <br />
</div>
