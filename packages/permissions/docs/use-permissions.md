<div align="center">
    <h1>usePermissions</h1>
    <p>Get or ask permissions with <a href="https://docs.expo.io/versions/latest/sdk/permissions/"><code>Permissions</code></a></p>
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
    <pre>yarn add @use-expo/permissions expo-permissions</pre>
    <br />
</div>

## Usage

```jsx
// full hook
const [permission, askPermission, getPermission] = usePermissions(Permissions.CAMERA);

// other options
usePermissions(Permissions.CAMERA);
usePermissions([Permissions.CAMERA, Permissions.CAMERA_ROLL]);
usePermissions(Permissions.LOCATION, { ask: true });
usePermissions(Permissions.NOTIFICATIONS, { get: false });
```


## Example

```jsx
import { usePermissions } from '@use-expo/permissions';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { useState } from 'react';
import { Button, Linking, Text, TouchableOpacity, View } from 'react-native';

function CameraExample() {
    const [camera, setCamera] = useState(Camera.Constants.Type.back);
    const [permission, askPermission] = usePermissions(Permissions.CAMERA, { ask: true });

    if (!permission) {
        return null;
    }

    if (permission.status !== 'granted') {
         return (
            <View>
                <Text>We need permissions to use the camera</Text>
                {permission?.canAskAgain
                    ? <Button onPress={askPermission} title='Give permission' />
                    : <Button onPress={Linking.openSettings} title='Open app settings' />
                }
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={camera}>
                <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{ flex: 0.1, alignSelf: 'flex-end', alignItems: 'center' }}
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
```


## API

```ts
import { PermissionType, PermissionResponse } from 'expo-permissions';

function usePermissions(type: PermissionType | PermissionType[], options?: Options): Result;

interface Options {
    /** If it should ask the permissions when mounted, defaults to `false` */
    ask?: boolean;
    /** If it should fetch information about the permissions when mounted, defaults to `true` */
    get?: boolean;
}

type Result = [
    /** The received permission response */
    PermissionResponse | undefined,
    /** Callback to ask the user for the permissions */
    () => Promise<void>,
    /** Callback to manually check if the permissions are granted */
    () => Promise<void>,
];
```

<div align="center">
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
</div>
