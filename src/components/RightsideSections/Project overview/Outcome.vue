<template>
    <div id="ProjectOutcome" class="section">
        <div class="title-chevron">
          <h3>{{$t('rightSidebar.ProjectOverview.outcomes')}}</h3>
          <button id="ProjectOutcomeChevron" class="btn chevron-btn" @click="toggleOutcome" :class="{ rotated: showOutcome }">
            <fa :icon="['fas', 'chevron-down']" />
          </button>
        </div>
        <textarea
          id="ProjectOutcomeTextarea"
          v-if="showOutcome" 
          :placeholder="$t('rightSidebar.ProjectOverview.outcomesPlaceholder')"
          :value="imageStore.projectOutcome"
          @input="updateProjectOutcome($event.target.value)"
        ></textarea>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { useImageStore } from '@/stores/ImageStore';

const imageStore = useImageStore();
const showOutcome = ref(true);

const toggleOutcome = () => {
  showOutcome.value = !showOutcome.value;
};

const updateProjectOutcome = (outcome) => {
  imageStore.setProjectOutcome(outcome);
};
</script>