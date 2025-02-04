import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import { Path } from 'fabric';

type AnnotationOptionsStore = {
  selectedAnnotation: 'brush' | 'polygon';
  setSelectedAnnotation: (annotation: 'brush' | 'polygon') => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
  eraserActive: boolean;
  setEraserActive: (active: boolean) => void;
  paths: Array<Path>;
  setPath: (path: Path) => void;
  removeLastPath: () => Array<Path>;
};

export const useAnnotationOptionsStore = create<AnnotationOptionsStore>()(
  devtools(
    persist(
      (set) => ({
        selectedAnnotation: 'brush',
        brushSize: 1,
        eraserActive: false,
        paths: [],
        setSelectedAnnotation: (annotation: 'brush' | 'polygon') => {
          set({ selectedAnnotation: annotation as 'brush' | 'polygon' });
        },
        setBrushSize: (size: number) => {
          set({ brushSize: size });
        },
        setEraserActive: (active: boolean) => {
          set({ eraserActive: active });
        },
        setPath: (path) => {
          set((state) => ({ paths: [...state.paths, path] }));
        },
        removeLastPath: () => {
          let updatedPaths: Array<Path> = [];
          set((state) => {
            updatedPaths = [...state.paths];
            updatedPaths.pop();
            return { paths: updatedPaths };
          });
          return updatedPaths;
        },
      }),
      {
        name: 'annotation-option',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);
