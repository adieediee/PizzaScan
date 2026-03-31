<template>
  <Transition name="banner-slide">
    <div v-if="trustStore.activeMessage" class="trust-banner" :class="trustStore.activeMessage">
      <fa :icon="['fas', 'triangle-exclamation']" class="banner-icon" />
      <span class="banner-text">{{ message }}</span>
      <button class="banner-close" @click="trustStore.dismissMessage()">
        <fa :icon="['fas', 'xmark']" />
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useTrustCalibrationStore } from '@/stores/TrustCalibrationStore';

const { t } = useI18n();
const trustStore = useTrustCalibrationStore();

const message = computed(() => {
  if (trustStore.activeMessage === 'tooHigh') return t('trustCalibration.tooHigh');
  if (trustStore.activeMessage === 'tooLow')  return t('trustCalibration.tooLow');
  return '';
});
</script>

<style scoped>
.trust-banner {
  position: fixed;
  top: calc(5% + 6px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
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
