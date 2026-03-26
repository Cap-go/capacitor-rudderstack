package app.capgo.rudderstack;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "RudderStack")
public class RudderStackPlugin extends Plugin {

    private static final String VERSION = BuildConfig.VERSION_NAME;

    private RudderStackBridge implementation;

    @Override
    public void load() {
        implementation = new RudderStackBridge(getContext());
    }

    @PluginMethod
    public void initialize(final PluginCall call) {
        final String writeKey = call.getString("writeKey");
        if (writeKey == null || writeKey.trim().isEmpty()) {
            call.reject("writeKey is required");
            return;
        }

        try {
            implementation.initialize(writeKey, call.getObject("config"), call.getObject("options"));
            call.resolve();
        } catch (Exception exception) {
            call.reject(exception.getMessage(), exception);
        }
    }

    @PluginMethod
    public void identify(final PluginCall call) {
        final String userId = call.getString("userId");
        if (userId == null || userId.trim().isEmpty()) {
            call.reject("userId is required");
            return;
        }

        try {
            implementation.identify(userId, call.getObject("traits"), call.getObject("options"));
            call.resolve();
        } catch (Exception exception) {
            call.reject(exception.getMessage(), exception);
        }
    }

    @PluginMethod
    public void group(final PluginCall call) {
        final String groupId = call.getString("groupId");
        if (groupId == null || groupId.trim().isEmpty()) {
            call.reject("groupId is required");
            return;
        }

        try {
            implementation.group(groupId, call.getObject("groupTraits"), call.getObject("options"));
            call.resolve();
        } catch (Exception exception) {
            call.reject(exception.getMessage(), exception);
        }
    }

    @PluginMethod
    public void track(final PluginCall call) {
        final String eventName = call.getString("eventName");
        if (eventName == null || eventName.trim().isEmpty()) {
            call.reject("eventName is required");
            return;
        }

        try {
            implementation.track(eventName, call.getObject("properties"), call.getObject("options"));
            call.resolve();
        } catch (Exception exception) {
            call.reject(exception.getMessage(), exception);
        }
    }

    @PluginMethod
    public void screen(final PluginCall call) {
        final String screenName = call.getString("screenName");
        if (screenName == null || screenName.trim().isEmpty()) {
            call.reject("screenName is required");
            return;
        }

        try {
            implementation.screen(screenName, call.getObject("properties"), call.getObject("options"));
            call.resolve();
        } catch (Exception exception) {
            call.reject(exception.getMessage(), exception);
        }
    }

    @PluginMethod
    public void alias(final PluginCall call) {
        final String newId = call.getString("newId");
        if (newId == null || newId.trim().isEmpty()) {
            call.reject("newId is required");
            return;
        }

        try {
            implementation.alias(newId, call.getObject("options"));
            call.resolve();
        } catch (Exception exception) {
            call.reject(exception.getMessage(), exception);
        }
    }

    @PluginMethod
    public void reset(final PluginCall call) {
        try {
            implementation.reset();
            call.resolve();
        } catch (Exception exception) {
            call.reject(exception.getMessage(), exception);
        }
    }

    @PluginMethod
    public void flush(final PluginCall call) {
        try {
            implementation.flush();
            call.resolve();
        } catch (Exception exception) {
            call.reject(exception.getMessage(), exception);
        }
    }

    @PluginMethod
    public void putDeviceToken(final PluginCall call) {
        final String deviceToken = call.getString("deviceToken");
        if (deviceToken == null || deviceToken.trim().isEmpty()) {
            call.reject("deviceToken is required");
            return;
        }

        implementation.putDeviceToken(deviceToken);
        call.resolve();
    }

    @PluginMethod
    public void setAdvertisingId(final PluginCall call) {
        putAdvertisingId(call);
    }

    @PluginMethod
    public void putAdvertisingId(final PluginCall call) {
        final String advertisingId = call.getString("advertisingId");
        if (advertisingId == null || advertisingId.trim().isEmpty()) {
            call.reject("advertisingId is required");
            return;
        }

        implementation.putAdvertisingId(advertisingId);
        call.resolve();
    }

    @PluginMethod
    public void setAnonymousId(final PluginCall call) {
        putAnonymousId(call);
    }

    @PluginMethod
    public void putAnonymousId(final PluginCall call) {
        final String anonymousId = call.getString("anonymousId");
        if (anonymousId == null || anonymousId.trim().isEmpty()) {
            call.reject("anonymousId is required");
            return;
        }

        implementation.putAnonymousId(anonymousId);
        call.resolve();
    }

    @PluginMethod
    public void optOut(final PluginCall call) {
        final Boolean optOut = call.getBoolean("optOut");
        if (optOut == null) {
            call.reject("optOut is required");
            return;
        }

        try {
            implementation.optOut(optOut);
            call.resolve();
        } catch (Exception exception) {
            call.reject(exception.getMessage(), exception);
        }
    }

    @PluginMethod
    public void getPluginVersion(final PluginCall call) {
        final JSObject ret = new JSObject();
        ret.put("version", VERSION);
        call.resolve(ret);
    }
}
