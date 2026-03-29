<template>
    <div id="SettingsModal" v-if="modalStore.isModalOpen('settings')" class="modal">
      <div class="modal-content">
        <div class="modal-title">
          <h1>{{$t('modals.settings.title')}}</h1>
          <button id="CloseSettingsModal" @click="modalStore.closeModal()" class="btn btn-close">
            <fa :icon="['fas', 'xmark']" />
          </button>
        </div>
        <div class="modal-body">
          <div class="modal-nav">
            <button id="LayoutSection" @click="showSection('settings')" :class="{ active: currentSection === 'settings' }">{{$t('modals.settings.settings.title')}}</button>
            <button id="LayoutSection" @click="showSection('defect')" :class="{ active: currentSection === 'defect' }">{{$t('modals.settings.defects.title')}}</button>
          </div>
          <div class="modal-doc">
            <div v-if="currentSection === 'settings'">
                <ApplicationSettings />
            </div>
            <div v-if="currentSection === 'defect'">
                <MicrotubularDefects />
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script setup>
  import { ref } from 'vue';
  import { useModalStore } from '@/stores/ModalStore';
  import MicrotubularDefects from './SettingsPages/MicrotubularDefects.vue';
  import ApplicationSettings from './SettingsPages/ApplicationSettings.vue';
  
  const modalStore = useModalStore();
  const currentSection = ref('settings');

  const showSection = (section) => {
    currentSection.value = section;
  };

</script>