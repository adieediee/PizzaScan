import { defineStore } from 'pinia';

export const useConsentStore = defineStore('consent', {
  state: () => ({
    dataCollectionEnabled: false,
  }),

  actions: {
    load() {
      const stored = localStorage.getItem('dataCollectionEnabled');
      this.dataCollectionEnabled = stored === 'true';
    },

    setConsent(value) {
      this.dataCollectionEnabled = value;
      localStorage.setItem('dataCollectionEnabled', value ? 'true' : 'false');
    },

    toggleConsent() {
      this.setConsent(!this.dataCollectionEnabled);
    },
  },
});
