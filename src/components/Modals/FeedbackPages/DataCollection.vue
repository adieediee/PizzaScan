<template>
    <div class="paragraph paragraph-last">
        <h2>{{$t('modals.feedback.data.header')}}</h2>
        <p>{{$t('modals.feedback.data.paragraph1')}}</p>
        <p>{{$t('modals.feedback.data.paragraph2')}}</p>
        <ToggleSwitch id="DataCollectionToggleButton" :label="$t('modals.feedback.data.toggleLabel')" :checked="true" />
    </div>
</template>

<script setup>
import ToggleSwitch from '@/components/UI/ToggleSwitch.vue';
</script>