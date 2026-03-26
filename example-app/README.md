# Example App for `@capgo/capacitor-rudderstack`

This Vite project links directly to the local plugin source so you can validate RudderStack initialization plus `identify`, `track`, `screen`, `flush`, and `reset` calls on web, iOS, and Android while developing.

## Getting started

```bash
bun install
bun run start
```

To test on native shells:

```bash
bunx cap add ios
bunx cap add android
bunx cap sync
```

Before sending events, provide a RudderStack write key and, when needed, your data plane URL. The web target is only a compatibility shim and does not send live analytics events.
