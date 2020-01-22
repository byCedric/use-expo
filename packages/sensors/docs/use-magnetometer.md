<div align="center">
    <h1>useMagnetometer</h1>
    <p>Track changes in the magnetic field with <a href="https://docs.expo.io/versions/latest/sdk/magnetometer/"><code>Magnetometer</code></a></p>
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
    <pre>yarn add @use-expo/sensors expo-sensors</pre>
    <br />
</div>

## Usage

```jsx
// full hook
const [data, isAvailable] = useMagnetometer();
const [data, isAvailable] = useMagnetometerUncalibrated();

// other options
useMagnetometer({ interval: 1000 });
useMagnetometer({ initial: { x: 1, y: 1, z: 1 } });
useMagnetometer({ availability: false });

// or use the raw data with:
useMagnetometerUncalibrated();
useMagnetometerUncalibrated({ interval: 1000 });
useMagnetometerUncalibrated({ initial: { x: 1, y: 1, z: 1 } });
useMagnetometerUncalibrated({ availability: false });
```


## Example

```jsx
import { useMagnetometer } from '@use-expo/sensors';
import { Text, View } from 'react-native';

function MagnetometerSensor() {
    const [data, available] = useMagnetometer({ interval: 100 });

    return (
        <View>
            <Text>Magnetometer:</Text>
            {(available && data)
                ? <Text>x: {round(data.x)} y: {round(data.y)} z: {round(data.z)}</Text>
                : <Text>unavailable</Text>
            }
        </View>
    );
}

function round(value = 0) {
    return Math.floor(value * 100) / 100;
}
```


## API

```ts
import { ThreeAxisMeasurement } from 'expo-sensors';

function useMagnetometer(options?: Options): Result;
function useMagnetometerUncalibrated(options?: Options): Result;

interface Options {
    /** The initial data to use before the first update. */
    initial?: ThreeAxisMeasurement;
    /** If it should check the availability of the sensor, defaults to `true`. */
    availability?: boolean;

    /**
     * The interval, in ms, to update the magnetometer data.
     * Note, this is set globally through `Magnetometer.setUpdateInterval`.
     * When used in 2 or more components, only the last rendered component's interval will be used for all.
     */
    interval?: number;
}

type Result = [
    ThreeAxisMeasurement | undefined,
    boolean | undefined,
];
```

<div align="center">
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
</div>
