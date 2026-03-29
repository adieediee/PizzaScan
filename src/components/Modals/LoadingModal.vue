<template>
    <div class="modal" v-if="isVisible">
      <div class="modal-content">
        <div class="spinner"></div>
        <h3>{{$t('modals.loading.title')}}</h3>
        <p>{{$t('modals.loading.message')}}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';

  const props = defineProps({
    isVisible: Boolean,
  });

  const emit = defineEmits(['update:isVisible']);

  const closeModal = () => {
    emit('update:isVisible', false);
  };

  const exportAnnotations = () => {
    closeModal();
  };
</script>
  
<style scoped>  
  .modal-content {
    padding: 30px 50px;
    width: 25%;
    height: 25%;
    text-align: center;
    display: grid;
    justify-items: center;
    padding-bottom: 50px;
  }
  
  .modal-content h1 {
    margin: 0;
    font-weight: bolder;
  }

  .modal-content p {
    margin: 0;
    font-size: small;
  }
  
  .spinner {
    border: 8px solid rgba(255, 255, 255, 0.3);
    border-top: 8px solid #f3f3f3;
    border-radius: 50%;
    width: 40px;
    height: 40px; 
    animation: spin 1s linear infinite;
    margin: 10px;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  