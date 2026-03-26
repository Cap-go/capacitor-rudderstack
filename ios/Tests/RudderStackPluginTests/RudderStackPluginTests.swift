import XCTest
@testable import RudderStackPlugin

class RudderStackPluginTests: XCTestCase {
    func testVersionConstant() {
        XCTAssertEqual(RudderStackBridge().version, "8.0.0")
    }
}
