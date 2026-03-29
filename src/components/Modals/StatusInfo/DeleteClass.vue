<template>
    <div v-if="visible" id="deleteClassStatus" class="statusInfo">
      <p>{{$t('status.undoDelete')}}</p>
      <button @click="undoDelete" class="btn btn-undo">{{$t('status.undoDeleteConfirm')}}</button>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';

  const props = defineProps({
    visible: Boolean,
    onUndo: Function,
  });
  
  const visibleState = ref(props.visible);
  
  watch(() => props.visible, (newVal) => {
    visibleState.value = newVal;
    if (newVal) {
      setTimeout(() => {
        visibleState.value = false;
      }, 10000);
    }
  });
  
  const undoDelete = () => {
    props.onUndo();
    visibleState.value = false;
  };
  </script>
  
  <style scoped>
  #deleteClassStatus {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #8a8a8a80;
    padding: 10px;
    border-radius: 15px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .btn-undo {
    background: #fff;
    margin: 0 0 0 10px;
  }
  </style>
  