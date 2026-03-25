<template>
  <div 
    id="ImageContextMenu"
    v-if="isVisible"
    class="context-menu"
    :style="{ top: `${position.y}px`, left: `${position.x}px` }"
  >
    <ul>
      <div class="actions">
        <li id="ReviewedImageButton" @click="handleAction('reviewed')">
          <fa :icon="['fas', 'check']" />
          {{$t('image.ReviewedImage')}}
        </li>
        <li id="UnseenImageButton" @click="handleAction('unseen')">
          <fa :icon="['far', 'eye-slash']" />
          {{$t('image.Unseen')}}
        </li>
        <li id="DeleteImageButton" @click="handleAction('delete')" class="delete">
          <fa :icon="['far', 'trash-can']" />
          {{$t('image.DeleteImage')}}
        </li>
      </div>
      <div class="actions">
        <li id="DeleteAnnotationsButton" @click="handleAction('delete-annotations')" class="delete">
          <fa :icon="['fas', 'circle-minus']" />
          {{$t('image.DeleteAnnotations')}}
        </li>
        <li id="DeleteAIAnnotationsButton" @click="handleAction('delete-ai-annotation')" class="delete">
          <fa :icon="['fas', 'circle-minus']" />
          {{$t('image.DeleteAIAnnotations')}}
        </li>
      </div>
    </ul>
  </div>
</template>

<script setup>
import { toRefs } from 'vue';

const props = defineProps({
  isVisible: Boolean,
  position: Object,
  selectedImage: Object, // Ensure this prop gets the right image
});

const { isVisible, position, selectedImage } = toRefs(props);

const emit = defineEmits(['action']);

const handleAction = (action) => {
  emit('action', { action, image: selectedImage.value });
};
</script>

