import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useContextMenu = defineStore('contextMenu', () => {
  const defectMenuVisible = ref(false);
  const armsMenuVisible = ref(false);
  const newClassVisible = ref(false);

  const openContextMenu = (type) => {
    if(type === 'defect') {
      defectMenuVisible.value = true;
      armsMenuVisible.value = false;
    } else if(type === 'arms') {
        armsMenuVisible.value = true;
        defectMenuVisible.value = false;
    } else if(type === 'newClass') {
        newClassVisible.value = true;
    }
  };

  const closeContextMenu = (type) => {
    if(type === 'defect') {
      defectMenuVisible.value = false;
    } else if(type === 'arms') {
      armsMenuVisible.value = false;
    } else if(type === 'newClass') {
      newClassVisible.value = false;
    }
  };

  const closeAllMenus = () => {
    defectMenuVisible.value = false;
    armsMenuVisible.value = false;
    newClassVisible.value = false;
  };

  return {
    newClassVisible,
    defectMenuVisible,
    armsMenuVisible,
    openContextMenu,
    closeContextMenu,
    closeAllMenus,
  };
});
