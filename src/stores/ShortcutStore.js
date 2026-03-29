// store/KeyBindingsStore.js
import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';

export const useShortcutStore = defineStore('shortcuts',() => {
    const defaultKeyBindings = ref({
      'normal': '1',
      'disarranged': '2',
      'extra-tuble': '3',
      'single-tuble': '4',
      'compound': '5',
      'transposition': '6',
      'one-of-pair-missing': '7',
      'both-missing': '8',
      'other-defect': '9',
    })

    const globalShortcuts = ref({
      'CTRL + A': 'add new class',
      'CTRL + I': 'center image',
      'CTRL + C': 'copy annotation',
      'CTRL + V': 'paste annotation',
      'CTRL + Z': 'undo',
      'CTRL + O': 'open project',
      'CTRL + S': 'save project',
      'CTRL + E': 'export project',
    })

    const userKeyBindings = ref(JSON.parse(localStorage.getItem('userKeyBindings')) || []);

    const saveKeyBindings = () => {
      localStorage.setItem('userKeyBindings', JSON.stringify(userKeyBindings.value));
    }

    if(userKeyBindings.value.length === 0) {
      userKeyBindings.value = Object.entries(defaultKeyBindings.value).map(([key, value]) => ({ key, value }));
      saveKeyBindings();
    }

    const updateKeyBinding = (defect, newKey) =>{
      userKeyBindings.value = userKeyBindings.value.filter((binding) => binding.key !== defect && binding.value !== newKey);
      userKeyBindings.value.push(
        {"key": defect, "value": newKey});
    }

    const deleteKeyBinding = (defect) => {
      defaultKeyBindings.value = defaultKeyBindings.value.filter((binding) => binding.key !== defect);
      saveKeyBindings();
    }

    const getKeyBinding = (defect) => {
      return computed(() => {
        const userBindings = userKeyBindings.value.reduce((acc,current) => {acc[current.key] = current.value; return acc}, {})
        return userBindings[defect];
      })
    }

    const getDefaultAndUserKeyBindings = computed(() => {
      return userKeyBindings.value.reduce((acc,current) => {acc[current.key] = current.value; return acc}, {})
    } )

    const getGlobalShortcuts = computed(() => {
      return globalShortcuts.value;
    })

  return {
    defaultKeyBindings,
    globalShortcuts,
    userKeyBindings,
    saveKeyBindings,
    updateKeyBinding,
    getKeyBinding,
    deleteKeyBinding,
    getDefaultAndUserKeyBindings,
    getGlobalShortcuts
  };
});
