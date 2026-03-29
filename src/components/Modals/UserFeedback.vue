<template>
    <div id="FeedbackModal" v-if="modalStore.isModalOpen('feedback')" class="modal">
      <div class="modal-content">
        <div class="modal-title">
          <h1>{{$t('modals.feedback.title')}}</h1>
          <button id="CloseFeedbackModal" @click="modalStore.closeModal()" class="btn btn-close">
            <fa :icon="['fas', 'xmark']" />
          </button>
        </div>
        <div class="modal-body">
          <div class="modal-nav">
            <button id="DataCollectionSection" @click="showSection('dataCollection')" :class="{ active: currentSection === 'dataCollection' }">{{$t('modals.feedback.data.title')}}</button>
            <button id="FeedbackSection" @click="showSection('feedback')" :class="{ active: currentSection === 'feedback' }">{{$t('modals.feedback.feedback.title')}}</button>
          </div>
          <div class="modal-doc">
            <div v-if="currentSection === 'dataCollection'">
              <DataCollection />
            </div>
            <div v-if="currentSection === 'feedback'">
              <Feedback />
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script setup>
  import { ref } from 'vue';
  import { useModalStore } from '@/stores/ModalStore';
  import DataCollection from './FeedbackPages/DataCollection.vue';
  import Feedback from './FeedbackPages/Feedback.vue';
  
  const modalStore = useModalStore();
  const currentSection = ref('dataCollection');

  const showSection = (section) => {
    currentSection.value = section;
  };

</script>