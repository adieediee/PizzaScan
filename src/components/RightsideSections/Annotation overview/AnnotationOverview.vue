<template>
  <AnnotationProfile @annotationDeleted="forwardAnnotationDeleted" @zoomToAnnotation="forwardZoomToAnnotation" />
  <MicrotubularDefect @annotationUpdated="forwardAnnotationUpdated" />
  <Parameters />
</template>

<script setup>
import AnnotationProfile from './AnnotationProfile.vue';
import Parameters from './Parameters.vue';
import MicrotubularDefect from './MicrotubularDefect.vue';

const emit = defineEmits(['annotationDeleted', 'annotationUpdated', 'zoomToAnnotation']);

const forwardAnnotationDeleted = () => {
  emit('annotationDeleted');
};

const forwardAnnotationUpdated = (annotation) => {
  emit('annotationUpdated', annotation);
};

const forwardZoomToAnnotation = (annotation) => {
  emit('zoomToAnnotation', annotation);
};

</script>
  