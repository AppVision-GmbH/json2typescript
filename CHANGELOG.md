# v1.5.0 (2021-07-23)

## Bug Fixes

* Fix handling of array property type mapping, fixed with PR [#142](https://github.com/appvision-gmbh/json2typescript/pull/142)

## Features

* Improve method types, closes [#137](https://github.com/appvision-gmbh/json2typescript/pull/137)
* Add more optional property flags, closes [#138](https://github.com/appvision-gmbh/json2typescript/pull/138)
* Add esm module format in order to fix CommonJS issue with Angular 10, closes [#147](https://github.com/appvision-gmbh/json2typescript/issues/147)
* Improved docs about property initialization, closes [#149](https://github.com/appvision-gmbh/json2typescript/pull/149)
* Implement discriminator feature, closes [#165](https://github.com/appvision-gmbh/json2typescript/pull/165)

# v1.4.1 (2020-04-14)

## Bug Fixes

* Fixed compile due to bad `package.json` when using older TypeScript versions, closes [#132](https://github.com/AppVision-GmbH/json2typescript/issues/132)

# v1.4.0 (2020-04-14)

## Bug Fixes

* Fixed compile issues when using older TypeScript versions, closes [#131](https://github.com/AppVision-GmbH/json2typescript/issues/131)

## Breaking Changes

* The older versions did not enforce developers the use of the `@JsonObject(classId)` decorator. 
If you do not use the class decorator or have no parameter given, please update according to the docs.
This is now mandatory, closes [#129](https://github.com/AppVision-GmbH/json2typescript/issues/129) and [#130](https://github.com/AppVision-GmbH/json2typescript/issues/130)

# v1.3.0 (2020-04-13)

## Bug Fixes

* Fixed content of `package-lock.json`, closes [#125](https://github.com/AppVision-GmbH/json2typescript/issues/125)

## Features

* Implemented `ignoreRequiredCheck` flag and allow serialization without having instances, closes [#126](https://github.com/AppVision-GmbH/json2typescript/pull/126)

## Breaking Changes

* In previous version, the serialization of plain objects failed, because instances of classes were required. 
As of now, the serialization of plain object may succeed if the structure matches the class structure. 
Thus, this is considered a soft breaking change.

# v1.2.5 (2020-03-01)

## Bug Fixes

* Added missing Changelog for current version, closes [#124](https://github.com/AppVision-GmbH/json2typescript/issues/124)

# v1.2.4 (2020-03-01)

## Features

* Added automation tests on the repository with Travis CI 

## Bug Fixes

* Fixed bug in property mapping of complex class inheritances, closes [#121](https://github.com/AppVision-GmbH/json2typescript/pull/121)

# v1.2.3 (2019-05-11)

## Bug Fixes

* Wrong output files were included in v1.2.x builds, closes [#98](https://github.com/dhlab-basel/json2typescript/issues/98)

# v1.2.2 (2019-05-04)

## Bug Fixes

* Corrected ReadMe information, closes [#97](https://github.com/dhlab-basel/json2typescript/issues/97)

# v1.2.1 (2019-05-02)

## Bug Fixes

* Corrected ReadMe information, closes [#88](https://github.com/dhlab-basel/json2typescript/issues/88)

# v1.2.0 (2019-02-21)

## Features

* Allow optional properties to be null, closes [#58](https://github.com/dhlab-basel/json2typescript/issues/58)

## Breaking Changes

* If a property is declared optional (by `@JsonProperty(name, Type, true)`), then `null` is now ignored in both serialization and deserialization. 
Before this version, `json2typescript` would have thrown an error if `ValueChecking.DISALLOW_NULL` was used.

# v1.1.1 (2019-02-12)

## Features

* Improved documentation for v1.1.0

# v1.1.0 (2019-02-12)

## Bug Fixes

* Implemented pull request that fixes an issue with child class properties, closes [#80](https://github.com/dhlab-basel/json2typescript/pull/80)
* Fixed bug in constructor parameters, closes [#82](https://github.com/dhlab-basel/json2typescript/issues/82)

## Features

* Added generics in order to allow the compiler to detect types, closes [#73](https://github.com/dhlab-basel/json2typescript/issues/73)
* Allow case insensitive lookup in json deserializing, closes [#81](https://github.com/dhlab-basel/json2typescript/issues/81)

## Breaking Changes

* It is not possible to serialize `undefined` anymore; instead, an error is thrown. Before this version, `json2typescript` serialized `undefined` to `null`.

# v1.0.6 (2018-08-12)

## Bug Fixes

* Fixed serialization and deserialization of `null` and `undefined` values, closes [#33](https://github.com/dhlab-basel/json2typescript/issues/33) and [#69](https://github.com/dhlab-basel/json2typescript/issues/69)
* Adjusted README to close [#40](https://github.com/dhlab-basel/json2typescript/issues/40)
* Removed js map files, closes [#60](https://github.com/dhlab-basel/json2typescript/issues/60)
* Allowed custom class identifiers in the `@JsonObject` property, closes [#66](https://github.com/dhlab-basel/json2typescript/issues/66)

# v1.0.5 (2017-10-09)

## Bug Fixes

* Fixed issues with activated `strictNullChecks`

## Features

* Added README note about circular dependency issues
* Removed ts files from publishing, added declaration files instead

## Breaking Changes

* `json2typescript` will now throw an exception if the `JsonProperty` decorator has `undefined` as second parameter. Pass `Any` if you want to skip the type check instead or don't pass the second parameter at all. `Any` is a type from `json2typescript` and needs to be imported

# v1.0.4 (2017-09-12)

## Bug Fixes

* Fixed bug in serialization mode

# v1.0.3 (2017-09-10)

## Bug Fixes

* Fixed issue with class properties when extending another class, closes [#22](https://github.com/dhlab-basel/json2typescript/issues/22)

## Features

* Allow `json2typescript` to work with `noImplicitAny`, closes [#23](https://github.com/dhlab-basel/json2typescript/issues/23)

# v1.0.2 (2017-07-31)

## Bug Fixes

* Fixed issue with `ValueCheckingMode` by using an enum instead of a nested class, closes [#10](https://github.com/dhlab-basel/json2typescript/issues/10) and [#11](https://github.com/dhlab-basel/json2typescript/issues/11) 
* Added missing js references, closes [#11](https://github.com/dhlab-basel/json2typescript/issues/11) and [#16](https://github.com/dhlab-basel/json2typescript/issues/16)

## Features

* Allow serialization the same way as deserialization, closes [#4](https://github.com/dhlab-basel/json2typescript/issues/4)
* Added smart methods `serialize()` and `deserialize()` for simplified usage
* Added custom converters, closes [#6](https://github.com/dhlab-basel/json2typescript/issues/6)
* Use class methods instead of static methods, closes [#14](https://github.com/dhlab-basel/json2typescript/issues/14)

## Breaking Changes

* Use an instance of `JsonConvert` and its class methods instead of the static methods
* The static class properties `valueCheckingMode` and `debugMode` are not static anymore. `debugMode` has been renamed to `operationMode`. Their values should be assigned through the given enums with the same name
* Removed the string method `deserializeString()` due to the fact that it is the same as `jsonConvert.deserialize()` combined with `JSON.stringify()`

# 0.9.6  (2017-01-18) 
Fixed errors in ReadMe and small bug on JsonConvert.

# 0.9.5  (2017-12-11): 
New method for deserializing array of objects.

# 0.9.4  (2017-11-22): 
Class properties are now not overridden to `undefined` if there is no decorator and no matching json value.

# 0.9.3  (2017-11-16): 
It is now possible to map an JSON object to an TypeScript array, then the object keys become the array keys. Also, class properties can be set to optional. See below in the chapter "decorators" for more information.

# 0.9.2  (2017-10-10): 
Added method `serializeString()`, changed property names and behaviour.

# 0.9.1 (2017-10-06): 
First version released to the public.
