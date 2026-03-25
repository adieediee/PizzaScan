<template>
    <ImageInfo @imageDeleted="forwardImageDeleted" />
    <Notes />
</template>

<script setup>
import Notes from '../Image overview/ImageNotes.vue';
import ImageInfo from './ImageInfo.vue';

const emit = defineEmits(['imageDeleted']);

const forwardImageDeleted = () => {
    emit('imageDeleted');
};

</script>