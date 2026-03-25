<template>
    <div id="ImageAIAnnotationDeletionModal" class="modal" v-if="modalStore.isModalOpen('AiDeletion')">
      <div class="confirm-modal-content">
        <div class="modal-title">
            <h2>{{$t('modals.imageAIannotations.title')}}</h2>
            <span id="closeImageAIAnnotationDeletionButton" class="btn btn-outlined btn-close" @click="modalStore.closeModal()">
                <fa :icon="['fas', 'xmark']" />
            </span>
        </div>
        <p>{{$t('modals.imageAIannotations.message')}}</p>
        <div class="div-button">
            <button id="cancelAIImageAnnotationDeletionButton" class="btn btn-outlined" @click="modalStore.closeModal()">{{$t('modals.imageAIannotations.cancelButton')}}</button>
            <button id="confirmAIImageAnnotationDeletionButton" class="btn btn-filled red-button" @click="deleteAIAnnotations()">{{$t('modals.imageAIannotations.confirmButton')}}</button>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
import { defineComponent, watch } from 'vue';
import { useModalStore } from '@/stores/ModalStore';
import { useAnnotationStore } from '@/stores/AnnotationsStore';
import { useImageStore } from '@/stores/ImageStore';

const emit = defineEmits(['systemStatus']);

const modalStore = useModalStore();
const annotationStore = useAnnotationStore();
const imageStore = useImageStore();

const deleteAIAnnotations = () => {
    annotationStore.deleteAIAnnotations(imageStore.imageInfo.id);
    modalStore.closeModal();
    emit('systemStatus', 'imageAIannotations');
};

</script>