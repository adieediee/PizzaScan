<template>
  <div id="AnnotationDynein" class="section dyneinArmsSection">
    <div class="title-chevron">
      <h3>{{$t('rightSidebar.AnnotationOverview.dyneinType')}}</h3>
    </div>
    <button id="ChangeDyneinButton" class="btn btn-defect" @click="openContextMenu($event)">
      <span class="defect-name"> {{ imageStore.selectedAnnotation.dyneinArms }} </span>
    </button>
  </div>

  <DefectDyneinList
    :visible="contextMenuStore.armsMenuVisible"
    :items="annotationsStore.dyneinArms"
    :title="$t('rightSidebar.AnnotationOverview.dyneinType')"
    :searchPlaceholder="$t('rightSidebar.AnnotationOverview.searchDynein')"
    :position="contextMenuPosition"
    @close="closeContextMenu"
    @select="selectDefect"
  />
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { useAnnotationStore } from '@/stores/AnnotationsStore';
import { useContextMenu } from '@/stores/ContextMenuStore';
import { useImageStore } from '@/stores/ImageStore';
import DefectDyneinList from '@/components/ContextMenu/DefectDyneinList.vue';

const contextMenuStore = useContextMenu();
const annotationsStore = useAnnotationStore();
const imageStore = useImageStore();
const contextMenuPosition = ref({ top: 0, left: 0 });

const emit = defineEmits(['annotationUpdated']);

const openContextMenu = (event) => {
  contextMenuStore.openContextMenu("arms");
  nextTick(() => {
    const section = document.querySelector('.microtubularDefectSection');
    const contextMenu = document.querySelector('.context-menu');
  
    if (section && contextMenu) {
      const sectionRect = section.getBoundingClientRect();
      const contextMenuHeight = contextMenu.offsetHeight;
      const contextMenuWidth = contextMenu.offsetWidth;
      const windowHeight = window.innerHeight;
    
      let top = sectionRect.top + (sectionRect.height / 2) - (contextMenuHeight / 2); 
      let left = sectionRect.left - contextMenuWidth;
    
      if (top < 0) {
        top = 0;
      }
      if (top + contextMenuHeight > windowHeight) {
        top = windowHeight - contextMenuHeight;
      }
    
      contextMenuPosition.value = { top, left };
      contextMenu.style.visibility = 'visible';
    }
    event.stopPropagation();
  });
};

const selectDefect = (defect) => {
  annotationsStore.updateAnnotationArms(imageStore.selectedAnnotation.id, defect.value);
  emit('annotationUpdated', imageStore.selectedAnnotation);
  contextMenuStore.closeContextMenu("arms");
};

const closeContextMenu = () => {
  contextMenuStore.closeContextMenu("arms");
};

</script>

<style scoped>
.defect-name {
  background: #2D2D42;
  color: white;
}

.btn-defect {
  margin: 0;
  padding: 0;
}
</style>

