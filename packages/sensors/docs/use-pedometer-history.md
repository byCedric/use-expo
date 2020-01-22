<div align="center">
    <h1>usePedometerHistory</h1>
    <p>Get historical step count between two dates with <a href="https://docs.expo.io/versions/latest/sdk/pedometer/"><code>Pedometer</code></a></p>
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
const [data, isAvailable] = usePedometerHistory(start, end);

// other options
usePedometerHistory({ start, end, availability: false });
usePedometerHistory({ start, end, initial: { steps: 5 } });
```


## Example

```jsx
import { usePedometerHistory } from '@use-expo/sensors';
import { Text, View } from 'react-native';

function PedometerHistorySensor() {
    const [data, available] = usePedometerHistory(
        new Date('2019-07-03T12:00:00+02:00'),
        new Date('2019-07-03T16:00:00+02:00'),
    );

    return (
        <View>
            <Text>Pedometer:</Text>
            {(available && data)
                ? <Text>{data.steps} steps done in 4 hours</Text>
                : <Text>unavailable</Text>
            }
        </View>
    );
}
```


## API

```ts
function usePedometerHistory(options?: Options): Result;

interface Options {
    /** The initial data to use before the first update. */
    initial?: PedometerMeasurement;
    /** If it should check the availability of the sensor, defaults to `true`. */
    availability?: boolean;
}

type Result = [
    PedometerMeasurement | undefined,
    boolean | undefined,
];

interface PedometerMeasurement {
    /** The amount of steps made */
    steps: number;
}
```

<div align="center">
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
</div>
