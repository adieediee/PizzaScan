<template>
    <div id="ImageInfo" class="section">
      <img id="ImagePreview" class="cutout" :src="canvasStore.selectedImage.imageUrl" alt="Annotation Image" />
      <!--<MiniMap 
        v-else
        :image="canvasStore.selectedImage" 
        :zoomScale="canvasStore.zoomScale" 
        :offsetX="canvasStore.offsetX" 
        :offsetY="canvasStore.offsetY"
        class="cutout"
      />-->
      <div class="tools">
        <h4>{{imageStore.imageInfo.imageName}}</h4>
        <div class="buttons">
          <div class="button-group">
            <button id="reviewedButton" class="btn btn-icon reviewedButton" @click="setReviewed" :class="{ 'reviewed': imageStore.imageInfo.reviewed }">
                <fa :icon="['fas', 'check']" />
                <span class="tooltip tooltip-section long-tooltip">{{$t('image.ReviewedImage')}}</span>
            </button>
            <button id="deleteAIAnnotationButton" class="btn btn-icon deleteButton" @click="deleteAIAnnotations">
                <fa :icon="['fas', 'square-minus']" />   
                <span class="tooltip tooltip-section long-tooltip">{{$t('image.DeleteAIAnnotations')}}</span>
            </button>
          </div>
          <div class="button-group">
            <button id="deleteAnnotationsButton" class="btn btn-icon deleteButton" @click="deleteAnnotations">
                <fa :icon="['fas', 'circle-minus']"></fa>   
                <span class="tooltip tooltip-section long-tooltip">{{$t('image.DeleteAnnotations')}}</span>
            </button>
            <button id="deleteImageButton" class="btn btn-icon deleteButton" @click="deleteImage" >
              <fa :icon="['far', 'trash-can']"/>
              <span class="tooltip tooltip-section long-tooltip">{{$t('image.DeleteImage')}}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script setup>
import { useImageStore } from '@/stores/ImageStore';
import { useCanvasStore } from '@/stores/CanvasStore';
import { useModalStore } from '@/stores/ModalStore';

const imageStore = useImageStore();
const canvasStore = useCanvasStore();
const modalStore = useModalStore();

const deleteImage = () => {
  imageStore.setRightClickedImage(canvasStore.selectedImage);
  modalStore.openModal('imageDeletion');
}

const deleteAnnotations = () => {
  imageStore.setRightClickedImage(canvasStore.selectedImage);
  modalStore.openModal('annotationDeletion');
}

const deleteAIAnnotations = () => {
  imageStore.setRightClickedImage(canvasStore.selectedImage);
  modalStore.openModal('AiDeletion');
}

const setReviewed = () => {
  imageStore.setRightClickedImage(canvasStore.selectedImage);
  imageStore.setReviewed();
}

</script>

<style scoped>

.button-group {
  display: flex;
  flex-direction: row;
}

@media screen and (max-width: 1250px) {
  .buttons {
    display: grid;
  }
}

</style>