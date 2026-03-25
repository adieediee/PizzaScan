<template>
  <div id="ImageDeletionModal" class="modal" v-if="modalStore.isModalOpen('imageDeletion')">
    <div class="confirm-modal-content">
      <div class="modal-title">
          <h2>{{$t('modals.imageDeletion.title')}}</h2>
          <span id="closeExportModalButton" class="btn btn-outlined btn-close" @click="modalStore.closeModal()">
              <fa :icon="['fas', 'xmark']" />
          </span>
      </div>
      <p>{{$t('modals.imageDeletion.message')}}</p>
      <div class="div-button">
          <button id="cancelDeteleImageButton" class="btn btn-outlined" @click="modalStore.closeModal()">{{$t('modals.imageDeletion.cancelButton')}}</button>
          <button id="confirmDeteleImageButton" class="btn btn-filled red-button" @click="deleteImage()">{{$t('modals.imageDeletion.confirmButton')}}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue';
import { useModalStore } from '@/stores/ModalStore';
import { useAnnotationStore } from '@/stores/AnnotationsStore';
import { useImageStore } from '@/stores/ImageStore';

const emit = defineEmits(['systemStatus']);
const modalStore = useModalStore();
const annotationStore = useAnnotationStore();
const imageStore = useImageStore();

const deleteImage = () => {
  if (imageStore.rightClickedImage !== null) {
      annotationStore.deleteAllAnnotations();
      imageStore.deleteImage();
      modalStore.closeModal();
      emit('systemStatus', 'imageDeletion');
  }
};

</script>
