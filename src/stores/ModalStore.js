import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
    state: () => ({
      activeModal: null,
    }),
    actions: {
      openModal(modalName) {
        this.activeModal = modalName;
      },

      closeModal() {
        this.activeModal = null;
      },

      isModalOpen(modalName) {
        return this.activeModal === modalName;
      }
    }
});