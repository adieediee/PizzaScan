<template>
    <div class="paragraph">
      <h2>{{$t('modals.settings.defects.title')}}</h2>
      <p>{{$t('modals.settings.defects.description')}}</p>
    </div>
    
    <div class="paragraph">
        <div class="add-class">
            <h2>{{$t('annotation.addNewClass')}}</h2>
            <p>{{$t('modals.settings.defects.formDescription')}}</p>
              <div class="class-preview">
                <span class="defect-name" :style="{ color: selectedColor, backgroundColor: selectedColor + '40'}">{{nameOfClass}}</span>
              </div>
              <div class="class-form">
                <div class="form-group" >
                    <div class="form">
                      <label>{{$t('annotation.addNewClassName')}}</label>
                      <input type="text" class="input" v-model="nameOfClass" @input="updateName" maxlength="25" />
                    </div>
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
                <p v-if="warningMessage" class="warning-text">{{ warningMessage }}</p>
                <button id="CreateClassButton" class="btn btn-filled btn-create" @click="createClass">{{ isEditing ? $t('modals.settings.defects.editButton') : $t('modals.settings.defects.createButton') }}</button>
                <button v-if="isEditing" id="CancelEditClassButton" class="btn btn-cancel" @click="resetForm">{{$t('modals.settings.defects.cancelButton')}}</button>
              </div>
        </div>
    </div> 
    <div class="paragraph paragraph-last">
        <div class="defect-list">
            <h2>{{$t('modals.settings.defects.title2')}}</h2>
            <p>{{$t('modals.settings.defects.description')}}</p>

            <div class="search-bar">
              <input
                id="searchBar"
                type="text"
                v-model="query"
                :placeholder="$t('rightSidebar.AnnotationOverview.searchDefect')"
                class="search-input"
              />
              <button class="clear-button" @click="clearSearch" v-if="query">
                <fa :icon="['fas', 'xmark']" />
              </button>
            </div>
            
            <div class="defects-table-container">
            <table class="defects-table">
                <thead>
                <tr>
                    <th class="col-color">{{$t('annotation.addNewClassColor')}}</th>
                    <th class="col-name">{{$t('annotation.addNewClassName')}}</th>
                    <th class="col-description">{{$t('annotation.addNewClassDescription')}}</th>
                    <th class="col-shortcut">{{$t('annotation.addNewClassShortcut')}}</th>
                    <th class="col-actions"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(defect, index) in filteredItems" :key="index">
                    <td>
                      <span :style="{ backgroundColor: defect.color }" class="color-box"></span>
                    </td>
                    <td>{{ defect.name }}</td>
                    <td>{{ defect.description }}</td>
                    <td class="td-shortcut">
                      <span v-if="shortcutStore.getKeyBinding(defect.value).value == undefined" class="shortcut">-</span>
                      <span v-else class="shortcut">{{ shortcutStore.getKeyBinding(defect.value) }}</span>
                    </td>
                    <td class="actions">
                        <div class="btn-group">
                            <button id="editClassButton" class="btn btn-icon" @click="editDefect(defect)">
                                <fa :icon="['fas', 'pen']" />
                                <span class="tooltip long-tooltip">{{$t('modals.settings.defects.editButton')}}</span>
                            </button>
                            <button id="deleteClassButton" class="btn btn-icon deleteButton" @click="deleteDefect(defect)">
                                <fa :icon="['fas', 'trash']" />
                                <span class="tooltip long-tooltip">{{$t('modals.settings.defects.deleteButton')}}</span>
                            </button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>

  <DeleteClass :visible="isDeleteModalVisible" :onUndo="undoDelete" />

  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useAnnotationStore } from '@/stores/AnnotationsStore';
  import { useShortcutStore } from '@/stores/ShortcutStore';
  import { useI18n } from 'vue-i18n';
  import DeleteClass from '@/components/Modals/StatusInfo/DeleteClass.vue';
  
  const annotationStore = useAnnotationStore();
  const shortcutStore = useShortcutStore();
  const { t } = useI18n();
  const selectedColor = ref('#3E63DD');
  const hexColor = ref('#3E63DD');
  const nameOfClass = ref('Name of the class');
  const description = ref('');
  const shortcut = ref(null);
  const warningMessage = ref('');
  const isEditing = ref(false);
  const currentDefect = ref(null);
  const query = ref('');
  const deletedClass = ref(null);
  const isDeleteModalVisible = ref(false);

  const updateColorFromText = () => {
    if (/^#[0-9A-F]{6}$/i.test(hexColor.value)) {
      selectedColor.value = hexColor.value;
    }
  };

  const updateName = () => {
    if (nameOfClass.value.length > 0) {
      nameOfClass.value = nameOfClass.value.charAt(0).toUpperCase() + nameOfClass.value.slice(1);
    }
  };

  const updateDescription = () => {
    if (description.value.length > 0) {
      description.value = description.value.charAt(0).toUpperCase() + description.value.slice(1);
    }
  };

  const createClass = () => {
    if (nameOfClass.value === '') {
      warningMessage.value = t('annotation.warningEmptyName');
      return;
    }
    
    const existingShortcuts = Object.values(shortcutStore.userKeyBindings).concat(Object.values(shortcutStore.defaultKeyBindings));

    if (!isEditing.value) {
      if (annotationStore.microtubularDefects.some(defect => defect.name === nameOfClass.value)) {
        warningMessage.value = t('annotation.warningWrongName');
        return;
      }

      if (annotationStore.microtubularDefects.some(defect => defect.color === selectedColor.value)) {
        warningMessage.value = t('annotation.warningWrongColor');
        return;
      }

      if (existingShortcuts.includes(shortcut.value)) {
        const oldClass = Object.keys(shortcutStore.userKeyBindings).find(
          key => shortcutStore.userKeyBindings[key] === shortcut.value
        );

        if (oldClass) {
          shortcutStore.updateKeyBinding(oldClass, '-');
        }

        shortcutStore.updateKeyBinding(nameOfClass.value.toLowerCase().replace(/ /g, '-'), shortcut.value);
      }
    
      annotationStore.addNewClass(nameOfClass.value, selectedColor.value, description.value);
    } else {
      if (existingShortcuts.includes(shortcut.value)) {
        const oldClass = Object.keys(shortcutStore.userKeyBindings).find(
          key => shortcutStore.userKeyBindings[key] === shortcut.value
        );

        if (oldClass) {
          shortcutStore.updateKeyBinding(oldClass, '-');
        }

        shortcutStore.updateKeyBinding(nameOfClass.value.toLowerCase().replace(/ /g, '-'), shortcut.value);
      }

      annotationStore.updateClass(currentDefect.value, nameOfClass.value, selectedColor.value, description.value);
    }

    resetForm();
};

  const editDefect = (defect) => {
    nameOfClass.value = defect.name;
    selectedColor.value = defect.color;
    hexColor.value = defect.color;
    isEditing.value = true;
    currentDefect.value = defect;
    description.value = defect.description;
    shortcut.value = shortcutStore.getKeyBinding(defect.value).value;
    warningMessage.value = '';
  };

  const deleteDefect = (defect) => {
    deletedClass.value = defect;
    isDeleteModalVisible.value = true;
    
    annotationStore.deleteClass(defect);

    setTimeout(() => {
      if (isDeleteModalVisible.value) {
        deletedClass.value = null;
        isDeleteModalVisible.value = false;
      }
    }, 10000);
  };
  
  const undoDelete = () => {
    if (deletedClass.value) {
      annotationStore.addNewClass(deletedClass.value.name, deletedClass.value.color, deletedClass.value.description);
      shortcutStore.updateKeyBinding(deletedClass.value.value.replace(/ /g, '-'), deletedClass.value.shortcut);
      deletedClass.value = null;
    }

    isDeleteModalVisible.value = false;
  };

  const resetForm = () => {
    nameOfClass.value = '';
    selectedColor.value = '';
    hexColor.value = '';
    description.value = '';
    shortcut.value = null;
    isEditing.value = false;
    currentDefect.value = null;
    warningMessage.value = '';
  };

  const clearSearch = () => {
    query.value = '';
  };

  const filteredItems = computed(() => {
    return annotationStore.microtubularDefects.filter(item =>
      item.name.toLowerCase().includes(query.value.toLowerCase())
    );
  });

</script>  

<style scoped>    
.class-preview {
  border-radius: 20px;
}

.defects-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 40px;
}

.defects-table th, .defects-table td {
    padding: 10px;
    border-bottom: 1px solid #2D2D42;
    text-align: left;
}

.defects-table thead tr th {
    font-weight: 600;
}
  
.color-box {
      display: inline-block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
}

.col-color {
    width: 10%;
}

.defects-table-container {
    width: 100%;
    overflow-x: auto;
}

.defects-table-container::-webkit-scrollbar {
  width: 4px; 
}

.defects-table-container::-webkit-scrollbar-thumb {
  background: #888; 
  border-radius: 4px; 
}

.defects-table-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.btn-group {
    display: inline-flex;
    gap: 10px;
    justify-content: end;
}
  
.actions {
    text-align: end!important;
}

.form {
  width: 100%;
}

.search-bar {
  justify-content: right;
}

.search-input {
  margin-top: 0;
  margin-bottom: 0;
  width: 40%;
  padding-left: 35px;
}

.search-bar::before {
  bottom: 0;
  left: 60.5%;
  margin: 10px;
  top: 15%;
}

.clear-button {
  bottom: 0;
  left: 95%;
  margin: 10px;
  top: 10%;
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