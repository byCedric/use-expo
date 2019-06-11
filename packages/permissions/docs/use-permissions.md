<div align="center">
    <h1>
        <br />
        <code>usePermissions</code>
        <br />
        <br />
    </h1>
    get or ask permissions with <a href="https://docs.expo.io/versions/latest/sdk/permissions/"><code>Permissions</code></a>
    <br />
</div>

## Examples

```jsx
usePermissions(Permissions.CAMERA);
usePermissions([Permissions.CAMERA, Permissions.CAMERA_ROLL]);
usePermissions(Permissions.LOCATION, { ask: true });
usePermissions(Permissions.NOTIFICATIONS, { get: false });
```

With the `usePermissions` hook we can simplify the [Camera example for the Expo docs](https://docs.expo.io/versions/latest/sdk/camera/).

```jsx
function CameraExample() {
    const [camera, setCamera] = useState(Camera.Constants.Type.back);
	const [permission] = usePermissions(Permissions.CAMERA, { ask: true });

	if (!permission) {
		return <View />;
	} else if (permission.status !== 'granted') {
		return <Text>No access to camera</Text>;
	} else {
        return (
            <View style={{ flex: 1 }}>
                <Camera style={{ flex: 1 }} type={camera}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flex: 0.1,
                                alignSelf: 'flex-end',
                                alignItems: 'center',
                            }}
                            onPress={() => {
                                setCamera(
                                    camera === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                );
                            }}
                        >
                            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                                Flip
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        );
    }
}
```

## API

```ts
import { PermissionType, PermissionResponse } from 'expo-permissions';

function usePermissions(
    type: PermissionType | PermissionType[],
    options?: PermissionsOptions,
): [
    PermissionResponse | undefined,
    askAsync(): Promise<void>,
    getAsync(): Promise<void>,
];

interface PermissionsOptions {
    /** If it should ask the permissions when mounted, defaults to `false` */
	ask?: boolean;
	/** If it should fetch information about the permissions when mounted, defaults to `true` */
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
