<div align="center">
    <h1>
        <br />
        <code>useBrightness</code>
        <br />
        <br />
    </h1>
    change the brightness of the screen with <a href="https://docs.expo.io/versions/latest/sdk/brightness/"><code>Brightness</code></a>
    <br />
</div>

## Examples

```jsx
// full hook
const [brightness, setBrightness, getBrightness] = useBrightness();

// other options
useBrightness({ get: false });
```

With the `useBrightness` hook we can create a simple example.

```jsx
function BrightnessExample() {
    const [brightness, setBrightness] = useBrightness();

    return (
        <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
            <Text>Brightness:</Text>
            <Text>{percentage(brightness)}</Text>
            <Slider
                value={brightness}
                onValueChange={setBrightness}
                step={0.001}
                minimumValue={0.001}
                maximumValue={1}
            />
        </View>
    );
}

function percentage(n) {
    if (!n) {
        return '0%';
    }

    return `${Math.floor(n * 1000) / 10}%`;
}
```

## API

```ts
function useBrightness(): [
    number | undefined,
    (brightness: number) => Promise<void>,
    () => Promise<void>,
];

interface BrightnessOptions {
    /** If it should fetch the brightness when mounted, defaults to `true` */
    get?: boolean;
}
```

<div align="center">
    <br />
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
    <br />
</div>
