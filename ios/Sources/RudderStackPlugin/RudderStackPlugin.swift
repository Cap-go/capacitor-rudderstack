import Foundation
import Capacitor

@objc(RudderStackPlugin)
public class RudderStackPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "RudderStackPlugin"
    public let jsName = "RudderStack"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "initialize", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "identify", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "group", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "track", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "screen", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "alias", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "reset", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "flush", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "putDeviceToken", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setAdvertisingId", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "putAdvertisingId", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setAnonymousId", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "putAnonymousId", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "optOut", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getPluginVersion", returnType: CAPPluginReturnPromise)
    ]

    private let implementation = RudderStackBridge()

    @objc func initialize(_ call: CAPPluginCall) {
        guard let writeKey = call.getString("writeKey"), !writeKey.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else {
            call.reject("writeKey is required")
            return
        }

        do {
            try implementation.initialize(
                writeKey: writeKey,
                config: call.getObject("config"),
                options: call.getObject("options")
            )
            call.resolve()
        } catch {
            call.reject(error.localizedDescription)
        }
    }

    @objc func identify(_ call: CAPPluginCall) {
        guard let userId = call.getString("userId"), !userId.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else {
            call.reject("userId is required")
            return
        }

        do {
            try implementation.identify(
                userId: userId,
                traits: call.getObject("traits"),
                options: call.getObject("options")
            )
            call.resolve()
        } catch {
            call.reject(error.localizedDescription)
        }
    }

    @objc func group(_ call: CAPPluginCall) {
        guard let groupId = call.getString("groupId"), !groupId.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else {
            call.reject("groupId is required")
            return
        }

        do {
            try implementation.group(
                groupId: groupId,
                groupTraits: call.getObject("groupTraits"),
                options: call.getObject("options")
            )
            call.resolve()
        } catch {
            call.reject(error.localizedDescription)
        }
    }

    @objc func track(_ call: CAPPluginCall) {
        guard let eventName = call.getString("eventName"), !eventName.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else {
            call.reject("eventName is required")
            return
        }

        do {
            try implementation.track(
                eventName: eventName,
                properties: call.getObject("properties"),
                options: call.getObject("options")
            )
            call.resolve()
        } catch {
            call.reject(error.localizedDescription)
        }
    }

    @objc func screen(_ call: CAPPluginCall) {
        guard let screenName = call.getString("screenName"), !screenName.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else {
            call.reject("screenName is required")
            return
        }

        do {
            try implementation.screen(
                screenName: screenName,
                properties: call.getObject("properties"),
                options: call.getObject("options")
            )
            call.resolve()
        } catch {
            call.reject(error.localizedDescription)
        }
    }

    @objc func alias(_ call: CAPPluginCall) {
        guard let newId = call.getString("newId"), !newId.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else {
            call.reject("newId is required")
            return
        }

        do {
            try implementation.alias(
                newId: newId,
                options: call.getObject("options")
            )
            call.resolve()
        } catch {
            call.reject(error.localizedDescription)
        }
    }

    @objc func reset(_ call: CAPPluginCall) {
        do {
            try implementation.reset()
            call.resolve()
        } catch {
            call.reject(error.localizedDescription)
        }
    }

    @objc func flush(_ call: CAPPluginCall) {
        do {
            try implementation.flush()
            call.resolve()
        } catch {
            call.reject(error.localizedDescription)
        }
    }

    @objc func putDeviceToken(_ call: CAPPluginCall) {
        guard let deviceToken = call.getString("deviceToken"), !deviceToken.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else {
            call.reject("deviceToken is required")
            return
        }

        implementation.putDeviceToken(deviceToken)
        call.resolve()
    }

    @objc func setAdvertisingId(_ call: CAPPluginCall) {
        putAdvertisingId(call)
    }

    @objc func putAdvertisingId(_ call: CAPPluginCall) {
        guard let advertisingId = call.getString("advertisingId"), !advertisingId.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else {
            call.reject("advertisingId is required")
            return
        }

        implementation.putAdvertisingId(advertisingId)
        call.resolve()
    }

    @objc func setAnonymousId(_ call: CAPPluginCall) {
        putAnonymousId(call)
    }

    @objc func putAnonymousId(_ call: CAPPluginCall) {
        guard let anonymousId = call.getString("anonymousId"), !anonymousId.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else {
            call.reject("anonymousId is required")
            return
        }

        implementation.putAnonymousId(anonymousId)
        call.resolve()
    }

    @objc func optOut(_ call: CAPPluginCall) {
        guard let optOut = call.getBool("optOut") else {
            call.reject("optOut is required")
            return
        }

        do {
            try implementation.optOut(optOut)
            call.resolve()
        } catch {
            call.reject(error.localizedDescription)
        }
    }

    @objc func getPluginVersion(_ call: CAPPluginCall) {
        call.resolve([
            "version": implementation.version
        ])
    }
}
