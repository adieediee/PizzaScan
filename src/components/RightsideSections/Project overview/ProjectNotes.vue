<template>
  <div class="section" id="ProjectNotes">
    <div class="title-chevron">
      <h3>{{$t('rightSidebar.ProjectOverview.notes')}}</h3>
      <button id="ProjectNotesChevron" class="btn chevron-btn" @click="toggleNotes" :class="{ rotated: showNotes }">
        <fa :icon="['fas', 'chevron-down']" />
      </button>
    </div>
    <textarea 
      id="ProjectNotesTextarea"
      v-if="showNotes" 
      :placeholder="$t('rightSidebar.ProjectOverview.notesPlaceholder')"
      :value="imageStore.projectDescription"
      @input="updateProjectDescription($event.target.value)"
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

const updateProjectDescription = (description) => {
  imageStore.setProjectDescription(description);
};
</script>