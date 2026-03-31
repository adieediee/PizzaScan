import squareAnnotations from "./automaticAnnotationSquares.json";
import subImageMap from "./pizzaSubImageMap.json";
import { v4 as uuidv4 } from "uuid";

const PIZZA_SUB_IMAGE_COUNT = 8;

// Sub-image names the AI was trained on
const RECOGNIZED_SUB_IMAGES = new Set(
  Array.from({ length: PIZZA_SUB_IMAGE_COUNT }, (_, i) => `pizza-${i + 1}`)
);

// Returns true when the image name suggests it is not a standard supported pizza
function isUnsupportedImage(imageName) {
  if (!imageName) return true;
  const lower = imageName.toLowerCase().replace(/\.[^.]+$/, ''); // strip extension
  // Exact match against known sub-images → always supported
  if (RECOGNIZED_SUB_IMAGES.has(lower)) return false;
  // Explicit unsupported image names (demo test images)
  const UNSUPPORTED_NAMES = ['pizza_banana', 'pizza_sardine'];
  if (UNSUPPORTED_NAMES.some((n) => lower.includes(n))) return true;
  // Generic "bad" markers in the filename → unsupported
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

  if (canvasStore.selectedImage.aiAnnotated) return;

  canvasStore.selectedImage.aiAnnotated = true;

  squareAnnotations.forEach((square, index) => {
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

    // index maps annotation[i] → pizza-(i+1) sub-image
    const mainAnnotation = annotationStore.addAIannotation(imageId, defectType, cx1, cy1, cx2, cy2, index);
    if (mainAnnotation) {
      const conf = Number.isFinite(confidence) ? confidence : null;
      const defectColor =
        annotationStore.microtubularDefects.find((defect) => defect.value === defectType)?.color ||
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

    // If a sub-image is selected, switch to the parent image instead
    if (canvasStore.selectedImage.isSubImage) {
      const parentImage = imageStore.activeSubImageParent;
      if (!parentImage) return;
      canvasStore.setImage(parentImage);
      imageStore.clearSubImageSelection();
    }

    const imageName = canvasStore.selectedImage.imageName;

    // Reset so annotations can be re-added on repeat runs
    imageStore.setRightClickedImage(canvasStore.selectedImage);
    canvasStore.selectedImage.aiAnnotated = false;
    annotationStore.deleteAIAnnotations();

    // Show loading modal first
    annotationStore.loading = true;

    const delay = Math.floor(Math.random() * 2 + 2) * 1000; // 2–3 s
    setTimeout(() => {
      annotationStore.loading = false;

      if (isUnsupportedImage(imageName)) {
        annotationStore.aiError = true;
        return;
      }

      addSquaresFromJson(annotationStore, canvasStore);

      // Only after loading done → show tutorial (first time only)
      if (!boardingStore.automaticAnnotationTutorialSeen) {
        boardingStore.setAutomaticAnnotationTutorialOn();
      }
    }, delay);
  };
};

export const createAIDetectionHandler = (imageStore, canvasStore, boardingStore, annotationStore) => {
  return () => {
    if (!canvasStore.selectedImage) return;

    // If a sub-image is selected, switch to the parent image instead
    if (canvasStore.selectedImage?.isSubImage) {
      const parentImage = imageStore.activeSubImageParent;
      if (!parentImage) return;
      canvasStore.setImage(parentImage);
      imageStore.clearSubImageSelection();
    }

    const imageName = canvasStore.selectedImage.imageName;

    if (isUnsupportedImage(imageName)) {
      // Brief loading simulation before showing error
      annotationStore.loading = true;
      setTimeout(() => {
        annotationStore.loading = false;
        annotationStore.aiError = true;
      }, Math.floor(Math.random() * 2 + 2) * 1000);
      return;
    }

    loadPizzaSubImages(imageStore, canvasStore);
    if (!boardingStore.aiDetectionTutorialSeen) {
      boardingStore.setAiDetectionTutorialOn();
    }
  };
};
