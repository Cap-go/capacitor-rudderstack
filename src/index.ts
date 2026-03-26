import { registerPlugin } from '@capacitor/core';

import type {
  PluginVersionResult,
  RudderConfiguration,
  RudderLogLevelValue,
  RudderOptions,
  RudderProperties,
  RudderStackPlugin,
  RudderTraits,
} from './definitions';

interface InitializeCallOptions {
  writeKey: string;
  config?: RudderConfiguration;
  options?: RudderOptions;
}

interface IdentifyCallOptions {
  userId: string;
  traits?: RudderTraits;
  options?: RudderOptions;
}

interface GroupCallOptions {
  groupId: string;
  groupTraits?: RudderTraits;
  options?: RudderOptions;
}

interface TrackCallOptions {
  eventName: string;
  properties?: RudderProperties;
  options?: RudderOptions;
}

interface ScreenCallOptions {
  screenName: string;
  properties?: RudderProperties;
  options?: RudderOptions;
}

interface AliasCallOptions {
  newId: string;
  options?: RudderOptions;
}

interface DeviceTokenCallOptions {
  deviceToken: string;
}

interface AdvertisingIdCallOptions {
  advertisingId: string;
}

interface AnonymousIdCallOptions {
  anonymousId: string;
}

interface OptOutCallOptions {
  optOut: boolean;
}

interface NativeRudderStackPlugin {
  initialize(options: InitializeCallOptions): Promise<void>;
  identify(options: IdentifyCallOptions): Promise<void>;
  group(options: GroupCallOptions): Promise<void>;
  track(options: TrackCallOptions): Promise<void>;
  screen(options: ScreenCallOptions): Promise<void>;
  alias(options: AliasCallOptions): Promise<void>;
  reset(): Promise<void>;
  flush(): Promise<void>;
  putDeviceToken(options: DeviceTokenCallOptions): Promise<void>;
  setAdvertisingId(options: AdvertisingIdCallOptions): Promise<void>;
  putAdvertisingId(options: AdvertisingIdCallOptions): Promise<void>;
  setAnonymousId(options: AnonymousIdCallOptions): Promise<void>;
  putAnonymousId(options: AnonymousIdCallOptions): Promise<void>;
  optOut(options: OptOutCallOptions): Promise<void>;
  getPluginVersion(): Promise<PluginVersionResult>;
}

type RudderClientWithStatics = RudderStackPlugin & {
  LogLevel: typeof RudderLogLevel;
};

const nativePlugin = registerPlugin<NativeRudderStackPlugin>('RudderStack', {
  web: () => import('./web').then((m) => new m.RudderStackWeb()),
});

export const RudderLogLevel: Record<string, RudderLogLevelValue> = Object.freeze({
  VERBOSE: 5,
  DEBUG: 4,
  INFO: 3,
  WARN: 2,
  ERROR: 1,
  NONE: 0,
});

function isValidString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

