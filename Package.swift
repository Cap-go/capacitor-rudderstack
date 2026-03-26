// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapgoCapacitorRudderStack",
    platforms: [.iOS(.v15)],
    products: [
        .library(
            name: "CapgoCapacitorRudderStack",
            targets: ["RudderStackPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "8.0.0"),
        .package(url: "https://github.com/rudderlabs/rudder-sdk-ios.git", from: "2.6.0")
    ],
    targets: [
        .target(
            name: "RudderStackPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm"),
                .product(name: "Rudder", package: "rudder-sdk-ios")
            ],
            path: "ios/Sources/RudderStackPlugin"),
        .testTarget(
            name: "RudderStackPluginTests",
            dependencies: ["RudderStackPlugin"],
            path: "ios/Tests/RudderStackPluginTests")
    ]
)
