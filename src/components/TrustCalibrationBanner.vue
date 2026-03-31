<template>
  <Transition name="banner-slide">
    <div v-if="trustStore.activeMessage" class="trust-banner" :class="trustStore.activeMessage">
      <div class="banner-top">
        <fa :icon="['fas', 'triangle-exclamation']" class="banner-icon" />
        <span class="banner-text">{{ message }}</span>
        <button class="banner-close" @click="dismiss">
          <fa :icon="['fas', 'xmark']" />
        </button>
      </div>

    </div>
  </Transition>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useTrustCalibrationStore } from '@/stores/TrustCalibrationStore';
import { useModalStore } from '@/stores/ModalStore';
import { useLoggingStore } from '@/stores/LoggStore';

const { t } = useI18n();
const trustStore = useTrustCalibrationStore();
const modalStore = useModalStore();
const loggingStore = useLoggingStore();

const feedbackOpen = ref(false);
const feedbackText = ref('');

const message = computed(() => {
  if (trustStore.activeMessage === 'tooHigh') return t('trustCalibration.tooHigh');
  if (trustStore.activeMessage === 'tooLow')  return t('trustCalibration.tooLow');
  return '';
});

function dismiss() {
  feedbackOpen.value = false;
  feedbackText.value = '';
  trustStore.dismissMessage();
}

function submitFeedback() {
  if (!feedbackText.value.trim()) return;
  loggingStore.submitProblemReport(feedbackText.value.trim());
  feedbackText.value = '';
  feedbackOpen.value = false;
  trustStore.dismissMessage();
  modalStore.openModal('reportProblem', { initialPhase: 'thanks' });
}
</script>

<style scoped>
.trust-banner {
  position: fixed;
  top: calc(5% + 6px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px 16px;
  max-width: 600px;
  width: calc(100% - 48px);
  background: rgba(30, 20, 20, 0.82);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(220, 80, 60, 0.55);
  border-radius: 10px;
  color: #fff;
  font-size: 0.84rem;
  box-shadow: 0 4px 24px rgba(0,0,0,0.45);
}

.banner-top {
  display: flex;
  align-items: center;
  gap: 10px;
}

.banner-icon {
  flex-shrink: 0;
  font-size: 1rem;
  color: #ff6b5b;
}

.banner-text {
  flex: 1;
  line-height: 1.45;
  color: #f0d0cc;
}

.banner-close {
  flex-shrink: 0;
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.5);
  cursor: pointer;
  padding: 2px 4px;
  font-size: 0.9rem;
  transition: color 0.15s;
}

.banner-close:hover {
  color: #fff;
}

.banner-feedback-link {
  padding-left: 26px;
}

.btn-link {
  background: none;
  border: none;
  color: #ff9f93;
  font-size: 0.82rem;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.btn-link:hover {
  color: #fff;
}

.banner-feedback-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 26px;
}

.banner-textarea {
  width: 100%;
  box-sizing: border-box;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(220, 80, 60, 0.4);
  border-radius: 6px;
  padding: 8px 10px;
  color: #fff;
  font-family: inherit;
  font-size: 0.84rem;
  line-height: 1.4;
  resize: vertical;
}

.banner-textarea::placeholder {
  color: rgba(255,255,255,0.35);
}

.banner-textarea:focus {
  outline: none;
  border-color: rgba(220, 80, 60, 0.75);
}

.banner-form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.btn-cancel {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 999px;
  color: rgba(255,255,255,0.6);
  font-size: 0.8rem;
  padding: 5px 14px;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}

.btn-cancel:hover {
  border-color: rgba(255,255,255,0.6);
  color: #fff;
}

.btn-send {
  background: #b03020;
  border: none;
  border-radius: 999px;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 5px 18px;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-send:hover:not(:disabled) {
  background: #c83820;
}

.btn-send:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.banner-slide-enter-active,
.banner-slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
}

.banner-slide-enter-from,
.banner-slide-leave-to {
  transform: translateX(-50%) translateY(-16px);
  opacity: 0;
}
</style>
