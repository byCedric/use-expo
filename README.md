<div align="center">
    <h1>expo hooks</h1>
    <p>Complementary hooks for <a href="https://github.com/expo/expo">Expo</a></p>
    <sup>
        <a href="https://github.com/bycedric/use-expo#contributors">
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
            <img src="https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square" alt="contributors" />
<!-- ALL-CONTRIBUTORS-BADGE:END -->
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
        <a href="https://github.com/byCedric/use-expo#usage"><b>Usage</b></a>
        &nbsp;&nbsp;&mdash;&nbsp;&nbsp;
        <a href="https://github.com/byCedric/use-expo/blob/master/CHANGELOG.md"><b>Changelog</b></a>
    </p>
    <br />
</div>

### [Application](./packages/application)

- [`useApplicationInstallTime`](./packages/application/docs/use-application-install-time.md) &nbsp;&mdash;&nbsp; get the time the app was installed on the device
- [`useApplicationAndroidInstallReferrer`](./packages/application/docs/use-application-android-install-referrer.md) &nbsp;&mdash;&nbsp; get the referrer URL of the installed app
- [`useApplicationAndroidLastUpdateTime`](./packages/application/docs/use-application-android-last-update-time.md) &nbsp;&mdash;&nbsp; get the time the app was last updated via the Google Play Store
- [`useApplicationIosIdForVendor`](./packages/application/docs/use-application-ios-id-for-vendor.md) &nbsp;&mdash;&nbsp; get the referrer URL of the installed app

### [Battery](./packages/battery)

- [`useBattery`](./packages/battery/docs/use-battery.md) &nbsp;&mdash;&nbsp; get the battery level, state and power mode
- [`useBatteryLevel`](./packages/battery/docs/use-battery-level.md) &nbsp;&mdash;&nbsp; get or track the battery level or percentage remaining
- [`useBatteryLowPowerMode`](./packages/battery/docs/use-battery-low-power-mode.md) &nbsp;&mdash;&nbsp; get or track the battery low power mode
- [`useBatteryState`](./packages/battery/docs/use-battery-state.md) &nbsp;&mdash;&nbsp; get or track the battery (charging) state

### [Brightness](./packages/brightness)

- [`useBrightness`](./packages/brightness/docs/use-brightness.md) &nbsp;&mdash;&nbsp; change or track the screen brightness
- [`useSystemBrightness`](./packages/brightness/docs/use-system-brightness.md) &nbsp;&mdash;&nbsp; change or track the system screen brightness
- [`useSystemBrightnessMode`](./packages/brightness/docs/use-system-brightness-mode.md) &nbsp;&mdash;&nbsp; change or track the system brightness mode

### [Font](./packages/font)

- [`useFonts`](./packages/font/docs/use-fonts.md) &nbsp;&mdash;&nbsp; load a map of fonts

### [Permissions](./packages/permissions)

- [`usePermissions`](./packages/permissions/docs/use-permissions.md) &nbsp;&mdash;&nbsp; get or ask permissions

### [Screen Orientation](./packages/screen-orientation)

- [`useScreenOrientation`](./packages/screen-orientation/docs/use-screen-orientation.md) &nbsp;&mdash;&nbsp; track changes in screen orientation
- [`useScreenOrientationLock`](./packages/screen-orientation/docs/use-screen-orientation-lock.md) &nbsp;&mdash;&nbsp; lock the screen to an orientation
- [`useScreenOrientationPlatformLock`](./packages/screen-orientation/docs/use-screen-orientation-platform-lock.md) &nbsp;&mdash;&nbsp; lock multiple platforms to an orientation

### [Sensors](./packages/sensors)

