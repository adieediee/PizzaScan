<template>
    <div id="ExportModal" class="modal" v-if="modalStore.isModalOpen('export')">
      <div class="confirm-modal-content">
        <div class="modal-title">
            <h2>{{$t('modals.export.title')}}</h2>
            <span id="closeExportModalButton" class="btn btn-outlined btn-close" @click="modalStore.closeModal()">
                <fa :icon="['fas', 'xmark']" />
            </span>
        </div>
        <p>{{$t('modals.export.title2')}}</p>
        <div class="div-button">
            <button id="cancelExportModalButton" class="btn btn-outlined" @click="modalStore.closeModal()">{{$t('modals.imageAIannotations.cancelButton')}}</button>
            <button id="exportAnnotationButton" class="btn btn-filled" @click="exportToExcel()">{{$t('modals.export.exportButton')}}</button>
        </div>
      </div>
    </div>
</template>
  
<script setup>
import { useModalStore } from '@/stores/ModalStore';
import { useAnnotationStore } from '@/stores/AnnotationsStore';
import { useImageStore } from '@/stores/ImageStore';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const modalStore = useModalStore();
const annotationStore = useAnnotationStore();
const imageStore = useImageStore();



const exportToExcel = async () => {
  const defectNames = annotationStore.microtubularDefects.map(defect => defect.name);
  const dyneinNames = annotationStore.dyneinArms.map(arm => arm.name).filter(name => name !== 'Unknown');
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("PCD Diagnosis");

  const headerStyle = {
    font: { bold: true, color: { argb: "000000" }, size: 10},
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "C5D9F1" } },
    alignment: { horizontal: "center", vertical: "middle", wrapText: true }
  };

  const normalStyle = {
    alignment: { horizontal: "center", wrapText: true},
    font: {size: 10},
    border: {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" }
    }
  };

  const normalBoldStyle = {
    font: { bold: true, size: 10},
    alignment: { horizontal: "center", wrapText: true },
    border: {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" }
    }
  };

  const noBorderStyle = {
    font: {size: 10},
    alignment: { horizontal: "center", wrapText: true },
    font: { bold: true },
  };

  worksheet.addRow([]);
  worksheet.addRow([]);
  worksheet.addRow(["ELECTRON MICROSCOPY OF NASAL BRUSHING FOR PCD DIAGNOSIS"]);
  worksheet.mergeCells("A3:P3");
  worksheet.getCell("A3").font = { bold: true, size: 12 };
  worksheet.getCell("A3").alignment = { horizontal: "center" };
  worksheet.getCell("A3").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "C5D9F1" } };

  worksheet.addRow([]);
  worksheet.addRow(["DOB", "", "HS No", "", "Counted by", ""]).eachCell(cell => { Object.assign(cell, normalStyle);});
  worksheet.addRow(["Hospital No", "", "Sample from", "", "Sample date", ""]).eachCell(cell => {Object.assign(cell, normalStyle);});
  worksheet.addRow([]);

  worksheet.addRow(["No cells counted", "Orientation", ...defectNames, ...dyneinNames, "TOTAL"]);
  worksheet.getRow(8).eachCell(cell => {
    Object.assign(cell, normalBoldStyle);
  });

  let rowIndex = 9;
  const defectEndCol = 2 + defectNames.length;
  const dyneinStartCol = defectEndCol + 1;

  imageStore.uploadedImages.forEach(image => {
    const annotations = annotationStore.getAnnotations(image);
    const rowData = [0, ""];

    for (const defect of defectNames) {
      rowData.push(annotations.filter(a => a.microtubularDefect === defect).length);
    }

    for (const dynein of dyneinNames) {
      rowData.push(annotations.filter(a => a.dyneinArms === dynein).length);
    }

    rowData.push({ formula: `=SUM(C${rowIndex}:${String.fromCharCode('B'.charCodeAt(0) + defectNames.length)}${rowIndex})` });

    worksheet.addRow(rowData).eachCell(cell => {
      Object.assign(cell, normalStyle);
    });

    const addedRow = worksheet.getRow(rowIndex);
    addedRow.getCell(defectEndCol).border = {
      ...normalStyle.border,
      right: { style: "thick" }
    };
    addedRow.getCell(dyneinStartCol).border = {
      ...normalStyle.border,
      left: { style: "thick" }
    };

    rowIndex++;
  });

  const defectCounts = defectNames.map((_, index) => {
      const columnLetter = String.fromCharCode('C'.charCodeAt(0) + index);
      return {
          formula: `=SUM(${columnLetter}9:${columnLetter}${9 + imageStore.uploadedImages.length - 1})`
      };
  });

  const dyneinCounts = dyneinNames.map((_, index) => {
      const columnLetter = String.fromCharCode('C'.charCodeAt(0) + defectNames.length + index);
      return {
        formula: `=SUM(${columnLetter}9:${columnLetter}${9 + imageStore.uploadedImages.length - 1})`
      };
  });

  const total = { formula: `=SUM(${String.fromCharCode('C'.charCodeAt(0) + defectNames.length + dyneinNames.length)}9:${String.fromCharCode('C'.charCodeAt(0) + defectNames.length + dyneinNames.length)}${9 + imageStore.uploadedImages.length - 1})` };
  const totalCell = `${String.fromCharCode('C'.charCodeAt(0) + defectNames.length + dyneinNames.length)}${9 + imageStore.uploadedImages.length}`;

  worksheet.addRow([0, "", ...defectCounts, ...dyneinCounts, total]).eachCell(cell => {
    Object.assign(cell, normalBoldStyle);
  });

  const totalRow = worksheet.getRow(rowIndex);
  totalRow.getCell(defectEndCol).border = {
    ...normalBoldStyle.border,
    right: { style: "thick" }
  };
  totalRow.getCell(dyneinStartCol).border = {
    ...normalBoldStyle.border,
    left: { style: "thick" }
  };
  rowIndex++;

  const defectCountsPercentage = defectCounts.map((_, index) => {
      const columnLetter = String.fromCharCode('C'.charCodeAt(0) + index);
      return {
        formula: `=ROUND(${columnLetter}${9 + imageStore.uploadedImages.length} / ${totalCell} * 100, 2)`
      };
    });

  const dyneinCountsPercentage = dyneinCounts.map((_, index) => {
      const columnLetter = String.fromCharCode('C'.charCodeAt(0) + defectNames.length + index);
      return {
        formula: `=ROUND(${columnLetter}${9 + imageStore.uploadedImages.length} / ${totalCell} * 100, 2)`
      };
    });

  const percentageRow = worksheet.addRow(["%", "", ...defectCountsPercentage, ...dyneinCountsPercentage]);
  percentageRow.eachCell((cell, colNumber) => {
    Object.assign(cell, normalBoldStyle);

    if (colNumber > 2) {
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "99CCFF" } };
    }
  });

  const normalIndex = defectNames.indexOf("Normal");
  const idaIndexes = dyneinNames
    .map((name, index) => ({ name, index }))
    .filter(({ name }) => name === "Inner arms missing" || name === "Both arms missing")
    .map(({ index }) => `${String.fromCharCode('C'.charCodeAt(0) + defectNames.length + index) + (9 + imageStore.uploadedImages.length + 1)}`);

  const odaIndexes = dyneinNames
    .map((name, index) => ({ name, index }))
    .filter(({ name }) => name === "Outer arms missing" || name === "Both arms missing")
    .map(({ index }) => `${String.fromCharCode('C'.charCodeAt(0) + defectNames.length + index) + (9 + imageStore.uploadedImages.length + 1)}`);

  worksheet.addRow([]);
  worksheet.addRow(["", "", "", "", "", "", "", "", "", "", "", "Total MTD"]).eachCell(cell => {
    Object.assign(cell, noBorderStyle);
  });
  worksheet.addRow(["", "", "", "", "", "", "", "", "", "", "", "Total IDA"]).eachCell(cell => {
    Object.assign(cell, noBorderStyle);
  });
  worksheet.addRow(["", "", "", "", "", "", "", "", "", "", "", "Total ODA"]).eachCell(cell => {
    Object.assign(cell, noBorderStyle);
  });

  worksheet.getCell(`M${9 + imageStore.uploadedImages.length + 3}`).value = {
    formula: `ROUND(SUM(${defectCountsPercentage
        .map((_, index) => ({ col: String.fromCharCode('C'.charCodeAt(0) + index), originalIndex: index }))
        .filter(({ originalIndex }) => originalIndex !== normalIndex) 
        .map(({ col }) => col + (9 + imageStore.uploadedImages.length + 1)) 
        .join(", ")}), 2)`
  };
  worksheet.getCell(`M${9 + imageStore.uploadedImages.length + 3}`).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "92CDDC" } };


  worksheet.getCell(`M${9 + imageStore.uploadedImages.length + 4}`).value = {
    formula: `ROUND(SUM(${idaIndexes.join(", ")}), 2)`
  };
  worksheet.getCell(`M${9 + imageStore.uploadedImages.length + 4}`).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "92CDDC" } };  

  worksheet.getCell(`M${9 + imageStore.uploadedImages.length + 5}`).value = {
    formula: `ROUND(SUM(${odaIndexes.join(", ")}), 2)`
  };
  worksheet.getCell(`M${9 + imageStore.uploadedImages.length + 5}`).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "92CDDC" } };

  worksheet.addRow([]);

  const outcomeRow = worksheet.addRow(["Outcome:", imageStore.projectOutcome]);
  outcomeRow.getCell(1).style = headerStyle;
  outcomeRow.getCell(2).style = normalStyle;
  
  const commentRow = worksheet.addRow(["Comments:", imageStore.projectDescription]);
  commentRow.getCell(1).style = headerStyle;
  commentRow.getCell(2).style = normalStyle;

  const firstImage = imageStore.uploadedImages[0];

  if (firstImage) {
    if(firstImage.description) {
      const descriptionRow = worksheet.addRow(["Image description:", firstImage.imageName, firstImage.description]);
      descriptionRow.getCell(1).style = headerStyle;
      descriptionRow.getCell(2).style = normalStyle;
      descriptionRow.getCell(3).style = normalStyle;
    } else {
      const descriptionRow = worksheet.addRow(["Image description:", ""]);
      descriptionRow.getCell(1).style = headerStyle;
      descriptionRow.getCell(2).style = normalStyle;
      descriptionRow.getCell(3).style = normalStyle;
    }
    
    imageStore.uploadedImages.slice(1).forEach(image => {
      if(image.description) {
        const imageRow = worksheet.addRow(["", image.imageName, image.description]);
        imageRow.getCell(2).style = normalStyle;
        imageRow.getCell(3).style = normalStyle;
      } 
    });
  }

  worksheet.columns.forEach(column => {
    column.width = 12;
  });

  worksheet.getRow(8).getCell(defectEndCol).border = {
    ...normalBoldStyle.border,
    right: { style: "thick" }
  };

  worksheet.getRow(8).getCell(dyneinStartCol).border = {
    ...normalBoldStyle.border,
    left: { style: "thick" }
  };

  const addedRow = worksheet.getRow(rowIndex);
  addedRow.getCell(defectEndCol).border = {
    ...normalStyle.border,
    right: { style: "thick" }
  };
  addedRow.getCell(dyneinStartCol).border = {
    ...normalStyle.border,
    left: { style: "thick" }
  };

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), "PCD_Diagnosis_Report.xlsx");

  modalStore.closeModal();
};
</script>
