import { defineStore } from 'pinia';
import { ref } from 'vue';

// How many consecutive fast actions trigger the message
const THRESHOLD = 5;
// Max allowed gap (ms) between two consecutive accepts/declines
const MAX_GAP_MS = 12000;

export const useTrustCalibrationStore = defineStore('trustCalibration', () => {
  const acceptTimestamps = ref([]);
  const declineTimestamps = ref([]);
  const activeMessage = ref(null); // null | 'tooHigh' | 'tooLow'

  let dismissTimer = null;

  function triggerMessage(type) {
    activeMessage.value = type;
    clearTimeout(dismissTimer);
    dismissTimer = setTimeout(() => { activeMessage.value = null; }, 8000);
  }

  function dismissMessage() {
    clearTimeout(dismissTimer);
    activeMessage.value = null;
  }

  // Returns true if all consecutive gaps in the timestamps array are <= MAX_GAP_MS
  function allGapsFast(timestamps) {
    for (let i = 1; i < timestamps.length; i++) {
      if (timestamps[i] - timestamps[i - 1] > MAX_GAP_MS) return false;
    }
    return true;
  }

  function recordAccept() {
    const now = Date.now();
    declineTimestamps.value = [];

    // Drop streak if last accept was too long ago
    if (acceptTimestamps.value.length > 0) {
      const last = acceptTimestamps.value[acceptTimestamps.value.length - 1];
      if (now - last > MAX_GAP_MS) {
        acceptTimestamps.value = [];
      }
    }

    acceptTimestamps.value.push(now);
    console.log('[Trust] accepts streak:', acceptTimestamps.value.length);

    if (acceptTimestamps.value.length >= THRESHOLD && allGapsFast(acceptTimestamps.value)) {
      console.log('[Trust] → tooHigh triggered');
      acceptTimestamps.value = [];
      triggerMessage('tooHigh');
    }
  }

  function recordDecline(normalizedConfidence) {
    // Only track declines on medium (>=50) or high (>=80) confidence labels
    if (normalizedConfidence === null || normalizedConfidence < 50) return;

    const now = Date.now();
    acceptTimestamps.value = [];

    // Drop streak if last decline was too long ago
    if (declineTimestamps.value.length > 0) {
      const last = declineTimestamps.value[declineTimestamps.value.length - 1];
      if (now - last > MAX_GAP_MS) {
        declineTimestamps.value = [];
      }
    }

    declineTimestamps.value.push(now);
    console.log('[Trust] declines streak:', declineTimestamps.value.length);

    if (declineTimestamps.value.length >= THRESHOLD && allGapsFast(declineTimestamps.value)) {
      console.log('[Trust] → tooLow triggered');
      declineTimestamps.value = [];
      triggerMessage('tooLow');
    }
  }

  return { activeMessage, recordAccept, recordDecline, dismissMessage };
});
