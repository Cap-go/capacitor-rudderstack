import './style.css';
import { RudderStack } from '@capgo/capacitor-rudderstack';

const output = document.getElementById('plugin-output');
const statusBadge = document.getElementById('status-badge');
const writeKeyInput = document.getElementById('write-key');
const dataPlaneUrlInput = document.getElementById('data-plane-url');
const userIdInput = document.getElementById('user-id');
const eventNameInput = document.getElementById('event-name');
const screenNameInput = document.getElementById('screen-name');
const initButton = document.getElementById('initialize-sdk');
const identifyButton = document.getElementById('identify-user');
const trackButton = document.getElementById('track-event');
const screenButton = document.getElementById('screen-event');
const flushButton = document.getElementById('flush-events');
const resetButton = document.getElementById('reset-user');
const optOutButton = document.getElementById('toggle-opt-out');
const versionButton = document.getElementById('get-version');

let initialized = false;
let optedOut = false;

const setOutput = (value) => {
  output.textContent = typeof value === 'string' ? value : JSON.stringify(value, null, 2);
};

const setStatus = (isReady) => {
  statusBadge.textContent = isReady ? 'Initialized' : 'Not initialized';
  statusBadge.dataset.ready = String(isReady);
};

const requireValue = (input, label) => {
  const value = input.value.trim();
  if (!value) {
    throw new Error(`${label} is required`);
  }

  return value;
};

const withOutput = async (action) => {
  try {
    const result = await action();
    setOutput(result);
  } catch (error) {
    setOutput(`Error: ${error?.message ?? error}`);
  }
};

initButton.addEventListener('click', async () => {
  await withOutput(async () => {
    const writeKey = requireValue(writeKeyInput, 'Write key');
    const dataPlaneUrl = dataPlaneUrlInput.value.trim();

    await RudderStack.initialize(writeKey, {
      ...(dataPlaneUrl ? { dataPlaneUrl } : {}),
      logLevel: RudderStack.LogLevel.DEBUG,
      trackLifecycleEvents: true,
    });

    initialized = true;
    setStatus(initialized);
    return {
      initialized,
      message: 'RudderStack initialized',
      dataPlaneUrl: dataPlaneUrl || '(default)',
    };
  });
});

identifyButton.addEventListener('click', async () => {
  await withOutput(async () => {
    const userId = requireValue(userIdInput, 'User id');

    await RudderStack.identify(userId, {
      plan: 'pro',
      source: 'example-app',
    });

    return {
      message: 'identify sent',
      userId,
    };
  });
});

trackButton.addEventListener('click', async () => {
  await withOutput(async () => {
    const eventName = requireValue(eventNameInput, 'Event name');

    await RudderStack.track(eventName, {
      source: 'example-app',
      ts: new Date().toISOString(),
    });

    return {
      message: 'track sent',
      eventName,
    };
  });
});

screenButton.addEventListener('click', async () => {
  await withOutput(async () => {
    const screenName = requireValue(screenNameInput, 'Screen name');

    await RudderStack.screen(screenName, {
      source: 'example-app',
    });

    return {
      message: 'screen sent',
      screenName,
    };
  });
});

flushButton.addEventListener('click', async () => {
  await withOutput(async () => {
    await RudderStack.flush();
    return { message: 'flush requested' };
  });
});

resetButton.addEventListener('click', async () => {
  await withOutput(async () => {
    await RudderStack.reset();
    optedOut = false;
    return { message: 'identity reset' };
  });
});

optOutButton.addEventListener('click', async () => {
  await withOutput(async () => {
    optedOut = !optedOut;
    await RudderStack.optOut(optedOut);
    return { message: optedOut ? 'tracking opted out' : 'tracking re-enabled', optedOut };
  });
});

versionButton.addEventListener('click', async () => {
  await withOutput(() => RudderStack.getPluginVersion());
});

setStatus(initialized);
setOutput('Provide a write key and optional data plane URL, then initialize the SDK.');
