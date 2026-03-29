<template>
  <div id="AITutorialModal" ref="explanationBox" class="explanation" v-if="boardingStore.automaticAnnotationTutorialOn">
    <div class="top-bar">
      <p class="bold">{{ $t('AItutorial.title') }}</p>
      <div class="top-buttons">
        <button class="btn btn-icon" @click="toggleMinimize">
          <fa v-if="!isMinimized" :icon="['fas', 'minus']" />
          <fa v-else :icon="['fas', 'plus']" />
        </button>
        <button class="btn btn-icon" @click="closeTutorial">
          <fa :icon="['fas', 'xmark']" />
        </button>
      </div>
    </div>
    <div v-if="!isMinimized" class="content">
      <div>{{ $t('AItutorial.step' + boardingStore.aiCurrentStep) }}</div>
    </div>
    <div v-if="!isMinimized" class="controls">
      <button
        id="AITutorialBackButton"
        class="btn btn-outlined step-btn"
        @click="prevStep"
        :disabled="boardingStore.aiCurrentStep === 1"
      >{{ $t('general.backButton') }}</button>
      <p class="steps">{{ boardingStore.aiCurrentStep }} {{ $t('AItutorial.steps') }}</p>
      <button
        id="AITutorialNextButton"
        class="btn btn-filled step-btn"
        @click="nextStep"
      >{{ nextButtonText }}</button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useAnnotationStore } from '@/stores/AnnotationsStore';
import { useBoardingStore } from '@/stores/BoardingStore';
import { useI18n } from 'vue-i18n';

const annotationStore = useAnnotationStore();
const boardingStore = useBoardingStore();
const { t } = useI18n();

const isMinimized = ref(false);

const nextButtonText = computed(() =>
  boardingStore.aiCurrentStep === 5 ? t('general.finishButton') : t('general.nextButton')
);

function nextStep() {
  boardingStore.setAiCurrentStep(boardingStore.aiCurrentStep + 1);
}

function prevStep() {
  boardingStore.setAiCurrentStep(boardingStore.aiCurrentStep - 1);
}

function toggleMinimize() {
  isMinimized.value = !isMinimized.value;
}

function closeTutorial() {
  boardingStore.setAutomaticAnnotationTutorialOff();
}
</script>
