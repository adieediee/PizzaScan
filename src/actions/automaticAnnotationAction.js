import squareAnnotations from "./automaticAnnotationSquares.json";

const normalizeSquare = (square) => {
  if (!square) return null;

  const x1 = Number(square.x1);
  const y1 = Number(square.y1);
  const x2 = Number(square.x2);
  const y2 = Number(square.y2);

  if (![x1, y1, x2, y2].every(Number.isFinite)) return null;

  return {
    x1: Math.min(x1, x2),
    y1: Math.min(y1, y2),
    x2: Math.max(x1, x2),
    y2: Math.max(y1, y2),
    confidence: Number(square.confidence),
    defectType: square.defectType || "normal",
  };
};

const addSquaresFromJson = (annotationStore, canvasStore) => {
  if (!canvasStore.selectedImage) return;

  const imageId = canvasStore.selectedImage.imageId;

  squareAnnotations.forEach((square) => {
    const parsedSquare = normalizeSquare(square);
    if (!parsedSquare) return;

    const { x1, y1, x2, y2, defectType, confidence } = parsedSquare;

    const scale = canvasStore.imageScale;
    const offsetX = canvasStore.imageDrawStartWidth;
    const offsetY = canvasStore.imageDrawStartHeight;

    const cx1 = x1 * scale + offsetX;
    const cy1 = y1 * scale + offsetY;
    const cx2 = x2 * scale + offsetX;
    const cy2 = y2 * scale + offsetY;

    annotationStore.addAIannotation(imageId, defectType, cx1, cy1, cx2, cy2);

    const createdAnnotation = annotationStore.annotations[annotationStore.annotations.length - 1];
    if (createdAnnotation) {
      createdAnnotation.confidence = Number.isFinite(confidence) ? confidence : null;
      createdAnnotation.defectColor =
        annotationStore.microtubularDefects.find((defect) => defect.value === defectType)?.color ||
        createdAnnotation.color;
    }
  });
};

export const createAutomaticAnnotationHandler = (boardingStore, annotationStore, canvasStore) => {
  return () => {
    console.log("Hello World!");

    if (!boardingStore.automaticAnnotationTutorialSeen) {
      boardingStore.setAutomaticAnnotationTutorialOn();
    } else {
      annotationStore.automaticAnnotation();
    }

    addSquaresFromJson(annotationStore, canvasStore);
  };
};
