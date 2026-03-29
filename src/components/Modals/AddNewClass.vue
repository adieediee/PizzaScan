<template>
    <div id="AddNewClassModal" class="modal" v-if="modalStore.isModalOpen('newClass')">
      <div class="modal-content">
        <div class="modal-title">
            <h1>{{$t('annotation.addNewClass')}}</h1>
            <span id="closeAddNewClassModalButton" class="btn btn-outlined btn-close" @click="modalStore.closeModal()">
                <fa :icon="['fas', 'xmark']" />
            </span>
        </div>
        <div class="class-preview">
          <span class="defect-name" :style="{ color: selectedColor, backgroundColor: selectedColor + '40'}">{{nameOfClass }}</span>
        </div>
        <div class="class-form">
          <div class="form">
            <label>{{$t('annotation.addNewClassName')}}</label>
            <input type="text" class="input" v-model="nameOfClass" @input="updateName" maxlength="25" />
          </div>

          <div class="form-group">
            <div class="form">
              <label>{{$t('annotation.addNewClassColor')}}</label>
              <div class="color-picker">
                <input type="color" class="input color-preview" v-model="selectedColor" :style="{ backgroundColor: selectedColor }" />
                <input type="text" class="input" v-model="hexColor" @input="updateColorFromText" />
              </div>
            </div>

            <div class="form">
              <span class="shortcut-form">
                <label>{{$t('annotation.addNewClassShortcut')}}</label>
                <sup class="info-icon">
                  <fa :icon="['fas', 'info-circle']" class="info-icon" />
                  <span class="tooltip">{{$t('annotation.shortcutInfo')}}</span>
                </sup>
              </span>
              <select class="input" v-model="shortcut">
                <option v-for="n in 10" :key="n-1" :value="(n-1).toString()">{{ n-1 }}</option>
              </select>
            </div>
          </div>

          <div class="form">
            <label>{{$t('annotation.addNewClassDescription')}}</label>
            <input type="text" class="input" v-model="description" @input="updateDescription" />
          </div>
          
          <p class="warning-text"
            :style="{ color: warningMessage === '.' ? '#101021' : '#F480A6' }"
          >{{ warningMessage }}</p>
          <button id="CreateClassButton" class="btn btn-filled btn-create" @click="createClass">{{$t('annotation.addNewClassButton')}}</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { useModalStore } from '@/stores/ModalStore';
  import { useAnnotationStore } from '@/stores/AnnotationsStore';
  import { useShortcutStore } from '@/stores/ShortcutStore';
  import { useI18n } from 'vue-i18n';

  const modalStore = useModalStore();
  const shortcutStore = useShortcutStore();
  const annotationStore = useAnnotationStore();
  const selectedColor = ref('#3E63DD');
  const hexColor = ref('#3E63DD');
  const nameOfClass = ref('Name of the class');
  const description = ref('');
  const shortcut = ref(null);
  const warningMessage = ref('.');
  const { t } = useI18n();

  const emit = defineEmits(['systemStatus']);

  watch(selectedColor, (newColor) => {
    hexColor.value = newColor;
  });

  const updateColorFromText = () => {
    if (/^#[0-9A-F]{6}$/i.test(hexColor.value)) {
      selectedColor.value = hexColor.value;
    }
  };

  const updateDescription = () => {
    if (description.value.length > 0) {
      description.value = description.value.charAt(0).toUpperCase() + description.value.slice(1);
    }
  };

  const updateName = () => {
    if (nameOfClass.value.length > 0) {
      nameOfClass.value = nameOfClass.value.charAt(0).toUpperCase() + nameOfClass.value.slice(1);
    }
  };

  const createClass = () => {
    if (nameOfClass.value === '') {
        warningMessage.value = t('annotation.warningEmptyName');
        return;
    }

    if (annotationStore.microtubularDefects.some(defect => defect.name === nameOfClass.value)) {
      warningMessage.value = t('annotation.warningWrongName');
      return;
    }

    if (annotationStore.microtubularDefects.some(defect => defect.color === selectedColor.value)) {
      warningMessage.value = t('annotation.warningWrongColor');
      return;
    }

    const existingShortcuts = Object.values(shortcutStore.userKeyBindings).concat(Object.values(shortcutStore.defaultKeyBindings));
    if (existingShortcuts.includes(shortcut.value)) {
        const oldClass = Object.keys(shortcutStore.userKeyBindings).find(
          key => shortcutStore.userKeyBindings[key] === shortcut.value
        );

        if (oldClass) {
          shortcutStore.updateKeyBinding(oldClass, '-');
        }

        shortcutStore.updateKeyBinding(nameOfClass.value.toLowerCase().replace(/ /g, '-'), shortcut.value);
    }

    warningMessage.value = '.';

    annotationStore.addNewClass(nameOfClass.value, selectedColor.value, description.value);
    modalStore.closeModal();
    emit('systemStatus', 'class');
  }; 

</script>


<style scoped>
.modal-content {
    background: var(--dark-dark1, #101021);
    padding: 20px;
    width: 35%;
    height: fit-content;
    border-radius: 15px;
}

.modal-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #2D2D42;
    padding-bottom: 20px;
    margin-bottom: 20px;
}

.modal-title h1 {
    margin: 0;
    font-weight: bolder;
}

.form-group {
  gap: 20px;
}

.tooltip {
  font-size: inherit;
}

.info-icon:hover .tooltip {
  visibility: visible;
  opacity: 1;
  cursor: pointer;
  display: block;
}

</style>