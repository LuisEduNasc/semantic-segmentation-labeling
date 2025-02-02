import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';

type AnnotationOptionsStore = {
  selectedAnnotation: 'brush' | 'polygon';
  setSelectedAnnotation: (annotation: 'brush' | 'polygon') => void;
};

export const useAnnotationOptionsStore = create<AnnotationOptionsStore>()(
  devtools(
    persist(
      (set) => ({
        selectedAnnotation: 'brush',
        setSelectedAnnotation: (annotation: 'brush' | 'polygon') => {
          set({ selectedAnnotation: annotation as 'brush' | 'polygon' });
        },
      }),
      {
        name: 'annotation-option',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);
