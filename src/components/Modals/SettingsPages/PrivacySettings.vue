<template>
  <div class="privacy-settings">
    <h2>{{ $t('modals.settings.privacy.title') }}</h2>
    <p class="privacy-desc">{{ $t('welcome.experience.dataCollection') }}</p>
    <p class="privacy-desc">{{ $t('welcome.experience.insights') }}</p>

    <div class="toggle-row">
      <div class="toggle-info">
        <span class="toggle-label">{{ $t('modals.settings.privacy.toggleLabel') }}</span>
        <span class="toggle-sub">{{ $t('modals.settings.privacy.toggleSub') }}</span>
      </div>
      <button
        class="toggle-btn"
        :class="{ active: consentStore.dataCollectionEnabled }"
        @click="consentStore.toggleConsent()"
        :aria-label="$t('modals.settings.privacy.toggleLabel')"
      >
        <span class="toggle-thumb" />
      </button>
    </div>
    <p class="privacy-status">
      <fa :icon="['fas', consentStore.dataCollectionEnabled ? 'circle-check' : 'circle-xmark']"
          :class="consentStore.dataCollectionEnabled ? 'icon-on' : 'icon-off'" />
      {{ consentStore.dataCollectionEnabled
          ? $t('modals.settings.privacy.statusOn')
          : $t('modals.settings.privacy.statusOff') }}
    </p>
  </div>
</template>

<script setup>
import { useConsentStore } from '@/stores/ConsentStore';
const consentStore = useConsentStore();
</script>

<style scoped>
.privacy-settings {
  padding: 4px 0;
}

.privacy-settings h2 {
  margin: 0 0 16px 0;
  font-size: 1rem;
  font-weight: 600;
}

.privacy-desc {
  font-size: 0.88rem;
  line-height: 1.55;
  color: rgba(255,255,255,0.7);
  margin: 0 0 10px 0;
}

.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 20px;
  padding: 14px 16px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
}

.toggle-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.toggle-label {
  font-size: 0.9rem;
  font-weight: 500;
}

.toggle-sub {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.5);
}

.toggle-btn {
  flex-shrink: 0;
  position: relative;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: none;
  background: rgba(255,255,255,0.15);
  cursor: pointer;
  transition: background 0.2s;
  padding: 0;
}

.toggle-btn.active {
  background: #3e63dd;
}

.toggle-thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.2s;
}

.toggle-btn.active .toggle-thumb {
  transform: translateX(20px);
}

.privacy-status {
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 14px 0 0 0;
  font-size: 0.84rem;
  color: rgba(255,255,255,0.55);
}

.icon-on  { color: #4ade80; }
.icon-off { color: rgba(255,255,255,0.3); }
</style>
