<template>
    <div class="paragraph">
        <h2>{{ $t('modals.documentation.manualTutorial.title') }}</h2>
        <p>
            {{ $t('modals.documentation.manualTutorial.manualAnnotation') }}
        </p>
        <p>
            {{ $t('modals.documentation.manualTutorial.attributes') }}
        </p>
        <p>
            {{ $t('modals.documentation.manualTutorial.microtubularDefects') }}
        </p>
    </div>
    <div class="paragraph paragraph-last">
        <h2>{{ $t('modals.documentation.manualTutorial.title2') }}</h2>
        <p>{{ $t('modals.documentation.manualTutorial.description2') }}</p>
        
        <h3>{{ $t(`manualAnnotationTutorialDocumentation.steps.0.title`) }}</h3>
        <p>{{ $t(`manualAnnotationTutorialDocumentation.steps.0.description`) }}</p>
        <img :src="step1" alt="step1" >
    
        <h3>{{ $t(`manualAnnotationTutorialDocumentation.steps.1.title`) }}</h3>
        <p>{{ $t(`manualAnnotationTutorialDocumentation.steps.1.description`) }}</p>
        <p>{{ $t('modals.documentation.manualTutorial.newClass') }}</p>
        <img :src="step2" alt="step2" >
    
        <h3>{{ $t(`manualAnnotationTutorialDocumentation.steps.2.title`) }}</h3>
        <p>{{ $t(`manualAnnotationTutorialDocumentation.steps.2.description`) }}</p>
        <img :src="step3" alt="step3" >
    
        <h3>{{ $t(`manualAnnotationTutorialDocumentation.steps.3.title`) }}</h3>
        <p>{{ $t('modals.documentation.manualTutorial.step3') }}</p>
        <img :src="step4" alt="step4" >
    
        <h3 style="text-align: center; color: #3E63DD">{{ $t('modals.documentation.manualTutorial.repeat') }}</h3>
    
        <h3>{{ $t(`manualAnnotationTutorialDocumentation.steps.4.title`) }}</h3>
        <p>{{ $t(`manualAnnotationTutorialDocumentation.steps.4.description`) }}</p>
        <img :src="step5" alt="step5" >
    
        <h3>{{ $t(`manualAnnotationTutorialDocumentation.steps.5.title`) }}</h3>
        <p>{{ $t(`manualAnnotationTutorialDocumentation.steps.5.description`) }}</p>
        <img :src="step6" alt="step6" >
    </div>    
</template>

<script setup>
import step1 from '@/assets/Tutorial/step1.gif';
import step2 from '@/assets/Tutorial/step2.gif';
import step3 from '@/assets/Tutorial/step3.gif';
import step4 from '@/assets/Tutorial/step4.gif';
import step5 from '@/assets/Tutorial/step5.gif';
import step6 from '@/assets/Tutorial/step6.gif';
</script>

<style scoped>
.paragraph h3 {
    margin-top: 30px;
    margin-bottom: 10px;
}

.paragraph img {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>