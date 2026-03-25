<template>
    <div v-if="visible" class="context-menu" :style="{ top: position.top + 'px', left: position.left + 'px' }">
      <div class="context-menu-header">
        <h1>{{ title }}</h1>
        <div class="btn-header">
          <button v-if="showAddButton" @click="$emit('addNewItem')" class="btn">
            <fa :icon="['fas', 'plus']" />
            <span class="tooltip">{{ $t('annotation.addNewClass') }}</span>
          </button>
          <button @click="$emit('close')" class="btn btn-close">
            <fa :icon="['fas', 'xmark']" />
          </button>
        </div>
      </div>
      
      <div class="search-bar">
        <input type="text" v-model="query" :placeholder="searchPlaceholder" class="search-input" />
        <button class="clear-button" @click="query = ''" v-if="query">
          <fa :icon="['fas', 'xmark']" />
        </button>
      </div> 
  
      <ul>
        <li v-for="item in filteredItems" :key="item.value" @click="$emit('select', item)">
          <span class="defect-name" :style="{ color: item.color, backgroundColor: item.color + '40' }">
            {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';

  const props = defineProps({
    visible: Boolean,
    items: Array,
    title: String,
    searchPlaceholder: String,
    position: Object,
    showAddButton: Boolean
  });

  const emit = defineEmits(['close', 'select', 'addNewItem']);

  const query = ref('');
  const filteredItems = computed(() => {
    return props.items.filter(item =>
      item.name.toLowerCase().includes(query.value.toLowerCase())
    );
  });

  </script>
  
  <style scoped>
  .context-menu {
    padding: 10px 20px;
  }
  
  .context-menu ul {
    max-height: 200px;
    overflow-y: auto;
  }

  .defect-name {
    background: #2D2D42;
    color: white;
  }
  
  .btn-defect {
    margin: 0;
    padding: 0;
  }

  .btn-header .btn svg {
    font-size: 1rem;
  }

  .search-bar::before {
    bottom: -5%;
    margin: 15px;
  }
  
  .clear-button {
    right: 5%;
  }

</style>