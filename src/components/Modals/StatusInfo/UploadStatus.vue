<template>
    <div v-if="imageStore.uploadModalVisible" id="uploadStatusModal" class="statusInfo">
        <div class="progress-bar">
            <div class="progress" :style="{ width: imageStore.currentPercentageUpload + '%' }"></div>
            <span class="progress-text">{{$t('status.upload')}}</span>
        </div>
    </div>
</template>

<script setup>
import { useImageStore } from '@/stores/ImageStore';
import { watch } from 'vue';
const imageStore = useImageStore();

watch(() => imageStore.uploadModalVisible, (newValue) => {
});

</script>

<style scoped>
.statusInfo {
    left: 40%;
    width: 20%;
    background-color: #33333300;
    box-shadow: none;
}

.progress-bar {
    width: 100%;
    height: 15px;
    background-color: #737379;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 15px;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.progress {
    height: 100%;
    background-color: #4CAF50;
    transition: width 0.3s ease;
    position: absolute;
    left: 0;
    top: 0;
}

.progress-text {
    color: white;
    font-size: smaller;
    position: absolute;
    text-align: center;
    width: 100%;
    pointer-events: none;
}
</style>
