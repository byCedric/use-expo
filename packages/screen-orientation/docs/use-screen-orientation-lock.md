<div align="center">
    <h1>
        <br />
        <code>useScreenOrientationLock</code>
        <br />
        <br />
    </h1>
    locks the screen to an orientation with <a href="https://docs.expo.io/versions/latest/sdk/screen-orientation/"><code>ScreenOrientation</code></a>
    <br />
</div>

## Examples

```jsx
// full hook
useScreenOrientationLock(OrientationLock.LANDSCAPE_LEFT);
```

With the `useScreenOrientationLock` hook we can create a simple example.

```jsx
function ScreenOrientationLockExample() {
    useScreenOrientationLock(OrientationLock.PORTRAIT_UP);

    return (
        <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
            <Text>This screen is now locked to portrait mode</Text>
        </View>
    );
}
```

## API

```ts
function useScreenOrientationLock(orientation: ScreenOrientation.OrientationLock): void;
```

<div align="center">
    <br />
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
    <br />
</div>
