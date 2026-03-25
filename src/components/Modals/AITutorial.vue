<template>
  <div id="AITutorial" class="modal" v-if="boardingStore.automaticAnnotationTutorialOn">
    <div class="AIconfirm-modal-content">
      <div class="right">
          <div class="AImodal-title">
              <h2>
                {{$t('AItutorial.title')}}
                <fa :icon="['fas', 'wand-magic-sparkles']" />
              </h2>
          </div>
          <div class="AImodal-content">
                <p>{{$t('AItutorial.ai_helping')}}</p>
                <ul>
                  <li>
                    {{$t('AItutorial.normal_cilia_only')}}
                  </li>
                  <li>
                    {{$t('AItutorial.dynein_not_evaluated')}}                  
                  </li>
                </ul>
                <hr/>
                <h3>{{$t('AItutorial.how_to_work')}}</h3>
                <p>{{$t('AItutorial.ai_marks_cilia')}}</p>
                <hr/>
                <p class="bold">{{$t('AItutorial.remember_expert_check')}}</p>
                <div class="AIdiv-button">
                      <button id="agreeButton" class="btn btn-filled" @click="closeModal()">{{$t('AItutorial.agree_button')}}</button>
                </div>
          </div>
        </div>
      <div class="left">
        <img src="@/assets/Tutorial/AI.gif" alt="AI Annotation" class="image-ai-annotation" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAnnotationStore } from '@/stores/AnnotationsStore';
import { useBoardingStore } from '@/stores/BoardingStore';

const annotationStore = useAnnotationStore();
const boardingStore = useBoardingStore();

const closeModal = () => {
  boardingStore.setAutomaticAnnotationTutorialOff();
  annotationStore.automaticAnnotation();
};
</script>

<style>

.AImodal-content {
  background: var(--dark-dark1, #101021);
  width: 90%;
  max-width: 90%;
  border-radius: 15px;
  height: 90%;
  display: flex;
  flex-direction: column;
  padding: 0;
}

.AImodal-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #2D2D42;
  margin-bottom: 10px;
  padding-bottom: 0;
  color: #3E63DD;
}

.AImodal-title .fa-wand-magic-sparkles {
  color: #3E63DD;
}

.right {
  flex: 1.5;
  padding: 30px;
  justify-content: space-between;
}

.left {
  flex: 1;
}

.image-ai-annotation {
  width: 400px;
  height: 520px;
  object-fit: contain;
  display: block;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

.AIconfirm-modal-content {
  width: 50%;
  border-radius: 15px;
  padding: 0;
  display: flex;
  flex-direction: row;
  background: var(--dark-dark1, #101021);
}

.AIconfirm-modal-content h3 {
  margin-bottom: 5px;
}

hr {
  border: 0.1px solid #2D2D42;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 90%;
}

.bold {
  font-weight: 600;
}

.AIdiv-button {
  display: flex;
  justify-content: end;
  margin-top: 10px;
}

.AIdiv-button .btn {
  padding: 10px;
}

.AImodal-title h2 {
  margin: 0;
  font-weight: bold;
}

</style>