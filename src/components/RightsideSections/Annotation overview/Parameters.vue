<template>
  <div id="AnnotationParameters" class="section">
    <div class="title-chevron">
      <h3>{{$t('rightSidebar.AnnotationOverview.parameters')}}</h3>
      <button id="ParametresChevron" class="btn chevron-btn" @click="toggleParameters" :class="{ rotated: showParemeters }">
        <fa :icon="['fas', 'chevron-down']" />
      </button>
    </div>

    <div class="label-input">
      <label v-if="showParemeters">{{$t('rightSidebar.AnnotationOverview.parametersAngle')}}</label>
      <input 
        id="angleInput"
        v-if="showParemeters" 
        type="number" 
        :placeholder="$t('rightSidebar.AnnotationOverview.parametersAnglePlaceholder')"
        :value="imageStore.selectedAnnotation.angle"
        @input="updateAnnotationAngle($event.target.value)"
      /> 
    </div>

    <div class="label-input">
      <label v-if="showParemeters">{{$t('rightSidebar.AnnotationOverview.parametersDistance')}}</label>
      <input 
        id="distanceInput"
        v-if="showParemeters" 
        type="number" 
        :placeholder="$t('rightSidebar.AnnotationOverview.parametersDistancePlaceholder')"
        :value="imageStore.selectedAnnotation.distance"
        @input="updateAnnotationDistance($event.target.value)"
      />
    </div>

    <label v-if="showParemeters">{{$t('rightSidebar.AnnotationOverview.parametersDescription')}}</label>
    <textarea 
      id="parametresDescriptionInput"
      v-if="showParemeters" 
      :placeholder="$t('rightSidebar.AnnotationOverview.parametersDescriptionPlaceholder')"
      :value="imageStore.selectedAnnotation.description"
      @input="updateAnnotationDescription($event.target.value)"
    />
  </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { useAnnotationStore } from '@/stores/AnnotationsStore';
import { useImageStore } from '@/stores/ImageStore';

const imageStore = useImageStore();
const annotationStore = useAnnotationStore();
const showParemeters = ref(true);

const toggleParameters = () => {
  showParemeters.value = !showParemeters.value;
};

const updateAnnotationDescription = (description) => {
  annotationStore.updateAnnotationDescription(imageStore.selectedAnnotation.id, description);
};

const updateAnnotationAngle = (angle) => {
  annotationStore.updateAnnotationAngle(imageStore.selectedAnnotation.id, angle);
};

const updateAnnotationDistance = (distance) => {
  annotationStore.updateAnnotationDistance(imageStore.selectedAnnotation.id, distance);
};
</script>
  
<style scoped>  
  textarea {
    margin: 10px 0 20px 0;
  }

  .label-input {
    display: flex;
    align-items: center;
  }

  .label-input label {
    margin-right: 20px;
  }
</style>