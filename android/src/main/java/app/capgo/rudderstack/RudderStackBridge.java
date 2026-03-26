package app.capgo.rudderstack;

import android.content.Context;
import androidx.annotation.Nullable;
import com.getcapacitor.JSObject;
import com.rudderstack.android.sdk.core.RudderClient;
import com.rudderstack.android.sdk.core.RudderConfig;
import com.rudderstack.android.sdk.core.RudderOption;
import com.rudderstack.android.sdk.core.RudderProperty;
import com.rudderstack.android.sdk.core.RudderTraits;
import com.rudderstack.android.sdk.core.RudderTraitsBuilder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.json.JSONArray;
import org.json.JSONObject;

final class RudderStackBridge {

    private final Context context;
    private @Nullable RudderClient client;

    RudderStackBridge(final Context context) {
        this.context = context.getApplicationContext();
    }

    void initialize(final String writeKey, @Nullable final JSObject configJson, @Nullable final JSObject optionsJson) {
        final RudderConfig config = getRudderConfig(configJson);
        final RudderOption options = getRudderOption(optionsJson);
        client = RudderClient.getInstance(context, writeKey, config, options);

        if (client == null) {
            throw new IllegalStateException("Failed to initialize RudderStack SDK");
        }
    }

    void identify(final String userId, @Nullable final JSObject traitsJson, @Nullable final JSObject optionsJson) {
        requireClient().identify(userId, getRudderTraits(traitsJson), getRudderOption(optionsJson));
    }

    void group(final String groupId, @Nullable final JSObject traitsJson, @Nullable final JSObject optionsJson) {
        requireClient().group(groupId, getRudderTraits(traitsJson), getRudderOption(optionsJson));
    }

    void track(final String eventName, @Nullable final JSObject propertiesJson, @Nullable final JSObject optionsJson) {
        requireClient().track(eventName, getRudderProperty(propertiesJson), getRudderOption(optionsJson));
    }

    void screen(final String screenName, @Nullable final JSObject propertiesJson, @Nullable final JSObject optionsJson) {
        requireClient().screen(screenName, getRudderProperty(propertiesJson), getRudderOption(optionsJson));
    }

    void alias(final String newId, @Nullable final JSObject optionsJson) {
        requireClient().alias(newId, getRudderOption(optionsJson));
    }

    void reset() {
        requireClient().reset();
    }

    void flush() {
        requireClient().flush();
    }

    void putDeviceToken(final String deviceToken) {
        RudderClient.putDeviceToken(deviceToken);
    }

    void putAdvertisingId(final String advertisingId) {
        RudderClient.putAdvertisingId(advertisingId);
    }

    void putAnonymousId(final String anonymousId) {
        RudderClient.putAnonymousId(anonymousId);
    }

    void optOut(final boolean optOut) {
        requireClient().optOut(optOut);
    }

    private RudderClient requireClient() {
        if (client == null) {
            throw new IllegalStateException("RudderStack SDK is not initialized");
        }

        return client;
    }

    private RudderConfig getRudderConfig(@Nullable final JSONObject configJson) {
        if (configJson == null) {
            return new RudderConfig.Builder().build();
        }

        final Map<String, Object> configMap = getMapFromJSON(configJson);
        final RudderConfig.Builder configBuilder = new RudderConfig.Builder();

        if (configMap.containsKey("dataPlaneUrl") && getString(configMap.get("dataPlaneUrl")) != null) {
            configBuilder.withDataPlaneUrl(getString(configMap.get("dataPlaneUrl")));
        }
        if (configMap.containsKey("flushQueueSize") && getInteger(configMap.get("flushQueueSize")) != null) {
            configBuilder.withFlushQueueSize(getInteger(configMap.get("flushQueueSize")));
        }
        if (configMap.containsKey("dbCountThreshold") && getInteger(configMap.get("dbCountThreshold")) != null) {
            configBuilder.withDbThresholdCount(getInteger(configMap.get("dbCountThreshold")));
        }
        if (configMap.containsKey("configRefreshInterval") && getInteger(configMap.get("configRefreshInterval")) != null) {
            configBuilder.withConfigRefreshInterval(getInteger(configMap.get("configRefreshInterval")));
        }
        if (configMap.containsKey("logLevel") && getInteger(configMap.get("logLevel")) != null) {
            configBuilder.withLogLevel(getInteger(configMap.get("logLevel")));
        }
        if (configMap.containsKey("sleepTimeOut") && getInteger(configMap.get("sleepTimeOut")) != null) {
            configBuilder.withSleepCount(getInteger(configMap.get("sleepTimeOut")));
        }
        if (configMap.containsKey("autoCollectAdvertId")) {
            configBuilder.withAutoCollectAdvertId(getBoolean(configMap.get("autoCollectAdvertId")));
        }
        if (configMap.containsKey("trackLifecycleEvents")) {
            configBuilder.withTrackLifecycleEvents(getBoolean(configMap.get("trackLifecycleEvents")));
        }
        if (configMap.containsKey("recordScreenViews")) {
            configBuilder.withRecordScreenViews(getBoolean(configMap.get("recordScreenViews")));
        }
        if (configMap.containsKey("controlPlaneUrl") && getString(configMap.get("controlPlaneUrl")) != null) {
            configBuilder.withControlPlaneUrl(getString(configMap.get("controlPlaneUrl")));
        }

        return configBuilder.build();
    }

