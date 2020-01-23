## [1.0.0](https://github.com/bycedric/use-expo/compare/v0.10.1...1.0.0) (2020-01-23)


### Features

* **screen-orientation:** add manual callback and listen option ([#52](https://github.com/bycedric/use-expo/issues/52)) ([106f62e](https://github.com/bycedric/use-expo/commit/106f62ec4084ef411357f8f71bd6af7d7e3b5367))


### Bug Fixes

* **battery:** unify tests and fix callback reuse ([#64](https://github.com/bycedric/use-expo/issues/64)) ([0721bc4](https://github.com/bycedric/use-expo/commit/0721bc42f625aad38c504303e57bae13bc919eb7))
* **brightness:** fetch brighness after new props ([af1ce94](https://github.com/bycedric/use-expo/commit/af1ce94d23e74e736be7f1dcfc4f3a46d1ecc59d))
* **brightness:** fetch brighness mode after new props ([#49](https://github.com/bycedric/use-expo/issues/49)) ([56f2ff5](https://github.com/bycedric/use-expo/commit/56f2ff58c94c45866ed94fa976a52a5c0223e6ef))
* **example:** add example navigation listener unmount ([fdcf98d](https://github.com/bycedric/use-expo/commit/fdcf98d4935bc68015230f55f01c36e648094fdb))
* **font:** reinitialize fonts in map after initial render ([#50](https://github.com/bycedric/use-expo/issues/50)) ([a249b19](https://github.com/bycedric/use-expo/commit/a249b1985a1251d46de78eed873dca8acd477a19))
* **permissions:** use callbacks and dependencies ([#51](https://github.com/bycedric/use-expo/issues/51)) ([8e55791](https://github.com/bycedric/use-expo/commit/8e5579133f32981376ec47354d17ca5e1b0b6b32))

### [0.10.1](https://github.com/bycedric/use-expo/compare/v0.10.0...v0.10.1) (2019-09-24)

## [0.10.0](https://github.com/bycedric/use-expo/compare/v0.9.0...v0.10.0) (2019-09-24)


### Features

* add hooks for new battery api ([#40](https://github.com/bycedric/use-expo/issues/40)) ([02042a2](https://github.com/bycedric/use-expo/commit/02042a2f729739f669fb6cb48f946049ac7573fd))


### Bug Fixes

* add commitlint to ci and remove path filtering ([#37](https://github.com/bycedric/use-expo/issues/37)) ([0f0bdd1](https://github.com/bycedric/use-expo/commit/0f0bdd13fc64000af9deb37eb1dd0106a182d188))
* update eslint-utils to 1.4.1 ([#34](https://github.com/bycedric/use-expo/issues/34)) ([f64d7a8](https://github.com/bycedric/use-expo/commit/f64d7a894c4d37c3b2bc329557b004d12cf6ecb3))
* use same react types for hoisting ([#41](https://github.com/bycedric/use-expo/issues/41)) ([221734b](https://github.com/bycedric/use-expo/commit/221734bb32312e0f1b64ff093ae9a7896797f4bb))

## [0.9.0](https://github.com/bycedric/use-expo/compare/v0.8.0...v0.9.0) (2019-07-31)


### Bug Fixes

* allow latest expo modules as peer dependencies ([#27](https://github.com/bycedric/use-expo/issues/27)) ([e0ff765](https://github.com/bycedric/use-expo/commit/e0ff7656a4d01580afc58785cfd2196b553301fa))
* **example:** add missing dependencies for react navigation ([#26](https://github.com/bycedric/use-expo/issues/26)) ([c50eb0a](https://github.com/bycedric/use-expo/commit/c50eb0a91d469c73847959974b272f5f56512f56))

## [0.8.0](https://github.com/bycedric/use-expo/compare/v0.7.1...v0.8.0) (2019-07-07)


### Features

* add first draft of fonts hook ([#20](https://github.com/bycedric/use-expo/issues/20)) ([14c42fa](https://github.com/bycedric/use-expo/commit/14c42fa0d8e89bcd2676f6a9dcbec7e06d7aa32e))
* **example:** add screen orientation lock example ([#19](https://github.com/bycedric/use-expo/issues/19)) ([50fc423](https://github.com/bycedric/use-expo/commit/50fc4235bada7541082f913b91856cdcbc965a55))

### [0.7.1](https://github.com/bycedric/use-expo/compare/v0.7.0...v0.7.1) (2019-06-26)

## [0.7.0](https://github.com/bycedric/use-expo/compare/v0.6.1...v0.7.0) (2019-06-26)


### Features

* **example:** add example app to play with hooks ([#17](https://github.com/bycedric/use-expo/issues/17)) ([6bf4133](https://github.com/bycedric/use-expo/commit/6bf4133ece127167350d95a26f70a964a5163366))
* **screen-orientation:** add screen orientation lock hook ([#18](https://github.com/bycedric/use-expo/issues/18)) ([be39b5a](https://github.com/bycedric/use-expo/commit/be39b5aad13d744bcf48ae557f38d72c0e4a6bbf))

### [0.6.1](https://github.com/bycedric/use-expo/compare/v0.6.0...v0.6.1) (2019-06-19)


### Bug Fixes

* **sensors:** export pedometer history hook ([3b64f24](https://github.com/bycedric/use-expo/commit/3b64f24164b978920434f6e3697fad259ab2cece))

## [0.6.0](https://github.com/bycedric/use-expo/compare/v0.5.0...v0.6.0) (2019-06-16)


### Features

* **screen-orientation:** add first draft of screen orientation hooks ([6376e1f](https://github.com/bycedric/use-expo/commit/6376e1fa4780c4df9f7fa7ffab098cfd70f24616))

## [0.5.0](https://github.com/bycedric/use-expo/compare/v0.4.0...v0.5.0) (2019-06-12)


### Features

* **brightness:** add first draft of brightness hook ([f0d9379](https://github.com/bycedric/use-expo/commit/f0d9379d1bef755bef30a66951a92e5e09fed5cb))
* **brightness:** add system brightness hook ([2d089ce](https://github.com/bycedric/use-expo/commit/2d089cec51930c51e193decdb421ab1aebc40d7c))
* **brightness:** add system brightness mode hook ([748ec7c](https://github.com/bycedric/use-expo/commit/748ec7c57c1f7b8fa380eb1b0a219bb08750cd2b))


### Bug Fixes

* add brightness to use expo package ([1920cad](https://github.com/bycedric/use-expo/commit/1920cadf96de5619de5b5805240d2fe01595bcb5))
* add tests to tsconfig for development ([b944eb0](https://github.com/bycedric/use-expo/commit/b944eb0b4e8443c3e9b1da09f74f297a755cc195))

## [0.4.0](https://github.com/bycedric/use-expo/compare/v0.3.0...v0.4.0) (2019-06-11)


### Features

* add eslint to all packages ([#8](https://github.com/bycedric/use-expo/issues/8)) ([7008607](https://github.com/bycedric/use-expo/commit/7008607d0f63df5baf315f8aba29fbdbd888da45))


### Bug Fixes

* **permissions:** replace lodash array casting with native ([0facc3c](https://github.com/bycedric/use-expo/commit/0facc3c6d487e4cb66221551d0c6843fc9002f3b))

## [0.3.0](https://github.com/bycedric/use-expo/compare/v0.2.0...v0.3.0) (2019-06-10)


### Features

* add use expo alias library to install all ([#6](https://github.com/bycedric/use-expo/issues/6)) ([98bcdf7](https://github.com/bycedric/use-expo/commit/98bcdf72409ceb820ffda13f16d7189d8bace1af))
* **sensors:** add historical pedometer hook ([6404fb8](https://github.com/bycedric/use-expo/commit/6404fb89ea18ec11f3fb3c9e4e9cbae6d3600dd2))

## [0.2.0](https://github.com/bycedric/use-expo/compare/v0.1.1...v0.2.0) (2019-06-10)


### Features

* **permissions:** add first draft of expo permissions hooks ([#1](https://github.com/bycedric/use-expo/issues/1)) ([8466764](https://github.com/bycedric/use-expo/commit/8466764a19cb0cd57baaf886b8698d533de143a4))


### Bug Fixes

* add public access scope to lerna ([6ccb42c](https://github.com/bycedric/use-expo/commit/6ccb42c183fe7dbeaae0b32be7f198d0193c13f8))

### [0.1.1](https://github.com/bycedric/use-expo/compare/v0.1.0...v0.1.1) (2019-06-08)


### Bug Fixes

* **sensors:** remove react from dependencies ([028551c](https://github.com/bycedric/use-expo/commit/028551c095110e623e7822f00dcbcfbefc7e1a54))

## [0.1.0](https://github.com/bycedric/use-expo/compare/7a258497029318bf76b65bf1e0373689429c40c0...v0.1.0) (2019-06-08)


### Features

* **sensors:** add first draft of expo sensors hooks ([7a25849](https://github.com/bycedric/use-expo/commit/7a258497029318bf76b65bf1e0373689429c40c0))

