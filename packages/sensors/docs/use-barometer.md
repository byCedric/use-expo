<div align="center">
    <h1>useBarometer</h1>
    <p>Track changes in air pressure with <a href="https://docs.expo.io/versions/latest/sdk/barometer/"><code>Barometer</code></a></p>
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
const [data, isAvailable] = useBarometer();

// other options
useBarometer({ interval: 1000 });
useBarometer({ availability: false });
useBarometer({ initial: { pressure: 0 } });
```


## Example

```jsx
import { useBarometer } from '@use-expo/sensors';
import { Text, View } from 'react-native';

function BarometerSensor() {
    const [data, available] = useBarometer({ initial: { pressure: 0 } });

    return (
        <View>
            <Text>Barometer:</Text>
            {available
                ? <Text>{data.pressure * 100} Pa</Text>
                : <Text>unavailable</Text>
            }
        </View>
    );
}
```


## API

```ts
import { BarometerMeasurement } from 'expo-sensors';

function useBarometer(options?: Options): Result;

interface Options {
    /** The initial data to use before the first update. */
    initial?: BarometerMeasurement;
    /** If it should check the availability of the sensor, defaults to `true`. */
    availability?: boolean;

    /**
     * The interval, in ms, to update the barometer data.
     * Note, this is set globally through `Barometer.setUpdateInterval`.
     * When used in 2 or more components, only the last rendered component's interval will be used for all.
     */
    interval?: number;
}

type Result = [
    BarometerMeasurement | undefined,
    boolean | undefined,
];
```

<div align="center">
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
</div>
