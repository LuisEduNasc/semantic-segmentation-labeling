import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';

type AnnotationOptionsStore = {
  selectedAnnotation: 'brush' | 'polygon';
  setSelectedAnnotation: (annotation: 'brush' | 'polygon') => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
};

export const useAnnotationOptionsStore = create<AnnotationOptionsStore>()(
  devtools(
    persist(
      (set) => ({
        selectedAnnotation: 'brush',
        brushSize: 1,
        setSelectedAnnotation: (annotation: 'brush' | 'polygon') => {
          set({ selectedAnnotation: annotation as 'brush' | 'polygon' });
        },
        setBrushSize: (size: number) => {
          set({ brushSize: size });
        },
      }),
      {
        name: 'annotation-option',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);