function isRecord(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isRudderOptions(value: unknown): value is RudderOptions {
  return isRecord(value) && ('externalIds' in value || 'integrations' in value);
}

function sanitizeConfig(config?: RudderConfiguration): RudderConfiguration | undefined {
  if (!config) {
    return undefined;
  }

  if (Array.isArray(config.factories) && config.factories.length > 0) {
    console.warn(
      'config.factories is ignored by @capgo/capacitor-rudderstack. Native Rudder destination factories are not implemented yet.',
    );
  }

  const { factories, ...safeConfig } = config;
  void factories;
  return safeConfig;
}

async function callIfValid<T>(value: T | undefined, errorMessage: string, action: () => Promise<void>): Promise<void> {
  if (value === undefined) {
    console.log(errorMessage);
    return;
  }

  await action();
}

const RudderClient: RudderClientWithStatics = {
  async initialize(writeKey, config, options) {
    if (!isValidString(writeKey)) {
      const message = 'WriteKey is Invalid, Aborting SDK Initialization';
      console.log(message);
      throw new Error(message);
    }

    let resolvedConfig = config;
    let resolvedOptions = options;

    if (isRudderOptions(config)) {
      resolvedOptions = config;
      resolvedConfig = undefined;
    }

    if (resolvedOptions !== undefined && !isRudderOptions(resolvedOptions)) {
      console.log('Options is invalid, setting it to null');
      resolvedOptions = undefined;
    }

    await nativePlugin.initialize({
      writeKey,
      config: sanitizeConfig(resolvedConfig as RudderConfiguration | undefined),
      options: resolvedOptions,
    });
  },

  async identify(userId, traits, options) {
    if (!isValidString(userId)) {
      console.log('userId is Invalid, dropping identify call');
      return;
    }

    let resolvedTraits = traits;
    let resolvedOptions = options;

    if (isRudderOptions(traits)) {
      resolvedOptions = traits;
      resolvedTraits = undefined;
    }

    if (resolvedOptions !== undefined && !isRudderOptions(resolvedOptions)) {
      console.log('Options is invalid, setting it to null');
      resolvedOptions = undefined;
    }

    await nativePlugin.identify({
      userId,
      traits: resolvedTraits as RudderTraits | undefined,
      options: resolvedOptions,
    });
  },

  async group(groupId, groupTraits, options) {
    if (!isValidString(groupId)) {
      console.log('groupId is Invalid, dropping group call');
      return;
    }

    let resolvedTraits = groupTraits;
    let resolvedOptions = options;

    if (isRudderOptions(groupTraits)) {
      resolvedOptions = groupTraits;
      resolvedTraits = undefined;
    }

    if (resolvedOptions !== undefined && !isRudderOptions(resolvedOptions)) {
      console.log('Options is invalid, setting it to null');
      resolvedOptions = undefined;
    }

    await nativePlugin.group({
      groupId,
      groupTraits: resolvedTraits as RudderTraits | undefined,
      options: resolvedOptions,
    });
  },

  async track(eventName, properties, options) {
    if (!isValidString(eventName)) {
      console.log('eventName is Invalid, dropping track call');
      return;
    }

    let resolvedProperties = properties;
    let resolvedOptions = options;

    if (isRudderOptions(properties)) {
      resolvedOptions = properties;
      resolvedProperties = undefined;
    }

    if (resolvedOptions !== undefined && !isRudderOptions(resolvedOptions)) {
      console.log('Options is invalid, setting it to null');
      resolvedOptions = undefined;
    }

    await nativePlugin.track({
      eventName,
      properties: resolvedProperties as RudderProperties | undefined,
      options: resolvedOptions,
    });
  },

  async screen(screenName, properties, options) {
    if (!isValidString(screenName)) {
      console.log('screenName is Invalid, dropping screen call');
      return;
    }

    let resolvedProperties = properties;
    let resolvedOptions = options;

    if (isRudderOptions(properties)) {
      resolvedOptions = properties;
      resolvedProperties = undefined;
    }

    if (resolvedOptions !== undefined && !isRudderOptions(resolvedOptions)) {
      console.log('Options is invalid, setting it to null');
      resolvedOptions = undefined;
    }

    await nativePlugin.screen({
      screenName,
      properties: resolvedProperties as RudderProperties | undefined,
      options: resolvedOptions,
    });
  },

  async alias(newId, options) {
    if (!isValidString(newId)) {
      console.log('newId is Invalid, dropping alias call');
      return;
    }

    const resolvedOptions = options !== undefined && !isRudderOptions(options) ? undefined : options;
    if (options !== undefined && resolvedOptions === undefined) {
      console.log('Options is invalid, setting it to null');
    }

    await nativePlugin.alias({
      newId,
      options: resolvedOptions,
    });
  },

  async reset() {
    await nativePlugin.reset();
  },

  async flush() {
    await nativePlugin.flush();
  },

  async putDeviceToken(deviceToken) {
    await callIfValid(
      isValidString(deviceToken) ? deviceToken : undefined,
      'deviceToken is Invalid, dropping putDeviceToken call',
      () => nativePlugin.putDeviceToken({ deviceToken }),
    );
  },

  async setAdvertisingId(advertisingId) {
    await this.putAdvertisingId(advertisingId);
  },

  async putAdvertisingId(advertisingId) {
    await callIfValid(
      isValidString(advertisingId) ? advertisingId : undefined,
      'advertisingId is Invalid, dropping putAdvertisingId call',
      () => nativePlugin.putAdvertisingId({ advertisingId }),
    );
  },

  async setAnonymousId(anonymousId) {
    await this.putAnonymousId(anonymousId);
  },

  async putAnonymousId(anonymousId) {
    await callIfValid(
      isValidString(anonymousId) ? anonymousId : undefined,
      'anonymousId is Invalid, dropping putAnonymousId call',
      () => nativePlugin.putAnonymousId({ anonymousId }),
    );
  },

  async optOut(optOut) {
    if (!isValidBoolean(optOut)) {
      console.log('optOut is Invalid, dropping optOut call');
      return;
    }

    await nativePlugin.optOut({ optOut });
  },

  async getPluginVersion() {
    return nativePlugin.getPluginVersion();
  },

  LogLevel: RudderLogLevel,
};

const RudderStack = RudderClient;

export * from './definitions';
export { RudderClient, RudderStack };
