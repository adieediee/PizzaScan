<template>
    <div id="ImageAnnotationDeletionModal" class="modal" v-if="modalStore.isModalOpen('annotationDeletion')">
      <div class="confirm-modal-content">
        <div class="modal-title">
            <h2>{{$t('modals.imageAnnotations.title')}}</h2>
            <span id="closeImageAnnotationDeletionButton" class="btn btn-outlined btn-close" @click="modalStore.closeModal()">
                <fa :icon="['fas', 'xmark']" />
            </span>
        </div>
        <p>{{$t('modals.imageAnnotations.message')}}</p>
        <div class="div-button">
            <button id="cancelImageAnnotationDeletionButton" class="btn btn-outlined" @click="modalStore.closeModal()">{{$t('modals.imageAnnotations.cancelButton')}}</button>
            <button id="confirmImageAnnotationDeletionButton" class="btn btn-filled red-button" @click="deleteAnnotations()">{{$t('modals.imageAnnotations.confirmButton')}}</button>
        </div>
      </div>
    </div>
</template>
  
<script setup>
import { watch } from 'vue';
import { useModalStore } from '@/stores/ModalStore';
import { useAnnotationStore } from '@/stores/AnnotationsStore';

const emit = defineEmits(['systemStatus']);
const modalStore = useModalStore();
const annotationStore = useAnnotationStore();

const deleteAnnotations = () => {
    annotationStore.deleteAllAnnotations();
    modalStore.closeModal();
    emit('systemStatus', 'imageAnnotations');
};

</script>