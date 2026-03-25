<template>
  <ul>
    <template v-for="(item, index) in images" :key="index">
      <div class="image-and-annotations">
        <li
          class="list-item"
          :style="{ borderRight: item.onceOpen ? '3px solid #26FF00' : 'none' }"
          @click="selectImage(item, index)"
          @contextmenu.prevent="openImageMenu($event, item)"
        >
          <img :src="item.imageUrl" :alt="item.imageName" class="image" />
          <span
            class="image-name"
            :style="{ color: item.isOpen ? '#3E63DD' : 'white' }"
          >
            {{ item.imageName }}
            <fa
              :icon="['fas', 'check']"
              class="reviewed"
              v-if="item.reviewed"
            />
          </span>
          <button
            class="chevron-btn"
            :class="{ rotated: item.isOpen }"
            @click.stop="toggleChevron(index)"
          >
            <fa :icon="['fas', 'chevron-down']" />
          </button>
        </li>
        <template v-if="item.isOpen">
          <ul class="annotations-list">
            <li
              v-for="(data, defectValue) in groupedAnnotations(item)"
              :key="defectValue"
              class="annotation-item"
            >
              <div class="annotation-content">
                <div class="annotation-row">
                  <span
                    class="annotation-dot"
                    :style="{ backgroundColor: data.color }"
                  ></span>
                  <div class="annotation-name-count">
                    <span class="annotation-name">{{ data.name }}</span>
                    <span class="shortcut">{{ data.count }}</span>
                  </div>
                </div>
                <!-- odkomentovane pre potreby testing
                  <div class="annotation-row">
                    <div class="annotation-dynein-count">
                      <span
                        class="annotation-dot annotation-dot-small dyneinArms-unknown"
                        :style="{ backgroundColor: data.color }"
                      ></span>
                      <p class="dynein-count">{{ data.dyneinArmsCounts.unknown }}</p>
                    </div>
                    <div class="annotation-dynein-count">
                      <span
                        class="annotation-dot annotation-dot-small dyneinArms-none"
                        :style="{ backgroundColor: data.color }"
                      ></span>
                      <p class="dynein-count">{{ data.dyneinArmsCounts["no-arms-missing"] }}</p>
                    </div>
                    <div class="annotation-dynein-count">
                      <span
                        class="annotation-dot annotation-dot-small dyneinArms-inner"
                        :style="{ backgroundColor: data.color }"
                      ></span>
                      <p class="dynein-count">{{ data.dyneinArmsCounts["inner-arms-missing"] }}</p>
                    </div>
                    <div class="annotation-dynein-count">
                      <span
                        class="annotation-dot annotation-dot-small dyneinArms-both"
                        :style="{ backgroundColor: data.color }"
                      ></span>
                      <p class="dynein-count">{{ data.dyneinArmsCounts["both-arms-missing"] }}</p>
                    </div>
                    <div class="annotation-dynein-count">
                      <span
                        class="annotation-dot annotation-dot-small dyneinArms-outer"
                        :style="{ backgroundColor: data.color }"
                      ></span>
                      <p class="dynein-count">{{ data.dyneinArmsCounts["outer-arms-missing"] }}</p>
                    </div>
                  </div>
-->
              </div>
            </li>
          </ul>
        </template>
      </div>
    </template>
  </ul>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { useAnnotationStore } from "@/stores/AnnotationsStore";

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
  getAnnotations: {
    type: Function,
    required: true,
  },
  selectedAnnotation: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["selectImage", "toggleChevron", "openContextMenu"]);

const annotationStore = useAnnotationStore();

const selectImage = (image, index) => {
  emit("selectImage", image, index);
};

const toggleChevron = (index) => {
  emit("toggleChevron", index);
};

const openImageMenu = (event, item) => {
  emit("openImageMenu", event, item);
};

const groupedAnnotations = (item) => {
  const annotations = annotationStore.getAnnotations(item);

  return annotations.reduce((acc, annotation) => {
    const defectValue = annotation.microtubularDefectValue;

    if (!acc[defectValue]) {
      acc[defectValue] = {
        name: annotation.microtubularDefect,
        count: 0,
        color: annotation.color,
        dyneinArmsCounts: {
          unknown: 0,
          "no-arms-missing": 0,
          "inner-arms-missing": 0,
          "both-arms-missing": 0,
          "outer-arms-missing": 0,
        },
      };
    }

    acc[defectValue].count += 1;
    acc[defectValue].dyneinArmsCounts[annotation.dyneinArmsValue] += 1;

    return acc;
  }, {});
};
</script>

<style scoped>
.image-and-annotations {
  margin-bottom: 20px;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--dark-dark2, #212134);
}

.list-item:hover {
  cursor: pointer;
}

.image {
  width: 30%;
  height: 30%;
  object-fit: cover;
}

.image-name {
  flex-grow: 1;
  margin-left: 10px;
  font-size: small;
}

.annotation-item {
  display: flex;
  padding: 8px;
  align-items: center;
  border-bottom: 1px solid var(--dark-dark2, #212134);
}

.annotation-content {
  align-items: center;
  padding-left: 10px;
  width: 100%;
}

.annotation-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  font-size: smaller;
}

.annotation-name {
  font-size: small;
}

.annotation-name-count {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

ul {
  padding: 0;
}

.selected-annotation {
  background-color: #212134;
  border-top: 1px solid #3e63dd;
  border-bottom: 1px solid #3e63dd;
}

.reviewed {
  color: #3e63dd;
  background-color: #3e63dd77;
  padding: 2px;
  border-radius: 50%;
  font-size: 0.7em;
}

.annotation-dot-small {
  width: 15px;
  height: 15px;
  margin: 0 5px;
}

.annotation-dynein-count {
  align-items: center;
  text-align: center;
  margin-top: 10px;
  gap: 0;
}

.dyneinArms-none::before {
  width: 20px;
}

.dyneinArms-outer::before {
  width: 15px;
}

.dyneinArms-both::before,
.dyneinArms-both::after {
  width: 15px;
  height: 2px;
}

.dynein-count {
  color: #737373;
}
</style>
