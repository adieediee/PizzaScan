<template>
  <div class="paragraph paragraph-last">
    <h2>{{$t('modals.settings.settings.title')}}</h2>
    <div class="language">
      <p>{{$t('modals.settings.settings.description')}}</p>
      <button 
        class="btn btn-language" 
        @click="changeLanguage('en')"
        :class="{ active: locale === 'en' }">
          {{$t('modals.settings.settings.languageEN')}}
      </button>
      <button 
        class="btn btn-language" 
        :class="{ active: locale === 'cz' }"
        @click="changeLanguage('cz')">
          {{$t('modals.settings.settings.languageCZ')}}
      </button>
      <button 
        class="btn btn-language" 
        :class="{ active: locale === 'sk' }"
        @click="changeLanguage('sk')">
          {{$t('modals.settings.settings.languageSK')}}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const changeLanguage = (lang) => {
  locale.value = lang;
  localStorage.setItem('selectedLanguage', lang);
};
</script>

<style scoped>
.paragraph p {
  margin: 0;
}

.language {
  display: flex;
  align-items: center;
}

.btn-language {
  color: white;
}

.btn-language.active {
  color: #3E63DD;
}

.btn-language:not(.active):hover {
  color: #b0b0b0!important;
}
</style>
