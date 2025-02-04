import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';

type AnnotationOptionsStore = {
  selectedAnnotation: 'brush' | 'polygon';
  setSelectedAnnotation: (annotation: 'brush' | 'polygon') => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
  eraserActive: boolean;
  setEraserActive: (active: boolean) => void;
};

export const useAnnotationOptionsStore = create<AnnotationOptionsStore>()(
  devtools(
    persist(
      (set) => ({
        selectedAnnotation: 'brush',
        brushSize: 1,
        eraserActive: false,
        setSelectedAnnotation: (annotation: 'brush' | 'polygon') => {
          set({ selectedAnnotation: annotation as 'brush' | 'polygon' });
        },
        setBrushSize: (size: number) => {
          set({ brushSize: size });
        },
        setEraserActive: (active: boolean) => {
          set({ eraserActive: active });
        },
      }),
      {
        name: 'annotation-option',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);
