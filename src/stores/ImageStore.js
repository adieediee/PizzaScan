import { defineStore } from 'pinia'
import { useBoardingStore } from './BoardingStore';
import { useCanvasStore } from './CanvasStore';
import {v4 as uuidv4} from 'uuid';

/*image attributres:
  imageUrl 
  imageName
  isOpen
  onceOpen
  reviewed
  description
*/

export const useImageStore = defineStore('image', {
  state: () => ({
    uploadedImages: [],
    currentPercentageUpload: 0,
    uploadModalVisible: false,
    imageInfo: null,
    selectedAnnotation: null,
    copiedAnnotation: null,
    croppedImage: null,
    projectDescription: null,
    projectOutcome: null,
    rightClickedImage: null,
    activeTab: "Project",
    activeSubImage: null,
    activeSubImageParent: null,
  }),
  
  actions: {
    updateImages(images) {
        this.uploadedImages = images;
    },

    addImage(image) {
      if(image.imageId === undefined) image.imageId = uuidv4();
      this.uploadedImages.push(image);

      if (this.uploadedImages.length >= 1 && !useBoardingStore().manualAnnotationTutorialOn && !useBoardingStore().manualAnnotationTutorialSeen) {
        useBoardingStore().setManualAnnotationTutorialOn();
      }
    },

    updateImageInfo(index) {
      this.imageInfo = this.uploadedImages[index];
    },

    setReviewed() {    
      this.rightClickedImage.reviewed = !this.rightClickedImage.reviewed;
    },

    deleteImage() {
      this.uploadedImages = this.uploadedImages.filter((image) => image.imageUrl !== this.rightClickedImage.imageUrl);

      if(this.rightClickedImage === useCanvasStore().selectedImage) {
        this.rightClickedImage = null;
        useCanvasStore().setImage(null, null);
        this.updateActiveTab("Project");
      }
    },

    setSelectedAnnotation(annotation) {
        this.selectedAnnotation = annotation;
    },

    setCopiedAnnotation(annotation) {
      this.copiedAnnotation = annotation;
    },

    setCroppedImage(image) {
      this.croppedImage = image;
    },

    setSeenImage(index) {
      this.uploadedImages.forEach((item, i) => {
        item.isOpen = i === index;
      });

      this.uploadedImages[index].onceOpen = true;
      this.activeSubImage = null;
      this.activeSubImageParent = null;
    },

    setOnceSeenImage() {
      this.rightClickedImage.onceOpen = !this.rightClickedImage.onceOpen;
    },

    setProjectDescription(description) {
      this.projectDescription = description;
    },

    setProjectOutcome(outcome) {
      this.projectOutcome = outcome;
    },

    setImageDescription(description) {
      const index = this.uploadedImages.findIndex((image) => image.imageUrl === this.imageInfo.imageUrl);
      this.uploadedImages[index].description = description;
    },

    updateActiveTab(tab) {
      this.activeTab = tab;
    },

    getActiveTab() {
      return this.activeTab;
    },

    setOpenImage(index) {
      this.uploadedImages[index].isOpen = !this.uploadedImages[index].isOpen;
    },

    setRightClickedImage(image) {
      this.rightClickedImage = image;
    },

    setPercentageUpload(percentage) {
      this.currentPercentageUpload = percentage;
    },

    setUploadModalVisible() {
      this.uploadModalVisible = !this.uploadModalVisible;
    },

    addSubImages(imageId, subImages) {
      const image = this.uploadedImages.find(img => img.imageId === imageId);
      if (image) {
        image.subImages = subImages;
      }
    },

    removeSubImages(imageId) {
      const image = this.uploadedImages.find(img => img.imageId === imageId);
      if (image) {
        image.subImages = [];
      }
      if (this.activeSubImageParent?.imageId === imageId) {
        this.activeSubImage = null;
        this.activeSubImageParent = null;
      }
    },

    selectSubImage(parentImage, subImage) {
      this.activeSubImageParent = parentImage;
      this.activeSubImage = subImage;
      useCanvasStore().setImage(subImage);
    },

    navigateSubImage(direction) {
      if (!this.activeSubImageParent || !this.activeSubImage) return;
      const subImages = this.activeSubImageParent.subImages;
      const currentIndex = this.activeSubImage.subImageIndex;
      const nextIndex = (currentIndex + direction + subImages.length) % subImages.length;
      this.selectSubImage(this.activeSubImageParent, subImages[nextIndex]);
    },

    clearSubImageSelection() {
      this.activeSubImage = null;
      this.activeSubImageParent = null;
    },
  },
});