    private @Nullable RudderOption getRudderOption(@Nullable final JSONObject optionsJson) {
        if (optionsJson == null) {
            return null;
        }

        final Map<String, Object> optionsMap = getMapFromJSON(optionsJson);
        final RudderOption option = new RudderOption();

        if (optionsMap.containsKey("externalIds")) {
            final Map<String, Object> externalIdsMap = castMap(optionsMap.get("externalIds"));
            for (Map.Entry<String, Object> entry : externalIdsMap.entrySet()) {
                final String externalId = getString(entry.getValue());
                if (externalId != null) {
                    option.putExternalId(entry.getKey(), externalId);
                }
            }
        }

        if (optionsMap.containsKey("integrations")) {
            final Map<String, Object> integrationsMap = castMap(optionsMap.get("integrations"));
            for (Map.Entry<String, Object> entry : integrationsMap.entrySet()) {
                option.putIntegration(entry.getKey(), getBoolean(entry.getValue()));
            }
        }

        return option;
    }

    private @Nullable RudderTraits getRudderTraits(@Nullable final JSONObject traitsJson) {
        if (traitsJson == null) {
            return null;
        }

        final Map<String, Object> traitsMap = getMapFromJSON(traitsJson);
        final RudderTraits traits = new RudderTraitsBuilder().build();
        for (Map.Entry<String, Object> entry : traitsMap.entrySet()) {
            traits.put(entry.getKey(), entry.getValue());
        }
        return traits;
    }

    private @Nullable RudderProperty getRudderProperty(@Nullable final JSONObject propertiesJson) {
        if (propertiesJson == null) {
            return null;
        }

        return new RudderProperty().putValue(getMapFromJSON(propertiesJson));
    }

    private Map<String, Object> getMapFromJSON(final JSONObject jsonObject) {
        final Map<String, Object> map = new HashMap<>();
        final Iterator<String> keysIter = jsonObject.keys();
        while (keysIter.hasNext()) {
            final String key = keysIter.next();
            final Object value = jsonObject.isNull(key) ? null : getObject(jsonObject.opt(key));
            if (value != null) {
                map.put(key, value);
            }
        }
        return map;
    }

    private Object getObject(final Object value) {
        if (value instanceof JSONObject) {
            return getMapFromJSON((JSONObject) value);
        }
        if (value instanceof JSONArray) {
            return getListFromJSON((JSONArray) value);
        }
        return value;
    }

    private @Nullable String getString(final Object value) {
        if (value instanceof String) {
            return (String) value;
        }
        if (value instanceof Number) {
            return String.valueOf(value);
        }
        return null;
    }

    private @Nullable Integer getInteger(final Object value) {
        if (value instanceof Number) {
            return ((Number) value).intValue();
        }
        if (value instanceof String) {
            return Integer.valueOf((String) value);
        }
        return null;
    }

    private boolean getBoolean(final Object value) {
        if (value instanceof Boolean) {
            return (Boolean) value;
        }
        if (value instanceof Number) {
            return ((Number) value).intValue() > 0;
        }
        if (value instanceof String) {
            return Boolean.parseBoolean((String) value);
        }
        return false;
    }

    private List<Object> getListFromJSON(final JSONArray jsonArray) {
        final List<Object> list = new ArrayList<>();
        for (int i = 0, count = jsonArray.length(); i < count; i++) {
            final Object value = getObject(jsonArray.opt(i));
            if (value != null) {
                list.add(value);
            }
        }
        return list;
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> castMap(final Object value) {
        if (value instanceof Map) {
            return (Map<String, Object>) value;
        }
        return new HashMap<>();
    }
}
