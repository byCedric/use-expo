<div align="center">
    <h1>useGyroscope</h1>
    <p>Track changes in rotation with <a href="https://docs.expo.io/versions/latest/sdk/gyroscope/"><code>Gyroscope</code></a></p>
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
    <pre>expo install @use-expo/sensors expo-sensors</pre>
    <br />
</div>

## Usage

```jsx
// full hook
const [data, isAvailable] = useGyroscope();

// other options
useGyroscope({ interval: 1000 });
useGyroscope({ availability: false });
useGyroscope({ initial: { x: 1, y: 1, z: 1 } });
```


## Example

```jsx
import { useGyroscope } from '@use-expo/sensors';
import { Text, View } from 'react-native';

function GyroscopeSensor() {
    const [data, available] = useGyroscope({ interval: 100 });

    return (
        <View>
            <Text>Gyroscope:</Text>
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

function useGyroscope(options?: Options): Result

interface Options {
    /** The initial data to use before the first update. */
    initial?: ThreeAxisMeasurement;
    /** If it should check the availability of the sensor, defaults to `true`. */
    availability?: boolean;

    /**
     * The interval, in ms, to update the gyroscope data.
     * Note, this is set globally through `Gyroscope.setUpdateInterval`.
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
