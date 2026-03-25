<template>
  <div id="AnnotationDefects" class="section microtubularDefectSection">
    <div class="title-chevron">
      <h3>{{$t('rightSidebar.AnnotationOverview.microtubularDefect')}}</h3>
    </div>
    <button id="ChangeDefectButton" class="btn btn-defect" @click="openContextMenu($event)">
      <span class="defect-name"
            :style="{ color: imageStore.selectedAnnotation.color, backgroundColor: imageStore.selectedAnnotation.color + '40' }">
        {{ imageStore.selectedAnnotation.microtubularDefect }}
      </span>
    </button>
  </div>

  <DefectDyneinList
    :visible="contextMenuStore.defectMenuVisible"
    :items="annotationsStore.microtubularDefects"
    :title="$t('rightSidebar.AnnotationOverview.microtubularDefect')"
    :searchPlaceholder="$t('rightSidebar.AnnotationOverview.searchDefect')"
    :position="contextMenuPosition"
    :showAddButton="true"
    @close="closeContextMenu"
    @select="selectDefect"
    @addNewItem="openNewClassMenu"
  />

  <NewDefect :style="{ top: newClassMenuPosition.top + 'px', left: newClassMenuPosition.left + 'px' }"/>

</template>

<script setup>
import { ref, nextTick } from 'vue';
import { useAnnotationStore } from '@/stores/AnnotationsStore';
import { useContextMenu } from '@/stores/ContextMenuStore';
import { useImageStore } from '@/stores/ImageStore';
import DefectDyneinList from '@/components/ContextMenu/DefectDyneinList.vue';
import NewDefect from '@/components/ContextMenu/NewDefect.vue';

const contextMenuStore = useContextMenu();
const annotationsStore = useAnnotationStore();
const imageStore = useImageStore();
const contextMenuPosition = ref({ top: 0, left: 0 });
const newClassMenuPosition = ref({ top: 0, left: 0 });

const emit = defineEmits(['annotationUpdated']);

const openContextMenu = (event) => {
  contextMenuStore.openContextMenu("defect");
  nextTick(() => {
    const section = document.querySelector('.microtubularDefectSection');
    const contextMenu = document.querySelector('.context-menu')
    if (section && contextMenu) {
      const sectionRect = section.getBoundingClientRect();
      const contextMenuHeight = contextMenu.offsetHeight;
      const contextMenuWidth = contextMenu.offsetWidth;
      const windowHeight = window.innerHeight
      let top = sectionRect.top + (sectionRect.height / 2) - (contextMenuHeight / 2); 
      let left = sectionRect.left - contextMenuWidth
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
  annotationsStore.updateAnnotationDefect(imageStore.selectedAnnotation.id, defect.name);
  emit('annotationUpdated', imageStore.selectedAnnotation);
  contextMenuStore.closeContextMenu("defect");
};

const closeContextMenu = () => {
  contextMenuStore.closeContextMenu("defect");
};

const openNewClassMenu = () => {
  contextMenuStore.openContextMenu("newClass");
  nextTick(() => {
    const microtubularMenu = document.querySelector('.context-menu');
    const newClassMenu = document.querySelector('#NewClassModal');
    if (microtubularMenu && newClassMenu) {
      const sectionRect = microtubularMenu.getBoundingClientRect();
      const newClassMenuWidth = newClassMenu.offsetWidth;
      const newClassMenuHeight = newClassMenu.offsetHeight;
      const windowHeight = window.innerHeight
      let top = sectionRect.top + (sectionRect.height / 2) - (newClassMenuHeight / 2); 
      let left = sectionRect.left - newClassMenuWidth
      if (top < 0) {
        top = 0;
      }
      if (top + newClassMenuHeight > windowHeight) {
        top = windowHeight - newClassMenuHeight;
      }
      newClassMenuPosition.value = { top, left };
    }
    event.stopPropagation();
  });
};

</script>

<style scoped>
.btn-defect {
  margin: 0;
  padding: 0;
}
</style>