<template>
    <div class="paragraph">
        <h2>{{ $t('modals.documentation.layout.layoutDescription.header') }}</h2>
        <p>{{ $t('modals.documentation.layout.layoutDescription.description') }}</p>
        <img :src="LayoutImg" :alt="$t('layoutDescription.altText')" />
    </div>    
    <div class="paragraph">
        <h3>{{ $t('modals.documentation.layout.navigation.header') }}</h3>
        <p>{{ $t('modals.documentation.layout.navigation.description') }}</p>
        <ul>
            <li>{{ $t('modals.documentation.layout.navigation.features.ai') }}</li>
            <li>
                <fa :icon="['fas', 'expand']" />
                - {{ $t('modals.documentation.layout.navigation.features.centerImage') }}
            </li>
            <li>
                <fa :icon="['fas', 'rotate-left']" />
                - {{ $t('modals.documentation.layout.navigation.features.undo') }}
            </li>
            <li>
                <span class="defect-name">Normal</span> - {{ $t('modals.documentation.layout.navigation.features.selectDefect') }}
            </li>
            <li>
                <fa :icon="['fas', 'circle-half-stroke']" />
                - {{ $t('modals.documentation.layout.navigation.features.changeOpacity') }}
            </li>
            <li>
                <fa :icon="['fas', 'circle-dot']" />
                - {{ $t('modals.documentation.layout.navigation.features.changeSize') }}
            </li>
            <li><span class="strong">{{ $t('modals.documentation.layout.navigation.features.openProject') }}</span></li>
            <li><span class="strong">{{ $t('modals.documentation.layout.navigation.features.saveProject') }}</span></li>
            <li><span class="strong">{{ $t('modals.documentation.layout.navigation.features.exportProject') }}</span></li>
            <li>
                <fa :icon="['fas', 'gear']" />
                - {{ $t('modals.documentation.layout.navigation.features.openSettings') }}
            </li>
            <li>
                <fa :icon="['fas', 'circle-question']" />
                - {{ $t('modals.documentation.layout.navigation.features.openDocumentation') }}
            </li>
        </ul>
    </div>
    <div class="paragraph">
        <h3>{{ $t('modals.documentation.layout.leftSidebar.header') }}</h3>
        <p>{{ $t('modals.documentation.layout.leftSidebar.description') }}</p>
        <p>{{ $t('modals.documentation.layout.leftSidebar.imageUpload') }}</p>
        <p>
            {{ $t('modals.documentation.layout.leftSidebar.imageInteractions.click') }}
            <br>
            {{ $t('modals.documentation.layout.leftSidebar.imageInteractions.rightClick') }}
        </p>
        <p>
            {{ $t('modals.documentation.layout.leftSidebar.annotationList.header') }}
        </p>
    </div>
    <div class="paragraph">
        <h3>{{ $t('modals.documentation.layout.mainImageArea.header') }}</h3>
        <p>
            {{ $t('modals.documentation.layout.mainImageArea.description') }}
        </p>
        <p>
            {{ $t('modals.documentation.layout.mainImageArea.annotation.add') }}
            <br>
            {{ $t('modals.documentation.layout.mainImageArea.annotation.delete') }}
            <br>
            {{ $t('modals.documentation.layout.mainImageArea.annotation.details') }}
            <br>
            {{ $t('modals.documentation.layout.mainImageArea.annotation.move') }}
            <br>
            {{ $t('modals.documentation.layout.mainImageArea.annotation.copyPaste') }}

        </p>
        <p>
            {{ $t('modals.documentation.layout.mainImageArea.zoom.drag') }}
        </p>
    </div>
    <div class="paragraph paragraph-last">
        <h3>{{ $t('modals.documentation.layout.rightSidebar.header') }}</h3>
        <p>
            {{ $t('modals.documentation.layout.rightSidebar.description') }}
        </p>
        <div class="right-sidebar-paragraph">
            <h4>{{ $t('modals.documentation.layout.rightSidebar.projectOverview.header') }}</h4>
            <p>
                {{ $t('modals.documentation.layout.rightSidebar.projectOverview.description') }}
            </p>
        </div>
        <div class="right-sidebar-paragraph">
            <h4>{{ $t('modals.documentation.layout.rightSidebar.imageOverview.header') }}</h4>
            <p>
                {{ $t('modals.documentation.layout.rightSidebar.imageOverview.description') }}
            </p>
        </div>
        <div class="right-sidebar-paragraph">
            <h4>{{ $t('modals.documentation.layout.rightSidebar.annotationOverview.header') }}</h4>
            <p>
                {{ $t('modals.documentation.layout.rightSidebar.annotationOverview.description') }}
            </p>
        </div>
    </div>
</template>


<script setup>
import LayoutImg from '@/assets/Tutorial/layout.png';
</script>

<style scoped>
    .defect-name {
        color: #95F204;
        background: #95F20422;
    }

    .right-sidebar-paragraph {
        margin-bottom: 20px;
    }

    .right-sidebar-paragraph h4 {
        margin: 0;
        font-weight: bolder;
        margin-bottom: 10px;
    }

    .right-sidebar-paragraph p {
        margin-left: 20px;
    }

</style>