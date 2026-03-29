<template>
    <ImageInfo @imageDeleted="forwardImageDeleted" />
    <AIAnnotationSummary />
    <Notes />
</template>

<script setup>
import Notes from '../Image overview/ImageNotes.vue';
import ImageInfo from './ImageInfo.vue';
import AIAnnotationSummary from './AIAnnotationSummary.vue';

const emit = defineEmits(['imageDeleted']);

const forwardImageDeleted = () => {
    emit('imageDeleted');
};

</script>