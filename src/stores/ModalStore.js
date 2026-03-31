import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
    state: () => ({
      activeModal: null,
      modalOptions: null,
    }),
    actions: {
      openModal(modalName, options = null) {
        this.modalOptions = options;
        this.activeModal = modalName;
      },

      closeModal() {
        this.activeModal = null;
        this.modalOptions = null;
      },

      isModalOpen(modalName) {
        return this.activeModal === modalName;
      }
    }
});