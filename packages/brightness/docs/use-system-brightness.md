<div align="center">
    <h1>
        <br />
        <code>useSystemBrightness</code>
        <br />
        <br />
    </h1>
    change the system brightness with <a href="https://docs.expo.io/versions/latest/sdk/brightness/"><code>Brightness</code></a>
    <br />
</div>

## Examples

```jsx
// full hook
const [brightness, setBrightness, getBrightness] = useSystemBrightness();

// other options
useSystemBrightness({ get: false });
```

With the `useSystemBrightness` and `usePermissions` hooks we can create a simple example.

```jsx
function SystemBrightnessExample() {
    const [permission, askPermission] = usePermissions(Permissions.SYSTEM_BRIGHTNESS);
    const [brightness, setBrightness] = useSystemBrightness();

    if (!permission || permission.status !== 'granted') {
        return (
            <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
                <Text>We require permissions to set the system brightness</Text>
                <Button
                    title='Give permission'
                    onPress={askPermission}
                />
            </View>
        );
    }

    return (
        <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
            <Text>System brightness:</Text>
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
function useSystemBrightness(options?: SystemBrightnessOptions): [
    number | undefined,
    (brightness: number) => Promise<void>,
    () => Promise<void>,
];

interface SystemBrightnessOptions {
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
