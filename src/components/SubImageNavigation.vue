<template>
  <div class="sub-nav" v-if="imageStore.activeSubImage">
    <button class="sub-nav-btn" @click="navigate(-1)">
      <fa :icon="['fas', 'chevron-left']" />
    </button>
    <span class="sub-nav-counter">
      {{ currentIndex + 1 }} / {{ total }}
    </span>
    <button class="sub-nav-btn" @click="navigate(1)">
      <fa :icon="['fas', 'chevron-right']" />
    </button>
    <span class="sub-nav-name">{{ imageStore.activeSubImage.imageName }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useImageStore } from '@/stores/ImageStore';

const imageStore = useImageStore();

const currentIndex = computed(() => imageStore.activeSubImage?.subImageIndex ?? 0);
const total = computed(() => imageStore.activeSubImageParent?.subImages?.length ?? 0);

const navigate = (direction) => {
  imageStore.navigateSubImage(direction);
};
</script>

<style scoped>
.sub-nav {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12px;
  background: #1a1a2e;
  border: 1px solid #3e63dd66;
  border-radius: 24px;
  padding: 8px 18px;
  z-index: 10;
  user-select: none;
}

.sub-nav-btn {
  background: none;
  border: none;
  color: #aaaacc;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}

.sub-nav-btn:hover {
  background: #3e63dd33;
  color: white;
}

.sub-nav-counter {
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  min-width: 40px;
  text-align: center;
}

.sub-nav-name {
  font-size: 0.75rem;
  color: #95F204;
  margin-left: 4px;
}
</style>
