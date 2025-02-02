import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';

interface Class {
  id: string;
  name: string;
  color: string;
}

type ClassesStore = {
  classes: Class[];
  addClass: (newClass: Class) => void;
  editClass: (id: string, name: string) => void;
  deleteClass: (id: string) => void;
};

export const useClassesStore = create<ClassesStore>()(
  devtools(
    persist(
      (set, get) => ({
        classes: [],
        addClass: (newClass: Class) => {
          const currentClasses = get().classes;
          set({ classes: [...currentClasses, newClass] });
        },
        editClass: (id: string, name: string) => {
          const currentClasses = get().classes;
          const classIndex = currentClasses.findIndex((c) => c.id === id);
          const updatedClasses = [...currentClasses];
          updatedClasses[classIndex] = { ...updatedClasses[classIndex], name: name };
          set({ classes: updatedClasses });
        },
        deleteClass: (id: string) => {
          const currentClasses = get().classes;
          const updatedClasses = currentClasses.filter((c) => c.id !== id);
          set({ classes: updatedClasses });
        },
      }),
      {
        name: 'classes',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);
