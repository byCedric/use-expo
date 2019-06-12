<div align="center">
    <h1>
        <br />
        <code>useSystemBrightnessMode</code>
        <br />
        <br />
    </h1>
    change the system brightness mode with <a href="https://docs.expo.io/versions/latest/sdk/brightness/"><code>Brightness</code></a>
    <br />
</div>

## Examples

```jsx
// full hook
const [mode, setMode, getMode] = useSystemBrightnessMode();

// other options
useSystemBrightnessMode({ get: false });
```

With the `useSystemBrightnessMode` and `usePermissions` hooks we can create a simple example.

```jsx
const Mode = {
    unknown: 0,
    automatic: 1,
    manual: 2,
};

function SystemBrightnessMode() {
    const [permission, askPermission] = usePermissions(Permissions.SYSTEM_BRIGHTNESS);
    const [mode, setMode] = useSystemBrightnessMode();

    if (!permission || permission.status !== 'granted') {
        return (
            <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
                <Text>We require permissions to change the system brightness mode</Text>
                <Button onPress={askPermission} title='Ask for permission' />
            </View>
        );
    }

    return (
        <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
            <Text>Change the system brightness mode to:</Text>
            <Button
                title='unknown'
                onPress={() => setMode(Mode.unknown)}
                color={getColor(mode, Mode.unknown)}
            />
            <Button
                title='automatic'
                onPress={() => setMode(Mode.automatic)}
                color={getColor(mode, Mode.automatic)}
            />
            <Button
                title='manual'
                onPress={() => setMode(Mode.manual)}
                color={getColor(mode, Mode.manual)}
            />
        </View>
    );
}

function getColor(mode, target) {
    if (mode === target) {
        return '#841584';
    }
}
```

## API

```ts
import { BrightnessMode } from 'expo-brightness';

function useSystemBrightnessMode(options?: SystemBrightnessModeOptions): [
    BrightnessMode | undefined,
    (mode: BrightnessMode) => Promise<void>,
    () => Promise<void>,
];

interface SystemBrightnessModeOptions {
    /** If it should fetch the brightness mode when mounted, defaults to `true` */
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
