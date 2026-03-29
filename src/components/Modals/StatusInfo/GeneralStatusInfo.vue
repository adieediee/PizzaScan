<template>
    <div v-if="visible" id="statusInfoModal" class="statusInfo">
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script setup>
  import { useI18n } from 'vue-i18n';
  import { ref } from 'vue';
  
  const { t } = useI18n();
  const visible = ref(false);
  const message = ref('');
  
  const showMessage = (statusMessage) => {
    message.value = t(`status.${statusMessage}`);
    visible.value = true;
  
    setTimeout(() => {
      visible.value = false;
      message.value = '';
    }, 3000);
  };
  
  defineExpose({
    showMessage,
  });
  </script>
  