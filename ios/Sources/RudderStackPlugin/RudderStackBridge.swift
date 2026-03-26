import Foundation
import Rudder

enum RudderStackBridgeError: LocalizedError {
    case initializationFailed
    case notInitialized

    var errorDescription: String? {
        switch self {
        case .initializationFailed:
            return "Failed to initialize RudderStack SDK"
        case .notInitialized:
            return "RudderStack SDK is not initialized"
        }
    }
}

final class RudderStackBridge {
    private let pluginVersion = "8.0.0"
    private var initialized = false

    var version: String {
        pluginVersion
    }

    func initialize(writeKey: String, config: [String: Any]?, options: [String: Any]?) throws {
        let rudderConfig = buildConfig(writeKey: writeKey, from: config)
        let rudderOptions = buildOptions(from: options)
        let client = RSClient.sharedInstance()
        client.configure(with: rudderConfig)
        if let rudderOptions {
            client.setOption(rudderOptions)
        }
        initialized = true
    }

    func identify(userId: String, traits: [String: Any]?, options: [String: Any]?) throws {
        let client = try requireClient()
        let option = buildOptions(from: options)

        if let option, let traits {
            client.identify(userId, traits: traits, option: option)
        } else if let traits {
            client.identify(userId, traits: traits)
        } else if let option {
            client.identify(userId, traits: [:], option: option)
        } else {
            client.identify(userId)
        }
    }

    func group(groupId: String, groupTraits: [String: Any]?, options: [String: Any]?) throws {
        let client = try requireClient()
        let option = buildOptions(from: options)
        let traits = stringifyMap(groupTraits)

        if let option, let traits {
            client.group(groupId, traits: traits, option: option)
        } else if let traits {
            client.group(groupId, traits: traits)
        } else if let option {
            client.group(groupId, traits: [:], option: option)
        } else {
            client.group(groupId)
        }
    }

    func track(eventName: String, properties: [String: Any]?, options: [String: Any]?) throws {
        let client = try requireClient()
        let option = buildOptions(from: options)

        if let option, let properties {
            client.track(eventName, properties: properties, option: option)
        } else if let properties {
            client.track(eventName, properties: properties)
        } else if let option {
            client.track(eventName, properties: [:], option: option)
        } else {
            client.track(eventName)
        }
    }

    func screen(screenName: String, properties: [String: Any]?, options: [String: Any]?) throws {
        let client = try requireClient()
        let option = buildOptions(from: options)

        if let option, let properties {
            client.screen(screenName, category: "", properties: properties, option: option)
        } else if let properties {
            client.screen(screenName, properties: properties)
        } else if let option {
            client.screen(screenName, category: "", properties: [:], option: option)
        } else {
            client.screen(screenName)
        }
    }

    func alias(newId: String, options: [String: Any]?) throws {
        let client = try requireClient()
        if let option = buildOptions(from: options) {
            client.alias(newId, option: option)
        } else {
            client.alias(newId)
        }
    }

    func reset() throws {
        try requireClient().reset()
    }

    func flush() throws {
        try requireClient().flush()
    }

    func putDeviceToken(_ deviceToken: String) {
        RSClient.sharedInstance().setDeviceToken(deviceToken)
    }

    func putAdvertisingId(_ advertisingId: String) {
        RSClient.sharedInstance().setAdvertisingId(advertisingId)
    }

    func putAnonymousId(_ anonymousId: String) {
        RSClient.sharedInstance().setAnonymousId(anonymousId)
    }

    func optOut(_ optOut: Bool) throws {
        try requireClient().setOptOutStatus(optOut)
    }

    private func requireClient() throws -> RSClient {
        guard initialized else {
            throw RudderStackBridgeError.notInitialized
        }
        return RSClient.sharedInstance()
    }

    private func buildConfig(writeKey: String, from config: [String: Any]?) -> RSConfig {
        let configuration = RSConfig(writeKey: writeKey)

        if let value = string(from: config?["dataPlaneUrl"]) {
            configuration.dataPlaneURL(value)
        }
        if let value = int(from: config?["flushQueueSize"]) {
            configuration.flushQueueSize(value)
        }
        if let value = int(from: config?["dbCountThreshold"]) {
            configuration.dbCountThreshold(value)
        }
        if let value = int(from: config?["sleepTimeOut"]) {
            configuration.sleepTimeOut(value)
        }
        if let value = int(from: config?["logLevel"]), let logLevel = RSLogLevel(rawValue: value) {
            configuration.loglevel(logLevel)
        }
        if let value = bool(from: config?["trackLifecycleEvents"]) {
            configuration.trackLifecycleEvents(value)
        }
        if let value = bool(from: config?["recordScreenViews"]) {
            configuration.recordScreenViews(value)
        }
        if let value = string(from: config?["controlPlaneUrl"]) {
            configuration.controlPlaneURL(value)
        }

        return configuration
    }

    private func buildOptions(from options: [String: Any]?) -> RSOption? {
        guard let options else {
            return nil
        }

        let rudderOption = RSOption()

        if let externalIds = options["externalIds"] as? [String: Any] {
            for (key, value) in externalIds {
                if let id = string(from: value) {
                    rudderOption.putExternalId(key, withId: id)
                }
            }
        }

        if let integrations = options["integrations"] as? [String: Any] {
            for (key, value) in integrations {
                if let enabled = bool(from: value) {
                    rudderOption.putIntegration(key, isEnabled: enabled)
                }
            }
        }

        return rudderOption
    }

    private func string(from value: Any?) -> String? {
        switch value {
        case let value as String:
            return value
        case let value as NSNumber:
            return value.stringValue
        default:
            return nil
        }
    }

    private func int(from value: Any?) -> Int? {
        switch value {
        case let value as NSNumber:
            return value.intValue
        case let value as String:
            return Int(value)
        default:
            return nil
        }
    }

    private func bool(from value: Any?) -> Bool? {
        switch value {
        case let value as Bool:
            return value
        case let value as NSNumber:
            return value.boolValue
        case let value as String:
            return Bool(value)
        default:
            return nil
        }
    }

    private func stringifyMap(_ value: [String: Any]?) -> [String: String]? {
        guard let value else {
            return nil
        }

        var result: [String: String] = [:]
        for (key, rawValue) in value {
            if let stringValue = string(from: rawValue) {
                result[key] = stringValue
            }
        }

        return result
    }
}
