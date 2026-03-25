<template>
  <div id="AnnotationProfile" class="section">
    <img class="cutout" :src="imageStore.croppedImage" alt="Annotation Image" />
    <div class="tools">
      <div 
        id="AnnotationProfileDot"
        :style="{ backgroundColor: imageStore.selectedAnnotation.color }"
        :class="{
          'annotation-dot': imageStore.selectedAnnotation.type === 'manual',
          'annotation-square': imageStore.selectedAnnotation.type === 'AI',
          'dyneinArms-unknown': imageStore.selectedAnnotation.dyneinArmsValue === 'unknown',
          'dyneinArms-none': imageStore.selectedAnnotation.dyneinArmsValue === 'no-arms-missing',
          'dyneinArms-inner': imageStore.selectedAnnotation.dyneinArmsValue === 'inner-arms-missing',
          'dyneinArms-both': imageStore.selectedAnnotation.dyneinArmsValue === 'both-arms-missing',
          'dyneinArms-outer': imageStore.selectedAnnotation.dyneinArmsValue === 'outer-arms-missing',
        }"
      ></div>
      <div class="buttons">
        <button id="copyAnnotationButton" class="btn btn-icon" @click="copyAnnotation">
          <fa :icon="['fas', 'copy']" />
          <span class="tooltip tooltip-section">
            {{$t('annotation.copy')}}
            <span class="shortcut">CTLR + C</span>
          </span>
        </button>
        <button id="zoomToAnnotationButton" class="btn btn-icon reviewedButton" @click="zoomAnnotation">
          <fa :icon="['fas', 'magnifying-glass-plus']" />
          <span class="tooltip tooltip-section long-tooltip">{{$t('annotation.zoomTo')}}</span>
        </button>
        <button id="deleteAnnotationButton" class="btn btn-icon deleteButton" @click="deleteAnnotation">
          <fa :icon="['far', 'trash-can']"/>
          <span class="tooltip tooltip-section long-tooltip">{{$t('annotation.delete')}}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAnnotationStore } from '@/stores/AnnotationsStore';
import { useImageStore } from '@/stores/ImageStore';

const emit = defineEmits(['annotationDeleted', 'zoomToAnnotation']);

const imageStore = useImageStore();
const annotationStore = useAnnotationStore();

const deleteAnnotation = () => {
  annotationStore.deleteAnnotation(imageStore.selectedAnnotation);
  imageStore.setSelectedAnnotation(null);
  emit('annotationDeleted');
};

const zoomAnnotation = () => {
  emit('zoomToAnnotation', imageStore.selectedAnnotation);
};

const copyAnnotation = () => {
  imageStore.setCopiedAnnotation(imageStore.selectedAnnotation);
};

</script>

<style scoped>

.shortcut {
  margin-left: 2px;
}

</style>