- [`useAccelerometer`](./packages/sensors/docs/use-accelerometer.md) &nbsp;&mdash;&nbsp; track changes in acceleration
- [`useBarometer`](./packages/sensors/docs/use-barometer.md) &nbsp;&mdash;&nbsp; track changes in air pressure
- [`useDeviceMotion`](./packages/sensors/docs/use-device-motion.md) &nbsp;&mdash;&nbsp; track device motion and orientation
- [`useGyroscope`](./packages/sensors/docs/use-gyroscope.md) &nbsp;&mdash;&nbsp; track changes in rotation
- [`useMagnetometer`](./packages/sensors/docs/use-magnetometer.md) &nbsp;&mdash;&nbsp; track changes in the magnetic field
- [`useMagnetometerUncalibrated`](./packages/sensors/docs/use-magnetometer.md) &nbsp;&mdash;&nbsp; track changes in the magnetic field using raw data
- [`usePedometer`](./packages/sensors/docs/use-pedometer.md) &nbsp;&mdash;&nbsp; track user step count
- [`usePedometerHistory`](./packages/sensors/docs/use-pedometer-history.md) &nbsp;&mdash;&nbsp; get historical step count between two dates

### [Store Review](./packages/store-review)

- [`useStoreReviewHasAction`](./packages/store-review/docs/use-store-review-has-action.md) &nbsp;&mdash;&nbsp; determines if the store review can perform any action
- [`useStoreReviewIsAvailable`](./packages/store-review/docs/use-store-review-is-available.md) &nbsp;&mdash;&nbsp; determines if the platform has the capabilities to use request review
- [`useStoreReviewRequest`](./packages/store-review/docs/use-store-review-request.md) &nbsp;&mdash;&nbsp; request a store review if available

### [WebBrowser](./packages/web-browser)

- [`useBrowsers`](./packages/web-browser/docs/use-browsers.md) &nbsp;&mdash;&nbsp; Get a list of Android browsers
- [`useWarmBrowser`](./packages/web-browser/docs/use-warm-browser.md) &nbsp;&mdash;&nbsp; Warm up and cool down and android browser


## Usage

You can import these hooks by installing the `@use-expo/<group>` packages.

```js
import { useBrightness } from '@use-expo/brightness';
import { usePermissions } from '@use-expo/permissions';
```


## Contributors

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification ([emoji key](https://allcontributors.org/docs/en/emoji-key)). Contributions of any kind welcome!

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://bycedric.com"><img src="https://avatars2.githubusercontent.com/u/1203991?v=4" width="100px;" alt=""/><br /><sub><b>Cedric van Putten</b></sub></a><br /><a href="https://github.com/byCedric/use-expo/commits?author=byCedric" title="Code">💻</a> <a href="https://github.com/byCedric/use-expo/commits?author=byCedric" title="Documentation">📖</a> <a href="#example-byCedric" title="Examples">💡</a></td>
    <td align="center"><a href="https://twitter.com/baconbrix"><img src="https://avatars1.githubusercontent.com/u/9664363?v=4" width="100px;" alt=""/><br /><sub><b>Evan Bacon</b></sub></a><br /><a href="https://github.com/byCedric/use-expo/commits?author=EvanBacon" title="Code">💻</a> <a href="https://github.com/byCedric/use-expo/commits?author=EvanBacon" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/rodw1995"><img src="https://avatars1.githubusercontent.com/u/3266698?v=4" width="100px;" alt=""/><br /><sub><b>Robbie op de Weegh</b></sub></a><br /><a href="https://github.com/byCedric/use-expo/commits?author=rodw1995" title="Code">💻</a> <a href="https://github.com/byCedric/use-expo/commits?author=rodw1995" title="Documentation">📖</a></td>
    <td align="center"><a href="https://jb1905.github.io/portfolio/"><img src="https://avatars2.githubusercontent.com/u/28870390?v=4" width="100px;" alt=""/><br /><sub><b>Jakub Biesiada</b></sub></a><br /><a href="https://github.com/byCedric/use-expo/issues?q=author%3AJB1905" title="Bug reports">🐛</a> <a href="https://github.com/byCedric/use-expo/commits?author=JB1905" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->


<div align="center">
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
</div>

test
