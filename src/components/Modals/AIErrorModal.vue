<template>
  <Transition name="ai-error-fade">
    <div v-if="annotationStore.aiError" class="ai-error-backdrop" @click.self="close">
      <div class="ai-error-dialog" role="alertdialog">
        <div class="ai-error-icon-wrap">
          <fa :icon="['fas', 'circle-xmark']" class="ai-error-icon" />
        </div>
        <h2 class="ai-error-title">{{ $t('modals.aiError.title') }}</h2>
        <p class="ai-error-body">{{ $t('modals.aiError.message') }}</p>
        <button class="ai-error-btn" @click="close">
          {{ $t('modals.aiError.close') }}
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useAnnotationStore } from '@/stores/AnnotationsStore';

const annotationStore = useAnnotationStore();

function close() {
  annotationStore.aiError = false;
}
</script>

<style scoped>
.ai-error-backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(3px);
}

.ai-error-dialog {
  background: #0f111a;
  width: min(100%, 400px);
  border-radius: 18px;
  padding: 36px 32px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(220, 80, 60, 0.3);
  text-align: center;
}

.ai-error-icon-wrap {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(220, 60, 40, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ai-error-icon {
  font-size: 2rem;
  color: #e05040;
}

.ai-error-title {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: #fff;
}

.ai-error-body {
  margin: 0;
  font-size: 0.95rem;
  color: #aaa;
  line-height: 1.55;
}

.ai-error-btn {
  margin-top: 6px;
  background: #3f51b5;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 999px;
  padding: 10px 32px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.15s;
}

.ai-error-btn:hover {
  background: #4a5fc4;
}

.ai-error-fade-enter-active,
.ai-error-fade-leave-active {
  transition: opacity 0.2s ease;
}

.ai-error-fade-enter-from,
.ai-error-fade-leave-to {
  opacity: 0;
}
</style>
