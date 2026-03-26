/**
 * Plugin version payload.
 */
export interface PluginVersionResult {
  /**
   * Version identifier returned by the platform implementation.
   */
  version: string;
}

/**
 * Supported configuration keys for the underlying RudderStack native SDKs.
 */
export interface RudderConfiguration {
  /**
   * RudderStack data plane URL.
   */
  dataPlaneUrl?: string;

  /**
   * Number of events to batch before a flush.
   */
  flushQueueSize?: number;

  /**
   * Database row threshold that triggers pruning on Android and iOS.
   */
  dbCountThreshold?: number;

  /**
   * Server config refresh interval in hours.
   */
  configRefreshInterval?: number;

  /**
   * RudderStack log verbosity.
   */
  logLevel?: RudderLogLevelValue;

  /**
   * Sleep timeout / sleep count used by the native SDK.
   */
  sleepTimeOut?: number;

  /**
   * Android only. Lets the native SDK collect the advertising identifier automatically.
   */
  autoCollectAdvertId?: boolean;

  /**
   * Tracks `Application Installed`, `Application Updated`, and `Application Opened` automatically.
   */
  trackLifecycleEvents?: boolean;

  /**
   * RudderStack control plane URL.
   */
  controlPlaneUrl?: string;

  /**
   * Enables automatic screen tracking where supported by the native SDK.
   */
  recordScreenViews?: boolean;

  /**
   * Ignored in this Capacitor port.
   *
   * The Cordova SDK uses this field to bootstrap native destination factories from companion plugins.
   * Those extension packages are not implemented in this first Capacitor release.
   */
  factories?: any[];
}

/**
 * RudderStack per-call options.
 */
export interface RudderOptions {
  /**
   * External identifiers forwarded with the event.
   */
  externalIds?: Record<string, string>;

  /**
   * Destination enablement flags keyed by integration name.
   */
  integrations?: Record<string, boolean>;
}

/**
 * Traits payload accepted by `identify` and `group`.
 */
export type RudderTraits = Record<string, any>;

/**
 * Properties payload accepted by `track` and `screen`.
 */
export type RudderProperties = Record<string, any>;

/**
 * RudderStack log level values exposed for migration convenience.
 */
export type RudderLogLevelValue = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * Capacitor API that mirrors the public surface of `rudder-sdk-cordova`.
 */
export interface RudderStackPlugin {
  /**
   * Initializes the RudderStack client.
   *
   * The method keeps the Cordova signature, so the second argument may be either a config object or
   * a Rudder options object.
   */
  initialize(writeKey: string, config?: RudderConfiguration | RudderOptions, options?: RudderOptions): Promise<void>;

  /**
   * Sends an identify call for the provided user id.
   */
  identify(userId: string, traits?: RudderTraits | RudderOptions, options?: RudderOptions): Promise<void>;

  /**
   * Sends a group call for the provided group id.
   */
  group(groupId: string, groupTraits?: RudderTraits | RudderOptions, options?: RudderOptions): Promise<void>;

  /**
   * Sends a track call for the provided event name.
   */
  track(eventName: string, properties?: RudderProperties | RudderOptions, options?: RudderOptions): Promise<void>;

  /**
   * Sends a screen call for the provided screen name.
   */
  screen(screenName: string, properties?: RudderProperties | RudderOptions, options?: RudderOptions): Promise<void>;

  /**
   * Aliases the current user to a new identifier.
   */
  alias(newId: string, options?: RudderOptions): Promise<void>;

  /**
   * Resets the current RudderStack identity state.
   */
  reset(): Promise<void>;

  /**
   * Flushes queued events immediately.
   */
  flush(): Promise<void>;

  /**
   * Sets the push token that RudderStack forwards to supported destinations.
   */
  putDeviceToken(deviceToken: string): Promise<void>;

  /**
   * @deprecated Use `putAdvertisingId` instead.
   */
  setAdvertisingId(advertisingId: string): Promise<void>;

  /**
   * Sets a custom advertising id value.
   */
  putAdvertisingId(advertisingId: string): Promise<void>;

  /**
   * @deprecated Use `putAnonymousId` instead.
   */
  setAnonymousId(anonymousId: string): Promise<void>;

  /**
   * Sets a custom anonymous id value.
   */
  putAnonymousId(anonymousId: string): Promise<void>;

  /**
   * Toggles RudderStack tracking opt-out.
   */
  optOut(optOut: boolean): Promise<void>;

  /**
   * Returns the plugin version marker from the native implementation.
   */
  getPluginVersion(): Promise<PluginVersionResult>;
}
