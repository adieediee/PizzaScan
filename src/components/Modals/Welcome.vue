<template>
    <div class="modal">
        <div class="modal-content">
            <div class="left-side">
                <div class="modal-title">
                    <h1 v-if="step===0" class="blue">{{ $t('welcome.welcome.title') }}</h1>
                    <h1 v-if="step===1" class="blue">{{ $t('welcome.aiModel.title') }}</h1>
                    <h1 v-if="step===2" class="blue">{{ $t('welcome.experience.title') }}</h1>
                </div>
                <div>
                    <div v-if="step===0">
                        <p>{{ $t('welcome.welcome.description') }}</p>
                        <p>{{ $t('welcome.welcome.goal') }}</p>
                    </div>
                    <div v-if="step===1">
                        <p>{{ $t('welcome.aiModel.usage') }}</p>
                        <p>{{ $t('welcome.aiModel.training') }}</p>
                        <p>{{ $t('welcome.aiModel.evolving') }}</p>
                    </div>
                    <div v-if="step===2">
                        <p>{{ $t('welcome.experience.dataCollection') }}</p>
                        <p>{{ $t('welcome.experience.insights') }}</p>
                        <div class="agree">
                            <input type="checkbox" class="checkbox"> 
                            <span>{{ $t('welcome.experience.agreement') }}</span>
                        </div>
                    </div>
                    <div class="div-button">
                        <button id="WelcomeBackButton" class="btn btn-outlined" :style="{ visibility: step === 0 ? 'hidden' : 'visible' }" @click="previousStep">{{ $t('general.backButton') }}</button>
                        <button id="WelcomeNextButton" class="btn btn-filled" @click="nextStep">{{ nextButtonText }}</button>
                    </div>
                </div>
            </div>
            <div class="right-side">
                <img v-show="step === 0" :key="0" src="/src/assets/welcome/Tv2.png">
                <img v-show="step === 1" :key="1" src="/src/assets/welcome/ai_priklad.gif">
                <img v-show="step === 2" :key="2" src="/src/assets/welcome/Tv16.png"> 
            </div>
        </div>
    </div>
</template>

  
<script setup>
import { ref, computed } from 'vue';
import { useBoardingStore} from '@/stores/BoardingStore';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const step = ref(0);
const boardingStore = useBoardingStore();

const nextStep = () => {
    step.value++;
    if(step.value === 3) {
        boardingStore.setWelcome();
    }
};

const previousStep = () => {
    step.value--;
};

const nextButtonText = computed(() => {
    return step.value === 2 ? t('general.finishButton') : t('general.nextButton');
});

</script>

<style scoped>
.modal-content {
    flex-direction: row;
    padding: 0;
}

.right-side {
    width: 60%;
}

.left-side {
    width: 40%;
    padding: 30px;
}

.left-side p {
    font-size: 1.1rem;
    margin-bottom: 20px;
}

.blue {
    font-weight: bolder;
    color: #3E63DD;
}

.h2-blue {
    text-align: center;
    color: #3E63DD;
    font-weight: bolder;
    margin-bottom: 0px;
}

.div-button {
    position: absolute;
    bottom: 15%; 
    display: flex;
    width: 27%;
    justify-content: space-between;
}

.bold {
    font-weight: 800;
}

.right-side img {
    width: 100%;
    height: 100%;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
}

.agree {
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
}

.checkbox {
    width: 30px;
    margin: 0;
    margin-right: 20px;
}

</style>