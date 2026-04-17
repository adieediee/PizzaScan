import squareAnnotations from "./automaticAnnotationSquares.json";
import subImageMap from "./pizzaSubImageMap.json";
import scenario2Squares from "./scenario2Squares.json";
import scenario2SubImageMap from "./scenario2SubImageMap.json";
import { v4 as uuidv4 } from "uuid";

const PIZZA_SUB_IMAGE_COUNT = 8;

const RECOGNIZED_SUB_IMAGES = new Set(
  Array.from({ length: PIZZA_SUB_IMAGE_COUNT }, (_, i) => `pizza-${i + 1}`)
);

function getBaseName(imageName) {
  if (!imageName) return '';
  return imageName.toLowerCase().replace(/\.[^.]+$/, '');
}

function isScenario0(imageName) {
  return getBaseName(imageName) === 'scenario-0';
}

function isScenario2(imageName) {
  return getBaseName(imageName) === 'scenario-2';
}

function isUnsupportedImage(imageName) {
  if (!imageName) return true;
  const lower = getBaseName(imageName);
  if (RECOGNIZED_SUB_IMAGES.has(lower)) return false;
  if (lower === 'scenario-0' || lower === 'scenario-1' || lower === 'scenario-2') return false;
  const UNSUPPORTED_NAMES = ['pizza_banana', 'pizza_sardine'];
  if (UNSUPPORTED_NAMES.some((n) => lower.includes(n))) return true;
  const BAD_MARKERS = ['zly', 'zla', 'zle', 'bad', 'invalid', 'unsupported', 'error'];
  return BAD_MARKERS.some((m) => lower.includes(m));
}

const loadPizzaSubImages = (imageStore, canvasStore) => {
  if (!canvasStore.selectedImage) return;
  const parentImageId = canvasStore.selectedImage.imageId;
  const subImages = Array.from({ length: PIZZA_SUB_IMAGE_COUNT }, (_, i) => {
    const name = `pizza-${i + 1}`;
    const crop = subImageMap.find((m) => m.name === name) || null;
    const sq = squareAnnotations[i];
    const mainPixelCenter = sq
      ? { x: (Number(sq.x1) + Number(sq.x2)) / 2, y: (Number(sq.y1) + Number(sq.y2)) / 2 }
      : null;
    return {
      imageName: name,
      imageUrl: `/${name}.png`,
      imageId: uuidv4(),
      isSubImage: true,
      parentImageId,
      subImageIndex: i,
      crop,
      pngWidth: 1854,
      pngHeight: 1854,
      mainPixelCenter,
    };
  });
  imageStore.addSubImages(parentImageId, subImages);
};

const loadScenario2SubImages = (imageStore, canvasStore) => {
  if (!canvasStore.selectedImage) return;
  const parentImageId = canvasStore.selectedImage.imageId;
  const subImages = Array.from({ length: 8 }, (_, i) => {
    const name = `pizza-${i + 1}`;
    const crop = scenario2SubImageMap.find((m) => m.name === name) || null;
    const sq = scenario2Squares[i];
    const mainPixelCenter = sq
      ? { x: (Number(sq.x1) + Number(sq.x2)) / 2, y: (Number(sq.y1) + Number(sq.y2)) / 2 }
      : null;
    return {
      imageName: name,
      imageUrl: `/scenario2-${name}.png`,
      imageId: uuidv4(),
      isSubImage: true,
      parentImageId,
      subImageIndex: i,
      crop,
      pngWidth: 1854,
      pngHeight: 1854,
      mainPixelCenter,
    };
  });
  imageStore.addSubImages(parentImageId, subImages);
};

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

const addSquares = (boxes, annotationStore, canvasStore) => {
  if (!canvasStore.selectedImage) return;
  if (canvasStore.selectedImage.aiAnnotated) return;

  canvasStore.selectedImage.aiAnnotated = true;
  const imageId = canvasStore.selectedImage.imageId;

  boxes.forEach((square, index) => {
    const parsed = normalizeSquare(square);
    if (!parsed) return;

    const { x1, y1, x2, y2, defectType, confidence } = parsed;
    const scale = canvasStore.imageScale;
    const offsetX = canvasStore.imageDrawStartWidth;
    const offsetY = canvasStore.imageDrawStartHeight;

    const mainAnnotation = annotationStore.addAIannotation(
      imageId, defectType,
      x1 * scale + offsetX, y1 * scale + offsetY,
      x2 * scale + offsetX, y2 * scale + offsetY,
      index
    );
    if (mainAnnotation) {
      const conf = Number.isFinite(confidence) ? confidence : null;
      const defectColor =
        annotationStore.microtubularDefects.find((d) => d.value === defectType)?.color ||
        mainAnnotation.color;
      mainAnnotation.confidence = conf;
      mainAnnotation.defectColor = defectColor;
      if (mainAnnotation.linkedAnnotationId) {
        const linked = annotationStore.getLinkedAnnotation(mainAnnotation);
        if (linked) {
          linked.confidence = conf;
          linked.defectColor = defectColor;
        }
      }
    }
  });
};

export const createAutomaticAnnotationHandler = (boardingStore, annotationStore, canvasStore, imageStore) => {
  return () => {
    if (!canvasStore.selectedImage) return;

    // Always switch to parent image first — same as original behaviour
    if (canvasStore.selectedImage.isSubImage) {
      const parentImage = imageStore.activeSubImageParent;
      if (!parentImage) return;
      canvasStore.setImage(parentImage);
      imageStore.clearSubImageSelection();
    }

    const imageName = canvasStore.selectedImage.imageName;

    imageStore.setRightClickedImage(canvasStore.selectedImage);
    canvasStore.selectedImage.aiAnnotated = false;
    annotationStore.deleteAIAnnotations();

    annotationStore.loading = true;

    const delay = Math.floor(Math.random() * 2 + 2) * 1000;
    setTimeout(() => {
      annotationStore.loading = false;

      if (isUnsupportedImage(imageName)) {
        annotationStore.aiError = true;
        return;
      }

      if (isScenario0(imageName)) return;

      if (isScenario2(imageName)) {
        addSquares(scenario2Squares, annotationStore, canvasStore);
      } else {
        addSquares(squareAnnotations, annotationStore, canvasStore);
      }

      if (!boardingStore.automaticAnnotationTutorialSeen) {
        boardingStore.setAutomaticAnnotationTutorialOn();
      }
    }, delay);
  };
};

export const createAIDetectionHandler = (imageStore, canvasStore, boardingStore, annotationStore) => {
  return () => {
    if (!canvasStore.selectedImage) return;

    if (canvasStore.selectedImage?.isSubImage) {
      const parentImage = imageStore.activeSubImageParent;
      if (!parentImage) return;
      canvasStore.setImage(parentImage);
      imageStore.clearSubImageSelection();
    }

    const imageName = canvasStore.selectedImage.imageName;

    if (isUnsupportedImage(imageName)) {
      annotationStore.loading = true;
      setTimeout(() => {
        annotationStore.loading = false;
        annotationStore.aiError = true;
      }, Math.floor(Math.random() * 2 + 2) * 1000);
      return;
    }

    if (isScenario0(imageName)) return;

    if (isScenario2(imageName)) {
      loadScenario2SubImages(imageStore, canvasStore);
    } else {
      loadPizzaSubImages(imageStore, canvasStore);
    }

    if (!boardingStore.aiDetectionTutorialSeen) {
      boardingStore.setAiDetectionTutorialOn();
    }
  };
};
