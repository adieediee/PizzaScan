<template>
  <div id="ImageNotes" class="section">
    <div class="title-chevron">
      <h3>{{$t('rightSidebar.ProjectOverview.notes')}}</h3>
      <button id="ImageNotesChevron" class="btn chevron-btn" @click="toggleNotes" :class="{ rotated: showNotes }">
        <fa :icon="['fas', 'chevron-down']" />
      </button>
    </div>
    <textarea
      id="ImageNotesTextarea"
      v-if="showNotes" 
      :placeholder="$t('rightSidebar.ProjectOverview.notesPlaceholder')"
      :value="imageStore.imageInfo.description"
      @input="updateImageDescription($event.target.value)"
      ></textarea>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useImageStore } from '@/stores/ImageStore';

const imageStore = useImageStore();
const showNotes = ref(true);

const toggleNotes = () => {
  showNotes.value = !showNotes.value;
};

const updateImageDescription = (description) => {
  imageStore.setImageDescription(description);
};
</script>
