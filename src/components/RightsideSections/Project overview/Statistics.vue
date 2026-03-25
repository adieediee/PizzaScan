<template>
  <div class="section">
    <div class="title-chevron">
      <h3>{{ $t("rightSidebar.ProjectOverview.statistics") }}</h3>
      <button
        id="StatisticsChevron"
        class="btn chevron-btn"
        @click="toggleStatistics"
        :class="{ rotated: showStatistics }"
      >
        <fa :icon="['fas', 'chevron-down']" />
      </button>
    </div>
    <div v-if="showStatistics">
      <div id="statistics" class="total-numbers">
        <div class="total-number">
          <h4>
            Total MTD
            <sup class="info-icon">
              <fa :icon="['fas', 'info-circle']" class="info-icon" />
              <span class="tooltip tooltip-section long-tooltip">{{
                $t("modals.statistics.totalMTDs")
              }}</span>
            </sup>
            :
          </h4>
          <p>{{ statisticStore.totalMTDs }}%</p>
        </div>
        <div class="total-number">
          <h4>
            Total IDA
            <sup class="info-icon">
              <fa :icon="['fas', 'info-circle']" class="info-icon" />
              <span class="tooltip tooltip-section long-tooltip">{{
                $t("modals.statistics.totalIDA")
              }}</span>
            </sup>
            :
          </h4>
          <p>{{ statisticStore.totalIDA }}%</p>
        </div>
        <div class="total-number">
          <h4>
            Total ODA
            <sup class="info-icon">
              <fa :icon="['fas', 'info-circle']" class="info-icon" />
              <span class="tooltip tooltip-section long-tooltip">{{
                $t("modals.statistics.totalODA")
              }}</span>
            </sup>
            :
          </h4>
          <p>{{ statisticStore.totalODA }}%</p>
        </div>
      </div>

      <div id="defectCounter" class="microtubular-table">
        <div class="table-header">
          <h4 class="align-left">
            {{ $t("rightSidebar.ProjectOverview.statisticsDefects") }}
          </h4>
          <h4 class="align-right">
            {{ $t("rightSidebar.ProjectOverview.statisticsCount") }}
          </h4>
        </div>

        <div
          v-for="(item, index) in annotationStore.microtubularDefects"
          :key="index"
          class="table-row"
          :style="{ borderLeft: `5px solid ${item.color}` }"
        >
          <p class="align-left">{{ item.name }}</p>
          <p class="align-right">{{ item.count }}</p>
        </div>

        <div class="table-footer">
          <h4 class="align-left">
            {{ $t("rightSidebar.ProjectOverview.statisticsTotal") }}
          </h4>
          <h4 class="align-right">{{ statisticStore.total }}</h4>
        </div>
      </div>
      <!--
      <div id="dyneinCounter" class="microtubular-table">
        <div class="table-header">
          <h4 class="align-left">
            {{ $t("rightSidebar.ProjectOverview.statisticsDyneins") }}
          </h4>
          <h4 class="align-right">
            {{ $t("rightSidebar.ProjectOverview.statisticsCount") }}
          </h4>
        </div>

        <div
          v-for="(item, index) in annotationStore.dyneinArms"
          :key="index"
          class="table-row"
        >
          <p class="align-left">{{ item.name }}</p>
          <p class="align-right">{{ item.count }}</p>
        </div>

        <div class="table-footer">
          <h4 class="align-left">
            {{ $t("rightSidebar.ProjectOverview.statisticsTotal") }}
          </h4>
          <h4 class="align-right">{{ statisticStore.total }}</h4>
        </div>
      </div>
      -->
      <button
        id="detailedStatisticsButton"
        class="btn btn-outlined show-statistics"
        @click="modalStore.openModal('statistics')"
        :disabled="!boardingStore.wholeTutorialSeen"
      >
        {{ $t("rightSidebar.ProjectOverview.detailedStatistics") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useAnnotationStore } from "@/stores/AnnotationsStore";
import { useStatisticStore } from "@/stores/StatisticStore";
import { useModalStore } from "@/stores/ModalStore";
import { useBoardingStore } from "@/stores/BoardingStore";

const annotationStore = useAnnotationStore();
const statisticStore = useStatisticStore();
const modalStore = useModalStore();
const boardingStore = useBoardingStore();
const showStatistics = ref(true);

const toggleStatistics = () => {
  showStatistics.value = !showStatistics.value;
};

watch(
  () => annotationStore.microtubularDefects,
  (newMicro) => {},
);

watch(
  () => annotationStore.dyneinArms,
  (newDynein) => {},
);

watch(
  () => statisticStore.total,
  (newTotal) => {},
);

watch(
  () => statisticStore.totalMTDs,
  (newTotalMTDs) => {},
);

watch(
  () => statisticStore.totalIDA,
  (newTotalIDA) => {},
);

watch(
  () => statisticStore.totalODA,
  (newTotalODA) => {},
);
</script>

<style scoped>
.total-numbers {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.total-number {
  text-align: center;
}

.total-number h4 {
  margin-bottom: 10px;
}

.microtubular-table {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: #2d2d42 1px solid;
  border-bottom: #2d2d42 1px solid;
  padding-top: 20px;
  padding-bottom: 10px;
  font-size: small;
}

.table-header,
.table-row,
.table-footer {
  display: grid;
  grid-template-columns: 2fr 1fr;
}

.table-header,
.table-footer {
  font-weight: bold;
}

.align-left {
  text-align: left;
}

.align-right {
  text-align: right;
}

.table-row {
  position: relative;
  padding-left: 10px;
}

.table-footer {
  margin-top: 10px;
}

.table-header {
  margin-bottom: 10px;
}

.show-statistics {
  width: 100%;
  margin-top: 20px;
}

.info-icon {
  position: relative;
  display: inline-block;
  font-size: smaller;
}

.tooltip {
  font-size: inherit;
}

.info-icon:hover .tooltip {
  visibility: visible;
  opacity: 1;
  cursor: pointer;
  display: block;
}
</style>
