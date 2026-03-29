import { defineStore } from 'pinia';

const OVERRIDE_THRESHOLD = 3;
const CONFIDENCE_THRESHOLD = 80;

function normalizeConfidence(c) {
  if (!Number.isFinite(c)) return null;
  const pct = c <= 1 ? c * 100 : c;
  return Math.max(0, Math.min(100, Math.round(pct)));
}

export const useFeedbackToastStore = defineStore('feedbackToast', {
  state: () => ({
    overrides: {},
    shownFor: [],
    visible: false,
    currentImageId: null,
    aiPopupAnchor: { left: 0, top: 0 },
  }),
  actions: {
    trackAIOverride(imageId, confidence) {
      const pct = normalizeConfidence(confidence);
      if (pct === null || pct < CONFIDENCE_THRESHOLD) return;
      if (this.shownFor.includes(imageId)) return;

      this.overrides[imageId] = (this.overrides[imageId] || 0) + 1;

      if (this.overrides[imageId] >= OVERRIDE_THRESHOLD) {
        this.currentImageId = imageId;
        this.visible = true;
        this.shownFor.push(imageId);
      }
    },
    setAiPopupAnchor(left, top) {
      this.aiPopupAnchor = { left, top };
    },
    dismiss() {
      this.visible = false;
    },
  },
});
