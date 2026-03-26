# @capgo/capacitor-rudderstack
 <a href="https://capgo.app/"><img src='https://raw.githubusercontent.com/Cap-go/capgo/main/assets/capgo_banner.png' alt='Capgo - Instant updates for capacitor'/></a>

<div align="center">
  <h2><a href="https://capgo.app/?ref=plugin_rudderstack"> ➡️ Get Instant updates for your App with Capgo</a></h2>
  <h2><a href="https://capgo.app/consulting/?ref=plugin_rudderstack"> Missing a feature? We’ll build the plugin for you 💪</a></h2>
</div>

Capacitor plugin for RudderStack analytics and event tracking.

This package is a Capacitor port of [rudder-sdk-cordova](https://github.com/rudderlabs/rudder-sdk-cordova/tree/develop) with native Android and iOS bridges built for Capacitor 8.

## Documentation

The most complete doc is available here: https://capgo.app/docs/plugins/rudderstack/

## Compatibility

| Plugin version | Capacitor compatibility | Maintained |
| -------------- | ----------------------- | ---------- |
| v8.\*.\*       | v8.\*.\*                | ✅          |
| v7.\*.\*       | v7.\*.\*                | On demand   |
| v6.\*.\*       | v6.\*.\*                | ❌          |

> **Note:** The major version of this plugin follows the major version of Capacitor. Use the version that matches your Capacitor installation. Only the latest major version is actively maintained.

## Install

```bash
bun add @capgo/capacitor-rudderstack
bunx cap sync
```

## Usage

```ts
import { RudderStack } from '@capgo/capacitor-rudderstack';

await RudderStack.initialize('YOUR_WRITE_KEY', {
  dataPlaneUrl: 'https://your-dataplane.rudderstack.com',
  trackLifecycleEvents: true,
  logLevel: RudderStack.LogLevel.INFO,
});

await RudderStack.identify('user_123', {
  email: 'user@example.com',
  plan: 'pro',
});

await RudderStack.track('Checkout Started', {
  value: 49,
  currency: 'EUR',
});
```

The API intentionally follows the Cordova plugin shape so existing Rudder Cordova integrations can migrate with minimal call-site changes.

## Behavior

- Android uses the RudderStack Android SDK and exposes the Cordova-compatible analytics surface through a Capacitor bridge.
- iOS uses the RudderStack iOS SDK with a Swift bridge that matches the same public API.
- Web is a lightweight compatibility implementation intended for development and API parity. It does not send events to RudderStack.
- `config.factories` from the Cordova plugin is currently ignored. Native destination factory companion plugins are not part of this first Capacitor port.

## API

<docgen-index>

* [`initialize(...)`](#initialize)
* [`identify(...)`](#identify)
* [`group(...)`](#group)
* [`track(...)`](#track)
* [`screen(...)`](#screen)
* [`alias(...)`](#alias)
* [`reset()`](#reset)
* [`flush()`](#flush)
* [`putDeviceToken(...)`](#putdevicetoken)
* [`setAdvertisingId(...)`](#setadvertisingid)
* [`putAdvertisingId(...)`](#putadvertisingid)
* [`setAnonymousId(...)`](#setanonymousid)
* [`putAnonymousId(...)`](#putanonymousid)
* [`optOut(...)`](#optout)
* [`getPluginVersion()`](#getpluginversion)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

Capacitor API that mirrors the public surface of `rudder-sdk-cordova`.

### initialize(...)

```typescript
initialize(writeKey: string, config?: RudderConfiguration | RudderOptions | undefined, options?: RudderOptions | undefined) => Promise<void>
```

Initializes the RudderStack client.

The method keeps the Cordova signature, so the second argument may be either a config object or
a Rudder options object.

| Param          | Type                                                                                                              |
| -------------- | ----------------------------------------------------------------------------------------------------------------- |
| **`writeKey`** | <code>string</code>                                                                                               |
| **`config`**   | <code><a href="#rudderconfiguration">RudderConfiguration</a> \| <a href="#rudderoptions">RudderOptions</a></code> |
| **`options`**  | <code><a href="#rudderoptions">RudderOptions</a></code>                                                           |

--------------------


### identify(...)

```typescript
identify(userId: string, traits?: RudderOptions | RudderTraits | undefined, options?: RudderOptions | undefined) => Promise<void>
```

Sends an identify call for the provided user id.

| Param         | Type                                                                                                |
| ------------- | --------------------------------------------------------------------------------------------------- |
| **`userId`**  | <code>string</code>                                                                                 |
| **`traits`**  | <code><a href="#rudderoptions">RudderOptions</a> \| <a href="#ruddertraits">RudderTraits</a></code> |
| **`options`** | <code><a href="#rudderoptions">RudderOptions</a></code>                                             |

--------------------


### group(...)

```typescript
group(groupId: string, groupTraits?: RudderOptions | RudderTraits | undefined, options?: RudderOptions | undefined) => Promise<void>
```

Sends a group call for the provided group id.

| Param             | Type                                                                                                |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| **`groupId`**     | <code>string</code>                                                                                 |
| **`groupTraits`** | <code><a href="#rudderoptions">RudderOptions</a> \| <a href="#ruddertraits">RudderTraits</a></code> |
| **`options`**     | <code><a href="#rudderoptions">RudderOptions</a></code>                                             |

--------------------


### track(...)

```typescript
track(eventName: string, properties?: RudderOptions | RudderProperties | undefined, options?: RudderOptions | undefined) => Promise<void>
```

Sends a track call for the provided event name.

| Param            | Type                                                                                                        |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| **`eventName`**  | <code>string</code>                                                                                         |
| **`properties`** | <code><a href="#rudderoptions">RudderOptions</a> \| <a href="#rudderproperties">RudderProperties</a></code> |
| **`options`**    | <code><a href="#rudderoptions">RudderOptions</a></code>                                                     |

--------------------


### screen(...)

```typescript
screen(screenName: string, properties?: RudderOptions | RudderProperties | undefined, options?: RudderOptions | undefined) => Promise<void>
```

Sends a screen call for the provided screen name.

| Param            | Type                                                                                                        |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| **`screenName`** | <code>string</code>                                                                                         |
| **`properties`** | <code><a href="#rudderoptions">RudderOptions</a> \| <a href="#rudderproperties">RudderProperties</a></code> |
| **`options`**    | <code><a href="#rudderoptions">RudderOptions</a></code>                                                     |

--------------------


### alias(...)

```typescript
alias(newId: string, options?: RudderOptions | undefined) => Promise<void>
```

Aliases the current user to a new identifier.

| Param         | Type                                                    |
| ------------- | ------------------------------------------------------- |
| **`newId`**   | <code>string</code>                                     |
| **`options`** | <code><a href="#rudderoptions">RudderOptions</a></code> |

--------------------


### reset()

```typescript
reset() => Promise<void>
```

Resets the current RudderStack identity state.

--------------------


### flush()

```typescript
flush() => Promise<void>
```

Flushes queued events immediately.

--------------------


### putDeviceToken(...)

```typescript
putDeviceToken(deviceToken: string) => Promise<void>
```

Sets the push token that RudderStack forwards to supported destinations.

| Param             | Type                |
| ----------------- | ------------------- |
| **`deviceToken`** | <code>string</code> |

--------------------


### setAdvertisingId(...)

```typescript
setAdvertisingId(advertisingId: string) => Promise<void>
```

| Param               | Type                |
| ------------------- | ------------------- |
| **`advertisingId`** | <code>string</code> |

--------------------


### putAdvertisingId(...)

```typescript
putAdvertisingId(advertisingId: string) => Promise<void>
```

Sets a custom advertising id value.

| Param               | Type                |
| ------------------- | ------------------- |
| **`advertisingId`** | <code>string</code> |

--------------------


### setAnonymousId(...)

```typescript
setAnonymousId(anonymousId: string) => Promise<void>
```

| Param             | Type                |
| ----------------- | ------------------- |
| **`anonymousId`** | <code>string</code> |

--------------------


### putAnonymousId(...)

```typescript
putAnonymousId(anonymousId: string) => Promise<void>
```

Sets a custom anonymous id value.

| Param             | Type                |
| ----------------- | ------------------- |
| **`anonymousId`** | <code>string</code> |

--------------------


### optOut(...)

```typescript
optOut(optOut: boolean) => Promise<void>
```

Toggles RudderStack tracking opt-out.

| Param        | Type                 |
| ------------ | -------------------- |
| **`optOut`** | <code>boolean</code> |

--------------------


### getPluginVersion()

```typescript
getPluginVersion() => Promise<PluginVersionResult>
```

Returns the plugin version marker from the native implementation.

**Returns:** <code>Promise&lt;<a href="#pluginversionresult">PluginVersionResult</a>&gt;</code>

--------------------


### Interfaces


#### RudderConfiguration

Supported configuration keys for the underlying RudderStack native SDKs.

| Prop                        | Type                                                                | Description                                                                                                                                                                                                     |
| --------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`dataPlaneUrl`**          | <code>string</code>                                                 | RudderStack data plane URL.                                                                                                                                                                                     |
| **`flushQueueSize`**        | <code>number</code>                                                 | Number of events to batch before a flush.                                                                                                                                                                       |
| **`dbCountThreshold`**      | <code>number</code>                                                 | Database row threshold that triggers pruning on Android and iOS.                                                                                                                                                |
| **`configRefreshInterval`** | <code>number</code>                                                 | Server config refresh interval in hours.                                                                                                                                                                        |
| **`logLevel`**              | <code><a href="#rudderloglevelvalue">RudderLogLevelValue</a></code> | RudderStack log verbosity.                                                                                                                                                                                      |
| **`sleepTimeOut`**          | <code>number</code>                                                 | Sleep timeout / sleep count used by the native SDK.                                                                                                                                                             |
| **`autoCollectAdvertId`**   | <code>boolean</code>                                                | Android only. Lets the native SDK collect the advertising identifier automatically.                                                                                                                             |
| **`trackLifecycleEvents`**  | <code>boolean</code>                                                | Tracks `Application Installed`, `Application Updated`, and `Application Opened` automatically.                                                                                                                  |
| **`controlPlaneUrl`**       | <code>string</code>                                                 | RudderStack control plane URL.                                                                                                                                                                                  |
| **`recordScreenViews`**     | <code>boolean</code>                                                | Enables automatic screen tracking where supported by the native SDK.                                                                                                                                            |
| **`factories`**             | <code>any[]</code>                                                  | Ignored in this Capacitor port. The Cordova SDK uses this field to bootstrap native destination factories from companion plugins. Those extension packages are not implemented in this first Capacitor release. |


#### RudderOptions

RudderStack per-call options.

| Prop               | Type                                                             | Description                                             |
| ------------------ | ---------------------------------------------------------------- | ------------------------------------------------------- |
| **`externalIds`**  | <code><a href="#record">Record</a>&lt;string, string&gt;</code>  | External identifiers forwarded with the event.          |
| **`integrations`** | <code><a href="#record">Record</a>&lt;string, boolean&gt;</code> | Destination enablement flags keyed by integration name. |


#### PluginVersionResult

Plugin version payload.

| Prop          | Type                | Description                                                 |
| ------------- | ------------------- | ----------------------------------------------------------- |
| **`version`** | <code>string</code> | Version identifier returned by the platform implementation. |


### Type Aliases


#### RudderLogLevelValue

RudderStack log level values exposed for migration convenience.

<code>0 | 1 | 2 | 3 | 4 | 5</code>


#### Record

Construct a type with a set of properties K of type T

<code>{ [P in K]: T; }</code>


#### RudderTraits

Traits payload accepted by `identify` and `group`.

<code><a href="#record">Record</a>&lt;string, any&gt;</code>


#### RudderProperties

Properties payload accepted by `track` and `screen`.

<code><a href="#record">Record</a>&lt;string, any&gt;</code>

</docgen-api>
