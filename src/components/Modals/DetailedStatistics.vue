<template>
    <div id="StatisticsModal" v-if="modalStore.isModalOpen('statistics')" class="modal">
      <div class="modal-content">
        <div class="modal-title">
          <h1>{{$t('modals.statistics.title')}}</h1>
          <button id="closeStatisticsModalButton" @click="modalStore.closeModal()" class="btn btn-close">
            <fa :icon="['fas', 'xmark']" />
          </button>
        </div>
        <div>
            <div class="statistics">
                <div class="statistic">
                    <h3 class="statistic-title">Total:</h3>
                    <p>{{$t('modals.statistics.total')}}</p>
                    <p>{{statisticStore.total}}</p>
                </div>
                <div class="statistic">
                    <h3 class="statistic-title">Total MTDs:</h3>
                    <p>{{$t('modals.statistics.totalMTDs')}}</p>
                    <p>{{statisticStore.totalMTDs}}%</p>
                </div>
                <div class="statistic">
                    <h3 class="statistic-title">Total DA:</h3>
                    <p>{{$t('modals.statistics.totalDA')}}</p>
                    <p>{{statisticStore.totalDA}}</p>
                </div>
                <div class="statistic">
                    <h3 class="statistic-title">Total IDA:</h3>
                    <p>{{$t('modals.statistics.totalIDA')}}</p>
                    <p>{{statisticStore.totalIDA}}%</p>
                    </div>
                <div class="statistic">
                    <h3 class="statistic-title">Total ODA:</h3>
                    <p>{{$t('modals.statistics.totalODA')}}</p>
                    <p>{{statisticStore.totalODA}}%</p>
                </div>
            </div>
            <div class="diagram-container">
                <div class="chart-container">
                    <Histogram id="DefectHistogram" :chartData="chartDataDefect" :chartOptions="chartOptionsDefect" />
                </div>
                <div class="chart-container">
                    <Histogram id="DyneinHistogram" :chartData="chartDataDynein" :chartOptions="chartOptionsDynein" />
                </div>
            </div>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useAnnotationStore } from '@/stores/AnnotationsStore';
import { useModalStore } from '@/stores/ModalStore';
import { useStatisticStore } from '@/stores/StatisticStore';
import Histogram from './Histogram.vue';

const modalStore = useModalStore();
const annotationsStore = useAnnotationStore();
const statisticStore = useStatisticStore();

const defects = annotationsStore.microtubularDefects;
const dynein = annotationsStore.dyneinArms;

const chartDataDefect = ref({
    labels: defects.map(defect => defect.name),
    datasets: [
        {
            label: 'Count',
            data: defects.map(defect => defect.count),
            backgroundColor: defects.map(defect => defect.color),
        },
    ],
});

const chartDataDynein = ref({
    labels: dynein.map(defect => defect.name),
    datasets: [
        {
            label: 'Count',
            data: dynein.map(defect => defect.count),
            backgroundColor: "#3E63DD",
        },
    ],
});

const chartOptionsDefect = ref({
    responsive: true,
    plugins: {
        legend: {
            display: true,
        },
        title: {
            display: true,
            text: 'Microtubular defects',
            font: {
                size: 15,
            },
        },
    },
    scales: {
        x: {
            ticks: {
                font: {
                    size: 12,
                },
            },
        },
        y: {
            ticks: {
                font: {
                    size: 12,
                },
            },
            beginAtZero: true,
            title: {
                display: true,
                text: 'Count',
                font: {
                    size: 12,
                },
            },
        },
    },
});

const chartOptionsDynein = ref({
    responsive: true,
    plugins: {
        legend: {
            display: true,
        },
        title: {
            display: true,
            text: 'Dynein arms',
            font: {
                size: 15,
            },
        },
    },
    scales: {
        x: {
            ticks: {
                font: {
                    size: 12,
                },
            },
        },
        y: {
            ticks: {
                font: {
                    size: 12,
                },
            },
            beginAtZero: true,
            title: {
                display: true,
                text: 'Count',
                font: {
                    size: 12,
                },
            },
        },
    },
});

watch(() => annotationsStore.microtubularDefects, (newDefects) => {    
    chartDataDefect.value = {
        labels: newDefects.map(defect => defect.name),
        datasets: [
            {
                label: 'Count',
                data: newDefects.map(defect => defect.count),
                backgroundColor: newDefects.map(defect => defect.color),
            },
        ],
    };
}, { deep: true });

watch(() => annotationsStore.dyneinArms, (newDynein) => {    
    chartDataDynein.value = {
        labels: newDynein.map(defect => defect.name),
        datasets: [
            {
                label: 'Count',
                data: newDynein.map(defect => defect.count),
                backgroundColor: "#3E63DD",
            },
        ],
    };
}, { deep: true });

watch(() => annotationsStore.microtubularDefects, (newDefects) => {
    statisticStore.computeStatistics(newDefects, annotationsStore.dyneinArms);
}, { deep: true });

watch(() => annotationsStore.dyneinArms, (newDynein) => {
    statisticStore.computeStatistics(annotationsStore.microtubularDefects, newDynein);
}, { deep: true });


</script>
  
<style scoped>
.modal-content {
    max-width: 90%;
    height: 90%;
}

.diagram-container, .statistics {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.chart-container {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  box-shadow:  0 4px 6px rgba(0, 0, 0, 0.5);
  padding: 10px;
}

.statistics {
  margin-bottom: 20px;
  padding: 20px;
  background: #2D2D42;
  text-align: center;
  border-radius: 20px;
  box-shadow:  0 4px 6px rgba(0, 0, 0, 0.5);
}

.statistic-title {
  font-weight: 700;
}

.statistic h3 {
    font-size: small;
    margin-bottom: 0;
}

.statistic p {
    font-size: smaller;
    margin-top: 0;
}
  
</style>
  