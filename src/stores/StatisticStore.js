import { defineStore } from 'pinia';

export const useStatisticStore = defineStore('statistics', {
  state: () => ({
    total: 0,
    totalDA: 0,
    totalMTDs: 0,
    odaAida: 0,
    totalIDA: 0, 
    totalODA: 0, 
  }),
  actions: {
    setTotal(microtubularDefects) {
      this.total = microtubularDefects.reduce((acc, defect) => acc + defect.count, 0);
    },

    setTotalDA(dynein_arms) {
      const dyneinArms = dynein_arms.filter(arm => arm.name !== "Unknown");
      this.totalDA = dyneinArms.reduce((acc, arm) => acc + arm.count, 0);
    },
    
    setTotalMTDs(microtubularDefects) {
      const defects = microtubularDefects.filter(defect => defect.name !== "Normal");
      const MTDs = defects.reduce((acc, defect) => acc + defect.count, 0);
      this.totalMTDs = this.total > 0 ? Math.round((MTDs / this.total) * 100) : 0;
    },
    
    setOdaAida() {
      this.odaAida = this.totalIDA + this.totalODA;
    },
    
    setTotalIDA(dynein_arms) {
      const innerArmsPercentage = this.totalDA > 0 ? Math.round(dynein_arms.find(arm => arm.name === "Inner arms missing").count / this.totalDA * 100) : 0;
      const bothArmsPercentage = this.totalDA > 0 ? Math.round(dynein_arms.find(arm => arm.name === "Both arms missing").count / this.totalDA * 100) : 0;
      this.totalIDA = innerArmsPercentage + bothArmsPercentage;
    },
    
    setTotalODA(dynein_arms) {
      const outerArmsPercentage = this.totalDA > 0 ? Math.round(dynein_arms.find(arm => arm.name === "Outer arms missing").count / this.totalDA * 100) : 0;
      const bothArmsPercentage = this.totalDA > 0 ? Math.round(dynein_arms.find(arm => arm.name === "Both arms missing").count / this.totalDA * 100) : 0;
      this.totalODA = outerArmsPercentage + bothArmsPercentage;
    },

    computeStatistics(microtubularDefects, dyneinArms) {
      this.setTotal(microtubularDefects);
      this.setTotalDA(dyneinArms);
      this.setTotalMTDs(microtubularDefects);
      this.setOdaAida();
      this.setTotalIDA(dyneinArms);
      this.setTotalODA(dyneinArms);
    },
  },
});
