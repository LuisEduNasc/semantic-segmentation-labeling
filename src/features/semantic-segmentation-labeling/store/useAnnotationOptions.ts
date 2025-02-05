import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import {
  FabricObject,
  FabricObjectProps,
  ObjectEvents,
  Point,
  SerializedObjectProps,
} from 'fabric';

interface ImageInfo {
  id: number;
  fileName: string;
  width: number;
  height: number;
}

interface Annotation {
  id: number;
  imageId: number | null;
  categoryId: string;
  segmentation: Point[] | number[][];
  bbox: Array<number>;
  area: number;
  path: FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>;
}

type AnnotationOptionsStore = {
  selectedAnnotation: 'brush' | 'polygon';
  setSelectedAnnotation: (annotation: 'brush' | 'polygon') => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
  eraserActive: boolean;
  setEraserActive: (active: boolean) => void;
  annotations: Array<Annotation>;
  setAnnotation: (annotation: Annotation) => void;
  removeLastAnnotation: () => Array<Annotation>;
  imageInfo: ImageInfo | null;
  setImageInfo: (info: ImageInfo) => void;
};

export const useAnnotationOptionsStore = create<AnnotationOptionsStore>()(
  devtools(
    persist(
      (set) => ({
        selectedAnnotation: 'brush',
        brushSize: 1,
        eraserActive: false,
        annotations: [],
        imageInfo: null,
        setSelectedAnnotation: (annotation: 'brush' | 'polygon') => {
          set({ selectedAnnotation: annotation as 'brush' | 'polygon' });
        },
        setBrushSize: (size: number) => {
          set({ brushSize: size });
        },
        setEraserActive: (active: boolean) => {
          set({ eraserActive: active });
        },
        setAnnotation: (annotation) => {
          set((state) => ({ annotations: [...state.annotations, annotation] }));
        },
        removeLastAnnotation: () => {
          let updatedAnnotations: Array<Annotation> = [];
          set((state) => {
            updatedAnnotations = [...state.annotations];
            updatedAnnotations.pop();
            return { annotations: updatedAnnotations };
          });
          return updatedAnnotations;
        },
        setImageInfo: (info: ImageInfo) => {
          set(() => ({ imageInfo: info }));
        },
      }),
      {
        name: 'annotation-option',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);
