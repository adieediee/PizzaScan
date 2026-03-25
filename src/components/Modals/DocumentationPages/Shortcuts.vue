<template>
    <div class="paragraph">
      <p>{{ $t('modals.documentation.shortcuts.description') }}</p>
    </div>
  
    <div class="paragraph paragraph-last">
      <h2>{{ $t("modals.documentation.shortcuts.shortcuts.general.title") }}</h2>
      <table class="shortcuts-table">
        <thead>
          <tr>
            <th class="first-column">{{ $t("modals.documentation.shortcuts.table-col1") }}</th>
            <th>{{ $t("modals.documentation.shortcuts.table-col2") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="shortcut">{{ $t('modals.documentation.shortcuts.shortcuts.general.CTRL+O.key') }}</span></td>
            <td>{{ $t('modals.documentation.shortcuts.shortcuts.general.CTRL+O.description') }}</td>
          </tr>
          <tr>
            <td><span class="shortcut">{{ $t('modals.documentation.shortcuts.shortcuts.general.CTRL+S.key') }}</span></td>
            <td>{{ $t('modals.documentation.shortcuts.shortcuts.general.CTRL+S.description') }}</td>
          </tr>
          <tr>
            <td><span class="shortcut">{{ $t('modals.documentation.shortcuts.shortcuts.general.CTRL+E.key') }}</span></td>
            <td>{{ $t('modals.documentation.shortcuts.shortcuts.general.CTRL+E.description') }}</td>
          </tr>
        </tbody>
      </table>

      <h2>{{ $t("modals.documentation.shortcuts.shortcuts.annotation.title") }}</h2>
      <table class="shortcuts-table">
          <thead>
              <tr>
                  <th class="first-column">{{ $t("modals.documentation.shortcuts.table-col1") }}</th>
                  <th>{{ $t("modals.documentation.shortcuts.table-col2") }}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><span class="shortcut">{{$t('modals.documentation.shortcuts.shortcuts.annotation.CTRL+A.key') }}</span></td>
                    <td>{{ $t('modals.documentation.shortcuts.shortcuts.annotation.CTRL+A.description') }}</td>
                </tr>
                <tr>
                    <td><span class="shortcut">{{ $t('modals.documentation.shortcuts.shortcuts.annotation.CTRL+C.key') }}</span></td>
                    <td>{{ $t('modals.documentation.shortcuts.shortcuts.annotation.CTRL+C.description') }}</td>
                </tr>
                <tr>
                    <td><span class="shortcut">{{ $t('modals.documentation.shortcuts.shortcuts.annotation.CTRL+V.key') }}</span></td>
                    <td>{{ $t('modals.documentation.shortcuts.shortcuts.annotation.CTRL+V.description') }}</td>
                </tr>
            </tbody>
        </table>
        
        <p>{{ $t("modals.documentation.shortcuts.shortcuts.annotation.description") }}</p>

        <table class="shortcuts-table">
            <thead>
            <tr>
                <th class="first-column">{{ $t("modals.documentation.shortcuts.table-col1") }}</th>
                <th>{{ $t("modals.documentation.shortcuts.table-col2") }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(key, defect) in keyBindings" :key="defect">
                <td><span class="shortcut">{{ key }}</span></td>
                <td>{{ formatDefectName(defect) }}</td>
            </tr>
            </tbody>
        </table>
    
    <h2>{{ $t("modals.documentation.shortcuts.shortcuts.navigation.title") }}</h2>
    <table class="shortcuts-table">
        <thead>
            <tr>
                <th class="first-column">{{ $t("modals.documentation.shortcuts.table-col1") }}</th>
                <th>{{ $t("modals.documentation.shortcuts.table-col2") }}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><span class="shortcut">{{ $t('modals.documentation.shortcuts.shortcuts.navigation.CTRL+I.key') }}</span></td>
                <td>{{ $t('modals.documentation.shortcuts.shortcuts.navigation.CTRL+I.description') }}</td>
            </tr>
            <tr>
                <td><span class="shortcut">{{ $t('modals.documentation.shortcuts.shortcuts.navigation.CTRL+Z.key') }}</span></td>
                <td>{{ $t('modals.documentation.shortcuts.shortcuts.navigation.CTRL+Z.description') }}</td>
            </tr>
        </tbody>
      </table>
    </div>
</template>

<script setup>
import { useShortcutStore } from '@/stores/ShortcutStore';

const shortcutStore  = useShortcutStore();

const keyBindings = shortcutStore.getDefaultAndUserKeyBindings;

const formatDefectName = (defect) => {
  return defect.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
};

</script>
  
<style scoped>
  .shortcuts-section {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: var(--dark-dark3, #2D2D42) 1px solid;
}

  .shortcuts-table th {
    font-weight: bolder;
    background: #212134;
  }

  .shortcuts-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    border-radius: 15px;
    overflow: hidden;
  }
  
  .shortcuts-table th,
  .shortcuts-table td {
    border: 1px solid #212134;
    padding: 15px;
    text-align: left;
  }

  .shortcut {
    padding: 10px;
    font-weight: bold;
  }

  .first-column {
    width: 10%;
  }

  </style>
  