import { WebPlugin } from '@capacitor/core';

import type {
  PluginVersionResult,
  RudderConfiguration,
  RudderOptions,
  RudderProperties,
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

export class RudderStackWeb extends WebPlugin {
  private initialized = false;

  async initialize(options: InitializeCallOptions): Promise<void> {
    if (!options.writeKey) {
      throw new Error('writeKey is required');
    }

    this.initialized = true;
  }

  async identify(options: IdentifyCallOptions): Promise<void> {
    this.ensureInitialized();
    void options;
  }

  async group(options: GroupCallOptions): Promise<void> {
    this.ensureInitialized();
    void options;
  }

  async track(options: TrackCallOptions): Promise<void> {
    this.ensureInitialized();
    void options;
  }

  async screen(options: ScreenCallOptions): Promise<void> {
    this.ensureInitialized();
    void options;
  }

  async alias(options: AliasCallOptions): Promise<void> {
    this.ensureInitialized();
    void options;
  }

  async reset(): Promise<void> {
    this.ensureInitialized();
  }

  async flush(): Promise<void> {
    this.ensureInitialized();
  }

  async putDeviceToken(options: { deviceToken: string }): Promise<void> {
    void options.deviceToken;
  }

  async setAdvertisingId(options: { advertisingId: string }): Promise<void> {
    await this.putAdvertisingId(options);
  }

  async putAdvertisingId(options: { advertisingId: string }): Promise<void> {
    void options.advertisingId;
  }

  async setAnonymousId(options: { anonymousId: string }): Promise<void> {
    await this.putAnonymousId(options);
  }

  async putAnonymousId(options: { anonymousId: string }): Promise<void> {
    void options.anonymousId;
  }

  async optOut(options: { optOut: boolean }): Promise<void> {
    this.ensureInitialized();
    void options.optOut;
  }

  async getPluginVersion(): Promise<PluginVersionResult> {
    return {
      version: 'web',
    };
  }

  private ensureInitialized(): void {
    if (!this.initialized) {
      throw new Error('RudderStack SDK is not initialized');
    }
  }
}
